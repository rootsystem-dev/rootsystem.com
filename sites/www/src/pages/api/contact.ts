import type { APIRoute } from 'astro'
import { env } from 'cloudflare:workers'
import {
  LIMITS,
  TURNSTILE_FIELD,
  field,
  looksLikeEmail,
  honeypotValue,
  verifyTurnstile,
  spamVerdict,
  requestContext,
  redirectTo,
} from '../../lib/form'
import { sendNotification, formatBody } from '../../lib/notify'

// The only route on this site that is not prerendered. It needs to accept a
// POST and write to D1; everything else remains a static file.
export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  // Reject anything that is not a normal form post. Not a security boundary on
  // its own -- it just keeps malformed traffic out of the handler.
  const contentType = request.headers.get('content-type') ?? ''
  if (
    !contentType.includes('application/x-www-form-urlencoded') &&
    !contentType.includes('multipart/form-data')
  ) {
    return new Response('Unsupported content type', { status: 415 })
  }

  const form = await request.formData()
  const { country, userAgent, clientIp } = requestContext(request)

  // No token field at all means the request did not come from the rendered
  // form -- the widget injects this input itself. This is the one case that is
  // rejected outright rather than stored: there is nothing to learn from a row
  // that never went near the form, and storing them would let anyone fill the
  // table with a loop.
  const token = field(form, TURNSTILE_FIELD, 4096)
  if (!token) return redirectTo('/contact?error=captcha')

  const turnstile = await verifyTurnstile(token, env.TURNSTILE_SECRET_KEY, clientIp)
  const verdict = spamVerdict(honeypotValue(form), turnstile)

  const name = field(form, 'name', LIMITS.name)
  const email = field(form, 'email', LIMITS.email)
  const message = field(form, 'message', LIMITS.message)

  // Field validation is skipped for spam. Rejecting a bot for a malformed email
  // address would discard the row, and the row is the reason for storing it.
  if (!verdict.reason && (!name || !message || !looksLikeEmail(email))) {
    return redirectTo('/contact?error=invalid')
  }

  const status = verdict.reason ? 'held' : 'pending'

  let rowId: number | null = null
  try {
    // Bound parameters, never interpolation -- the values are attacker-
    // controlled by definition, and that now includes spam_detail.
    const result = await env.DB.prepare(
      `INSERT INTO contact_submissions
         (name, email, message, cf_country, user_agent, status, spam_reason, spam_detail)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(name, email, message, country, userAgent, status, verdict.reason, verdict.detail)
      .run()
    rowId = result.meta.last_row_id ?? null
  } catch (error) {
    // The submitter cannot act on a database error, so they are told the
    // submission failed and given the fallback address. Detail goes to the
    // Worker log, where observability is enabled in wrangler.jsonc.
    console.error('[contact] insert failed', error)
    return redirectTo('/contact?error=server')
  }

  if (verdict.reason) {
    // A person does not fill a hidden field, so a honeypot hit has effectively
    // no false positives and gets the same success redirect as a real
    // submission -- the bot learns nothing. Turnstile does produce false
    // positives, so a person who failed the challenge is told to retry rather
    // than thanked for a message that will never be read.
    return verdict.reason.includes('turnstile')
      ? redirectTo('/contact?error=captcha')
      : redirectTo('/contact?sent=1')
  }

  await notify({ rowId, name, email, message, country })

  return redirectTo('/contact?sent=1')
}

/**
 * Email the submission onward and record whether that worked.
 *
 * Awaited rather than backgrounded with ctx.waitUntil: at this volume the few
 * hundred milliseconds cost less than a status column that is written after the
 * response and can therefore disagree with what happened.
 */
async function notify(submission: {
  rowId: number | null
  name: string
  email: string
  message: string
  country: string | null
}): Promise<void> {
  const outcome = await sendNotification(
    {
      apiKey: env.RESEND_API_KEY,
      from: env.NOTIFY_FROM,
      to: env.NOTIFY_TO,
    },
    {
      subject: `[rootsystem.com] Contact — ${submission.name}`,
      replyTo: submission.email,
      text: formatBody([
        ['Name', submission.name],
        ['Email', submission.email],
        ['Country', submission.country],
        ['Row', submission.rowId ? String(submission.rowId) : null],
        ['', ''],
        ['Message', `\n${submission.message}`],
      ]),
    },
  )

  // 'pending' is the no-key case and is already the inserted default, so there
  // is nothing to write back.
  if (outcome === 'pending' || submission.rowId === null) return

  try {
    await env.DB.prepare(`UPDATE contact_submissions SET status = ? WHERE id = ?`)
      .bind(outcome, submission.rowId)
      .run()
  } catch (error) {
    // The submission is stored and the mail has already been sent or not. A
    // failure to record which is a log entry, not a submitter-facing error.
    console.error('[contact] status update failed', error)
  }
}

// A GET here is someone visiting the endpoint directly; send them to the form.
export const GET: APIRoute = () => redirectTo('/contact')
