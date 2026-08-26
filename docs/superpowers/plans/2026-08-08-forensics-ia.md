# Forensics Information Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split `forensics.rootsystem.com` from one undifferentiated page into a self-sufficient root plus three expanding spokes, and pull its chrome and type onto the `rootsystem.com` brand.

**Architecture:** Copy already lives as Zod-validated data in `src/copy/landing.ts`, and no text is hardcoded in markup, so this is a routing and content-model change rather than a copy migration. Each argument gains a `summary` field beside its existing `body` in the same object; root renders `summary`, the spoke renders `body`. Page sections move from one 289-line file into components that take a `form` prop. A masthead in `Layout.astro` gives all five routes navigation, which none of them have today.

**Tech Stack:** Astro 7, `@astrojs/cloudflare` (static output), `@astrojs/sitemap`, Zod via `astro/zod`, Yarn 4 workspaces, Wrangler. No test runner exists in either workspace.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-08-08-forensics-ia-design.md`. Read it before starting.
- Branch is `rob/forensics-ia`, already created off `primary`. Do not merge to `primary` — merging is a production event that runs `wrangler deploy`.
- **No test framework exists.** There is no vitest, no Playwright, no test file in either workspace. The red-green cycle in this plan runs through the Zod build gate: add a required field, watch `yarn build:forensics` fail, add the data, watch it pass. That is a real failing-then-passing check, not a substitute for one. Steps say exactly which command to run and what output to expect.
- All commands run from the repo root: `/Users/robertjacques/RootsystemProjects/rootsystem-internal/rootsystem.com`.
- Build: `yarn build:forensics`. Type/template check: `yarn workspace @rootsystem/forensics check`. Dev server: `yarn dev:forensics`.
- Never add a colour as a literal in a component. Every colour is a token defined in **both** the light and dark blocks of `tokens.css`. Two narrow exceptions, each of which must carry a comment saying why: the logomark's dark-mode `fill: #ffffff`, ported verbatim from `sites/www` so both properties render the same mark; and the card SVG in Task 7, which has no access to the stylesheet at all.
- Dark neutrals stay at `--bg: #14181d`. Do not converge to the main site's pure black.
- No JavaScript is added to any page. The masthead, the anchors, and the expansion links are plain HTML. `/scope` keeps its existing Turnstile script; that is pre-existing and out of scope.
- Commit after every task. Conventional-commit prefixes, matching repo history (`feat:`, `docs:`, `refactor:`, `style:`).

## File Structure

**Created:**

| Path | Responsibility |
| --- | --- |
| `sites/forensics/public/fonts/*.woff2`, `*.woff` | Self-hosted Tiempos and Open Sans, copied from `sites/www/public/fonts/` |
| `sites/forensics/src/components/Logomark.astro` | Brand mark, ported from `sites/www` with forensics token names |
| `sites/forensics/src/components/Masthead.astro` | Nav + brand lockup + skip-link target |
| `sites/forensics/src/components/SiteFooter.astro` | Footer, extracted from `index.astro` |
| `sites/forensics/src/components/ExpandLink.astro` | "The full method →" affordance |
| `sites/forensics/src/components/Positioning.astro` | Positioning paragraph |
| `sites/forensics/src/components/Pillars.astro` | Five pillars; `form: 'summary' \| 'full'` |
| `sites/forensics/src/components/CaseStudy.astro` | Case study; `form: 'summary' \| 'full'` |
| `sites/forensics/src/components/Services.astro` | Four service modes; `form: 'summary' \| 'full'` |
| `sites/forensics/src/components/Pricing.astro` | Pricing tiers; `form: 'summary' \| 'full'` |
| `sites/forensics/src/components/Contrast.astro` | Contrast table (one route only, no prop) |
| `sites/forensics/src/components/Faq.astro` | FAQ (one route only, no prop) |
| `sites/forensics/src/pages/method.astro` | Spoke: pillars full + contrast table |
| `sites/forensics/src/pages/matters.astro` | Spoke: case study full |
| `sites/forensics/src/pages/engagements.astro` | Spoke: modes + pricing + FAQ |
| `docs/Brand/Social/rootsystem-forensics-social.svg` | OG card source, editable |
| `scripts/render-og-card.sh` | Rasterizes the card SVG to PNG via headless Chrome |
| `sites/forensics/public/images/forensics-card.png` | Exported card, 1440×640 |

**Modified:**

| Path | Change |
| --- | --- |
| `sites/forensics/src/styles/tokens.css` | Fonts, type scale, layout tokens, `--accent` correction, comment fix |
| `sites/forensics/src/styles/base.css` | `.wrap` gutter token, skip-link styles |
| `sites/forensics/src/layouts/Layout.astro` | Masthead, skip link, `assertPublishable`, OG image path |
| `sites/forensics/src/copy/schema.ts` | `summary` fields, `routes` object, comment fix |
| `sites/forensics/src/copy/landing.ts` | Summary copy, route metadata, comment fix |
| `sites/forensics/src/pages/index.astro` | Reduced to composition of short-form sections |
| `sites/forensics/src/pages/scope.astro` | Eyebrow back-link removed |
| `sites/forensics/astro.config.mjs` | D3 comment amended |
| `sites/forensics/public/robots.txt` | Comment rewritten |

**Deleted:** `sites/forensics/public/images/rootsystem-card.png` (replaced by the forensics card in Task 7).

---

### Task 1: Brand tokens and self-hosted fonts

Establishes the type and colour foundation everything later renders against. Nothing visual is restructured yet — this task alone should change how the existing page looks, and that is the point.

**Files:**
- Create: `sites/forensics/public/fonts/` (seven font files copied)
- Modify: `sites/forensics/src/styles/tokens.css`
- Modify: `sites/forensics/src/styles/base.css:58-62`

**Interfaces:**
- Consumes: nothing.
- Produces: tokens `--font-body`, `--font-heading`, `--text-xs` through `--text-2xl`, `--gutter`, and a corrected `--accent`. Later tasks reference these names exactly. Note that forensics keeps its own semantic names (`--ink`, `--body`, `--accent`, `--line`) — it does **not** adopt the main site's `--fg`/`--link`/`--rule`.

- [ ] **Step 1: Copy the font files**

```bash
mkdir -p sites/forensics/public/fonts
cp sites/www/public/fonts/OpenSans-Regular.woff2 \
   sites/www/public/fonts/OpenSans-Regular.woff \
   sites/www/public/fonts/OpenSans-SemiBold.woff2 \
   sites/www/public/fonts/OpenSans-SemiBold.woff \
   sites/www/public/fonts/Tiempos-Regular.woff2 \
   sites/www/public/fonts/Tiempos-Medium.woff2 \
   sites/www/public/fonts/Tiempos-Bold.woff2 \
   sites/forensics/public/fonts/
ls sites/forensics/public/fonts/
```

Expected: seven files listed.

- [ ] **Step 2: Add the `@font-face` block to the top of `tokens.css`**

Insert immediately after the existing header comment, before `:root {`:

