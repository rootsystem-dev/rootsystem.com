/**
 * Structured data for forensics.rootsystem.com, as one linked graph per page.
 *
 * WHY THIS REPLACED HOME-PAGE-ONLY MARKUP
 *
 * The original convention emitted `Organization` on the root and nothing
 * anywhere else, on the reasoning that Organization describes the property
 * rather than the page, so repeating it on five routes states one fact five
 * times. That reasoning is right about authorship and wrong about retrieval.
 *
 * A retrieval system parses each URL on its own. It does not carry the root
 * page's entity across to /method, and it has no mechanism to. A page with no
 * JSON-LD gives an answer engine nothing to attach the page's claims to, which
 * is why a GEO audit on 2026-09-04 scored schema at 2.25 out of 16 across the
 * property while every other measured category was healthy: six of eight routes
 * emitted no structured data at all.
 *
 * The fix is not to paste Organization onto every page. It is to emit a
 * `@graph` per page in which each node has a stable `@id`, so the same
 * Organization is one entity referenced from every route rather than eight
 * unrelated copies. That satisfies the original objection -- one fact, stated
 * once, addressed by identity -- while giving each page its own primary entity.
 *
 * WHAT EACH PAGE GETS
 *
 * Every page: a WebPage node, the WebSite it is part of, and the Organization
 * that publishes it, all cross-linked by `@id`.
 *
 * Pages that support more say more. `makesOffer` rides on the Organization only
 * where the rates are actually published, because markup that claims an offer
 * on a page that does not state one is the drift this file exists to prevent.
 * The same rule the copy deck follows: never state what the visible page does
 * not.
 */
import type { Landing } from '../copy/schema'

/** Stable node identities. Everything else in the graph points at these. */
export const ORGANIZATION_ID = 'https://forensics.rootsystem.com/#organization'
export const WEBSITE_ID = 'https://forensics.rootsystem.com/#website'

/** A `@id` reference to a node defined elsewhere in the same graph. */
const ref = (id: string) => ({ '@id': id })

interface OrganizationOptions {
  copy: Landing
  site: URL
  /**
   * Whether this page publishes the rate card. Only pages that show the tiers
   * carry `makesOffer` -- the root page and /engagements.
   */
  withOffers?: boolean
}

/**
 * The publishing entity.
 *
 * `knowsAbout` is still derived from the copy deck rather than written out
 * here, for the reason it always was: the practice areas and bench disciplines
 * already live in one place, and a second hand-kept list would drift from the
 * visible page the first time either is edited. This is the highest-value field
 * on the property for "[discipline] expert witness" queries.
 *
 * `@type: Organization` rather than ProfessionalService. ProfessionalService
 * inherits from LocalBusiness, which expects a postal address for rich results,
 * and this practice has no public one to give.
 *
 * Deliberately absent: `areaServed`. The copy nowhere states which
 * jurisdictions this practice takes, and inventing one in markup the page does
 * not support is precisely the failure this module guards against. It is a copy
 * decision first; the field follows it.
 */
export function organizationNode({ copy, site, withOffers = false }: OrganizationOptions) {
  const knowsAbout = [
    ...copy.practiceAreas.areas.map((area) => area.name),
    ...copy.bench.groups.flatMap((group) => group.disciplines),
  ]

  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'Root System Forensics',
    url: site.origin,
    logo: new URL('/images/favicon/light/apple-touch-icon.png', site).href,
    image: new URL('/images/forensics-card.png', site).href,
    description: copy.meta.description,
    email: copy.contact.email,
    parentOrganization: {
      '@type': 'Organization',
      name: 'Root System',
      url: 'https://rootsystem.com',
    },
    knowsAbout,
    /*
     * `sameAs` is the Knowledge Graph disambiguation signal -- the field that
     * lets a search engine resolve "Root System Forensics" to one entity rather
     * than guessing. It is emitted only when the deck carries URLs, because a
     * profile that does not exist is worse than a field that is absent.
     */
    ...(copy.organization.sameAs.length > 0 && { sameAs: copy.organization.sameAs }),
    ...(withOffers && {
      makesOffer: copy.pricing.tiers.map((tier) => ({
        '@type': 'Offer',
        name: tier.name,
        description: tier.summary,
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: tier.price,
          priceCurrency: 'USD',
        },
      })),
    }),
  }
}

/**
 * The site itself.
 *
 * No `potentialAction`/SearchAction: the property has no search endpoint, and
 * declaring one that 404s is a claim the site cannot honour. The GEO tool
 * suggests it generically; it is skipped on purpose.
 */
export function websiteNode({ copy, site }: { copy: Landing; site: URL }) {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'Root System Forensics',
    url: site.origin,
    description: copy.meta.description,
    inLanguage: 'en-US',
    publisher: ref(ORGANIZATION_ID),
  }
}

interface WebPageOptions {
  /** Canonical URL of this page. */
  url: URL
  /** The page's own title, without the brand suffix where one is added. */
  name: string
  description: string
  /**
   * ISO 8601, derived from git by scripts/content-modified.mjs. Omitted rather
   * than faked when the route has no recorded date -- an absent freshness
   * signal costs a few points; a wrong one costs credibility.
   */
  dateModified?: string
  /**
   * A more specific type than WebPage where one applies -- `ContactPage` for
   * the intake form, `AboutPage` for the bench, `CollectionPage` for an index.
   */
  type?: string
  /** `@id` of the node this page is primarily about, if not the Organization. */
  aboutId?: string
}

export function webPageNode({
  url,
  name,
  description,
  dateModified,
  type = 'WebPage',
  aboutId = ORGANIZATION_ID,
}: WebPageOptions) {
  return {
    '@type': type,
    '@id': `${url.href}#webpage`,
    url: url.href,
    name,
    description,
    inLanguage: 'en-US',
    isPartOf: ref(WEBSITE_ID),
    about: ref(aboutId),
    ...(dateModified && { dateModified }),
  }
}

/**
 * FAQ markup, built from the deck's existing questions.
 *
 * These are the questions the page already answers in visible text, which is
 * the condition Google states for FAQPage eligibility: the markup must not
 * introduce content a reader cannot see. Nothing here is invented for the
 * crawler.
 */
export function faqNode({ copy, url }: { copy: Landing; url: URL }) {
  return {
    '@type': 'FAQPage',
    '@id': `${url.href}#faq`,
    mainEntity: copy.faq.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  }
}

/**
 * Wraps nodes into the single script block a page emits.
 *
 * One graph rather than several separate `<script type="application/ld+json">`
 * tags: separate blocks cannot reference each other by `@id`, which is the
 * whole mechanism that keeps this from being eight copies of one organization.
 */
export function graph(nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes }
}
