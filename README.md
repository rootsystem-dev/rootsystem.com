# rootsystem.com

A Yarn workspace holding two Astro sites, both deployed as Cloudflare Workers.

| Hostname | Served by | State |
|---|---|---|
| `rootsystem.com` | Worker `rootsystem-www`, zone route | live |
| `www.rootsystem.com` | Cloudflare redirect ruleset | 301 to the apex |
| `rootsystem.com/taproot` | same Worker | live |
| `forensics.rootsystem.com` | Worker `rootsystem-forensics` | built, no DNS record yet |
| `insights.rootsystem.com` | Vercel | legacy, still serving |

Netlify holds the apex A record and serves no traffic; it is the rollback
target. Decommission order for both legacy hosts is in
`docs/teardown-order.md`.

## Layout

```
sites/www          rootsystem.com and the Taproot blog at /taproot
sites/forensics    forensics.rootsystem.com, the expert-witness property
db/migrations      D1 schema, applied in filename order
scripts            dns-verify.sh
docs               runbooks, the roadmap, and design specs
```

Each site owns its `astro.config.mjs` and `wrangler.jsonc`. Both are
`output: 'static'` with the Cloudflare adapter, so every page is prerendered
except the routes that opt out with `export const prerender = false` — today,
the two form endpoints and the pages that read `?sent` and `?error` back out of
the query string.

`src/lib/form.ts` and `src/lib/notify.ts` are duplicated between the two sites
rather than shared. Both files say so, and name the condition for extracting
them: a third consumer.

## Prerequisites

Tooling comes from `mise` — Node 22, Yarn 4, `wrangler`, and `fnox`. Versions
are pinned in `mise.toml`; do not install them separately.

Secrets resolve through `fnox` from 1Password. `fnox.toml` declares both the
`onepass` provider and the secrets themselves, so the repository is
self-contained — a clean checkout needs no personal global config. Authenticating
to 1Password does still require the `op` CLI locally, and a service account
token in CI.

## Local development

```bash
mise install
yarn install

# Wrangler reads secrets for local runs from an untracked .dev.vars. The
# tracked example carries Cloudflare's always-pass Turnstile test keys and an
# empty Resend key, which is what you want locally.
cp sites/www/.dev.vars.example sites/www/.dev.vars
cp sites/forensics/.dev.vars.example sites/forensics/.dev.vars

yarn dev:www          # http://localhost:4321
yarn dev:forensics    # takes the next free port if www is already running
```

Other workspace scripts: `yarn build`, `yarn check` (Astro's typecheck), and the
`:www` / `:forensics` variants of each.

To judge a visual change, build the versions side by side rather than deploying a
preview per branch:

```bash
scripts/frontend-compare.py up forensics working rob/some-branch
```

`working` means the current tree, so uncommitted changes compare against a
branch. The same script takes screenshots and reports measured type and spacing
per element — see `docs/frontend-compare.md`.

With an empty `RESEND_API_KEY` a local submission is stored and not emailed,
which is the intended local behaviour rather than a misconfiguration.

Two things surprise people:

- Astro rejects a `POST` whose `Origin` header does not match the site. A
  browser sends it; `curl` does not, and gets a 403 that looks like the spam
  gate rejecting the request. Add `-H "Origin: http://localhost:4321"`.
- The forms need JavaScript. The Turnstile widget will not render without it and
  the endpoint rejects a submission carrying no token; both pages print a
  `mailto:` fallback for that case.

## Database

One D1 database, `rootsystem-forms`, shared by both sites. `contact_submissions`
takes the main site's contact form, `case_intake` takes the forensics
case-scoping form.

```bash
cd sites/www
npx wrangler d1 execute rootsystem-forms --local  --file=../../db/migrations/0002_spam_and_delivery.sql
npx wrangler d1 execute rootsystem-forms --remote --file=../../db/migrations/0002_spam_and_delivery.sql
```

A fresh local database needs every migration in order. `--remote` writes to
production.

`0001_init.sql` carries a confidentiality note about `case_intake`: it receives
free-text descriptions of live matters. Read it before adding columns or
exporting rows.

## Retention

`workers/retention` is a cron-only Worker that performs the deletions the
privacy policy commits to: the free-text matter description at 90 days,
contact enquiries and spam-judged intake rows at twelve months. It has no
fetch handler, so the cron is the only way in.

The 90-day purge blanks `case_intake.matter_summary` and never deletes the
row. The conflict record lives in the same row and is kept for as long as the
practice operates; a DELETE there would destroy what the conflict screen runs
against.

Every task writes a row to `retention_runs` even when it changed nothing, so a
zero means the job ran and found nothing due and a missing row means it did not
run. That table is the evidence that the policy is honored; read it for gaps in
the dates.

To exercise it locally, against a seeded local database rather than production:

```bash
cd workers/retention
npx wrangler d1 migrations apply rootsystem-forms --local
npx wrangler dev --test-scheduled
curl http://localhost:8787/__scheduled
```

## Secrets and configuration

| Name | Mechanism | Notes |
|---|---|---|
| `TURNSTILE_SITE_KEY` | Worker secret | public value, kept with its pair so rotation touches one place |
| `TURNSTILE_SECRET_KEY` | Worker secret | |
| `RESEND_API_KEY` | Worker secret | send-only, scoped to `send.rootsystem.com` |
| `NOTIFY_FROM`, `NOTIFY_TO` | `vars` in `wrangler.jsonc` | readable on purpose — where a form goes should be findable by reading the repo |

Worker secrets are set per Worker and survive a deploy. Run from the site
directory, so `wrangler` picks up the right `wrangler.jsonc`:

```bash
cd sites/www
mise exec -- sh -c 'printf "%s" "$RESEND_API_KEY" | npx wrangler secret put RESEND_API_KEY'
```

Piping from `fnox` keeps the value off disk and out of shell history.

## Deployment

Work goes on a short-lived branch off `primary` with a pull request.

- A pull request runs `wrangler versions upload`, publishing a Worker version
  that takes no traffic and returns a preview URL.
- A merge to `primary` runs `wrangler deploy`. **Merging is a production
  event**, not just a code landing.

Path filters in `.github/workflows/deploy.yml` mean a change to one site does
not redeploy the other. A branch ruleset requires a pull request and green
`changes` / `deploy (www)` / `deploy (forensics)` checks, and blocks deletion
and force-push on `primary`.

`yarn workspace @rootsystem/www deploy` still works from a laptop and will move
production traffic immediately. Prefer the pull request.

## Documentation

| File | |
|---|---|
| `docs/roadmap.md` | current sequencing and open questions |
| `docs/apex-cutover-runbook.md` | executed record of the Netlify → Cloudflare cutover |
| `docs/teardown-order.md` | decommission order for Netlify, Vercel and Sanity |
| `docs/forensics-ia-open-problem.md` | why the forensics property has not launched |
| `docs/forensics-positioning-decision.md` | why the forensics copy says what it says |
| `docs/frontend-compare.md` | comparing front-end builds locally, with screenshots and measurements |
| `docs/superpowers/specs/` | design specs, newest last |
