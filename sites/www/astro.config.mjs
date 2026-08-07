// @ts-check
import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

// Main rootsystem.com site: marketing pages plus the Taproot blog at /taproot.
//
// `output: 'static'` keeps every page prerendered. The Cloudflare adapter is
// present only so individual routes can opt into on-demand rendering with
// `export const prerender = false` -- currently just the contact form endpoint,
// which needs to accept a POST and write to D1. Pages remain static files
// served from the edge; nothing about the marketing site became dynamic.
export default defineConfig({
  site: 'https://rootsystem.com',
  output: 'static',
  adapter: cloudflare(),
  integrations: [mdx(), sitemap()],

  // Same-origin path redirects live here rather than in Cloudflare Redirect
  // Rules, so they also work on preview deployments. Cross-hostname redirects
  // (insights.rootsystem.com, the meet/profile hostnames) are zone-level rules
  // instead, because Astro cannot emit a page for a hostname it does not serve.
  redirects: {
    '/fellowship': '/apply',
    '/residency': '/apply',
  },
})
