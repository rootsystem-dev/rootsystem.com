# Product Marketing Context

**Document version:** v7-D (vetting-first variant)
**Last updated:** 2026-08-19

Scope: the Root System Forensics property (`forensics.rootsystem.com`, source at
`sites/forensics/`). The parent consultancy at `rootsystem.com` is a different
buyer and is out of scope for this document except where the brand is shared.

Items marked **[INFERRED]** were drafted from the codebase, specs, and copy deck
rather than stated by Rob. They are the first things to correct.

Primary sources outside this repo: the `Forensics-Expert-Witness-GTM` folder in
Rob's Obsidian vault (Dropbox) — `offering-scope.md`, `rate-card.md`,
`icp-target-list.md`, `messaging-worksheet.md`, `market-landscape.md`,
`landing-copy.md`. Tracked in Linear under project *Forensics and Expert Witness
Services* (ROBOPS).

## Product Overview

**One-liner:** Technical expert-witness analysis of what a system actually did,
where every opinion is a query the other side can re-run — and where the things
counsel screens an expert on are answered on the page rather than on the call.

**What it does:** Technical analysis of what an AI or machine-learning system
actually did — how it was built, what data it used, whether it performed as
claimed. Findings are stated as a reproducible experiment (a query plus its
output) rather than as expert assertion, so opposing counsel can replicate them.
Delivered as rebuttal, affirmative analysis and testimony, non-testifying
consulting, or an early-case merits screen.

**Product category:** Expert witness / litigation support, AI & machine-learning
specialty. The "shelf" is expert-witness directories (JurisPro, SEAK) and
attorney referral networks, not software categories.

Scope is product and technology across four peer practice areas — software and
source code, data and systems evidence, AI and machine learning, and software
failure and performance. AI/ML is one of the four rather than the category
claim; see the superseded scope decision under **The Bench** for why that
changed. In this variant the areas are presented as the answer to counsel's
first screening question — whether the expert has hands-on depth in the
technology the case turns on.

**Product type:** Professional services, delivered by a Root System practice
group — a bench of roughly a dozen experts assembled per matter, not a single
practitioner. The "we" throughout the site copy is literal. See **The bench**
below.

This is newer than the site copy. Several lines still read as a
single-practitioner practice ("the practitioner who builds these systems," the
"Built by a builder" pillar, the "You've testified once" FAQ), which understates
the bench. Copy revision is agreed and pending.

**Business model:** Fixed-fee on-ramp into hourly engagement.

| Tier | Price | What it is |
|---|---|---|
| AI-Dispute Assessment | $2,500 flat, up to 10 hours | Fixed-scope reproducible-experiment analysis plus a written assessment of the claim and its strength. Credited against a full engagement. |
| Full Engagement | $450/hr plus retainer | Live matter through analysis, expert report, and testimony. Expedited turnaround and deposition/trial testimony billed at a premium; large or long-running matters eligible for volume rates. |

Rate modifiers, published on `/engagements` as of 2026-08-09. They apply to the
hours they cover, not to the whole engagement.

| When | Adjustment | Rate |
|---|---|---|
| Expedited turnaround | +50% | $675/hr |
| Deposition and trial testimony | +25% | $563/hr |

**They do not stack — the higher rate governs those hours** (Rob, 2026-08-09,
closing the open item in the rate card).

Publishing pricing at all is a deliberate divergence: the competitive scan found
none of the four closest comparables publishes rates.

**Rate benchmark (2026-08-19).** The base moved from $400 to $450 against the
ExpertPages 2026 survey, which puts the all-specialty average expert hourly fee
at $465, up from $451 in 2024, with a reported range from under $200 to over
$1,500 and engineering and finance experts typically $300–600. Because this
practice publishes its rates and the comparables do not, a below-average number
is a public signal rather than a negotiating position, and raising a published
rate later is harder than starting at market and conceding privately — which is
what the held-back volume adjustment already exists to do. $450 sits inside the
engineering band without claiming a premium the testimony record cannot yet
carry; the ladder toward $700 still runs off accrued testimony.

Note the arithmetic: +25% of $450 is $562.50, published as $563. If a rounder
card is wanted, a $440 base yields exactly $660 and $550 at the same
percentages. Open item for Rob.

