import { z } from 'astro/zod'

/**
 * Schema for the forensics landing copy.
 *
 * Copy lives as structured, validated data rather than inline markup for one
 * reason: landing-copy.md states that the hero, proof, and closing lines are
 * scaffolding pending a rewrite in Rob's voice, and that the rewrite gates
 * publication. Keeping copy as data makes that rewrite a content edit, and
 * makes the gate mechanically enforceable rather than a thing to remember.
 */

/**
 * A block of copy that has not yet been rewritten in Rob's voice.
 *
 * `draft: true` means the text is scaffolding. Drafts render with a visible
 * banner during development and FAIL a production build -- see assertPublishable.
 */
export const draftable = <T extends z.ZodRawShape>(shape: T) =>
  z.object({ draft: z.boolean().default(false), ...shape })

export const landingSchema = z.object({
  meta: z.object({
    title: z.string(),
    description: z.string(),
  }),

  // Per-route metadata. Distinct titles are the whole search argument for the
  // hub-and-spoke structure, so they are validated rather than left optional.
  // `title` is the <title> tag and carries the brand suffix; `heading` is the
  // on-page <h1>, which every spoke needs for its document outline and which
  // a page composed only of section components would otherwise lack.
  routes: z.object({
    method: z.object({ title: z.string(), heading: z.string(), description: z.string() }),
    matters: z.object({ title: z.string(), heading: z.string(), description: z.string() }),
    engagements: z.object({ title: z.string(), heading: z.string(), description: z.string() }),
  }),

  hero: draftable({
    eyebrow: z.string(),
    headline: z.string(),
    subhead: z.string(),
    // The "query motif" proof block -- a concrete finding, stated plainly.
    //
    // Structured rather than one string as of variant E (2026-08-22). The block
    // was always four moves -- the claim, the test, the result, the concession
    // -- run together in prose, which left the reader to find the shape. Naming
    // each step is the same argument the property makes everywhere else: state
    // the method, then the finding. `label` is deliberately short; the markup
    // sets it in caps, so writing it capitalised here would double up.
    //
    // Minimum of two steps rather than one: a proof block with a single row is
    // a sentence in a box, which is the thing this change exists to stop.
    proof: z
      .array(z.object({ label: z.string(), text: z.string() }))
      .min(2),
    cta: z.string(),
  }),

  // The positioning block.
  //
  // Restructured for variant E (2026-08-22) from a single paragraph into a lead
  // line, the five screening criteria as an index, and the closing prose. The
  // paragraph form buried the criteria mid-sentence, where a scanning reader
  // never found the one that mattered to them.
  //
  // `where` answers "where on this page is that answered" rather than restating
  // the claim -- the block is a table of contents for the vetting argument, not
  // a second version of it. The list is not fixed at five: the criteria come
  // from what comparable practices publish, and that set can move.
  //
  // `label` and `heading` were added 2026-08-26. The block opened straight on
  // `lead`, so the section started with no eyebrow and no heading while every
  // section around it had both. The eyebrow also closes a count the page opens
  // elsewhere: the practice areas are labelled "the first criterion" and
  // nothing until here says how many there are or resolves the set.
  positioning: z.object({
    label: z.string(),
    heading: z.string(),
    lead: z.string(),
    // `link` is optional and only one row carries it. Four criteria are
    // answered on this page and point at a section of it; the testimony record
    // is answered on the fees page, and a row that says so without a way to get
    // there sends the reader most likely to care about it off hunting.
    criteria: z
      .array(
        z.object({
          name: z.string(),
          where: z.string(),
          link: z.object({ text: z.string(), href: z.string() }).optional(),
        }),
      )
      .min(1),
    body: z.array(z.string()).min(1),
  }),

  // The practice areas -- the kinds of matter this practice takes.
  //
  // Added 2026-08-11 after a paralegal reviewing the site read an AI/ML-only
  // hero as an AI/ML-only practice and flagged the matters it would turn away.
  // AI/ML is one area among four rather than the whole category claim; the
  // ordering of the array is the emphasis, so a variant re-ranks by reordering
  // rather than by editing prose.
  //
  // `summary` is the root page's one-clause form and `body` the spoke's long
  // form, the same adjacency rule the pillars and modes follow. `examples` are
  // matter types, not claims of matters handled -- keep them generic.
  practiceAreas: z.object({
    label: z.string(),
    heading: z.string(),
    intro: z.string(),
    areas: z
      .array(
        z.object({
          name: z.string(),
          summary: z.string(),
          body: z.string(),
          examples: z.array(z.string()).min(1),
        }),
      )
      .min(3),
  }),

  // The heading above the pillars. Optional with the long-standing default, so
  // a positioning variant can reframe what the five pillars are answering
  // without a schema change and without touching the variants that don't.
  // Added 2026-08-19 for the vetting-first variant, which needs this section to
  // read as the answer to a screening checklist rather than as a method claim.
  pillarsHeading: z.string().default('How the work holds up'),

  // The five pillars. Each was earned in a real matter; the copy deck is
  // explicit that these are not aspirational claims.
  //
  // `summary` is the root page's short form and `body` the spoke's long form.
  // Both are required and live on the same object so drift between them is
  // visible on adjacent lines rather than across two files.
  pillars: z
    .array(
      z.object({
        title: z.string(),
        summary: z.string(),
        body: z.string(),
      }),
    )
    .length(5),

  caseStudy: z.object({
    label: z.string(),
    headline: z.string(),
    // Root's short form. The full `body` paragraphs render on /matters.
    summary: z.string(),
    body: z.array(z.string()).min(1),
    pullQuote: z.string(),
  }),

  // The bench. Half the argument for this practice is that a dispute over what
  // a system did crosses discipline boundaries, and a solo expert covers one of
  // them. `groups` is validated as a list rather than fixed at two so a third
  // discipline group does not require a schema change.
  bench: z.object({
    label: z.string(),
    heading: z.string(),
    intro: z.string(),
    groups: z
      .array(
        z.object({
          name: z.string(),
          disciplines: z.array(z.string()).min(1),
        }),
      )
      .min(1),
    provenance: z.string(),
    staffing: z.string(),
  }),

  // The engagement modes.
  //
  // `heading` was added 2026-08-26. Root rendered `intro` through the section's
  // h2, which put a two-sentence body line at display size; the section now
  // carries the same label/heading/intro triple the practice areas do, and
  // `intro` is back to being a paragraph.
  services: z.object({
    label: z.string(),
    heading: z.string(),
    intro: z.string(),
    // `summary` is the root page's one-clause form, `body` the spoke's. Same
    // adjacency rule as the pillars: both live on one object so drift shows up
    // on neighbouring lines. Root rendered bare titles before this field
    // existed, which told a referral reader who never clicks nothing at all.
    modes: z
      .array(
        z.object({ title: z.string(), summary: z.string(), body: z.string() }),
      )
      .length(4),
  }),

  pricing: z.object({
    label: z.string(),
    // `summary` carries the one line about each tier that root cannot afford to
    // drop -- for the assessment that is the credit against a full engagement,
    // which is the strongest risk reversal on the property and was previously
    // absent from the page most readers never leave.
    tiers: z.array(
      z.object({
        name: z.string(),
        price: z.string(),
        summary: z.string(),
        body: z.string(),
      }),
    ),
    // The rate modifiers, published rather than described. "Billed at a
    // premium" was the vaguest sentence on the property, sitting inside the one
    // block whose differentiator is that the rates are public at all. Applies
    // to the hours each covers, not to the whole engagement.
    modifiers: z.object({
      intro: z.string(),
      rows: z
        .array(
          z.object({
            when: z.string(),
            adjustment: z.string(),
            rate: z.string(),
          }),
        )
        .min(1),
      note: z.string(),
    }),
  }),

  // How an engagement starts. The conflict screen is the first step and is
  // stated in public rather than left to the post-submission fine print:
  // Root System also builds AI systems for clients, and counsel evaluating an
  // unfamiliar expert is entitled to see how that is handled before typing a
  // matter into a form.
  process: z.object({
    label: z.string(),
    heading: z.string(),
    steps: z
      .array(z.object({ name: z.string(), body: z.string() }))
      .min(1),
  }),

  contrast: z.object({
    label: z.string(),
    rows: z.array(
      z.object({
        who: z.string(),
        strength: z.string(),
        gap: z.string(),
        isUs: z.boolean().default(false),
      }),
    ),
  }),

  faq: z.array(z.object({ question: z.string(), answer: z.string() })),

  closing: draftable({
    headline: z.string(),
    body: z.string(),
    button: z.string(),
  }),

  // The expert profiles.
  //
  // Added 2026-08-26 after an attorney reviewing the property said the
  // credentials mattered most and could not find them: the bench block lists
  // disciplines rather than people, deliberately, and no page named anyone.
  // The comment in Bench.astro anticipated this -- individual profiles were
  // "the later move if a niche justifies them" -- and a retaining attorney
  // asking for them is that justification.
  //
  // An array with one entry rather than a single object, because the practice
  // is a bench and the positioning depends on it. A structure that can only
  // hold one person would quietly argue the opposite of what the bench block
  // says, and adding the second profile has to be copy rather than a rewrite.
  //
  // `entries` inside a section are strings rather than a richer shape on
  // purpose: a career is prose here, not a table of dates. The dates that
  // matter are in the prose where they can be qualified, because "founded in
  // 2017, incorporated in 2018" is the kind of precision a CV column cannot
  // carry and a cross-examination will ask for.
  experts: z
    .array(
      z.object({
        slug: z.string(),
        name: z.string(),
        // Post-nominal or degree abbreviation. Shown beside the name.
        credential: z.string(),
        role: z.string(),
        // One sentence, used on the index and as the page description.
        summary: z.string(),
        lede: z.array(z.string()).min(1),
        sections: z
          .array(
            z.object({
              heading: z.string(),
              body: z.array(z.string()).min(1),
            }),
          )
          .min(1),
        // Split rather than one string: `alumniOf` in the Person markup has
        // to name the institution alone, and "BSEE, Clarkson University, 2001"
        // is not the name of an organization.
        education: z
          .array(z.object({ institution: z.string(), detail: z.string() }))
          .min(1),
        affiliations: z.array(z.string()),
        publications: z.array(
          z.object({ title: z.string(), where: z.string(), note: z.string() }),
        ),
        // Canonical profiles for this person elsewhere -- LinkedIn, ORCID,
        // Google Scholar, a licensing board's public lookup. Feeds `sameAs` in
        // the Person markup, which is how a search engine resolves a name to
        // one person rather than to everyone who shares it. For an expert
        // witness that disambiguation is also a vetting convenience: counsel
        // searching the name should land on the record, not on a namesake.
        //
        // Empty by default and emitted only when populated. Nothing goes in
        // here that the practice does not control and cannot verify.
        sameAs: z.array(z.url()).default([]),
      }),
    )
    .min(1),

  expertsPage: z.object({
    label: z.string(),
    heading: z.string(),
    intro: z.string(),
  }),

  // The 404 page. In the deck rather than inline in the page component,
  // because every other string a reader can see is, and a page reached by a
  // stale link is one of the few where the wording is doing real work: the
  // reader arrived from someone else's citation and has to decide whether this
  // practice still exists.
  notFound: z.object({
    title: z.string(),
    heading: z.string(),
    body: z.string(),
  }),

  contact: z.object({
    // z.email() rather than the deprecated z.string().email() chain.
    email: z.email(),
    footer: z.string(),
    responseTime: z.string(),
  }),

  // Entity identity, for structured data only -- nothing here renders as copy.
  //
  // `sameAs` is the Knowledge Graph disambiguation signal: the list of other
  // canonical URLs that are demonstrably the same entity, which is what lets a
  // search engine resolve this practice to one thing instead of guessing. A GEO
  // audit on 2026-09-04 scored Social Trust 0/5 and Academic Trust 0/5 on the
  // absence of it, and it is the cheapest E-E-A-T signal available.
  //
  // Defaults to empty and is emitted only when populated. Every URL here must
  // be a profile that exists and is controlled by the practice -- a `sameAs`
  // pointing at a page that is not the same entity is worse than none, because
  // it merges two entities in the index.
  organization: z
    .object({
      sameAs: z.array(z.url()).default([]),
    })
    .default({ sameAs: [] }),
})

export type Landing = z.infer<typeof landingSchema>

/**
 * The publish gate.
 *
 * Production builds fail if any draftable block is still marked draft. A
 * warning would be ignored, and the failure being prevented -- placeholder copy
 * shipped to a litigator audience -- is considerably worse than a blocked
 * deploy. See spec section 5.
 *
 * `import.meta.env.PROD` is true for any `astro build`, which includes preview
 * deployments. That is deliberate: draft copy should not reach a public preview
 * URL either. Use `astro dev` to see drafts.
 */
export function assertPublishable(copy: Landing): void {
  if (!import.meta.env.PROD) return

  const drafts = (['hero', 'closing'] as const).filter(
    (key) => copy[key].draft,
  )

  if (drafts.length > 0) {
    throw new Error(
      [
        `Refusing to build forensics for production: ${drafts.length} copy block(s) still marked draft.`,
        ...drafts.map((key) => `  - ${key}`),
        '',
        'These are scaffolding pending an own-voice rewrite (landing-copy.md).',
        'Rewrite them in src/copy/landing.ts and set draft: false, or run',
        '`astro dev` to preview without publishing.',
      ].join('\n'),
    )
  }
}
