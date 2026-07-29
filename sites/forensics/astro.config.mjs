// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

// forensics.rootsystem.com — the AI/ML expert-witness property.
//
// Deliberately a separate Astro application from sites/www rather than a route
// group: the buyer is different (litigators and IP counsel, not founders) and
// the visual identity is intended to diverge. See spec decision D3.
export default defineConfig({
  site: 'https://forensics.rootsystem.com',
  output: 'static',
  integrations: [sitemap()],
})