**Assessment benchmark (2026-08-19).** The same survey reports 74% of experts
require a minimum fee to accept an engagement, and 40% of those set it between
$2,500 and $4,999. The $2,500 assessment therefore sits on the modal
minimum-fee floor and does not read as distinctive on the number alone. The
differentiator is the fixed scope and the written deliverable, and the copy now
states that against what the market does with the same figure rather than
leaving the reader to infer it.

**Held back deliberately — do not put these in public copy.**

- **The volume adjustment** (−25%, $300/hr, large scope or long time horizon).
  It exists, but publishing a discount invites every enquiry to argue it
  qualifies. Handled in conversation against an internal bar for "long horizon"
  that is not yet written down. The page says such matters are quoted against a
  volume rate and invites the ask, without naming the number.
- **That the base rate is negotiable early.** List price is what is held
  publicly.
- **The assessment's effective hourly** (~$250) and its role as a budget-fit
  front door rather than the margin engine.
- **The rate ladder** toward $450–$700+ as testimony history accrues.

The Tier-2 retainer amount is still unset in the rate card and appears nowhere
public, which is consistent — the site says "retainer plus hourly" and stops.

## The Bench

About a dozen experts, drawn from the consultancy's fractional-executive
practice. Presented as a bench rather than as named profiles — individual expert
pages are the later move if a niche justifies them.

**Fractional CTOs:** computer science, machine-learning architecture,
experimentation and research, information security, distributed systems.

**Fractional CPOs:** usability and user experience, product strategy, user
research, product analytics and experimentation, product operations and
delivery, growth and monetization.

**Where the method comes from.** The consultancy builds product for companies
that have no established business model yet. That work makes experimentation and
analytical data collection a first-class outcome rather than a reporting
afterthought — a business model cannot be found by assertion. The
reproducible-experiment method sold to litigators is the same discipline these
teams run daily for startup leaders, not a technique invented for court. This is
the strongest available answer to "aren't you a hired gun," and it is currently
absent from the site.

**How a matter is staffed.** Rob is on every matter: he runs the intake, sets
the strategic approach, assembles the team to meet it, stays with the work, and
participates technically as one of the experts. Experts are brought in against
the approach rather than assigned off a rota. The intake process itself — learn
the situation, determine the strategic approach, then staff it — is a described
process no comparable publishes.

**Testimony.** Most of the bench will agree to testify where a matter requires
it, at a premium. Testimony volume is thin across the practice and is
deliberately not a selling point — the expertise is the claim, not the mileage.

**What the bench buys counsel:** a cross-functional read. A dispute over what a
system did rarely stays inside one discipline — it touches how the system was
architected, what data it collected, how the product presented itself to users,
and what the metrics were defined to mean. A single expert covers one of those.
The whole team collaborates on strategic approach, covering the ways technology
is built, implemented, and used, with the same focus on deterministic evidence
and outcomes.

**Scope decision (2026-08-09) — SUPERSEDED.** The earlier decision made AI/ML
the lead pillar on every page and every title, with the bench's breadth shown
as depth behind that lead rather than as peer practice areas. It was reversed
on 2026-08-11 after a paralegal review (Lauren Cirina, OWD) found that an
AI-led hero reads as an AI-only practice and would turn away matters the bench
is qualified for. It is recorded here rather than deleted because the reasoning
behind it — one clear category claim beats four hedged ones — is still the
strongest argument against the reversal.

**Scope decision (2026-08-19), this variant.** Four peer practice areas, and
the site organized as a vetting instrument rather than as a positioning
argument. The organizing insight is that counsel screening a technical expert
works from a stable and publicly documented checklist — the two closest
comparables that publish attorney-facing selection guides, Barr Group and
Sidespin Group, name the same criteria: hands-on depth in the exact technology
at issue, real experience with the kind of evidence in question, a testimony
record that has held up, genuine independence, and the ability to make the
technology legible to a non-technical audience. Four of those five were
unclaimed anywhere on this property.

So this variant does not argue a category. It answers the checklist in order,
labels the sections as the screening questions they answer, and puts the rates
on the page. The wager is that for a partner with a deadline, a site that lets
them rule an expert in or out without a call is worth more than a site that
makes the strongest possible claim. Its failure mode is the opposite of the
AI-lead variant's: where that one risked being too narrow to be retained, this
one risks reading as a vendor questionnaire with no point of view.

