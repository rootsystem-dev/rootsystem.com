const { extend } = require('next-compose-plugins')
const path = require('path')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
// const withMdxEnhanced = require('next-mdx-enhanced')
// const withOptimizedImages = require('next-optimized-images')

const baseConfig = (phase, { defaultConfig }) => {
  return {
    poweredByHeader: false,
    // trailingSlash: true,
    webpack: (config, { isServer }) => {
      config.module.rules.push({
        test: /\.(ico|svg|eot|ttf|woff|woff2)$/,
        use: 'file-loader'
      })
      config.resolve.alias = {
        ...config.resolve.alias,
        components: path.resolve(__dirname, '/components')
      }
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false
        }
      }
      return config
    }
  }
}

module.exports = extend(baseConfig).withPlugins([
  // [withOptimizedImages, {
  //   handleImages: ['gif', 'jpeg', 'png'],
  //   optimizeImages: true,
  //   optimizeImagesInDev: true
  // }],
  [withBundleAnalyzer]
])