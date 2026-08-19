# Forensics site positioning — decision record

**Decided 2026-08-19 by Rob Jacques: Variant D, vetting-first.** PR #58, based on the
shared copy base in PR #54. Nothing merged.

This is the repo-side record. The full evidence set — market research, all four
variants, the adversarial review, the discoverability audit, and the open items — lives
in Rob's Obsidian vault at:

```
New-products-projects-development/Forensics-Expert-Witness-GTM/2026-08-positioning-decision/
```

Start with `decision-record.md` there. This file exists so someone reading the codebase
understands why the copy says what it says without needing vault access.

## What was decided

The site does not argue a technology category. It answers the checklist a retaining
attorney already uses, states the work in the hero, and publishes the rates.

The evidence: two of the four closest comparables — Barr Group and Sidespin Group —
publish attorney-facing guides on selecting a software or source-code expert witness,
and both name the same five criteria.

1. Hands-on depth in the exact technology at issue
2. Real litigation experience with the kind of evidence in question
3. A testimony record that has held up under oath
4. Genuine independence
5. The ability to teach the technology to a non-technical jury

Four of the five were unclaimed anywhere on the property. The buyer's own suppliers
publish the rubric the buyer uses, which made it the strongest evidence available and
better than a taste-based choice between the three earlier variants.

## History this supersedes

- **2026-08-09** — AI/ML was the single category claim, leading every page and title.
- **2026-08-11** — Reversed after a paralegal review found an AI-led hero reads as an
  AI-*only* practice and would turn away qualified matters. AI/ML became one of four
  peer practice areas, and three competing copy variants were built on a shared base.
- **2026-08-19** — A market scan produced a fourth variant, which was selected.

The superseded decision is recorded rather than deleted in the variant's
`.agents/product-marketing.md`, because the argument for one clear category claim is
still the best case against the current direction.

## What changed in the code

**Shared base (PR #54)** — inherited by every variant:

- New objection answer, "Did AI write this report?", claiming disclosure plus
  reproducibility rather than abstinence. Prompt logs are discoverable work product and
  AI disclosure is becoming a standing vetting question; a practice whose category claim
  is *analysis of AI systems* is unusually exposed to the confusion.
- Base rate $400 → $450, against a published all-specialty average of $465. Modifiers
  hold their percentages: $675 expedited, $563 testimony.
- Assessment copy recut. The price did not change — $2,500 sits on the modal
  minimum-fee floor (74% of experts require a minimum; 40% set it at $2,500–$4,999), so
  the fixed scope and written deliverable are now stated against what the market does
  with the same figure.
- Bench intro claims the jury-teaching criterion.
- `pillarsHeading` made copy-driven and optional, defaulting to the previous string, so
  a positioning variant can reframe what the five pillars answer without any other
  variant changing.

**Variant D (PR #58)** — copy only:

- Hero states the work, then the vetting hook.
- Positioning lists all five criteria, claims four with what each rests on, concedes the
  fifth, and states the analysis-not-acquisition boundary.
- Practice-areas heading carries the disciplines; the vetting cue sits in the eyebrow.
- The five pillars keep every substantive claim and body; each title names the criterion
  it satisfies.

## Standing constraints on this copy

These govern any future edit and are not negotiable without Rob's involvement.

- **Analysis, never acquisition.** The bench analyzes ESI, metadata, logs, file systems,
  source code and model behavior. It does not image, preserve, collect, or recover. Any
  copy implying otherwise is wrong — this is a capability boundary, not positioning.
- **No credentialed-examiner claim.** Engineers and product leaders, not ABFDE/IAI/ACFE
  examiners or licensed PEs.
- **Testimony volume is thin and stays unclaimed.** Copy concedes it rather than
  dressing it up.
- **Copy is discoverable and quotable.** Under FRE 702 as amended in 2023, overclaiming
  is impeachment material. Sophisticated buyers also read overclaiming as inexperience,
  so the conservative version converts better — the safe copy and the persuasive copy
  are the same copy here.

## Known-bad sentences from the unselected variants

A three-model review flagged these. Recorded so they do not get reintroduced when those
branches close.

| Variant | Sentence | Problem |
|---|---|---|
| C | "run the test that settles the question… and get the same answer" | Conclusiveness promise plus a concordance guarantee. For ML systems with nonzero temperature the second half is also literally untrue. |
| C | "hold that position against an expert saying the opposite" | Implies a testimony record the practice does not have. |
| A | "Most experts answer one of those" | Unsupportable claim about the whole expert population, asserted in a document whose hero word is "asserted." |
| A | "Academics study systems they have never shipped" | Quotable disparagement; opposing experts are frequently academics. |
| B | "reads a trained system as a black box" | Characterizes identifiable comparables whose experts will oppose us. |

## Open, tracked in the vault

- Facts the copy declines to invent: matters-worked count, bench depth figures, `sameAs`
  identity links, phone, service-area geography.
- Testimony-history publication — counsel's call, not marketing's.
- Structural SEO gaps, all in the shared base: no JSON-LD anywhere, no jurisdiction
  signal, no CV page, four practice areas sharing one URL.
- `NOTIFY_CC` still unverified against a live preview submission; Turnstile blocks a
  headless attempt.
- No attorney discovery interviews have been run. Every persona claim downstream of the
  published criteria is inferred and marked as such.