AI and machine learning stays one area of four, in third position — present as
depth, never as the gate on the other three. The fractional-CPO disciplines
stay part of the cross-functional read rather than standalone service lines.
No product-side landing pages, no second category claim.

**What the market scan added (2026-08-19).** AI disclosure became a standing
vetting question for retained experts this month: prompt logs are discoverable
work product and are being subpoenaed, and directories have begun tracking
disclosure as its own screening axis. That is a live hazard for a practice
whose category claim is the analysis of AI systems, and it is an independent
argument against leading with AI regardless of which variant wins. It is also
the strongest available evidence for the reproducibility pillar: an opinion the
other side can re-run is an opinion nobody has to take on faith. The
`Did AI write this report?` answer added to the shared base is the direct
response, and this variant treats it as a first-class screening question rather
than as an objection buried at the bottom of the fees page.

## Target Audience

**Target companies:** US litigators and IP/technology counsel handling disputes
that turn on what an AI or ML system actually did — how it was built, trained,
what data it used, whether it performed as claimed.

**Horizontal by decision, not by default.** "AI-dispute analysis," not a single
vertical. Named subfoci emerge later from customer-call data rather than being
picked up front; staying horizontal keeps referral doors open while the network
is thin.

Densest demand, from the docket and firm-page research in the GTM workspace
(~40 verified firm rows, compiled 2026-07-16):

| Vein | Why it fits | Who |
|---|---|---|
| Plaintiff GenAI copyright / training data | Must prove how a model was built and what it ingested — exactly this lane. The single richest vein. | Joseph Saveri, Susman Godfrey lead most active training-data cases |
| Plaintiff AV / driver-assist wrongful death | Turns on telemetry, perception, and decision-system forensics | Singleton Schreiber; copycat wave after the Benavides v. Tesla Autopilot verdict |
| Algorithmic-hiring class actions | In live discovery now, needs affirmative ML and statistics experts; small plaintiff firms most likely to source an outside expert | Mobley v. Workday, Huskey v. State Farm |
| AI-washing securities plaintiff firms | Cleanest cold channel — their playbook already pairs ex-engineers with ML experts to survive motions to dismiss | Hagens Berman, Pomerantz, Rosen |

Defense-side buyers are equally identified (Latham, MoFo, Keker, Orrick,
Crowell) and are the denser spend, but the plaintiff boutiques are the more
reachable first sale for a practice with a thin referral network.

Directories are the discoverability floor, not demand. The credibility flywheel
named in the research is Sedona WG13 → PLI faculty → ABA SciTech → IAPP AIGP.

**Decision-makers:** The retaining attorney — lead trial counsel or the partner
running the matter. **[INFERRED — the target list names attorneys of record, but
nothing confirms who inside a firm actually selects the expert.]**

**Primary use case:** A technical declaration is on file (theirs or ours) and
counsel needs an AI/ML opinion that survives Daubert and cross-examination.

**Jobs to be done:**
- Refute an opposing expert's technical declaration with something stronger than
  a competing assertion.
- Establish provably what a system, corpus, or algorithm did.
- Decide, before committing budget, whether there is an AI/ML claim at all and
  how strong it is.

**Use cases** (the four service modes, verbatim from the site):
- Opposing-expert rebuttal — reproducible counter-experiment plus cross-document
  impeachment.
- Affirmative analysis & testimony.
- Consulting (non-testifying) — case strategy, experiment definition, stochastic
  data collection, vetting the other side's expert; work-product protected.
- Early-case assessment — a merits screen before commitment.

These four are also the options in the `/scope` intake dropdown, plus "Not sure
yet."

**Entry paths** (established in the IA brainstorm, and the reason the site is
structured as it is): referral or warm intro, expert-witness directory bio, and
organic search. Deliberately **not** outbound collateral. The root page has to
be self-sufficient for a referral reader who scans and never clicks, while
search needs distinct URLs with their own titles.

One finding qualifies the directory path: JurisPro does not link out to experts'
own sites — profiles stay on the directory domain as 50–80 word blurbs. If that
generalizes, a directory reader must search the name separately, which shifts
weight onto organic search.

## Personas

**[INFERRED throughout — no attorney discovery interviews have been run yet.
The IA spec notes they were to run in parallel with the build. This table is a
hypothesis to test, not a finding.]**

