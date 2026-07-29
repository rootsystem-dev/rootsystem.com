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

  hero: draftable({
    eyebrow: z.string(),
    headline: z.string(),
    subhead: z.string(),
    // The "query motif" proof block -- a concrete finding, stated plainly.
    proof: z.string(),
    cta: z.string(),
  }),

  positioning: z.object({
    body: z.string(),
  }),

  // The five pillars. Each was earned in a real matter; the copy deck is
  // explicit that these are not aspirational claims.
  pillars: z
    .array(z.object({ title: z.string(), body: z.string() }))
    .length(5),

  caseStudy: z.object({
    label: z.string(),
    headline: z.string(),
    body: z.array(z.string()).min(1),
    pullQuote: z.string(),
  }),

  services: z.object({
    label: z.string(),
    intro: z.string(),
    modes: z
      .array(z.object({ title: z.string(), body: z.string() }))
      .length(4),
  }),

  pricing: z.object({
    label: z.string(),
    tiers: z.array(
      z.object({
        name: z.string(),
        price: z.string(),
        body: z.string(),
      }),
    ),
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

  contact: z.object({
    email: z.string().email(),
    footer: z.string(),
  }),
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
