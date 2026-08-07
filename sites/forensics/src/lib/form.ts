/**
 * Shared helpers for the case-intake endpoint.
 *
 * Duplicated from sites/www rather than extracted to a package: the sites share
 * no package yet. Extract if a third consumer appears. The Turnstile helpers
 * below have roughly tripled the size of the duplicated part, so that threshold
 * is closer than it was.
 */

export const LIMITS = {
  name: 120,
  email: 254, // RFC 5321 maximum
  firm: 200,
  summary: 5000,
  short: 300,
} as const

/** Read a trimmed, length-capped string from FormData. */
export function field(form: FormData, key: string, max: number): string {
  const value = form.get(key)
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

/**
 * Deliberately permissive. A strict RFC 5322 pattern rejects genuinely valid
 * addresses, and the only real validation is whether mail delivers.
 */
export function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
}

/**
 * Bots fill every field they find, including ones positioned off-screen. The
 * value is returned rather than a boolean because it is worth recording: seeing
 * what is being written into the decoy is how you tell one scraper from
 * another. Empty string means the field was left alone, which is what a person
 * does.
 *
 * The submission is still stored when this is non-empty; only the notification
 * is withheld. The response remains the same success redirect a person gets, so
 * the bot learns nothing and does not retry with the field left blank.
 */
export function honeypotValue(form: FormData): string {
  return field(form, 'website', 100)
}

/** The input the Turnstile widget injects into the form it wraps. */
export const TURNSTILE_FIELD = 'cf-turnstile-response'

/**
 * Outcome of a Turnstile check.
 *
 * `unavailable` is deliberately not folded into `fail`. A failed verification is
 * a judgment about the submitter; an unreachable siteverify is a fact about our
 * own infrastructure. Treating the second as spam would mean a Cloudflare
 * incident silently converts every genuine enquiry into a held row that nobody
 * is notified about -- the failure nobody notices, which is exactly the risk
 * this endpoint already tries to avoid elsewhere.
 */
export type TurnstileOutcome =
  | { result: 'pass' }
  | { result: 'fail'; detail: string }
  | { result: 'unavailable'; detail: string }

/**
 * Validate a Turnstile token server-side.
 *
 * The token is single-use and expires after 300 seconds, so a replay or a stale
 * form both come back as a failure that has nothing to do with the submitter.
 * `idempotency_key` makes the call itself safe to retry.
 */
export async function verifyTurnstile(
  token: string,
  secret: string,
  remoteIp: string | null,
): Promise<TurnstileOutcome> {
  const body = new FormData()
  body.append('secret', secret)
  body.append('response', token)
  if (remoteIp) body.append('remoteip', remoteIp)
  body.append('idempotency_key', crypto.randomUUID())

  let payload: { success?: boolean; 'error-codes'?: string[] }
  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      { method: 'POST', body },
    )
    if (!response.ok) {
      return { result: 'unavailable', detail: `siteverify HTTP ${response.status}` }
    }
    payload = await response.json()
  } catch (error) {
    return { result: 'unavailable', detail: `siteverify unreachable: ${error}` }
  }

  if (payload.success) return { result: 'pass' }

  const codes = payload['error-codes'] ?? []
  return { result: 'fail', detail: codes.join(',') || 'no error code returned' }
}

/**
 * A submission's spam verdict, as stored.
 *
 * `reason` is the categorical column: null means clean, otherwise a
 * comma-joined list, because a request can trip more than one check at once.
 * `detail` is free text and can be present on a clean verdict -- that is how an
 * unscreened submission during a siteverify outage is distinguishable later
 * from one that genuinely passed.
 */
export type SpamVerdict = { reason: string | null; detail: string | null }

export function spamVerdict(
  honeypot: string,
  turnstile: TurnstileOutcome,
): SpamVerdict {
  const reasons: string[] = []
  const details: string[] = []

  if (honeypot) {
    reasons.push('honeypot')
    details.push(`honeypot: ${honeypot}`)
  }

  if (turnstile.result === 'fail') {
    reasons.push('turnstile')
    details.push(`turnstile: ${turnstile.detail}`)
  } else if (turnstile.result === 'unavailable') {
    // No reason recorded -- see TurnstileOutcome. The detail is kept so the row
    // is not mistaken later for one that passed a check it never received.
    details.push(`turnstile ${turnstile.detail}`)
  }

  return {
    reason: reasons.length ? reasons.join(',') : null,
    detail: details.length ? details.join(' | ').slice(0, 500) : null,
  }
}

/**
 * Request metadata, for telling real enquiries from noise.
 *
 * `clientIp` is passed to Turnstile but deliberately not stored -- it is a
 * stronger identifier than anything else here, and the verification call is the
 * only thing that needs it.
 */
export function requestContext(request: Request): {
  country: string | null
  userAgent: string | null
  clientIp: string | null
} {
  return {
    country: request.headers.get('cf-ipcountry'),
    userAgent: request.headers.get('user-agent')?.slice(0, 500) ?? null,
    clientIp: request.headers.get('cf-connecting-ip'),
  }
}

/** See-other redirect, so a refresh after submitting does not resubmit. */
export function redirectTo(path: string): Response {
  return new Response(null, { status: 303, headers: { Location: path } })
}

/**
 * The four service modes from offering-scope.md, plus an escape hatch. Kept in
 * one place so the form options and the endpoint's validation cannot diverge --
 * a mismatch would silently drop a legitimate selection.
 */
export const ENGAGEMENT_TYPES = [
  { value: 'rebuttal', label: 'Opposing-expert rebuttal' },
  { value: 'affirmative', label: 'Affirmative analysis & testimony' },
  { value: 'consulting', label: 'Consulting (non-testifying)' },
  { value: 'assessment', label: 'Early-case assessment' },
  { value: 'unsure', label: 'Not sure yet' },
] as const

export function isEngagementType(value: string): boolean {
  return ENGAGEMENT_TYPES.some((option) => option.value === value)
}