| Persona | Cares about | Challenge | Value we promise |
|---|---|---|---|
| Retaining attorney (champion + decision maker) | Whether the opinion survives a 702 motion and cross | Has to bet the technical theory of the case on someone they cannot themselves evaluate | An opinion the other side can re-run and still not break |
| Associate / referral source | Not recommending someone who embarrasses the partner | Screening an unfamiliar expert from a directory blurb | A method visible on the page before any call |
| Client (financial buyer) | Cost predictability | Open-ended expert spend on an uncertain claim | $2,500 fixed-fee, fixed-scope read, credited if it proceeds |
| Opposing counsel (adversary, not buyer) | Finding the soft spot | — | Conceded uncertainty removes the easy attack |

## Problems & Pain Points

**Core problem:** When a matter turns on what an AI/ML system did, the available
experts each offer half of what counsel needs. Academics study models but do not
ship them. Economic consultancies read AI through an economics lens and concede
the black box. Digital-forensics vendors recover bytes but do not interpret
model behavior.

**Why alternatives fall short:**
- An assertion-based opinion ("in my experience, this indicates copying") is
  attackable precisely because it cannot be reproduced.
- Conceding the black box concedes the case's central technical question.
- A forensics checklist stops where the real question starts — timestamp shape,
  model-temperature-controlled variability, file-system semantics, at-scale
  artifacts.

**What it costs them:** An excluded expert. A 702 motion lost on methodology
rather than on merits, after the expert spend is already sunk.

**Emotional tension:** Counsel has to vouch for a technical theory they cannot
independently verify, against an adversary who will look for exactly the seam
between what the expert asserted and what the expert can show.

## Competitive Landscape

**Direct** — other AI/ML expert-witness providers. Closest comparables scanned
2026-08-08: Barr Group, Quandary Peak, Eureka Software, Sidespin Group. All are
multi-page firms with per-expertise-area landing pages, the smallest around
fifteen pages; none publishes pricing. One qualification: their page counts are
driven by per-area SEO rather than argument structure. These are the right
comparable set — Root System Forensics is likewise a multi-expert practice, and
the differences that matter are AI/ML specialization, reproducible method, and
published pricing rather than headcount.

**Secondary** — adjacent expert types solving the same problem differently. From
the site's own contrast table:

| Who | Their strength | Where they fall short |
|---|---|---|
| Academic experts | Publications, Daubert-friendly credentials | Study models; don't ship or reproduce at production scale |
| Economic consultancies | Deep testimony pedigree | AI read through an economics lens; concede the black box |
| Digital-forensics vendors | Imaging, chain-of-custody, recovery | Recover bytes; don't interpret why a model produced an output |
| Root System | Builds the systems + reproducible experimental rebuttal + even-handed | — |

**Indirect** — retaining no expert and arguing the technical point through fact
witnesses or the client's own engineers. Cheaper and faster; carries no
independence and no Daubert standing. **[INFERRED]**

## Differentiation

**Key differentiators** (the five pillars — the copy deck is explicit that each
was earned in a real matter, not aspirational):

1. **Reproducible, not assertive.** Every finding is a query and its output,
   re-runnable by opposing counsel. Not "trust me."
2. **Even-handed.** We concede what is genuinely uncertain. That is what
   separates an expert from a hired gun, and what survives cross.
3. **Depth in machine-generated evidence.** Timestamp shape, model variability,
   file-system semantics — where a forensics checklist stops.
4. **Cross-document rigor.** We diff an opponent's successive filings for
   dropped caveats and silent overstatements — a technique most vendors don't
   perform.
5. **Built by a builder.** Argued by the practitioner who ships these systems,
   not someone who only studies them.

**Why that's better:** Reproducibility relocates the opinion's authority from
the expert's résumé to the evidence itself. It is the direct answer to the
practice's thinnest credential (limited testimony history) and to its most
likely attack (hired gun).

**Not yet used as differentiators, in priority order:**

1. **The method's provenance.** The same experimentation discipline is run daily
   for startups with no business model yet, where analytical data collection is
   the product outcome. Reproducibility is how the practice already works, not a
   posture adopted for litigation. This is a stronger answer to "hired gun" than
   the one the FAQ currently gives.
