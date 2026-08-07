# Roadmap

Ordering set by Rob on 2026-08-06. Five tracks. Track 1 is specced; tracks 2–5
carry their open questions here and get their own spec when they come up.

Standing operational items are not roadmap items and are not listed below.

## Where things stand

*Source: `curl -I` against each hostname on 2026-08-06, plus the repository at
`61b1343`.*

| Hostname | Status | Served by |
|---|---|---|
| `rootsystem.com` | 200 | Cloudflare Worker `rootsystem-www` |
| `www.rootsystem.com` | 301 to apex | Cloudflare ruleset |
| `rootsystem.com/taproot` | 307 to `/taproot/`, then 200 | same Worker |
| `insights.rootsystem.com` | 200 | Vercel |
| `forensics.rootsystem.com` | does not resolve | — |

Netlify serves no traffic and is the rollback target; the apex A record still
points at it. `docs/apex-cutover-runbook.md` holds the executed record and
`docs/teardown-order.md` the decommission order.

Taproot holds one post (`sites/www/src/content/taproot/why-taproot.mdx`).

## Track 1 — spam gate on both forms

**Deployed 2026-08-06.** Specced in
`docs/superpowers/specs/2026-08-06-form-spam-gate-design.md`.

Both endpoints verify a Turnstile token server-side, record a spam verdict on
every stored row, and email the clean ones to `contact@rootsystem.com` via
Resend. Migration `0002` is applied to the remote D1; secrets are set on both
Workers; both Workers are deployed.

One path is unverified: a submission that *passes* Turnstile, and the Resend
delivery that follows it. That needs a real browser to mint a token, and the
rejection and quarantine paths were the only ones reachable from the command
line. See §9 of the spec for what was covered.

This track also touches a gate in `docs/teardown-order.md` §1, which holds the
Netlify deletion until at least one genuine inbound contact submission from a
stranger has landed. The form changed, so that gate now measures the new path —
and a passing submission satisfies both at once.

## Track 2 — forensics case flow

`forensics.rootsystem.com` does not resolve. Launch is blocked on an information
architecture decision, recorded as open in
`docs/forensics-ia-open-problem.md`: the content sits on one page in sequence
with no structure organizing it. The copy and the visual direction are both
settled (decision D11, commit `0ed72da`); the structure is not.

Directions raised in that doc, none chosen: split the pillars into routes;
progressive disclosure on one page; something else.

Sequence once the structure is chosen: re-lay the existing copy into it (the copy
is not being rewritten), own-voice hero and closing, tagline selection from the
three candidates in `sites/forensics/src/copy/landing.ts`, a forensics-specific
OG card, then the hostname — DNS record, Worker route, and a decision on
`robots.txt`, which currently allows crawling.

Expert-witness directory listings and the side brand are downstream of a live
hostname and are mostly not code.

Open questions:

- Which IA direction.
- Whether `robots.txt` should disallow until the structure lands.

## Track 3 — legacy decommission, parallel and low effort

Ordered by irreversibility in `docs/teardown-order.md`. Nothing in this track is
urgent and each step gates the next.

Step 0 is the Sanity dataset export. The `insights` posts exist only in Sanity
and in the live Vercel deployment; Taproot has zero of them. The export needs an
interactive `npx sanity login`, which is why it has not run.

Two items from the design spec §10 also sit here, both cheap:

- `rob.` and `kyle.` are flat records inside the `rootsystem.com` zone at
  DNSimple rather than child zones. The arrangement answers correctly today
  because the DNSimple zone still exists; `scripts/dns-verify.sh` reports it as a
  WARN for that reason.
- `rootsystem.com` is registered under a personal DNSimple account rather than
  the Root System account. DNSimple supports pushing a domain between accounts.

Open questions:

- When to run the Sanity export (blocked on an interactive login).

## Track 4 — SEO and content

Taproot has one post. The per-post `insights` → `taproot` mapping is a content
decision, and it gates `docs/teardown-order.md` §2: a 301 from a set of indexed
article URLs onto an empty index is a soft-404 pattern.

Also here: the trailing-slash 307 on internal navigation, and per-property OG
cards — the forensics property currently shares the main brand's card.

Open questions:

- Map `insights` posts individually as they are ported, or leave `insights`
  serving until Taproot has landing targets.

## Track 5 — PostHog

Not started. Instrumentation across both properties, plus a consent posture. The
forensics property collects case intake from prospective litigants, which makes
the consent question a deliberate one rather than a default.

Open questions:

- Consent posture, and whether it differs between the two properties.
