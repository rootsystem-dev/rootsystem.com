/**
 * /llms-full.txt — the whole property as one plain-text document.
 *
 * WHAT THIS IS FOR. `/llms.txt` is a map: a model reads it to learn what exists
 * and where. This is the territory: the same content expanded, so a retrieval
 * system that wants the substance can take it in one request instead of
 * fetching eight HTML pages and stripping markup from each. The convention
 * pairs the two files, and an audit that finds the map without the territory
 * marks the pair incomplete.
 *
 * SAME DERIVATION RULE AS EVERYTHING ELSE HERE. Every line is read out of the
 * copy deck. Nothing is written for machines that is not already on a page a
 * person can read, and there is no second hand-kept copy of the words to drift
 * from the first. That constraint is what makes this file safe to ship: it
 * cannot make a claim the site does not make, because it has no content of its
 * own.
 *
 * WHAT IS DELIBERATELY NOT HERE. The privacy policy is linked, not inlined --
 * it is long, it is shared with sites/www, and a model summarizing a legal
 * commitment out of a flattened copy of it is a worse outcome than sending the
 * reader to the authoritative page. Same reasoning for the intake form: a form
 * is an action, not a document.
 *
 * ORDER MATTERS. The screening argument comes first because it is the thing a
 * retaining attorney is actually evaluating, and a model that truncates this
 * file will truncate the end of it.
 */
import type { APIRoute } from 'astro'
import copy from '../copy/landing'

export const prerender = true

/** A blank line between blocks, so the output reads as prose rather than data. */
const para = (...lines: string[]) => lines.join('\n')

export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => new URL(path, site).href

  const sections: string[] = [
    '# Root System Forensics',
    '',
    `> ${copy.meta.description}`,
    '',
    `Canonical site: ${url('/')}`,
    `Map of this document: ${url('/llms.txt')}`,
    '',

    '## What we are',
    '',
    copy.hero.headline,
    '',
    copy.hero.subhead,
    '',

    // The screening criteria are the spine of the property: the four things
    // counsel checks before anything else. They lead here for the same reason
    // they lead on the page.
    `## ${copy.positioning.heading}`,
    '',
    copy.positioning.lead,
    '',
    // One criterion carries a link, and its `where` text is written to run into
    // it ("Not buried:"). Dropping the link would leave that line hanging on a
    // colon, so the href is resolved and appended -- the plain-text equivalent
    // of the anchor the page renders.
    ...copy.positioning.criteria.map((criterion) =>
      criterion.link
        ? `- ${criterion.name}: ${criterion.where} ${criterion.link.text} — ${url(criterion.link.href)}`
        : `- ${criterion.name}: ${criterion.where}`,
    ),
    '',
    ...copy.positioning.body,
    '',

    `## ${copy.practiceAreas.heading}`,
    '',
    copy.practiceAreas.intro,
    '',
    ...copy.practiceAreas.areas.flatMap((area) => [
      `### ${area.name}`,
      '',
      area.body,
      '',
      'Examples of matters:',
      ...area.examples.map((example) => `- ${example}`),
      '',
    ]),

    `## ${copy.pillarsHeading}`,
    '',
    ...copy.pillars.flatMap((pillar) => [`### ${pillar.title}`, '', pillar.body, '']),

    `## ${copy.process.heading}`,
    '',
    ...copy.process.steps.flatMap((step) => [`### ${step.name}`, '', step.body, '']),

    `## ${copy.services.heading}`,
    '',
    copy.services.intro,
    '',
    ...copy.services.modes.flatMap((mode) => [`### ${mode.title}`, '', mode.body, '']),

    '## Rates',
    '',
    // Published rates are the property's sharpest divergence from every close
    // comparable. A model that reads this file and cannot state the price has
    // missed the point of it.
    ...copy.pricing.tiers.flatMap((tier) => [
      `### ${tier.name} — ${tier.price}`,
      '',
      tier.body,
      '',
    ]),

    `## ${copy.bench.heading}`,
    '',
    copy.bench.intro,
    '',
    ...copy.bench.groups.map(
      (group) => `- ${group.name}: ${group.disciplines.join(', ')}`,
    ),
    '',
    copy.bench.provenance,
    '',
    copy.bench.staffing,
    '',

    '## Where we fit against the alternatives',
    '',
    ...copy.contrast.rows.map((row) =>
      para(
        `### ${row.who}${row.isUs ? ' (this practice)' : ''}`,
        '',
        `Strength: ${row.strength}`,
        `Gap: ${row.gap}`,
        '',
      ),
    ),

    '## A matter, in full',
    '',
    copy.caseStudy.headline,
    '',
    ...copy.caseStudy.body,
    '',
    `"${copy.caseStudy.pullQuote}"`,
    '',

    `## ${copy.expertsPage.heading}`,
    '',
    copy.expertsPage.intro,
    '',
    ...copy.experts.flatMap((expert) => [
      `### ${expert.name}, ${expert.credential} — ${expert.role}`,
      '',
      expert.summary,
      '',
      `Profile: ${url(`/experts/${expert.slug}/`)}`,
      ...(expert.education.length
        ? [
            '',
            'Education:',
            ...expert.education.map((entry) => `- ${entry.institution}: ${entry.detail}`),
          ]
        : []),
      ...(expert.affiliations.length
        ? ['', 'Affiliations:', ...expert.affiliations.map((entry) => `- ${entry}`)]
        : []),
      ...(expert.publications.length
        ? [
            '',
            'Publications:',
            ...expert.publications.map(
              (publication) =>
                `- ${publication.title}. ${publication.where}. ${publication.note}`,
            ),
          ]
        : []),
      ...(expert.sameAs.length
        ? ['', 'Also listed at:', ...expert.sameAs.map((profile) => `- ${profile}`)]
        : []),
      '',
    ]),

    '## Frequently asked',
    '',
    ...copy.faq.flatMap((entry) => [`### ${entry.question}`, '', entry.answer, '']),

    '## Contact',
    '',
    `- ${copy.contact.email}`,
    `- ${copy.contact.responseTime}`,
    `- Scope a case: ${url('/scope/')} — conflicts are screened before anything else.`,
    `- Privacy policy: ${url('/privacy/')}`,
    '',
  ]

  return new Response(sections.join('\n'), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  })
}