2. **A cross-functional bench.** A dozen experts across architecture, ML,
   security, distributed systems, and the product disciplines — assembled against
   a matter's strategy rather than one person's calendar. Disputes over what a
   system did cross discipline boundaries; a single expert does not.
3. **A described intake process.** Learn the matter, set the strategic approach,
   then staff it. No comparable publishes how it decides what to do.

Rob's role is the connective tissue and should not be diluted: one accountable
expert on every matter, running intake and strategy and doing technical work,
with a bench behind him. A bench without a named lead reads as a vendor pool.

## Objections

Verbatim from the site FAQ — these are the four the practice has chosen to
answer in public.

| Objection | Response |
|---|---|
| "You've testified once." | A reproducible opinion doesn't rest on tenure. Every finding is a query the other side can re-run — defensible on its own terms, not on reputation. A first-principles, reproducible analysis is more durable under Daubert than a veteran's say-so. |
| "Why not a big-name firm or lab?" | Big firms apply AI as a tool inside economics testimony and concede the interpretability problem. This is the practitioner who builds the systems, delivering the empirical validation itself — not a brand markup on a subcontracted analysis. |
| "Aren't you a hired gun?" | The method is the answer. We concede what's fair, label the uncertain unverifiable, and hand the other side a replication they can re-run. Independence is built into the deliverable. |
| "This sounds expensive." | A reproducible opinion that survives a 702 motion is cheaper than one excluded. Start with the $2,500 assessment. |

**Anti-persona [INFERRED]:** counsel who wants a predetermined conclusion (the
even-handedness pillar actively repels them, by design); matters needing
conventional digital forensics — imaging, recovery, chain of custody — with no
AI/ML question; and matters too small to carry a $450/hr expert.

## Switching Dynamics

**[INFERRED — the four forces below are reasoned from the copy, not from
interviews.]**

**Push:** An opposing declaration that asserts more than it shows, and no
in-house way to test it. Or a prior expert whose methodology drew a 702
challenge.

**Pull:** A method visible before the first call, a fixed-fee way to see the
read before committing, and published rates in a market that hides them.

**Habit:** Counsel retains the expert their firm has always retained, or the one
their opponent's expert came from. Expert selection is relationship-driven and
the switching cost is reputational.

**Anxiety:** An unfamiliar name that opposing counsel will attack on experience
rather than on method. This is the practice's central adoption risk and the FAQ
leads with it. Testimony history does not blunt it — there is not much across the
bench. What does is the method's provenance and the breadth of expertise behind
it, neither of which the site currently presents.

## Customer Language

**How they describe the problem:** *no verbatim data.* Attorney discovery
interviews have not been run. Everything currently on the site is written in
Rob's framing, not in a buyer's words. **This is the largest gap in this
document** — verbatim language is what would let downstream copy skills write
in-market rather than in-house.

**How they describe us:** *no verbatim data.*

**Words to use:** reproducible, re-runnable, query and its output, conceded /
concede, even-handed, holds up under cross, Daubert, 702, declaration,
impeachment, distribution, discriminator, empirically validate, matter,
engagement, scope a case.

**Words to avoid:** cutting-edge, AI-powered, revolutionary, leverage,
game-changing, seamless, and anything that would read as marketing to a
litigator. Also avoid "guarantee," "prove conclusively," or any claim to
certainty the method itself would concede — overclaiming is the exact failure
mode the even-handedness pillar sells against. Avoid "client" for the attorney;
they are counsel, and their client is someone else.

**Glossary:**

| Term | Meaning |
|---|---|
| Daubert / 702 | The federal standard and rule governing admissibility of expert testimony. Exclusion is the risk the whole method sells against. |
| Reproducible finding | A finding stated as a query plus its output, re-runnable by the opposing side |
| Cross-document rigor | Diffing an opponent's successive filings for dropped caveats and silent overstatements |
| Timestamp shape | The distribution of access timestamps; its shape distinguishes a human copy from a batch process |
| Assessment | The $2,500 fixed-fee, ≤10-hour engagement |
| Matter | A single litigation engagement |
| Scope a case | The site's conversion action — the `/scope` intake form |

## Brand Voice

**Tone:** Evidentiary and understated. Claims are stated flatly and immediately
substantiated; nothing is amplified. The site concedes its own weaknesses in
public (one testimony; "copying is not timestamp-silent") because the concession
is the credibility mechanism.

