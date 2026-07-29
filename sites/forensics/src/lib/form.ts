/**
 * Shared helpers for the case-intake endpoint.
 *
 * Duplicated from sites/www rather than extracted to a package: ~50 lines, and
 * the sites share no package yet. Extract if a third consumer appears.
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
 * Bots fill every field they find. A filled honeypot discards the submission,
 * but the response matches what a person gets, so the bot learns nothing.
 */
export function isBot(form: FormData): boolean {
  return field(form, 'website', 100) !== ''
}

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
