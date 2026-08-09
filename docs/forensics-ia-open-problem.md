# Forensics property — information architecture is unresolved

Status: **resolved 2026-08-08** by
`docs/superpowers/specs/2026-08-08-forensics-ia-design.md`, which chose the
complete-hub-with-expanding-spokes structure. Recorded 2026-07-29. Kept for the
reasoning trail; the spec is the current document.

## The problem

Reviewed against the workers.dev deployment. The verdict was that the content is
good and the structure is not: everything sits on one page, in sequence, with no
architecture organizing it. A reader has no way to orient, skip, or find the part
that applies to them — the page asks them to read all of it or none of it.

This is a strategy problem, not a styling problem. Fixing it by adjusting spacing
or type would be treating the symptom. It needs a decision about how the argument
is structured before any markup changes.

## What is not the problem

- **The copy.** It was explicitly called out as good. Whatever structure gets
  chosen should carry the existing content over, not trigger a rewrite.
- **The visual design.** Direction A was selected on the merits (decision D11,
  commit `0ed72da`) and the dark scheme has since been added. Both are settled.

## Directions raised, none chosen

- **Multiple pages** — split the pillars into routes so each has its own URL,
  title, and entry point from search. Best for SEO and for linking to one
  specific argument; costs the single-scroll narrative.
- **Progressive / scroll reveal** — keep one page, disclose sections as the
  reader advances. Preserves the narrative; adds motion and a JavaScript
  dependency to a property whose whole argument is reproducibility.
- **Something else.** Explicitly left open — the shape was described as "not
  there yet" rather than as any particular one of these.

## Current structure, for reference

Two routes today:

- `/` — hero (a query and its output), pillars, case study, FAQ, closing CTA
- `/scope` — fixed-fee assessment intake form, writing to D1 `case_intake`

The section furniture that already exists and can be reused by any structure:
`.eyebrow`, `.proof` (the re-runnable-finding motif), `.cta`, and one-`section`
-per-argument with a top rule.

## Before this ships

- Decide the structure, then re-lay the existing copy into it.
- `robots.txt` currently allows crawling. Nothing links to the property yet, so
  it is not effectively public, but if it should stay out of search until the
  structure lands, set `Disallow: /` there.
- The property shares the main brand's OG card. A forensics-specific card is
  worth commissioning before it is promoted anywhere.
