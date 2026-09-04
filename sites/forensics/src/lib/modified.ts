/**
 * Resolves a route to the date its content last changed.
 *
 * The dates themselves are derived from git by scripts/content-modified.mjs,
 * which runs before every build and dev server -- see that file for why the
 * date comes from history rather than from a hand-kept field.
 *
 * This module exists to keep two pieces of awkwardness out of the layout: the
 * generated file may be absent, and Astro's pathnames are not consistently
 * shaped.
 */
import generated from '../generated/content-modified.json'

/**
 * Trailing slashes are not consistent across this site's routes -- the
 * canonical for /experts carries one and the canonical for /scope does not --
 * so every lookup is normalized to a leading and trailing slash before it is
 * compared. The root stays a single slash.
 */
function normalize(pathname: string): string {
  if (pathname === '/' || pathname === '') return '/'
  const withLeading = pathname.startsWith('/') ? pathname : `/${pathname}`
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`
}

/**
 * The ISO 8601 date a route's content last changed, or undefined.
 *
 * Undefined rather than a fallback date on purpose. An absent `dateModified`
 * costs a small freshness signal; a date that nothing supports is a claim the
 * property cannot back, and this codebase does not make those.
 *
 * Expert profiles are generated from one page file, so every profile shares the
 * `/experts/[slug]/` entry rather than having a route of its own. That is
 * accurate today because all profiles are written from the same copy deck; if
 * profiles ever move to per-person files, this is the line that has to change.
 */
export function lastModifiedFor(pathname: string): string | undefined {
  const routes: Record<string, string> = generated.routes
  const path = normalize(pathname)

  if (routes[path]) return routes[path]

  const isExpertProfile = path.startsWith('/experts/') && path !== '/experts/'
  if (isExpertProfile) return routes['/experts/[slug]/']

  return undefined
}
