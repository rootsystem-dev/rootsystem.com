import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getPosts } from '../../lib/taproot'

// Feed uses the same getPosts() as the index, so drafts are excluded from the
// feed in production by the same rule rather than a second one that could drift.
export async function GET(context: APIContext) {
  const posts = await getPosts()

  return rss({
    title: 'Taproot — Root System',
    description:
      'Writing from Root System on building software, engineering organizations, and the systems underneath them.',
    site: context.site ?? 'https://rootsystem.com',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      categories: post.data.tags,
      link: `/taproot/${post.id}/`,
    })),
  })
}
