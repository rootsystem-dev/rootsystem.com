# Forensics information architecture — design

Resolves `docs/forensics-ia-open-problem.md`. Track 2 of `docs/roadmap.md`.

Status: **approved 2026-08-08**. Supersedes nothing; amends decision D3 (see §7).

## 1. The problem being solved

`forensics.rootsystem.com` puts every argument on one page in sequence, with no
structure organizing it. A reader cannot orient, skip, or find the part that
applies to them. The copy is good and stays; the visual direction (A, "Show Your
Work") was chosen on the merits and stays. What changes is how the argument is
divided across URLs, and how a reader moves between them.

## 2. Constraints that shaped the design

Established during the 2026-08-07 and 2026-08-08 brainstorm sessions:

- **Entry paths are referral or warm intro, expert-witness directory bio, and
  organic search** — deliberately not outbound collateral. The root page must be
  self-sufficient for a referral reader who scans and never clicks, while search
  still needs distinct URLs with their own titles.
- **What closes is unknown.** Method and case study are the presumed strongest,
  then the contrast table, with pricing lowest — but this is a guess, and the
  page is a confirmation close rather than a cold sell. The structure must be
  cheap to reorder.
- **A/B testing is not viable.** Traffic is dozens of visits a month, and
  PostHog is not instrumented (roadmap track 5, unstarted). The structure cannot
  be chosen by experiment.
- **Ship now, learn from live.** Attorney discovery interviews run in parallel
  rather than blocking the hostname.
- **Progressive/scroll reveal is rejected.** It hard-codes an argument order at
  the moment that order is unknown, and adds a JavaScript dependency to a
  property whose whole claim is reproducibility.

### Competitive scan

A pass over the four closest comparables — Barr Group, Quandary Peak, Eureka
Software, Sidespin Group — found no single-page sites. All four are multi-page
with per-expertise-area landing pages, the smallest running roughly fifteen
pages. None publishes pricing.

Two qualifications on that finding. First, those are firms with many experts and
many practice areas, so their page count is driven by per-area SEO landing pages
rather than by argument structure; it establishes that single-page is not the
norm, but does not by itself justify any particular route count here. Second, no
genuine solo-practitioner comparable surfaced — everything found was a firm or a
directory.

One incidental finding bears on the entry-path assumption: JurisPro does not
link out to experts' own sites at all. Profiles stay on the directory's domain
as 50–80 word blurbs, and "Learn More" leads to another JurisPro page. If that
is the general pattern, a directory reader must search the expert's name
separately, which shifts weight onto organic search. SEAK returned HTTP 403 and
could not be checked.

## 3. Route structure

Approach A — complete hub, expanding spokes.

| Route | Contents |
| --- | --- |
| `/` | hero, positioning, every argument in short form, closing |
| `/method` | pillars (full) + contrast table |
| `/matters` | case study (full) |
| `/engagements` | service modes + pricing tiers + FAQ |
| `/scope` | intake form — unchanged |

`services` sits on `/engagements` rather than `/method`: modes, pricing, and
objections together answer "what can I buy and what does it cost," while
`/method` answers "why should I believe this."

Rejected alternatives:

- **One page with an anchor rail.** Cheapest by a wide margin and it does fix
  orientation, but one URL and one title means organic search gets nothing.
- **Landing plus one deep page.** Two routes, but the deep page becomes a
  grab-bag, reproducing the no-architecture problem at smaller scale.

## 4. Content model

Copy already lives as validated data in `sites/forensics/src/copy/landing.ts`
against a Zod schema in `src/copy/schema.ts`, and no text is hardcoded in
markup. This is a routing and content-model change, not a copy migration.
Chrome labels — navigation, expansion links, and back links — are an exception
and live in markup: they are wayfinding for a specific page rather than argument
copy shared between a root summary and its spoke.

Short and long form are **not** separate files or duplicated blocks. Each block
gains a `summary` field beside its existing `body` in the same object:

```ts
pillars: [
  {
    title: 'Reproducible, not assertive.',
    summary: 'Findings are a query plus its output.',
    body: 'Findings are a query plus its output — re-runnable by opposing counsel…',
  },
]
```

Root renders `summary`; the spoke renders `body`. The two sit on adjacent lines
in one file, so drift is visible on sight rather than across files. `summary` is
required by the schema, so adding a pillar without a short form fails the build.

The schema also gains a `routes` object with `method`, `matters`, and
`engagements` entries, each `{ title, description }`. Per-route metadata is the
entire SEO argument for this structure, so it is validated rather than optional.

## 5. Navigation

No navigation exists today. `Layout.astro` has none, `index.astro` opens at the
hero, and `/scope` carries a single back-link in an eyebrow.

A persistent masthead lives in `Layout.astro` so every route inherits it:

```
Root System        Method   Matters   Engagements
Forensics                            [ Scope a case → ]
```

- Plain anchor elements. No JavaScript, no dropdown, no hamburger — four items
  wrap at narrow widths. This is the same reasoning that rejected scroll-reveal:
  a property arguing reproducibility should not need a script to show its menu.
- The current route carries `aria-current="page"`.
- A skip link precedes it. `base.css` styles `:focus-visible` but has no skip
  target today.

On `/`, each short-form section carries an `id` matching its spoke — `#method`,
`#matters`, `#engagements` — so a referral email can deep-link one argument
without leaving root. Each short-form section ends with a single expansion link
("The full method →", "Read the matter →", "Fees and objections →"). That link
is the only thing distinguishing a summary from a truncation; without it, a
scanning reader reads root as an incomplete page rather than a complete one.

Each spoke carries the same masthead, a `/scope` call to action at the bottom,
and a return link to root. No breadcrumbs — two levels does not earn them.

`/scope` inherits the masthead too, since it already renders through
`Layout.astro`. Its own eyebrow back-link becomes redundant and is removed. The
masthead's "Scope a case" button is suppressed on that route — the reader is
already there — while the nav links stay. A form page with no way out is a trap,
and the risk of a half-filled form being abandoned via the nav is smaller than
the risk of a reader who wants to check the method first having no route to it.

The masthead does place chrome above a hero that was approved with none. That is
the unavoidable cost of four routes. The alternative — navigation on spokes
only — makes root the one page that cannot be navigated from, which is backwards
given root is where most readers land.

## 6. Brand convergence

The property should read as the same brand as `rootsystem.com` without matching
it. Current divergence:

| | rootsystem.com | forensics (before) |
| --- | --- | --- |
| Headings | Tiempos, self-hosted | `ui-serif` system stack |
| Body | Open Sans, self-hosted | `system-ui` |
| Light accent | `#2f855a` (primary-600) | `#276749` |
| Dark accent | `#48bb78` / `#68d391` | identical — already aligned |
| Foreground | `#24272b` | `#242b36` |
| Dark background | `#000000` | `#14181d` |
| Page max | `72rem` | `1080px` |
| Gutter | `--gutter: 1.75rem` | `24px`, hardcoded in `index.astro` |
| Logomark | `Logomark.astro` | none |

Converging:

1. **Typefaces.** Tiempos and Open Sans, self-hosted, with the same `@font-face`
   declarations. The three Tiempos woff2 files and both Open Sans weights are
   copied into `sites/forensics/public/fonts/`. The Tiempos license was
   confirmed on 2026-08-08 to cover the second hostname. Mono stays a system
   stack, as it is on the main site.
2. **Brand lockup.** `Logomark.astro` is reused in the masthead with "Root
   System" in Tiempos 700 / `-0.025em` at `--text-xl` rising to `--text-2xl`,
   and "Forensics" as a muted qualifier beneath.
3. **Masthead metrics.** Padding `0.75rem`, rising to `1.75rem` from 48em. Nav
   at `--text-sm`, uppercase, weight 400, `1.5rem` gap, muted foreground
   resolving to full foreground on `aria-current`.
4. **Light accent** moves to `#2f855a`, closing the one green that diverged.
5. **Layout tokens** — `--page-max: 72rem`, `--gutter: 1.75rem`, and the
   hardcoded `24px` is removed.

Staying distinct: the page interior. Hero-as-query, the proof motif, the pillars
grid, the contrast table. Direction A was chosen on the merits (decision D11)
and this does not reopen it. Convergence covers chrome and type, not argument.

Dark neutrals stay at `#14181d` rather than converging to the main site's pure
black. Forensics' dark tokens were contrast-checked against this background
(muted 4.9:1, accent 7.4:1); moving to black would require re-deriving every
value, and the two properties are rarely open side by side.

Two corrections to existing comments, both currently inaccurate:

- `src/styles/tokens.css` claims A's `#276749` "is the same green the main site
  uses for primary-600." It is not; primary-600 is `#2f855a`. The dark greens do
  match. The comment is corrected along with the value.
- `src/copy/landing.ts` states that the hero and closing blocks carry
  `draft: true`. Neither sets it, so the publish gate is currently open. The
  comment is corrected to describe actual state.

## 7. Amendment to decision D3

`astro.config.mjs` records decision D3 as keeping forensics a separate Astro
application because "the buyer is different… and the visual identity is intended
to diverge."

The separate-application half of D3 stands and is unaffected. The
visual-divergence half is amended by this spec: the properties converge on type,
brand lockup, chrome metrics, accent, and layout tokens, while diverging on page
interior. The comment in `astro.config.mjs` is updated so the code and the specs
do not disagree.

## 8. File structure

`index.astro` is 289 lines — every section inline, plus a 137-line style block.
Four routes cannot share that.

```
src/components/
  Masthead.astro       nav + brand lockup (new)
  SiteFooter.astro     extracted from index.astro
  Logomark.astro       copied from sites/www/src/components/
  ExpandLink.astro     "The full method →"
  Positioning.astro
  Pillars.astro        form: 'summary' | 'full'
  CaseStudy.astro      form: 'summary' | 'full'
  Services.astro
  Pricing.astro
  Contrast.astro
  Faq.astro
```

Each component owns its scoped style; the monolithic style block is distributed
to the rules' actual owners. Route files become composition only, taking
`index.astro` from 289 lines to roughly 40.

On the `form` prop: short and long form are the same markup shape reading a
different field, not two different layouts. One component with a field switch is
therefore honest here rather than two components hidden behind a flag.
`Services`, `Pricing`, `Contrast`, and `Faq` each appear on one route and take
no prop.

`assertPublishable(copy)` moves from `index.astro` to `Layout.astro`. With four
routes, a gate enforced by one route is not a gate — a spoke could ship draft
copy through a green build.

## 9. Search and publication surface

Working already, no change needed:

- **Canonical** is derived from `Astro.url.pathname` in `Layout.astro`, so each
  route self-canonicalizes.
- **Sitemap** — `@astrojs/sitemap` picks up prerendered routes automatically.

No canonical cross-tagging is required. `summary` and `body` carry different
text, so root and spoke are not duplicates and there is nothing to disambiguate.
The earlier framing of this approach listed canonical tags as a cost; that was
wrong. The surviving cost is drift vigilance, which §11 makes mechanical.

To build:

- Per-route titles and descriptions from the `routes` schema object. Three
  additional titles competing for three different queries is the SEO case for
  this structure.
- An internal link graph. Nothing on this property links to anything today; the
  masthead plus per-section expansion links is what makes spokes discoverable to
  a crawler.
- A forensics OG card. See below.

### OG card

Everything in the Open Graph block is already property-specific except the
image: `og:site_name` is "Root System Forensics", and title and description come
from forensics copy per route. The image is the single shared artifact —
`rootsystem-card.png` is byte-identical across `sites/forensics`, `sites/www`,
and `docs/Brand`. A referral link to this property currently unfurls in an
attorney's inbox showing the generic company card.

Four routes make that worse rather than neutral: `/`, `/method`, `/matters`, and
`/engagements` would all preview identically, so sharing one specific argument
loses the specificity that splitting them was meant to create.

One property-level card, not four. It is authored as an SVG committed to
`docs/Brand/Social/`, exported to `sites/forensics/public/images/` as a
1440×640 PNG — the dimensions `Layout.astro` already declares. It uses the
forensics tokens, the Tiempos wordmark, and the existing logomark path data, so
it inherits the §6 convergence rather than introducing a separate visual
language. Committing the SVG source keeps it re-editable; a PNG alone would be a
dead end the next time the copy changes.

The card is light-scheme only. Open Graph previews do not respond to a viewer's
theme preference, so there is one card and it is the light one.

Favicons stay identical to the main site's. A favicon is the company mark rather
than a property identity, and §6 pulls the two properties together rather than
apart.

Per-route generated cards — build-time generation giving each spoke its own
title in the preview — are the natural later improvement. They were considered
and deferred: the machinery adds a build dependency to a property that currently
has three, which is not worth it for four pages.

`robots.txt` stays `Allow: /`. The launch gate is ship-now-learn-from-live, and
the condition its current comment describes — an unresolved IA — is satisfied by
this work. The comment is rewritten accordingly.

## 10. Out of scope

- **DNS.** `wrangler.jsonc` declares no routes, so the property is workers.dev
  only and `forensics.rootsystem.com` has no DNS record. Deliberate — the
  hostname is not published until there is something worth routing to. Adding it
  is a launch step after this work lands.
- **Direction B tokens.** `tokens.css` still carries the unselected direction B
  block. Removing it is a simplification unrelated to this change.
- **Copy rewrites.** The existing copy carries over unchanged apart from new
  `summary` fields.

## 11. Verification

No test infrastructure exists in either workspace — no vitest, no Playwright, no
test files. Verification today is `astro check` and `astro build`. This change
extends the existing build-time gate rather than standing up a runner it does
not justify.

Build-time, all Zod:

- `summary` required on every pillar and on the case study. A sixth pillar
  without a short form fails the build.
- `routes` requires `{ title, description }` for each spoke. A spoke cannot ship
  without its own title.
- `assertPublishable` enforced from `Layout.astro`, covering all four routes.

Manual, run against `astro build` output before merge:

- All five routes build; each has a distinct title and self-canonicalizes.
- `sitemap-index.xml` lists five URLs — `/`, `/method`, `/matters`,
  `/engagements`, `/scope`.
- Every expansion link and masthead link resolves; root's `#method`, `#matters`,
  and `#engagements` anchors land on the right sections.
- Keyboard: skip link fires first, nav focus order is correct, `aria-current`
  marks the right route.
- Both colour schemes across all five routes; narrow viewport with no horizontal
  body scroll.
- `/scope` renders the masthead without its call-to-action button, and its old
  eyebrow back-link is gone.
- All five routes reference `forensics-card.png`, not `rootsystem-card.png`, and
  the exported PNG is 1440×640 to match the declared dimensions.

Future, not now: once the property carries traffic and more than four routes, a
small Playwright smoke suite asserting the link graph and per-route titles is
the natural addition. It is the check that gets expensive by hand as routes
multiply, and not worth standing up for four pages.
