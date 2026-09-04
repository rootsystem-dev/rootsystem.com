/**
 * /ai/summary.json — a machine-readable precis of the practice.
 *
 * Like /llms.txt this is a convention rather than a standard, and it is
 * generated from the copy deck for the same reason: a second hand-kept
 * description of the practice would drift from the visible page.
 *
 * `jurisdictions` is deliberately absent. The property nowhere states which
 * jurisdictions this practice takes, and a field invented here would be the
 * first place the site claimed one. When that copy decision is made, this file
 * and the Organization `areaServed` follow it -- not the other way round.
 */
import type { APIRoute } from 'astro'
import copy from '../../copy/landing'
import { lastModifiedFor } from '../../lib/modified'

export const prerender = true

export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => new URL(path, site).href

  const summary = {
    name: 'Root System Forensics',
    url: url('/'),
    description: copy.meta.description,
    parentOrganization: { name: 'Root System', url: 'https://rootsystem.com' },
    practiceAreas: copy.practiceAreas.areas.map((area) => ({
      name: area.name,
      summary: area.summary,
    })),
    // The disciplines the bench covers, which is a different claim from the
    // kinds of dispute taken above and is worth keeping distinct.
    disciplines: copy.bench.groups.flatMap((group) => group.disciplines),
    engagementTypes: copy.services.modes.map((mode) => ({
      name: mode.title,
      summary: mode.summary,
    })),
    rates: copy.pricing.tiers.map((tier) => ({
      name: tier.name,
      price: tier.price,
      summary: tier.summary,
    })),
    experts: copy.experts.map((expert) => ({
      name: expert.name,
      credential: expert.credential,
      role: expert.role,
      url: url(`/experts/${expert.slug}/`),
    })),
    contact: {
      email: copy.contact.email,
      responseTime: copy.contact.responseTime,
      intake: url('/scope/'),
    },
    dateModified: lastModifiedFor('/'),
  }

  return new Response(JSON.stringify(summary, null, 2), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  })
}
