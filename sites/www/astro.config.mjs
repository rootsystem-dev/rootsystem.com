// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

// Main rootsystem.com site: marketing pages plus the Taproot blog at /taproot.
//
// Output is fully static. The site is served by a Cloudflare Worker configured
// in wrangler.jsonc, which serves ./dist as static assets.
export default defineConfig({
  site: 'https://rootsystem.com',
  output: 'static',
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