```css
/*
 * Self-hosted faces, identical to sites/www/public/fonts. The two properties
 * share type as part of the brand convergence in the 2026-08-08 IA spec §6:
 * the buyer is different, the brand is not. Tiempos is licensed; coverage for
 * this second hostname was confirmed 2026-08-08.
 */
@font-face {
  font-family: 'Open Sans';
  src: url('/fonts/OpenSans-Regular.woff2') format('woff2'),
       url('/fonts/OpenSans-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Open Sans';
  src: url('/fonts/OpenSans-SemiBold.woff2') format('woff2'),
       url('/fonts/OpenSans-SemiBold.woff') format('woff');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Tiempos';
  src: url('/fonts/Tiempos-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Tiempos';
  src: url('/fonts/Tiempos-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Tiempos';
  src: url('/fonts/Tiempos-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

- [ ] **Step 3: Replace the `:root` block's typeface and layout tokens**

Replace the existing `:root { ... }` block (currently `--font-serif` through `--page-max`) with:

```css
:root {
  /* Typefaces now match rootsystem.com. --font-serif and --font-sans are kept
     as aliases so existing rules in base.css and the page components resolve
     without a sweep; new rules should prefer --font-heading / --font-body. */
  --font-heading: 'Tiempos', ui-serif, Georgia, serif;
  --font-body: 'Open Sans', ui-sans-serif, system-ui, sans-serif;
  --font-serif: var(--font-heading);
  --font-sans: var(--font-body);
  /* Mono stays a system stack, as it is on the main site. The proof/query
     motif is the only thing that uses it. */
  --font-mono: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;

  /* Type scale, carried over from sites/www so masthead metrics match. */
  --text-xs: 0.8125rem;
  --text-sm: 0.875rem;
  --text-md: 0.9375rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.3125rem;
  --text-2xl: 1.4375rem;

  --measure: 68ch;
  --page-max: 72rem;
  --gutter: 1.75rem;
}
```

- [ ] **Step 4: Correct the light accent and its comment**

In the `:root[data-direction='a']` block, change:

```css
  --accent: #276749;
```

to:

```css
  --accent: #2f855a;
```

Then, in the file's header comment, replace the sentence:

```
 * Both use green accents, which keeps the property congruent with
 * rootsystem.com -- A's #276749 is the same green the main site uses for
 * primary-600.
