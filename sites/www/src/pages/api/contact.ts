import type { APIRoute } from 'astro'
import { env } from 'cloudflare:workers'
import {
  LIMITS,
  field,
  looksLikeEmail,
  isBot,
  requestContext,
  redirectTo,
} from '../../lib/form'

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

  // Discarded, but answered as if accepted, so the bot does not adapt.
  if (isBot(form)) return redirectTo('/contact?sent=1')

  const name = field(form, 'name', LIMITS.name)
  const email = field(form, 'email', LIMITS.email)
  const message = field(form, 'message', LIMITS.message)

  if (!name || !message || !looksLikeEmail(email)) {
    return redirectTo('/contact?error=invalid')
  }

  const { country, userAgent } = requestContext(request)

  try {
    // Bound parameters, never interpolation -- the values are attacker-
    // controlled by definition.
    await env.DB.prepare(
      `INSERT INTO contact_submissions (name, email, message, cf_country, user_agent)
       VALUES (?, ?, ?, ?, ?)`,
    )
      .bind(name, email, message, country, userAgent)
      .run()
  } catch (error) {
    // The submitter cannot act on a database error, so they are told the
    // submission failed and given the fallback address. Detail goes to the
    // Worker log, where observability is enabled in wrangler.jsonc.
    console.error('[contact] insert failed', error)
    return redirectTo('/contact?error=server')
  }

  return redirectTo('/contact?sent=1')
}

// A GET here is someone visiting the endpoint directly; send them to the form.
export const GET: APIRoute = () => redirectTo('/contact')
