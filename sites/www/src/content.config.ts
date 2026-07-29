import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

/**
 * Taproot — the Root System blog.
 *
 * Schema is validated at build time, so a post with a missing description or a
 * malformed date fails the build rather than shipping a broken card or an
 * empty meta tag. That is deliberate: the failure is cheap now and expensive
 * once it is indexed.
 *
 * `draft` defaults to false. Drafts render in `astro dev` and on preview
 * deployments but are excluded from production builds -- see the PROD filter
 * in src/lib/taproot.ts.
 */
const taproot = defineCollection({
  loader: glob({ base: './src/content/taproot', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
})

export const collections = { taproot }
