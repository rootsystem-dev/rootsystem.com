const withMdxEnhanced = require('next-mdx-enhanced')
const withPlugins = require('next-compose-plugins')

const plugins = [
  withMdxEnhanced({
    layoutPath: 'components/layouts',
    defaultLayout: false,
    fileExtensions: ['mdx'],
    remarkPlugins: [
    ],
    rehypePlugins: [
    ],
    extendFrontMatter: {
      process: (content, frontMatter) => {
        const { layout, __resourcePath: path } = frontMatter
        const slug = path
          .replace('/index', '')
          .replace(/\.(md|mdx)$/, '')
        return {
          layout: layout || 'default',
          slug
        }
      }
    }
  })
]

module.exports = withPlugins(plugins, {})