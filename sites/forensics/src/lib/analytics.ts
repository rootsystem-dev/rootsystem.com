/**
 * Product analytics for forensics.rootsystem.com.
 *
 * Loaded only when PUBLIC_POSTHOG_KEY is set, and only as a dynamic import, so
 * a build without the key ships no analytics bundle at all. See the script in
 * layouts/Layout.astro for the guard.
 *
 * Three constraints shaped the configuration, and each is a decision rather
 * than a default:
 *
 * 1. Session replay is off. /scope carries a 5,000-character textarea where an
 *    attorney describes a live matter, before any conflict check has run.
 *    Recording that keystroke by keystroke into a third-party system is not a
 *    risk this practice can carry, and a setting that must never be enabled is
 *    better stated in code than remembered in a dashboard.
 *
 * 2. Autocapture is off. Every event here is declared below, which means the
 *    collected set is auditable by reading this file. It also keeps element
 *    text and field names out of the payloads on the intake form.
 *
 * 3. Persistence is memory-only. No cookies, so no consent banner -- a consent
 *    wall on a page whose argument is "rule us out in ten minutes" costs more
 *    than the data is worth. The trade is real: a returning reader is a new
 *    reader here, so these numbers count visits, not people.
 *
 * The events exist to answer one question the ordinary metrics get backwards.
 * This page is built to disqualify: a partner who reads the published rates and
 * leaves has been served correctly. A bounce rate cannot tell that apart from a
 * reader who never engaged, which is why `rates_viewed` is here.
 */
import posthog from 'posthog-js'

/** Fired when a reader opens one of the root page's hub-to-spoke expansions. */
const EXPAND_SELECTOR = '.expand a'

/** The testimony-record link in the screening index. */
const CRITERION_SELECTOR = '.criteria a'

/** The rate card on /engagements. */
const RATES_SELECTOR = '.tiers'

export function startAnalytics(key: string, host: string) {
  posthog.init(key, {
    api_host: host,
    // See the header: none of these three are defaults worth inheriting.
    disable_session_recording: true,
    autocapture: false,
    persistence: 'memory',
    // Pageviews are still wanted; only the automatic element capture is not.
    capture_pageview: true,
  })

  const path = window.location.pathname

  // Delegated rather than bound per element: the listener is registered once
  // whatever the page contains, so a section added later needs no wiring here.
  document.addEventListener('click', (event) => {
    const target = event.target
    if (!(target instanceof Element)) return

    const expand = target.closest<HTMLAnchorElement>(EXPAND_SELECTOR)
    if (expand) {
      posthog.capture('expand_clicked', {
        from: path,
        to: expand.getAttribute('href'),
        // Which section the reader was in when they chose to go deeper. That is
        // the interesting half: it names the screening criterion they cared
        // about, which is a copy decision input rather than a vanity metric.
        section: expand.closest('section')?.id || null,
      })
      return
    }

    const criterion = target.closest<HTMLAnchorElement>(CRITERION_SELECTOR)
    if (criterion) {
      posthog.capture('criterion_link_clicked', {
        to: criterion.getAttribute('href'),
      })
    }
  })

  observeRates(path)
  observeScope(path)
}

/**
 * `rates_viewed` -- the disqualification marker.
 *
 * Fires once, when the rate card has actually been on screen, so that leaving
 * afterwards can be read as a reader who priced the practice and decided,
 * rather than as a reader who never got there. Nothing else on the property
 * distinguishes those two, and they mean opposite things.
 */
function observeRates(path: string) {
  const rates = document.querySelector(RATES_SELECTOR)
  if (!rates) return

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        posthog.capture('rates_viewed', { path })
        // Once per page load. A reader scrolling back up has not priced the
        // practice a second time.
        observer.disconnect()
      }
    },
    // Half the card, so a rate card clipped at the bottom of the viewport on
    // the way past does not count as having been read.
    { threshold: 0.5 },
  )

  observer.observe(rates)
}

/**
 * Intake funnel. Two events, neither carrying anything the reader typed.
 *
 * `scope_submitted` is a signal, not a record: the submission itself lands in
 * D1, which stays the source of truth for what was actually sent. This only
 * says that a submit happened, so the gap between started and submitted can be
 * read as the form's own friction.
 */
function observeScope(path: string) {
  const form = document.querySelector<HTMLFormElement>('form[action="/api/intake"]')
  if (!form) return

  let started = false
  form.addEventListener(
    'input',
    () => {
      if (started) return
      started = true
      posthog.capture('scope_started', { path })
    },
    { once: false },
  )

  form.addEventListener('submit', () => {
    posthog.capture('scope_submitted', { path })
  })
}
