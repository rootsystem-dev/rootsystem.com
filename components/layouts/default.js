import BaseLayout from './base'
import Link from 'next/link'

export default (frontMatter) => {
  const { slug, title } = frontMatter
  return ({ children }) => (
    <BaseLayout>
      <article>
        {title && <h1>
          <Link href={slug} passHref>
            <a>
              {title}
            </a>
          </Link>
        </h1>}
        {children}
      </article>
    </BaseLayout>
  )
}