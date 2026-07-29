// @ts-check
import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import sitemap from '@astrojs/sitemap'

// forensics.rootsystem.com — the AI/ML expert-witness property.
//
// Deliberately a separate Astro application from sites/www rather than a route
// group: the buyer is different (litigators and IP counsel, not founders) and
// the visual identity is intended to diverge. See spec decision D3.
// The adapter is present so the case-intake endpoint can opt into on-demand
// rendering and write to D1; the landing page itself stays prerendered.
export default defineConfig({
  site: 'https://forensics.rootsystem.com',
  output: 'static',
  adapter: cloudflare(),
  integrations: [sitemap()],
})
