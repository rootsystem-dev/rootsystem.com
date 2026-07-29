import type { APIRoute } from 'astro'
import { env } from 'cloudflare:workers'
import {
  LIMITS,
  field,
  looksLikeEmail,
  isBot,
  isEngagementType,
  requestContext,
  redirectTo,
} from '../../lib/form'

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

  if (isBot(form)) return redirectTo('/scope?sent=1')

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

  if (!name || !summary || !looksLikeEmail(email)) {
    return redirectTo('/scope?error=invalid')
  }

  const { country, userAgent } = requestContext(request)

  try {
    await env.DB.prepare(
      `INSERT INTO case_intake
         (name, email, firm, engagement_type, matter_summary, timing,
          referral_source, cf_country, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(
        name,
        email,
        firm || null,
        engagementType,
        summary,
        timing || null,
        referral || null,
        country,
        userAgent,
      )
      .run()
  } catch (error) {
    // A litigator who has just typed a case summary should not lose it to a
    // generic failure page with no recourse, so the error names the fallback
    // address. Detail goes to the Worker log.
    console.error('[intake] insert failed', error)
    return redirectTo('/scope?error=server')
  }

  return redirectTo('/scope?sent=1')
}

export const GET: APIRoute = () => redirectTo('/scope')
