/**
 * /ai/faq.json — the same questions the FAQ renders, in a machine-readable form.
 *
 * One source: `copy.faq` feeds the visible component on /engagements, the
 * FAQPage JSON-LD on that page, and this file. A question can only appear here
 * if a reader can also read it, which is both the Google eligibility condition
 * for FAQ markup and the honest position.
 */
import type { APIRoute } from 'astro'
import copy from '../../copy/landing'
import { lastModifiedFor } from '../../lib/modified'

export const prerender = true

export const GET: APIRoute = ({ site }) => {
  const payload = {
    name: 'Root System Forensics — frequently asked questions',
    url: new URL('/engagements/', site).href,
    dateModified: lastModifiedFor('/engagements/'),
    questions: copy.faq.map((entry) => ({
      question: entry.question,
      answer: entry.answer,
    })),
  }

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  })
}
