# Product Marketing Context

**Document version:** v7
**Last updated:** 2026-08-11

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

**One-liner:** Software, source-code and data expert-witness analysis — the
technical expert work counsel already retains for, plus the matters where a
model or an algorithm is what the case turns on. Every opinion is a query the
other side can re-run.

**What it does:** Technical analysis of what a codebase, a system, a dataset or
a model actually did — across four practice areas (below). Findings are stated
as a reproducible experiment (a query plus its output) rather than as expert
assertion, so opposing counsel can replicate them. Delivered as rebuttal,
affirmative analysis and testimony, non-testifying consulting, or an early-case
merits screen — all four modes available in all four practice areas.

**Product category:** Expert witness / litigation support, software and
technology specialty. The "shelf" is expert-witness directories (JurisPro, SEAK)
and attorney referral networks, not software categories. The category claim is
deliberately the one a retaining attorney already recognizes — "software expert,"
"source-code expert," "ESI and metadata" — with AI and machine learning as the
capability the incumbents on that shelf do not have rather than as the gate on
the practice.

**The four practice areas** (Rob, 2026-08-11 — all in scope, all four engagement
modes apply to each equally; testimony is not caveated by area):

1. **Software and source code** — source-code comparison in trade-secret and IP
   matters, patent/infringement technical read, code provenance and authorship.
2. **Data and systems forensics** — ESI and metadata, timestamp and log
   analysis, file-system semantics, breach and security-incident reconstruction.
3. **AI and machine learning** — how a model was built, what data it used,
   whether it performed as claimed.
4. **Software failure and performance** — defect and root-cause analysis,
   outage/SLA and contract-performance disputes, capacity and scaling failures.

**Published order is not this order.** The site orders them software and source
code → data and systems forensics → software failure and performance → AI and
machine learning. The two familiar, high-volume categories lead because a
retaining attorney recognizes them without translation; AI lands last and alone
on its own grid row, framed as the one usually conceded as a black box. The
array order in `sites/forensics/src/copy/landing.ts` *is* the emphasis — reorder
it to re-rank, don't rewrite the prose.

**The acquisition line, and it is a hard one.** This bench is fractional CTOs
and CPOs. They analyze produced ESI, code, logs, metadata and file-system
artifacts. They do **not** do forensic imaging, evidence collection, chain of
custody, or data recovery. Leading with traditional forensic work makes that
overclaim easy to slip into; the site states the limit in three places on
purpose (the data-and-systems practice-area body, the contrast table's own-row
gap, and a dedicated FAQ). Do not let copy drift across it.

**Product type:** Professional services, delivered by a Root System practice
group — a bench of roughly a dozen experts assembled per matter, not a single
practitioner. The "we" throughout the site copy is literal. See **The bench**
below.

Resolved in the copy as of 2026-08-11. The single-practitioner lines are gone:
the fifth pillar is "Built by builders," the FAQ objection reads "Your testimony
record is short," and the bench block on `/method` names the disciplines. The
"we" on the site is the bench, with Rob named as the accountable lead.

**Business model:** Fixed-fee on-ramp into hourly engagement.

| Tier | Price | What it is |
|---|---|---|
| Technical Assessment | $2,500 flat, up to 10 hours | Fixed-scope reproducible-experiment analysis plus a written assessment of the claim and its strength, in any of the four practice areas. Credited against a full engagement. Renamed from "AI-Dispute Assessment" 2026-08-11 — the old name was an exclusion in the one field a budget-conscious reader reads first. |
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