```

with:

```
 * Both use green accents, which keeps the property congruent with
 * rootsystem.com. A's light accent is #2f855a, the main site's primary-600 --
 * it previously read #276749, which this comment wrongly claimed was the same
 * value. The dark greens (#48bb78 / #68d391) always did match primary-400/300.
```

- [ ] **Step 5: Replace the hardcoded gutter in `base.css`**

In `.wrap`, change `padding: 0 24px;` to `padding: 0 var(--gutter);`.

- [ ] **Step 6: Build and confirm the fonts are served**

```bash
yarn build:forensics && ls sites/forensics/dist/client/fonts/
```

Expected: build succeeds; seven font files present in `dist/client/fonts/`.

- [ ] **Step 7: Confirm no stale `#276749` declaration remains**

The value must be gone from every declaration. It survives only in prose that explains the correction, so grep for the declaration rather than the string:

```bash
grep -rn -- '--accent: #276749' sites/forensics/src/ || echo "no stale declaration"
```

Expected: `no stale declaration`.

Then check every remaining mention is a comment that is still *true* after the change:

```bash
grep -rn '276749' sites/forensics/src/
```

Expected: two hits, both comments. The dark-scheme comment that reads `--accent flips from #276749 to a lighter green` is now wrong — light mode no longer starts there. Correct it to `--accent flips from #2f855a to a lighter green`.

- [ ] **Step 8: Commit**

```bash
git add sites/forensics/public/fonts sites/forensics/src/styles/
git commit -m "style: adopt the rootsystem.com typefaces and layout tokens on forensics"
```

---

### Task 2: Copy schema — summaries and route metadata

Adds the fields the split depends on, and proves the build gate works by watching it fail first.

**Files:**
- Modify: `sites/forensics/src/copy/schema.ts`
- Modify: `sites/forensics/src/copy/landing.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `copy.pillars[n].summary` (string), `copy.caseStudy.summary` (string), and `copy.routes.{method,matters,engagements}.{title,description}` (strings). Tasks 4–6 read these exact paths.

- [ ] **Step 1: Add the required fields to the schema (the failing change)**

In `schema.ts`, change the `pillars` definition to:

```ts
  // The five pillars. Each was earned in a real matter; the copy deck is
  // explicit that these are not aspirational claims.
  //
  // `summary` is the root page's short form and `body` the spoke's long form.
  // Both are required and live on the same object so drift between them is
  // visible on adjacent lines rather than across two files.
  pillars: z
    .array(
      z.object({
        title: z.string(),
        summary: z.string(),
        body: z.string(),
      }),
    )
    .length(5),
```

Change `caseStudy` to:

```ts
  caseStudy: z.object({
    label: z.string(),
    headline: z.string(),
    // Root's short form. The full `body` paragraphs render on /matters.
    summary: z.string(),
    body: z.array(z.string()).min(1),
    pullQuote: z.string(),
  }),
```

And add, immediately after the `meta` object:

```ts
  // Per-route metadata. Distinct titles are the whole search argument for the
  // hub-and-spoke structure, so they are validated rather than left optional.
  routes: z.object({
    method: z.object({ title: z.string(), description: z.string() }),
    matters: z.object({ title: z.string(), description: z.string() }),
    engagements: z.object({ title: z.string(), description: z.string() }),
  }),
```

- [ ] **Step 2: Run the build and watch it fail**

```bash
yarn build:forensics
```

Expected: FAIL. The Zod parse in `landing.ts` throws, listing `routes` as required and `summary` missing on each of the five pillars and on `caseStudy`.

This is the anti-drift mechanic working. If the build succeeds here, the schema edit did not land — stop and fix it before continuing.

- [ ] **Step 3: Add the route metadata to `landing.ts`**

Insert directly after the `meta: { ... },` block:

```ts
  routes: {
    method: {
      title: 'Method — reproducible AI/ML analysis | Root System Forensics',
      description:
        'How an AI/ML opinion is made to hold up: findings stated as a query and its output, conceded uncertainty, and depth in machine-generated evidence — set against what academics, economic consultancies and forensics vendors each leave out.',
    },
    matters: {
      title:
        'Representative matter — refuting a mass-copying claim | Root System Forensics',
      description:
        'An opposing expert read clustered access timestamps as proof of mass copying. We measured a real bulk copy on like media, showed the distribution’s shape was the discriminator, and impeached the declaration against his own earlier filing.',
    },
    engagements: {
      title: 'Engagements and fees | Root System Forensics',
      description:
        'Four ways to engage — opposing-expert rebuttal, affirmative analysis and testimony, non-testifying consulting, and early-case assessment — with a $2,500 fixed-fee assessment that credits toward a full engagement.',
    },
  },
```

- [ ] **Step 4: Add a `summary` to each pillar**

In the `pillars` array, add a `summary` line above each existing `body`:

```ts
  pillars: [
    {
      title: 'Reproducible, not assertive.',
      summary:
        'Every finding is a query and its output, re-runnable by the other side.',
      body: 'Findings are a query plus its output — re-runnable by opposing counsel. Not "trust me."',
    },
    {
      title: 'Even-handed.',
      summary:
        'We concede what is genuinely uncertain. That is what survives cross.',
      body: 'We concede what’s genuinely uncertain and interrogate the evidence with the same rigor a courtroom demands. It’s what separates an expert from a hired gun — and what survives cross.',
    },
    {
      title: 'Depth in machine-generated evidence.',
      summary:
        'Timestamp shape, model variability, file-system semantics — where a forensics checklist stops.',
      body: 'Timestamp-shape, model-temperature-controlled variability, file-system semantics, at-scale artifacts — where a forensics checklist stops, the real question starts.',
    },
    {
      title: 'Cross-document rigor.',
      summary:
        'We diff an opponent’s own successive filings for dropped caveats and silent overstatements.',
      body: 'We diff an opponent’s own successive filings for dropped caveats and silent overstatements — a technique most vendors don’t perform.',
    },
    {
      title: 'Built by a builder.',
      summary:
        'Argued by the practitioner who ships these systems, not someone who only studies them.',
      body: 'Disputes over what AI/ML systems did, argued by the practitioner who ships them — a credential the market is short on.',
    },
  ],
```

- [ ] **Step 5: Add the case-study summary**

In `caseStudy`, add above `body`:

```ts
    summary:
      'An opposing expert read clustered access timestamps as proof of mass copying. We measured a real bulk copy: a genuine one smears across hundreds of seconds, while his exhibit clustered thousands of files into a handful — the signature of a batch process. His own earlier declaration carried the caveats the later one dropped.',
```

- [ ] **Step 6: Correct the stale draft comment in `landing.ts`**

Replace this paragraph in the file's header comment:

```
 * The deck is explicit that the hero and closing are scaffolding pending a
 * rewrite in Rob's voice, and that the rewrite gates publication. Those two
 * blocks carry `draft: true`, which fails production builds until they are
 * rewritten. Everything else is transcribed as written.
```

with:

```
 * The deck is explicit that the hero and closing were scaffolding pending a
 * rewrite in Rob's voice, and that the rewrite gates publication. Both blocks
 * are draftable and neither currently sets `draft: true`, so the publish gate
 * in assertPublishable is open. Set it back to true on either block to close
 * the gate again. Everything else is transcribed as written.
```

- [ ] **Step 7: Run the build and watch it pass**

```bash
yarn build:forensics
```

Expected: PASS. Same command that failed in Step 2.

- [ ] **Step 8: Commit**

```bash
git add sites/forensics/src/copy/
git commit -m "feat: add short-form copy and per-route metadata to the forensics schema"
```

---

### Task 3: Logomark, masthead, and skip link

**Files:**
- Create: `sites/forensics/src/components/Logomark.astro`
- Create: `sites/forensics/src/components/Masthead.astro`
- Modify: `sites/forensics/src/layouts/Layout.astro`
- Modify: `sites/forensics/src/styles/base.css`
- Modify: `sites/forensics/src/pages/scope.astro:53`

**Interfaces:**
- Consumes: `--text-sm`, `--text-xl`, `--text-2xl`, `--gutter`, `--page-max` from Task 1.
- Produces: `<Masthead />`, taking no props and reading `Astro.url.pathname` itself. `Layout.astro` renders it above `<slot />`. A `#main` skip target exists on the slot wrapper.

- [ ] **Step 1: Port the logomark**

```bash
cp sites/www/src/components/Logomark.astro sites/forensics/src/components/Logomark.astro
```

Then edit **only** the `<style>` block of the forensics copy — the path data and props stay byte-identical — replacing the main site's token names with the forensics ones:

```css
<style>
  .logomark {
    display: block;
    flex: none;
    width: auto;
  }

  /*
   * Ported from sites/www with the token names swapped: forensics uses --ink
   * and --accent where the main site uses --fg and --link. The paths and the
   * viewBox crop are unchanged, so the two properties render the same mark.
   *
   * The branches go white in dark mode, matching the main site.
   */
  .structure {
    fill: var(--ink);
  }

  .branches {
    fill: var(--accent);
  }

  @media (prefers-color-scheme: dark) {
    .branches {
      fill: #ffffff;
    }
  }
</style>
```

Also replace the component's opening comment paragraph. The copied file begins:

```
 * Root System logomark, ported verbatim from the previous site's
 * `components/elements/brand/logomark/index.jsx`. The path data is unchanged;
 * only the colour plumbing differs.
```

Replace those three lines — the whole paragraph, not a substring of it — with:

```
 * Root System logomark, ported from sites/www/src/components/Logomark.astro.
 * The path data and the viewBox crop are byte-identical, so both properties
 * render the same mark; only the colour plumbing differs, because forensics
 * names its tokens --ink and --accent where the main site uses --fg and --link.
```

Leave the remaining paragraphs of the comment as they are.

- [ ] **Step 2: Create the masthead**

```astro
---
/**
 * Site masthead for forensics.rootsystem.com.
 *
 * Metrics are matched to sites/www/src/components/Header.astro so the two
 * properties read as one brand: 0.75rem padding rising to 1.75rem from 48em,
 * the wordmark in Tiempos 700 / -0.025em, and nav at --text-sm, uppercase,
 * weight 400, 1.5rem gap.
 *
 * No JavaScript, no dropdown, no hamburger -- four items wrap at narrow
 * widths. A property whose argument is reproducibility should not need a
 * script to show its own menu, which is the same reasoning that rejected
 * scroll-reveal for the page body.
 *
 * The call to action is suppressed on /scope, where the reader has already
 * arrived. The nav links stay: a form page with no way out is a trap, and a
 * reader wanting to check the method first needs a route to it.
 */
import Logomark from './Logomark.astro'

const links = [
  { href: '/method', label: 'Method' },
  { href: '/matters', label: 'Matters' },
  { href: '/engagements', label: 'Engagements' },
]

const path = Astro.url.pathname
const onScope = path.startsWith('/scope')
---

<header>
  <div class="bar">
    <a class="brand" href="/">
      <Logomark size="2.5rem" />
      <span class="lockup">
        <span class="wordmark">Root System</span>
        <span class="qualifier">Forensics</span>
      </span>
    </a>
    <nav aria-label="Primary">
      {
        links.map(({ href, label }) => (
          <a href={href} aria-current={path.startsWith(href) ? 'page' : undefined}>
            {label}
          </a>
        ))
      }
      {!onScope && <a class="cta" href="/scope">Scope a case &rarr;</a>}
    </nav>
  </div>
</header>

<style>
  /* `header` spans the viewport so a rule could reach both edges; `.bar` holds
     the row at content width. Same two-element split as the main site's. */
  header {
    padding: 0.75rem var(--gutter);
  }

  @media (min-width: 48em) {
    header {
      padding: 1.75rem var(--gutter);
    }
  }

  .bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    width: 100%;
    max-width: var(--page-max);
    margin: 0 auto;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--ink);
    text-decoration: none;
  }

  .lockup {
    display: flex;
    flex-direction: column;
    line-height: 1.15;
  }

  .wordmark {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 700;
    letter-spacing: -0.025em;
  }

  @media (min-width: 48em) {
    .wordmark {
      font-size: var(--text-2xl);
    }
  }

  .qualifier {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .brand:hover,
  .brand:focus-visible {
    color: var(--accent);
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.5rem;
    font-size: var(--text-sm);
  }

  nav a {
    color: var(--muted);
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 0.5rem 0;
    text-decoration: none;
  }

  nav a[aria-current='page'] {
    color: var(--ink);
  }

  /* Astro scopes these with an attribute, which outranks the global `a:hover`
     in base.css -- without them the nav links have no hover colour at all.
     The [aria-current] variant is restated for the same reason. */
  nav a:hover,
  nav a:focus-visible,
  nav a[aria-current='page']:hover,
  nav a[aria-current='page']:focus-visible {
    color: var(--accent);
  }

  /* The CTA keeps .cta's fill from base.css, so only the metrics differ. */
  nav a.cta {
    color: var(--bg);
    padding: 0.5rem 1rem;
    text-transform: none;
    letter-spacing: 0;
    font-weight: 600;
  }

  nav a.cta:hover,
  nav a.cta:focus-visible {
    color: var(--bg);
  }
</style>
```

- [ ] **Step 3: Add skip-link styles to `base.css`**

Append:

```css
/* Skip link. Off-screen until focused, then pinned to the top-left. base.css
   already styles :focus-visible, but there was no skip target until the
   masthead existed. */
.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  background: var(--accent);
  color: var(--bg);
  font-weight: 600;
  padding: 0.75rem 1.25rem;
  border-radius: 0 0 6px 0;
  text-decoration: none;
  z-index: 10;
}

.skip-link:focus {
  left: 0;
  color: var(--bg);
}
```

- [ ] **Step 4: Wire the masthead and skip link into `Layout.astro`**

Add `import Masthead from '../components/Masthead.astro'` to the frontmatter, then replace the `<body>` contents:

```astro
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    {
      hasDraftCopy && (
        <p class="draft-notice">
          Draft copy — hero and closing are scaffolding pending an own-voice
          rewrite. This page cannot be built for production in this state.
        </p>
      )
    }
    <Masthead />
    <main id="main">
      <slot />
    </main>
  </body>
```

- [ ] **Step 5: Remove the now-redundant back-link on `/scope`**

In `scope.astro`, replace:

```astro
    <p class="eyebrow"><a href="/">Root System</a> · Scope a case</p>
```

with:

```astro
    <p class="eyebrow">Scope a case</p>
```

- [ ] **Step 6: Check and build**

```bash
yarn workspace @rootsystem/forensics check && yarn build:forensics
```

Expected: both pass, zero errors.

- [ ] **Step 7: Verify the masthead in the browser**

```bash
yarn dev:forensics
```

Load `http://localhost:4321/` and `http://localhost:4321/scope`. Confirm:
- mark and "Root System / Forensics" lockup render, wordmark in Tiempos
- three nav links plus the CTA on `/`; the CTA absent on `/scope`
- Tab from a fresh page load reveals "Skip to content" first, and activating it moves focus past the nav

Stop the dev server before committing.

- [ ] **Step 8: Commit**

```bash
git add sites/forensics/src/components/ sites/forensics/src/layouts/Layout.astro \
        sites/forensics/src/styles/base.css sites/forensics/src/pages/scope.astro
git commit -m "feat: add a masthead and skip link to the forensics property"
```

---

### Task 4: Extract section components

Pure refactor. `/` must render identically to before at the end of this task — the only visible change is the masthead from Task 3.

**Files:**
- Create: `sites/forensics/src/components/{SiteFooter,Positioning,Pillars,CaseStudy,Services,Pricing,Contrast,Faq}.astro`
- Modify: `sites/forensics/src/pages/index.astro`

**Interfaces:**
- Consumes: `copy` from `../copy/landing`, and `copy.pillars[n].summary` / `copy.caseStudy.summary` from Task 2.
- Produces: components importing `copy` themselves rather than receiving it as a prop — the copy module is a singleton and threading it through props buys nothing. Four take `form?: 'summary' | 'full'` defaulting to `'full'`: `Pillars`, `CaseStudy`, `Services`, `Pricing`. `Contrast`, `Faq`, `Positioning`, and `SiteFooter` take no props.

- [ ] **Step 1: Create `Pillars.astro`**

```astro
---
/**
 * The five pillars.
 *
 * `form` selects which field renders, not which layout: 'summary' and 'full'
 * are the same markup reading `summary` or `body`. One component with a field
 * switch is therefore honest here rather than two components behind a flag.
 */
import copy from '../copy/landing'

interface Props {
  form?: 'summary' | 'full'
}

const { form = 'full' } = Astro.props
---

<section class="wrap" id="method">
  <h2>How the work holds up</h2>
  <ol class="pillars">
    {
      copy.pillars.map((pillar) => (
        <li>
          <h3>{pillar.title}</h3>
          <p>{form === 'summary' ? pillar.summary : pillar.body}</p>
        </li>
      ))
    }
  </ol>
  <slot />
</section>

<style>
  .pillars {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    list-style: none;
    padding: 0;
    counter-reset: pillar;
  }

  .pillars li::before {
    counter-increment: pillar;
    content: counter(pillar);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--accent);
    display: block;
    margin-bottom: 0.5rem;
  }

  .pillars p {
    margin-bottom: 0;
  }
</style>
```

The `<slot />` is where the root page puts its expansion link. Every section component below follows the same pattern.

- [ ] **Step 2: Create `CaseStudy.astro`**

```astro
---
/**
 * The representative matter. 'summary' is a single paragraph for the root
 * page; 'full' is the two-paragraph account plus the pull quote.
 */
import copy from '../copy/landing'

interface Props {
  form?: 'summary' | 'full'
}

const { form = 'full' } = Astro.props
---

<section class="wrap" id="matters">
  <p class="eyebrow">{copy.caseStudy.label}</p>
  <h2 class="measure">{copy.caseStudy.headline}</h2>
  <div class="measure">
    {
      form === 'summary' ? (
        <p>{copy.caseStudy.summary}</p>
      ) : (
        <>
          {copy.caseStudy.body.map((para) => (
            <p>{para}</p>
          ))}
          <p class="pull">{copy.caseStudy.pullQuote}</p>
        </>
      )
    }
    <slot />
  </div>
</section>

<style>
  .pull {
    font-family: var(--font-heading);
    font-size: 1.375rem;
    font-style: italic;
    color: var(--ink);
    border-left: 3px solid var(--accent);
    padding-left: 1.25rem;
    margin-top: 2rem;
  }
</style>
```

- [ ] **Step 3: Create `Services.astro`**

```astro
---
/**
 * The four engagement modes. 'summary' lists the mode titles only; 'full'
 * carries each mode's description.
 */
import copy from '../copy/landing'

interface Props {
  form?: 'summary' | 'full'
}

const { form = 'full' } = Astro.props
---

<section class="wrap" id="engagements">
  <p class="eyebrow">{copy.services.label}</p>
  <h2>{copy.services.intro}</h2>
  {
    form === 'summary' ? (
      <ul class="mode-list measure">
        {copy.services.modes.map((mode) => (
          <li>{mode.title}</li>
        ))}
      </ul>
    ) : (
      <div class="modes">
        {copy.services.modes.map((mode) => (
          <article>
            <h3>{mode.title}</h3>
            <p>{mode.body}</p>
          </article>
        ))}
      </div>
    )
  }
  <slot />
</section>

<style>
  .modes {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
  }

  .modes p {
    margin-bottom: 0;
  }

  .mode-list {
    list-style: none;
    padding: 0;
    margin: 0 0 1.25rem;
    display: grid;
    gap: 0.5rem;
  }

  .mode-list li {
    font-family: var(--font-heading);
    color: var(--ink);
    padding-left: 1.25rem;
    position: relative;
  }

  .mode-list li::before {
    content: '·';
    position: absolute;
    left: 0.25rem;
    color: var(--accent);
  }
</style>
```

- [ ] **Step 4: Create `Pricing.astro`**

```astro
---
/**
 * Engagement tiers. 'summary' shows name and price only -- pricing was the
 * lowest-probability closer of the arguments on this page, so the root page
 * states the numbers and leaves the terms to /engagements.
 */
import copy from '../copy/landing'

interface Props {
  form?: 'summary' | 'full'
}

const { form = 'full' } = Astro.props
---

<section class="wrap">
  {/* Rendered as a heading, not a styled paragraph: this label is the only
      heading the pricing section has, and omitting it leaves a hole in the
      document outline for screen readers. */}
  <h2 class="eyebrow">{copy.pricing.label}</h2>
  <div class="tiers">
    {
      copy.pricing.tiers.map((tier) => (
        <article>
          <h3>{tier.name}</h3>
          <p class="price">{tier.price}</p>
          {form === 'full' && <p>{tier.body}</p>}
        </article>
      ))
    }
  </div>
  <slot />
</section>

<style>
  .tiers {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
  }

  .tiers article {
    background: var(--fill);
    border: 1px solid var(--line);
    border-radius: 10px;
    padding: 1.75rem;
  }

  .tiers p {
    margin-bottom: 0;
  }

  .price {
    font-family: var(--font-mono);
    color: var(--accent);
    font-size: 1.0625rem;
    margin-bottom: 0.75rem;
  }
</style>
```

- [ ] **Step 5: Create `Contrast.astro`**

```astro
---
/**
 * The "unlike the alternatives" table. Renders on /method only, so it takes
 * no form prop.
 */
import copy from '../copy/landing'
---

<section class="wrap">
  <h2 class="eyebrow">{copy.contrast.label}</h2>
  <div class="table-scroll">
    <table>
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">What they do well</th>
          <th scope="col">Where they leave the gap</th>
        </tr>
      </thead>
      <tbody>
        {
          copy.contrast.rows.map((row) => (
            <tr class={row.isUs ? 'us' : undefined}>
              <th scope="row">{row.who}</th>
              <td>{row.strength}</td>
              <td>{row.gap}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
</section>

<style>
  /* Wide content scrolls inside its own container so the page body never
     scrolls horizontally on narrow viewports. */
  .table-scroll {
    overflow-x: auto;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    min-width: 40rem;
    font-size: 0.9375rem;
  }

  th,
  td {
    text-align: left;
    vertical-align: top;
    padding: 0.875rem 1rem;
    border-bottom: 1px solid var(--line);
  }

  thead th {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--muted);
    font-weight: 400;
  }

  tbody th {
    color: var(--ink);
    white-space: nowrap;
  }

  tr.us {
    background: var(--fill);
  }

  tr.us th,
  tr.us td {
    font-weight: 600;
    color: var(--ink);
  }
</style>
```

- [ ] **Step 6: Create `Faq.astro`**

```astro
---
/**
 * Objections, answered. Renders on /engagements only -- the objections are
 * mostly about cost and credentials, which is the question a reader has once
 * they are looking at fees.
 */
import copy from '../copy/landing'
---

<section class="wrap">
  <h2>Objections, answered</h2>
  <dl class="faq measure">
    {
      copy.faq.map((item) => (
        <div>
          <dt>{item.question}</dt>
          <dd>{item.answer}</dd>
        </div>
      ))
    }
  </dl>
</section>

<style>
  .faq dt {
    font-family: var(--font-heading);
    font-size: 1.125rem;
    color: var(--ink);
    margin-top: 1.75rem;
  }

  .faq dd {
    margin: 0.5rem 0 0;
  }
</style>
```

- [ ] **Step 7: Create `Positioning.astro`**

```astro
---
/** The positioning paragraph. Root only. */
import copy from '../copy/landing'
---

<section class="wrap">
  <p class="positioning measure">{copy.positioning.body}</p>
</section>

<style>
  .positioning {
    font-size: 1.0625rem;
  }
</style>
```

- [ ] **Step 8: Create `SiteFooter.astro`**

```astro
---
/** Shared footer. Every route renders it. */
import copy from '../copy/landing'
---

<footer class="wrap">
  <p>
    {copy.contact.footer} ·{' '}
    <a href={`mailto:${copy.contact.email}`}>{copy.contact.email}</a>
  </p>
</footer>

<style>
  footer {
    border-top: 1px solid var(--line);
    padding-top: 2rem;
    padding-bottom: 3rem;
    color: var(--muted);
    font-size: 0.875rem;
  }
</style>
```

- [ ] **Step 9: Rewrite `index.astro` to compose them, still in full form**

This step keeps `/` rendering exactly as before so the refactor is verifiable in isolation. Task 5 switches it to short form.

```astro
---
/**
 * The forensics root page.
 *
 * Composition only. Every section is a component that reads src/copy/landing
 * itself, so this file carries no copy and no section styling.
 */
import Layout from '../layouts/Layout.astro'
import copy from '../copy/landing'
import Positioning from '../components/Positioning.astro'
import Pillars from '../components/Pillars.astro'
import CaseStudy from '../components/CaseStudy.astro'
import Services from '../components/Services.astro'
import Pricing from '../components/Pricing.astro'
import Contrast from '../components/Contrast.astro'
import Faq from '../components/Faq.astro'
import SiteFooter from '../components/SiteFooter.astro'

const scopeHref = '/scope'
---

<Layout title={copy.meta.title} description={copy.meta.description}>
  <header class="wrap hero">
    <p class="eyebrow">{copy.hero.eyebrow}</p>
    <h1>{copy.hero.headline}</h1>
    <p class="subhead measure">{copy.hero.subhead}</p>
    <p class="proof measure">{copy.hero.proof}</p>
    <a class="cta" href={scopeHref}>{copy.hero.cta} &rarr;</a>
  </header>

  <Positioning />
  <Pillars />
  <CaseStudy />
  <Services />
  <Pricing />
  <Contrast />
  <Faq />

  <section class="wrap closing">
    <h2 class="measure">{copy.closing.headline}</h2>
    <p class="measure">{copy.closing.body}</p>
    <a class="cta" href={scopeHref}>{copy.closing.button} &rarr;</a>
  </section>

  <SiteFooter />
</Layout>

<style>
  .hero {
    padding: 5rem 0 4rem;
  }

  .subhead {
    font-size: 1.1875rem;
    color: var(--body);
  }

  .closing {
    padding-bottom: 5rem;
  }
</style>
```

Note the hero padding drops its horizontal `24px` — `.wrap` now supplies `var(--gutter)` from Task 1, and keeping both double-pads the hero.

- [ ] **Step 10: Move the publish gate into `Layout.astro`**

Remove these lines from `index.astro`'s frontmatter (they are already absent from the Step 9 rewrite — confirm they did not survive):

```ts
import { assertPublishable } from '../copy/schema'
assertPublishable(copy)
const hasDraftCopy = copy.hero.draft || copy.closing.draft
```

Then in `Layout.astro`, add to the frontmatter:

```ts
import copy from '../copy/landing'
import { assertPublishable } from '../copy/schema'

// Enforced here rather than per page: with five routes, a gate that only one
// route runs is not a gate -- a spoke could ship draft copy through a green
// build.
assertPublishable(copy)

const hasDraftCopy = copy.hero.draft || copy.closing.draft
```

and remove `hasDraftCopy` from the `Props` interface and from the destructured `Astro.props`, since the layout now derives it.

- [ ] **Step 11: Confirm the gate actually fires from the layout**

```bash
# Temporarily mark the hero as draft.
sed -i '' 's/  hero: {/  hero: {\n    draft: true,/' sites/forensics/src/copy/landing.ts
yarn build:forensics
```

Expected: FAIL with `Refusing to build forensics for production: 1 copy block(s) still marked draft.`

Then revert:

```bash
sed -i '' '/^    draft: true,$/d' sites/forensics/src/copy/landing.ts
git diff --stat sites/forensics/src/copy/landing.ts
```

Expected: no diff against the Task 2 state.

- [ ] **Step 12: Build and compare output**

```bash
yarn workspace @rootsystem/forensics check && yarn build:forensics
```

Expected: both pass. Load `yarn dev:forensics` and confirm `/` shows the same sections in the same order as before, now under the masthead.

- [ ] **Step 13: Commit**

```bash
git add sites/forensics/src/components/ sites/forensics/src/pages/index.astro \
        sites/forensics/src/layouts/Layout.astro
git commit -m "refactor: extract the forensics page sections into components"
```

---

### Task 5: Spoke routes, expansion links, and root short form

The structural change itself.

**Files:**
- Create: `sites/forensics/src/components/ExpandLink.astro`
- Create: `sites/forensics/src/pages/{method,matters,engagements}.astro`
- Modify: `sites/forensics/src/pages/index.astro`

**Interfaces:**
- Consumes: every component from Task 4, and `copy.routes` from Task 2.
- Produces: three prerendered routes. Root's section components carry `id="method"`, `id="matters"`, `id="engagements"` (set in Task 4), which the spokes reuse harmlessly since only one section renders per spoke.

- [ ] **Step 1: Create `ExpandLink.astro`**

```astro
---
/**
 * The hub-to-spoke affordance.
 *
 * This link is the only thing distinguishing a summary from a truncation.
 * Without it a scanning reader takes the root page for an incomplete page
 * rather than a complete short form, which is the failure this whole
 * structure exists to avoid.
 */
interface Props {
  href: string
  label: string
}

const { href, label } = Astro.props
---

<p class="expand"><a href={href}>{label} &rarr;</a></p>

<style>
  .expand {
    margin: 2rem 0 0;
    font-family: var(--font-mono);
    font-size: 0.875rem;
  }

  .expand a {
    text-decoration: none;
    border-bottom: 1px solid var(--line);
    padding-bottom: 2px;
  }

  .expand a:hover,
  .expand a:focus-visible {
    border-bottom-color: var(--accent-2);
  }
</style>
```

- [ ] **Step 2: Create `method.astro`**

```astro
---
/**
 * The method spoke: why an opinion from this practice holds up, and what the
 * alternatives leave out. Pillars at full length plus the contrast table.
 */
import Layout from '../layouts/Layout.astro'
import copy from '../copy/landing'
import Pillars from '../components/Pillars.astro'
import Contrast from '../components/Contrast.astro'
import SiteFooter from '../components/SiteFooter.astro'
---

<Layout title={copy.routes.method.title} description={copy.routes.method.description}>
  <Pillars form="full" />
  <Contrast />

  <section class="wrap closing">
    <h2 class="measure">{copy.closing.headline}</h2>
    <a class="cta" href="/scope">{copy.closing.button} &rarr;</a>
    <p class="back"><a href="/">Back to the overview</a></p>
  </section>

  <SiteFooter />
</Layout>

<style>
  .closing {
    padding-bottom: 5rem;
  }

  .back {
    margin: 2rem 0 0;
    font-family: var(--font-mono);
    font-size: 0.875rem;
  }
</style>
```

- [ ] **Step 3: Create `matters.astro`**

```astro
---
/**
 * The matters spoke: the representative matter at full length.
 */
import Layout from '../layouts/Layout.astro'
import copy from '../copy/landing'
import CaseStudy from '../components/CaseStudy.astro'
import SiteFooter from '../components/SiteFooter.astro'
---

<Layout title={copy.routes.matters.title} description={copy.routes.matters.description}>
  <CaseStudy form="full" />

  <section class="wrap closing">
    <h2 class="measure">{copy.closing.headline}</h2>
    <a class="cta" href="/scope">{copy.closing.button} &rarr;</a>
    <p class="back"><a href="/">Back to the overview</a></p>
  </section>

  <SiteFooter />
</Layout>

<style>
  .closing {
    padding-bottom: 5rem;
  }

  .back {
    margin: 2rem 0 0;
    font-family: var(--font-mono);
    font-size: 0.875rem;
  }
</style>
```

- [ ] **Step 4: Create `engagements.astro`**

```astro
---
/**
 * The engagements spoke: what you can buy, what it costs, and the objections
 * that come up once a reader is looking at fees.
 */
import Layout from '../layouts/Layout.astro'
import copy from '../copy/landing'
import Services from '../components/Services.astro'
import Pricing from '../components/Pricing.astro'
import Faq from '../components/Faq.astro'
import SiteFooter from '../components/SiteFooter.astro'
---

<Layout
  title={copy.routes.engagements.title}
  description={copy.routes.engagements.description}
>
  <Services form="full" />
  <Pricing form="full" />
  <Faq />

  <section class="wrap closing">
    <h2 class="measure">{copy.closing.headline}</h2>
    <p class="measure">{copy.closing.body}</p>
    <a class="cta" href="/scope">{copy.closing.button} &rarr;</a>
    <p class="back"><a href="/">Back to the overview</a></p>
  </section>

  <SiteFooter />
</Layout>

<style>
  .closing {
    padding-bottom: 5rem;
  }

  .back {
    margin: 2rem 0 0;
    font-family: var(--font-mono);
    font-size: 0.875rem;
  }
</style>
```

- [ ] **Step 5: Switch root to short form with expansion links**

In `index.astro`, remove the `Contrast` and `Faq` imports and their elements — those live on spokes now — add the `ExpandLink` import, and replace the section block:

```astro
  <Positioning />

  <Pillars form="summary">
    <ExpandLink href="/method" label="The full method" />
  </Pillars>

  <CaseStudy form="summary">
    <ExpandLink href="/matters" label="Read the matter" />
  </CaseStudy>

  <Services form="summary" />

  <Pricing form="summary">
    <ExpandLink href="/engagements" label="Fees and objections" />
  </Pricing>
```

`Services` gets no expansion link of its own: it sits directly above `Pricing`, and two links to `/engagements` a few hundred pixels apart is noise.

- [ ] **Step 6: Build and verify the route set**

```bash
yarn build:forensics && ls sites/forensics/dist/client/
```

Expected: `index.html`, `method/`, `matters/`, `engagements/` present.

- [ ] **Step 7: Verify distinct titles**

```bash
grep -h -o '<title>[^<]*</title>' \
  sites/forensics/dist/client/index.html \
  sites/forensics/dist/client/method/index.html \
  sites/forensics/dist/client/matters/index.html \
  sites/forensics/dist/client/engagements/index.html
```

Expected: four different titles, matching `copy.meta.title` and the three `copy.routes.*.title` values.

- [ ] **Step 8: Verify the sitemap**

```bash
grep -o '<loc>[^<]*</loc>' sites/forensics/dist/client/sitemap-0.xml
```

Expected: five URLs — `/`, `/method/`, `/matters/`, `/engagements/`, `/scope`.

- [ ] **Step 9: Verify canonicals are per-route**

```bash
grep -h -o 'rel="canonical" href="[^"]*"' \
  sites/forensics/dist/client/method/index.html \
  sites/forensics/dist/client/matters/index.html
```

Expected: two different URLs, each matching its own route.

- [ ] **Step 10: Click through in the browser**

```bash
yarn dev:forensics
```

Confirm every masthead link and every `ExpandLink` resolves, `aria-current` marks the active route, root's `#method` / `#matters` / `#engagements` anchors jump to the right sections, and no page scrolls horizontally at 375px width.

- [ ] **Step 11: Commit**

```bash
git add sites/forensics/src/components/ExpandLink.astro sites/forensics/src/pages/
git commit -m "feat: split the forensics argument into method, matters and engagements"
```

---

### Task 6: Documentation and comment corrections

Small, but it is what stops the code and the specs from disagreeing.

**Files:**
- Modify: `sites/forensics/astro.config.mjs`
- Modify: `sites/forensics/public/robots.txt`
- Modify: `docs/forensics-ia-open-problem.md`

**Interfaces:**
- Consumes: nothing.
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Amend the D3 comment in `astro.config.mjs`**

Replace:

```js
// Deliberately a separate Astro application from sites/www rather than a route
// group: the buyer is different (litigators and IP counsel, not founders) and
// the visual identity is intended to diverge. See spec decision D3.
```

with:

```js
// Deliberately a separate Astro application from sites/www rather than a route
// group: the buyer is different (litigators and IP counsel, not founders). See
// spec decision D3.
//
// D3 also said the visual identity was intended to diverge. That half is
// amended by the 2026-08-08 IA spec: the properties now share typefaces, the
// logomark, masthead metrics, the accent and the layout tokens, and diverge
// only in the page interior.
```

- [ ] **Step 2: Rewrite the `robots.txt` comment**

Replace the comment block above `User-agent: *` with:

```
# forensics.rootsystem.com
#
# Crawling is open. The information architecture was settled by the 2026-08-08
# IA spec, and the launch gate is ship-now-learn-from-live, so there is no
# reason to hold the property out of search. If that ever changes, the change
# is `Disallow: /` here rather than per-page noindex tags.
```

- [ ] **Step 3: Mark the open problem resolved**

Change `docs/forensics-ia-open-problem.md`'s status line from:

```
Status: **open, blocking launch of forensics.rootsystem.com**. Recorded 2026-07-29.
```

to:

```
Status: **resolved 2026-08-08** by
`docs/superpowers/specs/2026-08-08-forensics-ia-design.md`, which chose the
complete-hub-with-expanding-spokes structure. Recorded 2026-07-29. Kept for the
reasoning trail; the spec is the current document.
```

- [ ] **Step 4: Build**

```bash
yarn build:forensics
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add sites/forensics/astro.config.mjs sites/forensics/public/robots.txt \
        docs/forensics-ia-open-problem.md
git commit -m "docs: amend decision D3 and close the forensics IA open problem"
```

---

### Task 7: The OG card

**Files:**
- Create: `docs/Brand/Social/rootsystem-forensics-social.svg`
- Create: `scripts/render-og-card.sh`
- Create: `sites/forensics/public/images/forensics-card.png`
- Delete: `sites/forensics/public/images/rootsystem-card.png`
- Modify: `sites/forensics/src/layouts/Layout.astro`

**Interfaces:**
- Consumes: the font files from Task 1 and the logomark path data from Task 3.
- Produces: `/images/forensics-card.png` at 1440×640, referenced by `Layout.astro` for all five routes.

**Why headless Chrome rather than `resvg`:** Tiempos ships as woff2 only. `resvg` and `rsvg-convert` want TTF or OTF and will silently substitute a fallback face, which would put the card in the wrong type without failing. Chrome loads the woff2 through `@font-face` exactly as the site does, so the card and the masthead render the same wordmark.

- [ ] **Step 1: Extract the logomark path data**

The card must carry the same paths as the live mark, not a redraw. Pull them mechanically rather than by hand — they are ten path strings and a transcription slip would be invisible until the card looked subtly wrong:

```bash
awk '/<g class="branches">/,/<\/g>/' sites/forensics/src/components/Logomark.astro \
  | sed 's|<g class="branches">|<g fill="#2f855a">|' \
  > /tmp/branches.svg
awk '/<g class="structure">/,/<\/g>/' sites/forensics/src/components/Logomark.astro \
  | sed 's|<g class="structure">|<g fill="#242b36">|' \
  > /tmp/structure.svg
head -c 120 /tmp/branches.svg && echo && head -c 120 /tmp/structure.svg
```

Expected: each file opens with `<g fill="…">` followed by a `<path d="M…`. If either is empty, the component's markup changed — read `Logomark.astro` and adjust the pattern.

- [ ] **Step 2: Author the card SVG**

Create `docs/Brand/Social/rootsystem-forensics-social.svg`, substituting the contents of `/tmp/branches.svg` and `/tmp/structure.svg` at the two marked points.

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="640" viewBox="0 0 1440 640">
  <!--
    Open Graph card for forensics.rootsystem.com, 1440x640 to match the
    dimensions Layout.astro declares.

    Light scheme only: Open Graph previews do not respond to a viewer's theme,
    so there is one card and it is the light one. Colours are the light-mode
    values of the forensics tokens, written as literals because an SVG has no
    access to the stylesheet -- this file is the one place a hardcoded colour
    is correct. Keep them in step with tokens.css by hand if they ever change.

    Rasterize with scripts/render-og-card.sh, which loads the real woff2 faces
    through headless Chrome. Do not export from a tool that substitutes fonts.
  -->
  <rect width="1440" height="640" fill="#ffffff"/>
  <rect x="0" y="612" width="1440" height="28" fill="#2f855a"/>

  <g transform="translate(96, 96) scale(0.55)">
    <!-- contents of /tmp/branches.svg -->
    <!-- contents of /tmp/structure.svg -->
  </g>

  <text x="240" y="150" font-family="Tiempos" font-weight="700" font-size="52"
        letter-spacing="-1.3" fill="#242b36">Root System</text>
  <text x="240" y="192" font-family="ui-monospace, Menlo, monospace"
        font-size="20" letter-spacing="2" fill="#7a8794">FORENSICS</text>

  <text x="96" y="380" font-family="Tiempos" font-weight="700" font-size="76"
        letter-spacing="-2" fill="#242b36">AI &amp; Machine-Learning</text>
  <text x="96" y="462" font-family="Tiempos" font-weight="700" font-size="76"
        letter-spacing="-2" fill="#242b36">Dispute Analysis</text>

  <line x1="96" y1="520" x2="1344" y2="520" stroke="#e6ebe8" stroke-width="2"/>

  <text x="96" y="568" font-family="Open Sans" font-size="26" fill="#4a5568"
    >Expert witness · Every finding is a query the other side can re-run.</text>
</svg>
```

The `viewBox` on the logomark group is dropped because the paths are placed directly; the `translate(96, 96) scale(0.55)` positions the mark's `76 46 248 308` crop at roughly 170px tall beside the wordmark. Adjust the scale in Step 5 if the mark reads too large or small against the type.

- [ ] **Step 3: Write the render script**

Create `scripts/render-og-card.sh`:

```bash
#!/usr/bin/env bash
#
# Rasterizes the forensics Open Graph card to PNG.
#
# Headless Chrome rather than resvg or rsvg-convert: Tiempos ships as woff2
# only, which those tools do not read -- they substitute a fallback face and
# succeed, producing a card in the wrong type with no error. Chrome loads the
# woff2 through @font-face exactly as the site does.
#
# Usage: scripts/render-og-card.sh
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
svg="$repo_root/docs/Brand/Social/rootsystem-forensics-social.svg"
fonts="$repo_root/sites/forensics/public/fonts"
out="$repo_root/sites/forensics/public/images/forensics-card.png"
chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT

[ -f "$svg" ] || { echo "missing $svg" >&2; exit 1; }
[ -x "$chrome" ] || { echo "missing Chrome at $chrome" >&2; exit 1; }

cp "$fonts"/Tiempos-Bold.woff2 "$fonts"/OpenSans-Regular.woff2 "$work/"

# The SVG is inlined into the document so the @font-face rules below apply to
# its <text> elements. A linked <img src="card.svg"> would not inherit them.
{
  printf '%s' '<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:"Tiempos";src:url("Tiempos-Bold.woff2") format("woff2");font-weight:700;}
@font-face{font-family:"Open Sans";src:url("OpenSans-Regular.woff2") format("woff2");font-weight:400;}
html,body{margin:0;padding:0;width:1440px;height:640px;overflow:hidden;}
svg{display:block;}
</style>'
  cat "$svg"
} > "$work/card.html"

"$chrome" \
  --headless \
  --disable-gpu \
  --hide-scrollbars \
  --force-device-scale-factor=1 \
  --window-size=1440,640 \
  --screenshot="$out" \
  "file://$work/card.html" 2>/dev/null

echo "wrote $out"
```

Then:

```bash
chmod +x scripts/render-og-card.sh
```

- [ ] **Step 4: Render the card**

```bash
scripts/render-og-card.sh && file sites/forensics/public/images/forensics-card.png
```

Expected: `PNG image data, 1440 x 640`.

- [ ] **Step 5: Look at it**

```bash
open sites/forensics/public/images/forensics-card.png
```

Confirm the wordmark is Tiempos and not a serif fallback — compare against the masthead in `yarn dev:forensics`. If the two differ, the `@font-face` did not load and the card must not ship. Adjust the `scale()` from Step 2 if the mark is out of proportion, then re-run Step 4.

- [ ] **Step 6: Point the layout at the new card and drop the old one**

In `Layout.astro`, change:

```ts
const ogImage = new URL('/images/rootsystem-card.png', Astro.site)
```

to:

```ts
const ogImage = new URL('/images/forensics-card.png', Astro.site)
```

Replace the comment above the `og:image` tag:

```astro
    <!-- Shares the main brand card for now. `summary_large_image` was already
         declared here with no image at all, which unfurls as a bare link; a
         forensics-specific card is worth commissioning. -->
```

with:

```astro
    <!-- One property-level card rather than one per route. Source SVG lives at
         docs/Brand/Social/rootsystem-forensics-social.svg; regenerate with
         scripts/render-og-card.sh after editing it. Per-route generated cards
         are the natural later improvement -- deferred because the build
         dependency is not worth it for five pages. -->
```

Then:

```bash
git rm sites/forensics/public/images/rootsystem-card.png
```

- [ ] **Step 7: Verify every route references the new card**

```bash
yarn build:forensics
grep -rho 'og:image" content="[^"]*"' sites/forensics/dist/client/ | sort -u
```

Expected: exactly one line, ending `forensics-card.png"`. Any hit for `rootsystem-card.png` means a route was missed.

- [ ] **Step 8: Confirm the old card is gone from the build**

```bash
ls sites/forensics/dist/client/images/
```

Expected: `forensics-card.png` present, `rootsystem-card.png` absent.

- [ ] **Step 9: Commit**

```bash
git add scripts/render-og-card.sh docs/Brand/Social/rootsystem-forensics-social.svg \
        sites/forensics/public/images/forensics-card.png \
        sites/forensics/src/layouts/Layout.astro
git add -u sites/forensics/public/images/
git commit -m "feat: give the forensics property its own Open Graph card"
```

---

### Task 8: Full verification and pull request

**Files:** none modified.

**Interfaces:**
- Consumes: everything.
- Produces: a pull request against `primary`.

- [ ] **Step 1: Clean build from scratch**

```bash
rm -rf sites/forensics/dist
yarn workspace @rootsystem/forensics check && yarn build:forensics
```

Expected: both pass, zero errors and zero warnings about missing copy.

- [ ] **Step 2: Walk the §11 checklist**

Run `yarn dev:forensics` and confirm each item, checking them off here:

- [ ] All five routes build; each has a distinct `<title>` and self-canonicalizes
- [ ] `sitemap-index.xml` resolves to five URLs — `/`, `/method`, `/matters`, `/engagements`, `/scope`
- [ ] Every expansion link and masthead link resolves; root's `#method`, `#matters`, `#engagements` anchors land on the right sections
- [ ] Skip link fires first on Tab from a fresh load; nav focus order is correct; `aria-current` marks the right route
- [ ] Both colour schemes across all five routes (toggle the OS appearance setting), narrow viewport at 375px with no horizontal body scroll
- [ ] `/scope` renders the masthead without its CTA, and the old eyebrow back-link is gone
- [ ] All five routes reference `forensics-card.png`, and the export is 1440×640

- [ ] **Step 3: Confirm the form still works**

Submit the `/scope` form in dev with a real description. Expected: redirect to `/scope?sent=1` and the thanks state. This route was touched in Task 3, so it needs a live check rather than an assumption.

- [ ] **Step 4: Confirm the main site is untouched**

```bash
yarn build:www && git status --short sites/www/
```

Expected: build passes; `git status` shows no modifications under `sites/www/` — the font files were copied out of it, not moved.

- [ ] **Step 5: Push and open the pull request**

```bash
git push -u origin rob/forensics-ia
gh pr create --base primary --title "Forensics information architecture" --body "$(cat <<'EOF'
Implements `docs/superpowers/specs/2026-08-08-forensics-ia-design.md`.

Splits the forensics property from one undifferentiated page into a
self-sufficient root plus three expanding spokes — `/method`, `/matters`,
`/engagements` — and pulls its chrome and type onto the rootsystem.com brand.

- Short and long form live as `summary` and `body` on the same object, both
  required by the schema, so drift is visible on adjacent lines and a missing
  short form fails the build.
- A masthead, a skip link, and an internal link graph, none of which the
  property had.
- Tiempos and Open Sans self-hosted, the shared logomark, masthead metrics
  matched to the main site's header, and the light accent corrected to
  primary-600.
- Its own Open Graph card, replacing the generic company card that was
  byte-identical across both properties.
- Amends decision D3, whose visual-divergence half this reverses.

DNS is deliberately unchanged — `forensics.rootsystem.com` stays unrouted until
there is something worth routing to.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_01GjpTQZ9v6ye3rag9UkkVB4
EOF
)"
```

- [ ] **Step 6: Confirm CI is green before requesting review**

```bash
gh pr checks --watch
```

Expected: `changes`, `deploy (www)`, and `deploy (forensics)` all pass. The PR runs `wrangler versions upload`, which takes no traffic. Do not merge without Rob — merging runs `wrangler deploy` and is a production event.
