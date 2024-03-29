const { extend } = require('next-compose-plugins')
const path = require('path')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const baseConfig = (phase, { defaultConfig }) => {
  return {
    output: 'export',
    poweredByHeader: false,
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
    }
  }
}

module.exports = extend(baseConfig).withPlugins([
  [withBundleAnalyzer]
])