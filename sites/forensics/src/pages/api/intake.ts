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
  isEngagementType,
  requestContext,
  redirectTo,
} from '../../lib/form'
import { sendNotification, formatBody } from '../../lib/notify'

// The only route on this site that is not prerendered; the landing page stays
// a static file.
export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  const contentType = request.headers.get('content-type') ?? ''
  if (
    !contentType.includes('application/x-www-form-urlencoded') &&
    !contentType.includes('multipart/form-data')
  ) {
    return new Response('Unsupported content type', { status: 415 })
  }

  const form = await request.formData()
  const { country, userAgent, clientIp } = requestContext(request)

  // See sites/www/src/pages/api/contact.ts for why a missing token is the one
  // case rejected outright rather than stored.
  const token = field(form, TURNSTILE_FIELD, 4096)
  if (!token) return redirectTo('/scope?error=captcha')

  const turnstile = await verifyTurnstile(token, env.TURNSTILE_SECRET_KEY, clientIp)
  const verdict = spamVerdict(honeypotValue(form), turnstile)

  const name = field(form, 'name', LIMITS.name)
  const email = field(form, 'email', LIMITS.email)
  const firm = field(form, 'firm', LIMITS.firm)
  const summary = field(form, 'summary', LIMITS.summary)
  const timing = field(form, 'timing', LIMITS.short)
  const referral = field(form, 'referral', LIMITS.short)

  // An unrecognised engagement type is stored as null rather than rejected: the
  // enquiry matters more than the dropdown, and a mismatch here would most
  // likely mean the option list changed, not that the submitter did anything
  // wrong.
  const rawType = field(form, 'engagement_type', 40)
  const engagementType = isEngagementType(rawType) ? rawType : null

  // The organization behind an enquiry, derived rather than asked for. `firm`
  // is optional free text, so the address domain is the more reliable key --
  // and asking for a website would be one more field on a form whose whole
  // argument is that it is short. Lowercased so the same firm does not land
  // under two spellings. Null when the address is malformed; a consumer
  // mailbox still yields a domain, and the reader has to know that gmail.com
  // is a mail provider rather than a firm. See db/migrations/0003.
  const emailDomain = email.includes('@')
    ? (email.split('@').pop() ?? '').trim().toLowerCase() || null
    : null

  // Field validation is skipped for spam, so that a malformed bot submission
  // still leaves the row it is being stored for.
  // Only a failed Turnstile holds a submission back. A honeypot hit on its own
  // is recorded and still delivered: the assumption that a person never fills a
  // hidden field was disproved on 2026-09-03 by a password manager, and the
  // failure was silent -- the row was stored with status 'held' and nobody was
  // told an enquiry had arrived. Turnstile is the real bot gate; the honeypot
  // is now a signal on a delivered message rather than a verdict that buries
  // one.
  const heldForSpam = verdict.reason?.includes('turnstile') ?? false

  // Validation is skipped only for a submission that is being stored purely as
  // evidence. A honeypot-flagged row is still delivered, so it still has to be
  // a usable enquiry.
  if (!heldForSpam && (!name || !summary || !looksLikeEmail(email))) {
    return redirectTo('/scope?error=invalid')
  }

  const status = heldForSpam ? 'held' : 'pending'

  let rowId: number | null = null
  try {
    const result = await env.DB.prepare(
      `INSERT INTO case_intake
         (name, email, email_domain, firm, engagement_type, matter_summary,
          timing, referral_source, cf_country, user_agent, status, spam_reason,
          spam_detail)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(
        name,
        email,
        emailDomain,
        firm || null,
        engagementType,
        summary,
        timing || null,
        referral || null,
        country,
        userAgent,
        status,
        verdict.reason,
        verdict.detail,
      )
      .run()
    rowId = result.meta.last_row_id ?? null
  } catch (error) {
    // A litigator who has just typed a case summary should not lose it to a
    // generic failure page with no recourse, so the error names the fallback
    // address. Detail goes to the Worker log.
    console.error('[intake] insert failed', error)
    return redirectTo('/scope?error=server')
  }

  // A person who failed the challenge is told to retry rather than thanked for
  // a message that will never be read.
  if (heldForSpam) return redirectTo('/scope?error=captcha')

  await notify({
    rowId, name, email, firm, engagementType, summary, timing, referral, country,
    flagDetail: verdict.detail,
  })

  return redirectTo('/scope?sent=1')
}

/**
 * Email the intake onward and record whether that worked.
 *
 * The body includes matter_summary. db/migrations/0001_init.sql notes that this
 * field can carry privileged or client-identifying detail, so this copies that
 * text into a mailbox as well as the database. The trade was made deliberately:
 * a notification without the substance does not support triage, and the
 * destination is a Workspace mailbox under the same control as the database.
 * See §6 of docs/superpowers/specs/2026-08-06-form-spam-gate-design.md.
 */
async function notify(submission: {
  rowId: number | null
  name: string
  email: string
  firm: string
  engagementType: string | null
  summary: string
  timing: string
  referral: string
  country: string | null
  /** Set when a spam check fired on a submission we are delivering anyway. */
  flagDetail: string | null
}): Promise<void> {
  const outcome = await sendNotification(
    {
      apiKey: env.RESEND_API_KEY,
      from: env.NOTIFY_FROM,
      to: env.NOTIFY_TO,
      cc: env.NOTIFY_CC,
    },
    {
      // The flag leads the subject so a filter can act on it, and the reason
      // travels in the body so triage does not need the database to interpret
      // it.
      subject: `${submission.flagDetail ? '[flagged] ' : ''}[forensics] Case intake — ${submission.name}`,
      replyTo: submission.email,
      text: formatBody([
        ['Name', submission.name],
        ['Email', submission.email],
        ['Firm', submission.firm],
        ['Engagement', submission.engagementType],
        ['Timing', submission.timing],
        ['Referral', submission.referral],
        ['Country', submission.country],
        ['Row', submission.rowId ? String(submission.rowId) : null],
        ['Spam check', submission.flagDetail],
        ['', ''],
        ['Matter', `\n${submission.summary}`],
      ]),
    },
  )

  if (outcome === 'pending' || submission.rowId === null) return

  try {
    await env.DB.prepare(`UPDATE case_intake SET status = ? WHERE id = ?`)
      .bind(outcome, submission.rowId)
      .run()
  } catch (error) {
    console.error('[intake] status update failed', error)
  }
}

export const GET: APIRoute = () => redirectTo('/scope')
