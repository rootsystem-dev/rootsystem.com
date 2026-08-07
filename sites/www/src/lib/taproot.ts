import { getCollection, type CollectionEntry } from 'astro:content'

export type Post = CollectionEntry<'taproot'>

/**
 * The single place posts are fetched, so the draft rule and the sort order
 * cannot drift between the index, the RSS feed, and the tag pages.
 *
 * Drafts are visible in development and on preview deployments and hidden in
 * production. `import.meta.env.PROD` is true for any `astro build`, which
 * includes preview deploys -- so previews of unpublished drafts require running
 * the dev server rather than a deployed preview. That is the conservative
 * choice: a draft leaking to a public preview URL is worse than the
 * inconvenience.
 */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('taproot', ({ data }) =>
    import.meta.env.PROD ? data.draft === false : true,
  )

  return posts.sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  )
}

/** Every tag in use, with post counts, ordered by frequency then alphabetically. */
export async function getTags(): Promise<{ tag: string; count: number }[]> {
  const posts = await getPosts()
  const counts = new Map<string, number>()

  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
}

/** Long-form date used in post headers and on cards. */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
