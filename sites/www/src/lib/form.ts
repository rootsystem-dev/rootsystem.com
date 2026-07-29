/**
 * Shared helpers for the form endpoints.
 *
 * Duplicated in sites/forensics rather than extracted to a package: the two
 * copies are ~50 lines and the sites have no shared package yet. If a third
 * consumer appears, extract it then.
 */

/**
 * Maximum accepted length per field, applied by truncation rather than
 * rejection. A submitter who pastes something enormous gets their enquiry
 * stored and trimmed rather than an error they cannot act on; the cap exists to
 * bound what a single request can write, not to police input.
 */
export const LIMITS = {
  name: 120,
  email: 254, // RFC 5321 maximum
  firm: 200,
  message: 5000,
  summary: 5000,
  short: 300,
} as const

/** Read a trimmed, length-capped string from FormData. */
export function field(form: FormData, key: string, max: number): string {
  const value = form.get(key)
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

/**
 * Deliberately permissive email check. A strict RFC 5322 pattern rejects
 * addresses that are genuinely valid, and the only real validation is whether
 * mail delivers. This catches typos and obvious junk, nothing more.
 */
export function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
}

/**
 * Bots fill every field they find, including ones positioned off-screen. A
 * filled honeypot means the submission is discarded -- but the response is the
 * same success redirect a human gets, so the bot learns nothing and does not
 * retry with the field left blank.
 */
export function isBot(form: FormData): boolean {
  return field(form, 'website', 100) !== ''
}

/** Request metadata, for telling real enquiries from noise. */
export function requestContext(request: Request): {
  country: string | null
  userAgent: string | null
} {
  return {
    country: request.headers.get('cf-ipcountry'),
    userAgent: request.headers.get('user-agent')?.slice(0, 500) ?? null,
  }
}

/** See-other redirect, so a refresh after submitting does not resubmit. */
export function redirectTo(path: string): Response {
  return new Response(null, { status: 303, headers: { Location: path } })
}