**Style:** Direct, technical, specific. Concrete numbers over adjectives — "9,000
files smeared across hundreds of seconds" rather than "extensive analysis." The
visual direction is "Show Your Work" (direction A): a hero built as a query and
its output.

**Personality:** rigorous, even-handed, concrete, practitioner, unshowy.

**Voice, as of variant E (2026-08-22):** the own-voice rewrite of the hero and
closing is done, so `draft: false` on both blocks is now accurate rather than
stale. The publish gate (`assertPublishable`) still fails a production build if
either is set back to `draft: true`.

E also settled the register. Two shapes are in play and the split is deliberate:
short second-person declaratives wherever a single sentence has to land (hero,
pillar titles, the representative matter, the objections), and an evidence-first
structural form wherever the copy is enumerable (the proof block, positioning,
the practice-area and engagement headings, the fees line). Write new copy into
whichever of the two the surrounding block is already using; do not average
them.

## Proof Points

**Metrics:** none published. No case count, no win rate, no client list. The
practice is early and the site does not pretend otherwise.

**Customers:** none named. The one matter is anonymized as "Representative
matter · anonymized."

**Testimonials:** none. The closest thing to a result claim on the site is the
pull quote from the representative matter:

> "Same data. The shape tells the truth."

That line states the finding rather than an outcome, deliberately: the previous
version was "The matter settled," and settlement is not attributable to the work.

**Value themes:**

| Theme | Proof |
|---|---|
| Reproducible beats assertive | The mass-copying rebuttal: a genuine bulk copy of 9,000 files smears its access timestamps across hundreds of seconds; the opposing exhibit clustered thousands into a handful — a batch process, not a human copy. Same data; the shape tells the truth. |
| Cross-document rigor is real, not a slogan | The opposing expert's earlier declaration carried qualifiers ("can be caused by copying, searching, and other automated processes") that the later federal declaration dropped, on identical numbers. |
| Even-handedness is in the deliverable | The same rebuttal openly conceded that copying is not timestamp-silent. |
| Practitioner, not observer | Root System builds and evaluates ML systems in its own products; the same evaluation discipline produces the litigation experiments. |

**Weakest point, stated plainly:** one representative matter and no third-party
validation of any kind. Every proof point above is self-reported.

Testimony history is thin across the whole bench and is deliberately not
advertised. Do not manufacture volume claims; the reproducibility argument exists
precisely so the opinion does not have to rest on mileage. The bench's *expertise*
is real and unpublished — a dozen fractional CTOs and CPOs and their disciplines
are proof the practice holds and does not currently spend.

## Goals

**Business goal:** The expert-witness practice is the active revenue vector.
Forensics launch blockers are treated as revenue blockers.

**Conversion action:** A `/scope` intake submission — the fixed-fee assessment
enquiry. Secondary: a direct email to `partners@rootsystem.com`. Submissions land
in D1 (`case_intake`) with a Turnstile spam verdict and are emailed on.

**Published commitment:** we reply within one business day. Stated on `/scope`
before the form and in the confirmation. Business day rather than 24 hours so the
promise survives a Friday evening enquiry.

This is an operational promise, not copy. The intake notification goes to
`contact@rootsystem.com` and copies `rob@rootsystem.com` (`NOTIFY_TO` and
`NOTIFY_CC` in `sites/forensics/wrangler.jsonc`), so it reaches a named person
rather than only a shared mailbox. `sites/www` has no equivalent commitment and
sends no copy.

## Conflicts and confidentiality

Root System also builds AI systems for clients. The rule, now stated publicly on
`/engagements` as the first step of intake rather than left to post-submission
fine print:

1. Every intake opens with a written conflict questionnaire, walked through in
   the intake interview. It captures named parties and their counsel, affiliated
   and parent entities, and the specific AI/ML systems, products, models, or
   vendors at issue.
2. Decline anything adverse to a current or recent Root System build
   relationship — and screen build-side sales against live or likely expert
   matters, symmetrically.
3. NDA before any confidential material moves. No case files, code, or model
   artifacts change hands ahead of an executed NDA.
4. When in doubt, decline. An ambiguous conflict is not worth one matter.

