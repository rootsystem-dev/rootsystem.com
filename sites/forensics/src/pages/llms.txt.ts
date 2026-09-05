/**
 * /llms.txt — a plain-text map of the property for language models.
 *
 * Generated from the copy deck rather than written as a static file, for the
 * same reason `knowsAbout` is derived: a hand-kept second copy of the site's
 * structure goes stale the first time a route or a practice area changes, and
 * a stale map is worse than none.
 *
 * WHAT THIS IS AND IS NOT. llms.txt is an organizational convention, not a
 * ratified standard and not a proven ranking factor -- the tool that flagged
 * its absence says so in its own output. It is cheap, it is honest, and it puts
 * the property's own summary of itself somewhere a retrieval system can find
 * it in one request instead of eight. That is the whole claim.
 *
 * Every line here restates something already visible on the site. Nothing is
 * written for machines that a reader could not also read.
 */
import type { APIRoute } from 'astro'
import copy from '../copy/landing'

export const prerender = true

export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => new URL(path, site).href

  const body = [
    '# Root System Forensics',
    '',
    `> ${copy.meta.description}`,
    '',
    '## Pages',
    '',
    `- [Home](${url('/')}): the screening argument, practice areas and published rates.`,
    `- [Method](${url('/method/')}): ${copy.routes.method.description}`,
    `- [Matters](${url('/matters/')}): ${copy.routes.matters.description}`,
    `- [Engagements](${url('/engagements/')}): ${copy.routes.engagements.description}`,
    `- [The bench](${url('/experts/')}): ${copy.expertsPage.intro}`,
    ...copy.experts.map(
      (expert) =>
        `- [${expert.name}, ${expert.credential}](${url(`/experts/${expert.slug}/`)}): ${expert.summary}`,
    ),
    `- [Scope a case](${url('/scope/')}): the intake form. Conflicts are screened before anything else.`,
    '',
    '## Practice areas',
    '',
    ...copy.practiceAreas.areas.map((area) => `- ${area.name}: ${area.summary}`),
    '',
    '## Rates',
    '',
    // Published rates are a deliberate divergence from every close comparable,
    // so they belong in the summary a model reads rather than only in a page it
    // may not fetch.
    ...copy.pricing.tiers.map((tier) => `- ${tier.name}: ${tier.price}. ${tier.summary}`),
    '',
    '## Contact',
    '',
    `- ${copy.contact.email}`,
    `- ${copy.contact.responseTime}`,
    '',
    // `## Optional` is a defined section name in the llms.txt convention, not a
    // label of our choosing: it means "skip these if the context window is
    // short". Everything above is the practice; everything here is a companion
    // representation of it or a page that answers a question nobody screening
    // an expert asks first.
    '## Optional',
    '',
    `- [llms-full.txt](${url('/llms-full.txt')}): every page above expanded into one plain-text document. Read this instead of fetching the site.`,
    `- [AI summary](${url('/ai/summary.json')}): the same description, practice areas and rates as structured JSON.`,
    `- [AI FAQ](${url('/ai/faq.json')}): the questions on the engagements page as structured JSON.`,
    `- [AI usage policy](${url('/.well-known/ai.txt')}): what this property permits AI systems to do with it.`,
    `- [Privacy](${url('/privacy/')}): what is collected, how long it is kept, and how to have it deleted.`,
    '',
  ].join('\n')

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      // Same caching posture as the rest of the static property.
      'cache-control': 'public, max-age=3600',
    },
  })
}
