/**
 * Derives a `dateModified` per route from git history, before the Astro build.
 *
 * Why git rather than a hand-kept date: a date written by hand is a claim
 * nobody verifies, and the first time it goes stale it is worse than absent --
 * answer engines weight freshness, and a page that says it was updated last
 * week when it was not is the kind of small untruth this property avoids
 * everywhere else. Git already records when a page's inputs changed, so the
 * date cannot drift from the work.
 *
 * ASSUMPTION, stated because it is the weak point: a route's inputs are its
 * page file plus the copy deck it renders. The deck is one file for the whole
 * property, so a copy edit to any section moves the date on every route that
 * reads the deck. That is coarse but not false -- schema.org defines
 * dateModified as when the work was most recently modified, and a change to a
 * page's source inputs is a modification of that page whether or not the
 * visible bytes moved. It errs toward "something that feeds this page changed",
 * never toward a date nothing supports.
 *
 * The output is generated, gitignored, and rewritten on every build. It is
 * imported as plain JSON so nothing in the page pipeline shells out to git at
 * render time.
 *
 * FALLBACK BEHAVIOUR MATTERS IN CI. `actions/checkout` clones shallow by
 * default, and `git log` on a shallow clone reports the shallow boundary rather
 * than the real last-touch commit. The deploy workflow sets `fetch-depth: 0`
 * for that reason. If git is unavailable or a path has no history at all, the
 * route falls back to the HEAD commit date, and finally to the build time --
 * a build never fails over this, it just gets less precise.
 */
import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const siteRoot = resolve(here, '..')
const repoRoot = resolve(siteRoot, '../..')
const outputPath = resolve(siteRoot, 'src/generated/content-modified.json')

/**
 * Routes and the source paths that determine their content.
 *
 * Paths are repo-relative because that is what `git log` wants. Every route
 * includes the copy deck: the deck is where the words live, and a route whose
 * words changed has been modified regardless of whether its .astro file did.
 */
const COPY_DECK = 'sites/forensics/src/copy/landing.ts'

const ROUTES = {
  '/': ['sites/forensics/src/pages/index.astro', COPY_DECK],
  '/method/': ['sites/forensics/src/pages/method.astro', COPY_DECK],
  '/matters/': ['sites/forensics/src/pages/matters.astro', COPY_DECK],
  '/engagements/': ['sites/forensics/src/pages/engagements.astro', COPY_DECK],
  '/experts/': ['sites/forensics/src/pages/experts/index.astro', COPY_DECK],
  '/experts/[slug]/': ['sites/forensics/src/pages/experts/[slug].astro', COPY_DECK],
  '/scope/': ['sites/forensics/src/pages/scope.astro', COPY_DECK],
  // The privacy policy is shared with sites/www and lives outside this site.
  '/privacy/': ['sites/forensics/src/pages/privacy.astro', 'legal/privacy-policy.ts'],
}

/** Runs git and returns trimmed stdout, or null if git is unusable here. */
function git(args) {
  try {
    return execFileSync('git', args, {
      cwd: repoRoot,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
  } catch {
    return null
  }
}

/**
 * The most recent commit date across a set of paths, as an ISO 8601 string.
 *
 * `--` separates paths from revisions so a path that looks like a ref cannot be
 * misread. `%cI` is the committer date in strict ISO 8601, which is what
 * schema.org wants and what answer engines parse without guessing a timezone.
 */
function lastModified(paths) {
  const result = git(['log', '-1', '--format=%cI', '--', ...paths])
  return result || null
}

const headDate = git(['log', '-1', '--format=%cI']) || new Date().toISOString()

const modified = Object.fromEntries(
  Object.entries(ROUTES).map(([route, paths]) => [
    route,
    lastModified(paths) || headDate,
  ]),
)

// `generatedAt` is recorded for debugging a stale build, not for publication --
// nothing renders it. Publishing a build timestamp as dateModified is exactly
// the untruth this file exists to prevent.
const payload = { generatedAt: new Date().toISOString(), routes: modified }

mkdirSync(dirname(outputPath), { recursive: true })
writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`)

console.log(
  `content-modified: wrote ${Object.keys(modified).length} route dates ` +
    `(head ${headDate})`,
)
