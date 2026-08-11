// @ts-check
import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import sitemap from '@astrojs/sitemap'

// forensics.rootsystem.com — the technical expert-witness property.
//
// Deliberately a separate Astro application from sites/www rather than a route
// group: the buyer is different (litigators and IP counsel, not founders). See
// spec decision D3.
//
// D3 also said the visual identity was intended to diverge. That half is
// amended by the 2026-08-08 IA spec: the properties now share typefaces, the
// logomark, masthead metrics, the accent and the layout tokens, and diverge
// only in the page interior.
// The adapter is present so the case-intake endpoint can opt into on-demand
// rendering and write to D1; the landing page itself stays prerendered.
export default defineConfig({
  site: 'https://forensics.rootsystem.com',
  output: 'static',
  adapter: cloudflare(),
  integrations: [sitemap()],
})