**Scope decision (2026-08-11) — reverses v4.** Four practice areas, AI/ML one of
them rather than the category claim, and the two familiar technical-expert
categories lead. The v4 decision (2026-08-09: "stay on product and technology
with AI/ML as the lead pillar… no second practice area") is superseded and
should not be cited as current.

The source is a review by a paralegal on a target litigation team, verbatim:

> "I really like the expert witness website so far one question - are you
> limiting yourself by putting AI right at the forefront there's probably a lot
> of other cases you might exclude if they read that as you only work on AI
> machine learning matters
> And I think the four modes one on ramp should be closer to the first thing
> your eye reads
> Exactly what you're offering not bogged down by tech speak
> And then when you feel it's ready we should have Mike look at it from a
> lawyers perspective"

Rob's reply, verbatim:

> "Yeah I'll take that critique on the AI focus, it's clearly the right
> direction long term but it is limiting early, I'm working on a copy set where
> AI is one pillar amongst more traditional forensic work."

Three things follow from it, all now built:

1. **Structure.** A `practiceAreas` block above the argument, and the four
   engagement modes lifted directly under it. Root page order is hero →
   practice areas → engagement modes → positioning → pillars → matter.
2. **Scope.** Four practice areas, listed above. All four engagement modes are
   available in every one of them, testimony included and uncaveated.
3. **Register.** "Exactly what you're offering not bogged down by tech speak."
   The practice-area and mode copy is written to be screened by a paralegal, not
   only read by an engineer. `/method` may stay technical; the entry blocks may
   not.

The fractional-CPO disciplines — usability, user research, product analytics,
growth and monetization — remain part of the cross-functional read a technology
dispute requires rather than standalone service lines. Still no product-side
landing pages.

**Outstanding from the same review:** Mike (attorney) has not yet read the site
from a lawyer's perspective. That review is the next gate, not a nice-to-have.

## Target Audience

**Target companies:** US litigators and IP/technology counsel handling disputes
that turn on what a codebase, a system, a dataset or a model actually did.
Trade-secret and source-code matters, ESI and metadata fights, failed-software
and SLA disputes, and the AI/ML matters that used to be the whole target.

**Horizontal by decision, not by default.** Four practice areas, no single
vertical. Named subfoci emerge later from customer-call data rather than being
picked up front; staying horizontal keeps referral doors open while the network
is thin. The v7 broadening makes this more true, not less — the practice-area
block exists precisely so a source-code or metadata reader does not self-select
out at the hero.

**The volume shift v7 is betting on.** Source-code comparison, trade-secret and
ESI matters are ordinary, continuous litigation demand; AI/ML matters are a
faster-growing but far smaller pool today. Leading with the former is a bet on
converting a matter *this quarter*. **[INFERRED — the relative volumes are
reasoned from the docket research, not measured.]**

The AI/ML demand veins below remain the sharpest identified targets and are not
retired by the broadening. They now sit behind a wider front door. Densest
AI/ML demand, from the docket and firm-page research in the GTM workspace
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
counsel needs a technical opinion that survives Daubert and cross-examination.

**Jobs to be done:**
- Refute an opposing expert's technical declaration with something stronger than
  a competing assertion.
- Establish provably what a codebase, system, corpus, or model did.
- Decide, before committing budget, whether the technical claim is there at all
  and how strong it is.

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

**Core problem:** When a matter turns on what a system did, the available
experts each offer part of what counsel needs. Source-code firms will run the
comparison but read a trained system as a black box. Digital-forensics vendors
image and preserve but stop where interpreting behavior starts. Academics study
systems but do not ship them. Economic consultancies read technology through an
economics lens.

Counsel therefore either retains two experts, or retains one and quietly loses
the half of the matter that expert does not cover.

**Why alternatives fall short:**
- An assertion-based opinion ("in my experience, this indicates copying") is
  attackable precisely because it cannot be reproduced.
- A code diff does not explain a trained system, and conceding the black box
  concedes the case's central technical question.
- A forensics checklist reports the fields; the dispute is about what the fields
  mean — timestamp shape, file-system semantics, log and build artifacts,
  at-scale behavior, model-temperature-controlled variability.

**What it costs them:** An excluded expert. A 702 motion lost on methodology
rather than on merits, after the expert spend is already sunk.

**Emotional tension:** Counsel has to vouch for a technical theory they cannot
independently verify, against an adversary who will look for exactly the seam
between what the expert asserted and what the expert can show.

## Competitive Landscape

**The comparison set changed with the positioning.** Under v4's AI category
claim, the honest comparison was against academics, economic consultancies and
forensics vendors — the people counsel would otherwise ask about a model. Under
v7 the practice stands on the source-code and technical-expert shelf, so the
incumbent it is actually displacing is a **software and source-code expert
firm**, and that is now the first row of the site's contrast table rather than
an unnamed absence.

This is the cost of the v7 bet, stated plainly: the practice now competes on
ground where Quandary Peak, Barr Group, Eureka Software and Sidespin Group are
established and it is not. Their code-comparison practices are older and their
testimony records longer. The site's own contrast row concedes both.

**Direct** — software, source-code and technical expert-witness firms. Closest
comparables scanned 2026-08-08: Barr Group, Quandary Peak, Eureka Software,
Sidespin Group. All are multi-page firms with per-expertise-area landing pages,
the smallest around fifteen pages; none publishes pricing. One qualification:
their page counts are driven by per-area SEO rather than argument structure.
These are the right comparable set — Root System Forensics is likewise a
multi-expert practice, and the differences that matter are the AI/ML capability,
the reproducible method, and published pricing rather than headcount.

**Secondary** — adjacent expert types solving the same problem differently. The
site's contrast table, as published under v7:

| Who | Their strength | Where they fall short |
|---|---|---|
| Source-code and software expert firms | Established code-comparison practice, longer testimony records | A diff doesn't explain a trained system; model questions get subcontracted |
| Digital-forensics vendors | Imaging, collection, chain of custody, recovery | Recover and preserve the bytes; stop where interpreting behavior starts |
| Academic experts | Publications, Daubert-friendly credentials | Study systems; don't ship them or reproduce them at production scale |
| Economic consultancies | Deep testimony pedigree | Technology read through an economics lens; concede the black box |
| Root System | Builds the systems — code, data, and models — and states every finding as a re-runnable experiment | Newer practice, shorter testimony record — and we analyze evidence rather than collect it |

The digital-forensics row keeps acquisition as **their** strength on purpose.
This bench does not image, collect, recover, or establish chain of custody, and
that row is where the site says so without hedging. Never rewrite it so the
practice appears to share it.

The own row names two limits rather than one, because a traditional lead invites
both questions at once.

**Indirect** — retaining no expert and arguing the technical point through fact
witnesses or the client's own engineers. Cheaper and faster; carries no
independence and no Daubert standing. **[INFERRED]**

## Differentiation

**Key differentiators** (the five pillars — the copy deck is explicit that each
was earned in a real matter, not aspirational):

1. **Reproducible, not assertive.** Every finding is a query and its output,
   re-runnable by opposing counsel. Not "in my experience."
2. **Even-handed.** We concede what is genuinely uncertain. That is what
   separates an expert from a hired gun, and what survives cross.
3. **Depth in machine-generated evidence.** Timestamp shape, file-system
   semantics, log and build artifacts, model variability — a checklist reports
   the fields; the dispute is about what the fields mean.
4. **Cross-document rigor.** We diff an opponent's successive filings for
   dropped caveats and silent overstatements — a technique most vendors don't
   perform.
5. **Built by builders.** Argued by the people who ship these systems —
   codebases, pipelines, distributed systems, and the models on top of them —
   not by people who only study them.

Pillars 1–4 apply identically in all four practice areas and are what makes the
practice buyable on the traditional shelf. Pillar 5 is where AI does its work in
this positioning: it is the reason to pick this bench over a code-review firm,
and it is placed last so it lands after the reader has already recognized the
practice as one they buy from.

**Why that's better:** Reproducibility relocates the opinion's authority from
the expert's résumé to the evidence itself. It is the direct answer to the
practice's thinnest credential (limited testimony history) and to its most
likely attack (hired gun). Against the source-code firms specifically, it is
also the only argument available — they have the tenure, so the differentiator
has to be method plus reach, not mileage.

**AI is the edge, not the category (v7).** The differentiating claim is: we do
the technical expert work you already retain for, *and* we are the ones who can
also take the matter when a model, an algorithm, or a training set is at the
center of it. Written the other way round it excludes; written this way it
converts a source-code or metadata matter today and still holds the AI ground
for later.

**Not yet used as differentiators, in priority order:**

1. **The method's provenance.** The same experimentation discipline is run daily
   for startups with no business model yet, where analytical data collection is
   the product outcome. Reproducibility is how the practice already works, not a
   posture adopted for litigation. Now in the FAQ's hired-gun answer.
2. **A cross-functional bench.** A dozen experts across architecture, ML,
   security, distributed systems, and the product disciplines — assembled against
   a matter's strategy rather than one person's calendar. Disputes over what a
   system did cross discipline boundaries; a single expert does not. Now on
   `/method`.
3. **A described intake process.** Learn the matter, set the strategic approach,
   then staff it. No comparable publishes how it decides what to do. Now on
   `/engagements`.

Rob's role is the connective tissue and should not be diluted: one accountable
expert on every matter, running intake and strategy and doing technical work,
with a bench behind him. A bench without a named lead reads as a vendor pool.

## Objections

Verbatim from the site FAQ — these are the five the practice answers in public
under v7. "Why not a big-name firm or lab?" was retired: the question a reader
of a traditionally-positioned site actually asks is about the code-review firm
they used last time, and a dedicated acquisition question was added because a
traditional lead invites it.

| Objection | Response |
|---|---|
| "Your testimony record is short." | It is, and we don't dress it up. The established source-code firms have been at this longer. A reproducible opinion doesn't rest on tenure: every finding is a query the other side can re-run. Under Daubert, a first-principles analysis anyone can replicate is more durable than a veteran's say-so. |
| "Why you and not the source-code firm we used last time?" | On a straight codebase-to-codebase comparison, that firm is a reasonable choice and we say so. The difference shows up when the matter has a model, a data pipeline, or a statistical system in it — a diff doesn't answer that, and the usual response is a subcontractor or a concession that the system is unknowable. Our rates are also published, which is unusual on this shelf. |
| "Do you image drives or handle collection?" | No. We analyze what has been produced or imaged and work alongside the examiner who did the acquisition. If a matter needs collection or chain of custody established, counsel needs a forensic examiner, and we say so in the first call rather than after the retainer. |
| "Aren't you a hired gun?" | The method came before the litigation work — it is the same experimentation discipline run daily for startups betting a company on results that replicate. We concede what's fair, label the unverifiable, and hand the other side a replication they can run. |
| "This sounds expensive." | A reproducible opinion that survives a 702 motion is cheaper than one excluded. Start with the $2,500 assessment. |

**Anti-persona [INFERRED, revised v7]:** counsel who wants a predetermined
conclusion (the even-handedness pillar actively repels them, by design);
**acquisition-only forensics work** — imaging, collection, recovery, chain of
custody — which this bench does not do at all and refers out; and matters too
small to carry a $450/hr expert.

**No longer an anti-persona:** conventional non-AI technical matters. Under v4,
a source-code comparison or a metadata dispute with no AI/ML question was work
the positioning turned away. Under v7 it is the lead offer. This is the single
biggest behavioral change in the document — downstream skills that were
declining or deprioritizing those matters should stop.

## Switching Dynamics

**[INFERRED — the four forces below are reasoned from the copy, not from
interviews.]**

**Push:** An opposing declaration that asserts more than it shows, and no
in-house way to test it. Or a prior expert whose methodology drew a 702
challenge. Or a source-code expert who reached the model in the system and
stopped.

**Pull:** A method visible before the first call, a fixed-fee way to see the
read before committing, published rates in a market that hides them, and a
single bench that covers both the code and the model rather than two retentions.

**Habit:** Counsel retains the expert their firm has always retained, or the one
their opponent's expert came from. Expert selection is relationship-driven and
the switching cost is reputational. Under v7 this force gets *stronger*, not
weaker — leading on the traditional shelf means the incumbent is a specific firm
with a relationship, not an absence.

**Anxiety:** An unfamiliar name that opposing counsel will attack on experience
rather than on method. This is the practice's central adoption risk and the FAQ
leads with it. Testimony history does not blunt it — there is not much across the
bench. What does is the method's provenance and the breadth of expertise behind
it, both of which the site now presents.

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
engagement, scope a case. Added v7, the vocabulary of the traditional shelf:
source-code comparison, code provenance, authorship, trade secret,
misappropriation, ESI, metadata, timestamp, log, file-system semantics, root
cause, defect, outage, service level, produced (as in "as produced").

**Register note (v7).** The paralegal review asked for "exactly what you're
offering not bogged down by tech speak." The hero, practice-area and
engagement-mode copy must be screenable by a paralegal filtering experts.
`/method` and the case-study body may stay technical — that reader has already
self-selected.

**Words to avoid:** cutting-edge, AI-powered, revolutionary, leverage,
game-changing, seamless, and anything that would read as marketing to a
litigator. Also avoid "guarantee," "prove conclusively," or any claim to
certainty the method itself would concede — overclaiming is the exact failure
mode the even-handedness pillar sells against. Avoid "client" for the attorney;
they are counsel, and their client is someone else. Added v7: never write
anything implying this bench images, collects, recovers, or holds chain of
custody. The phrases "forensic imaging," "collection," "chain of custody" and
"data recovery" may appear only as somebody else's work.

**Glossary:**

| Term | Meaning |
|---|---|
| Daubert / 702 | The federal standard and rule governing admissibility of expert testimony. Exclusion is the risk the whole method sells against. |
| Reproducible finding | A finding stated as a query plus its output, re-runnable by the opposing side |
| Cross-document rigor | Diffing an opponent's successive filings for dropped caveats and silent overstatements |
| Timestamp shape | The distribution of access timestamps; its shape distinguishes a human copy from a batch process |
| Assessment | The $2,500 fixed-fee, ≤10-hour engagement. Publicly "Technical Assessment" since 2026-08-11 |
| Practice area | One of the four kinds of dispute the practice takes. All four engagement modes apply to each |
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

**Publish gate carried in the code:** the schema's `assertPublishable` fails a
production build (which includes every preview deploy) while `hero.draft` or
`closing.draft` is true. Both are false. The GTM-deck scaffolding they guarded is
gone — hero, positioning, practice areas, pillars, modes, contrast and FAQ were
all rewritten to v7 on 2026-08-11.

## Proof Points

**Metrics:** none published. No case count, no win rate, no client list. The
practice is early and the site does not pretend otherwise.

**Customers:** none named. The one matter is anonymized as "Representative
matter · anonymized."

**Testimonials:** none. The closest thing to a result claim on the site is the
pull quote from the representative matter:

> "The matter settled."

**Value themes:**

| Theme | Proof |
|---|---|
| Reproducible beats assertive | The mass-copying rebuttal: a genuine bulk copy of 9,000 files smears its access timestamps across hundreds of seconds; the opposing exhibit clustered thousands into a handful — a batch process, not a human copy. Same data; the shape tells the truth. |
| Cross-document rigor is real, not a slogan | The opposing expert's earlier declaration carried qualifiers ("can be caused by copying, searching, and other automated processes") that the later federal declaration dropped, on identical numbers. |
| Even-handedness is in the deliverable | The same rebuttal openly conceded that copying is not timestamp-silent. |
| Practitioner, not observer | Root System builds and evaluates production software and ML systems in its own products; the same evaluation discipline produces the litigation experiments. |
| The representative matter is a traditional one | The one matter on the property is a file-system and metadata dispute with no model in it. Under v7 that is an asset rather than an awkwardness — the proof and the lead offer are the same category. |

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

Root System also builds software and AI systems for companies. The rule, stated
publicly on
`/engagements` as the first step of intake rather than left to post-submission
fine print:

1. Every intake opens with a written conflict questionnaire, walked through in
   the intake interview. It captures named parties and their counsel, affiliated
   and parent entities, and the specific systems, products, codebases, models and
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
   outreach is gated on the public property being live. The one buyer-side input
   the practice does have is the 2026-08-11 paralegal review, and it changed the
   positioning — which is an argument for getting more of it.
2. **The four-mode summary on the root page.** Closed. The modes carry a
   one-clause `summary` each and sit directly under the practice areas.
3. **How much of the bench to show.** Presented as a bench for now, with named
   profiles held as the later move if a niche demands them. The trigger for that
   change is not defined.
4. **Whether the AI wedge is buried too deep (v7's live risk).** Rob's own view
   is that AI is "clearly the right direction long term." This positioning puts
   it fourth of four practice areas and fifth of five pillars. It converts the
   near-term matter and it competes with older code-review firms on their own
   ground. If AI/ML enquiries fall off while total enquiries rise, that is the
   trade working as designed; if total enquiries do not rise, the trade bought
   nothing and the AI-led framing should come back.
5. **Attorney review outstanding.** Mike has not yet read the site from a
   lawyer's perspective, which the paralegal review named as the next step.
6. **No AI/ML practice-area landing page.** With four areas and per-area SEO
   being what the comparables do, per-area pages are the obvious next structural
   move. Not built; the property is still four routes.

## Changelog

*Newest first. One line per revision: what changed and why.*

- v7 (2026-08-11) — **Repositioning.** AI/ML demoted from the category claim to the differentiator; four practice areas adopted (software and source code, data and systems forensics, software failure and performance, AI and machine learning), with the two familiar categories leading and AI last. Reverses the v4 scope decision, on a paralegal reviewer's warning that an AI-forward site reads as AI-only and Rob's agreement that the AI focus "is clearly the right direction long term but it is limiting early." Competitive Landscape re-cut — source-code and software expert firms are now the displaced incumbent and the first contrast row, and the practice concedes their longer tenure. Differentiation, Objections (five now, "big-name firm" retired, an acquisition question added), Anti-persona (conventional non-AI matters are no longer repelled; acquisition-only work still is), Switching Dynamics and Customer Language updated to match. The no-acquisition line is restated three times because a traditional lead makes it easy to breach. Assessment tier renamed AI-Dispute Assessment → Technical Assessment.
- v6 (2026-08-09) — Pricing decisions (Rob): modifiers do not stack, higher rate governs; the volume discount comes off the published list and moves to conversation against an internal bar. Response commitment softened from 24 hours to one business day, with the notification now copying a named recipient. Legal review of the conflict questionnaire and NDA runs in parallel rather than gating the copy.
- v5 (2026-08-09) — Folded in the GTM workspace: the real target list (four demand veins, named firms, docket-sourced) replaces the inferred audience; the rate card's modifiers, and the internal terms that stay unpublished; the conflict-and-confidentiality rule as its own section; and the published 24-hour response commitment with the notification-routing risk attached. Downgraded open question 1 from "no research" to "market research yes, buyer research no."
- v4 (2026-08-09) — Scope decision (Rob): stay on product and technology with AI/ML as the lead pillar, showing the bench's breadth as depth behind the lead rather than as separate practice areas. Closed the broaden-or-narrow open question; the bench belongs on `/method`.
- v3 (2026-08-09) — Added The Bench section: a dozen fractional CTOs and CPOs, their disciplines, the staffing model, and the method's provenance in startup experimentation work. Reordered Differentiation around provenance, cross-functional bench, and the intake process. Set testimony as downplayed by decision rather than by omission. Opened the AI/ML-only-versus-broaden question raised by the product-side half of the bench.
- v2 (2026-08-08) — Repositioned from solo practitioner to a multi-expert practice with a per-matter assigned bench (Rob, correcting v1). Reframed Product Overview, Competitive Landscape, Differentiation, Switching Dynamics, and Proof Points accordingly; noted that site copy still reads single-practitioner and needs revision. Marked the publish-gate draft flags as stale — the own-voice rewrite is in progress.
- v1 (2026-08-08) — Initial context, auto-drafted from `sites/forensics/src/copy/landing.ts`, the IA design spec, the roadmap, and the intake form. Buyer-side sections are inference; no customer research exists yet.
