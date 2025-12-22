const { extend } = require('next-compose-plugins')
const path = require('path')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const baseConfig = (phase, { defaultConfig }) => {
  return {
    poweredByHeader: false,
    async redirects() {
      return [
        {
          source: '/fellowship',
          destination: '/apply',
          permanent: false,
        },
        {
          source: '/residency',
          destination: '/apply',
          permanent: false,
        },
      ]
    },
    webpack: (config, { isServer }) => {
      config.module.rules.push({
        test: /\.(ico|svg|eot|ttf|woff|woff2)$/,
        use: 'file-loader'
      })
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false
        }
      }
      return config
    },
    turbopack: {}
  }
}

module.exports = extend(baseConfig).withPlugins([
  [withBundleAnalyzer]
])
