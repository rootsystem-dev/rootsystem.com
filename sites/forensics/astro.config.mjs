// @ts-check
import { defineConfig, envField } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import sitemap from '@astrojs/sitemap'

// forensics.rootsystem.com — the AI/ML expert-witness property.
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
  // Typed client environment, rather than a bare import.meta.env.PUBLIC_* read.
  // A PostHog project key is public by design -- it ships in the page -- so
  // `access: 'public'` is accurate rather than a shortcut.
  //
  // Both are optional on purpose. The pages here are prerendered, so the key is
  // needed at build time, and it reaches a build through fnox; until that is
  // wired, a required field would fail every build including pull requests.
  // The layout treats a missing key as "no analytics" and ships no analytics
  // bundle at all, so the failure mode is a quiet absence rather than a page
  // that loads a library and reports nothing. Worth revisiting once the secret
  // is in CI: required would then catch a broken reference at build time.
  env: {
    schema: {
      PUBLIC_POSTHOG_KEY: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      PUBLIC_POSTHOG_HOST: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
        default: 'https://us.i.posthog.com',
      }),
    },
  },
})