Counsel has not yet blessed the questionnaire and NDA templates. That review is
open in the GTM workspace and was originally recorded as gating first external
use; Rob's call (2026-08-09) is to publish the process now and get the review
done in parallel rather than hold the copy for it.

The dual-line position is treated as an asset rather than a problem, but the
framing that makes it one ("we build systems that keep you out of legal
trouble") is explicitly a later message, not a launch message.

**Current metrics:** Traffic is roughly dozens of visits a month, and PostHog is
not instrumented (roadmap track 5, unstarted). A/B testing is therefore not
viable, which is why the site's structure was chosen on reasoning rather than by
experiment, and why it was built to be cheap to reorder.

**Launch state as of 2026-08-08:** the four-route structure and the
forensics-specific OG card are built on `rob/forensics-ia` (PR #53, unmerged).
`forensics.rootsystem.com` has no DNS record and no Worker route — deliberately
unrouted until there is something worth routing to. `robots.txt` allows
crawling.

## Open questions

1. **Market research exists; buyer research does not.** The GTM workspace has a
   real target list built from live dockets and firm case pages. What it does not
   have is a single conversation with a buyer. Personas, Switching Dynamics, and
   above all Customer Language remain inference — there is still no verbatim
   attorney language anywhere, so downstream copy writes in Rob's framing rather
   than in-market. Two prerequisites are recorded in the research and unmet: the
   target list has not been scored against Rob's own network for warm paths, and
   outreach is gated on the public property being live.
2. **The four-mode summary on the root page.** Currently four bare mode titles
   with no explanatory clause. A reviewer argued a label is not an argument for a
   referral reader who never clicks. Undecided.
3. **How much of the bench to show.** Presented as a bench for now, with named
   profiles held as the later move if a niche demands them. The trigger for that
   change is not defined.

## Changelog

*Newest first. One line per revision: what changed and why.*

- v7 (2026-08-22) — Variant E, the sentence-shape pass: D's positioning is unchanged, but the copy was rewritten against two concepts (adversary-voiced "Cross", evidence-first "Exhibit") and chosen element by element — 12 Cross, 11 Exhibit, 2 unchanged. Recorded the resulting two-register rule under Brand Voice, corrected the stale draft-flag caveat, and fixed the Proof Points pull quote, which had been superseded since D. The hero proof block and positioning are now structured fields rather than single strings.
- v6 (2026-08-09) — Pricing decisions (Rob): modifiers do not stack, higher rate governs; the volume discount comes off the published list and moves to conversation against an internal bar. Response commitment softened from 24 hours to one business day, with the notification now copying a named recipient. Legal review of the conflict questionnaire and NDA runs in parallel rather than gating the copy.
- v5 (2026-08-09) — Folded in the GTM workspace: the real target list (four demand veins, named firms, docket-sourced) replaces the inferred audience; the rate card's modifiers, and the internal terms that stay unpublished; the conflict-and-confidentiality rule as its own section; and the published 24-hour response commitment with the notification-routing risk attached. Downgraded open question 1 from "no research" to "market research yes, buyer research no."
- v4 (2026-08-09) — Scope decision (Rob): stay on product and technology with AI/ML as the lead pillar, showing the bench's breadth as depth behind the lead rather than as separate practice areas. Closed the broaden-or-narrow open question; the bench belongs on `/method`.
- v3 (2026-08-09) — Added The Bench section: a dozen fractional CTOs and CPOs, their disciplines, the staffing model, and the method's provenance in startup experimentation work. Reordered Differentiation around provenance, cross-functional bench, and the intake process. Set testimony as downplayed by decision rather than by omission. Opened the AI/ML-only-versus-broaden question raised by the product-side half of the bench.
- v2 (2026-08-08) — Repositioned from solo practitioner to a multi-expert practice with a per-matter assigned bench (Rob, correcting v1). Reframed Product Overview, Competitive Landscape, Differentiation, Switching Dynamics, and Proof Points accordingly; noted that site copy still reads single-practitioner and needs revision. Marked the publish-gate draft flags as stale — the own-voice rewrite is in progress.
- v1 (2026-08-08) — Initial context, auto-drafted from `sites/forensics/src/copy/landing.ts`, the IA design spec, the roadmap, and the intake form. Buyer-side sections are inference; no customer research exists yet.
