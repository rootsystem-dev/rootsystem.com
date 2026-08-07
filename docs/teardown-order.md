# Legacy teardown — order and gates

Recorded 2026-07-30, after `rootsystem.com` and `www` went live on the Worker.

Nothing below is urgent. Each step is gated on the one before it. The ordering
exists because every one of these is irreversible and at least one of them holds
the only copy of something.

## 0. Sanity dataset export — do this first, before any teardown

The `insights` posts exist **only** in Sanity and in the live Vercel deployment.
Taproot has zero published posts. Losing this loses the content outright.

```bash
npx sanity login          # interactive, Rob must run it
npx sanity dataset export production
```

## 1. Netlify — 2 weeks minimum, 30 days comfortable

Serves no traffic. It is the rollback target: the apex A record still points at
it, so deleting the Worker route returns traffic instantly. That property is the
only reason to keep it.

Gate on evidence, not the calendar:

- a full business week of real traffic with no surprises
- Google has recrawled and the new pages are indexed under the apex
- **at least one genuine inbound contact form submission from a stranger** —
  the cutover test was synthetic and same-origin, and a silently broken lead
  path is the failure nobody notices

Deleting it requires a paired change in the same sitting. The apex resolves to a
Netlify **shared** load-balancer IP. Once the site is gone that is dangling DNS:
traffic never reaches it while the route intercepts everything, but if the route
were removed or misconfigured the hostname points at infrastructure someone else
can claim. So:

1. download a copy of the current deploy
2. delete the site
3. immediately either convert the apex to a Workers Custom Domain, or repoint
   the A record to `192.0.2.1` proxied (reserved documentation space, routes
   nowhere)
4. re-run `./scripts/dns-verify.sh --http`

## 2. `insights.rootsystem.com` — a content decision, not an infra one

The handoff says 301 to `/taproot`. **Do not ship that as written.** Taproot has
no published posts, so collapsing a set of indexed article URLs onto an empty
index is a soft-404 pattern and discards whatever equity those posts carry.

Pick one:

- map post-by-post as content is ported, or
- leave `insights` serving until Taproot has something to land on

The token can now write Redirect Rules via the API, so execution is quick once
the mapping is decided. This is the long pole — content work, not infrastructure.

## 3. Vercel

Two projects:

- **`rootsystem-com` preview** — serves nothing. Safe to delete at any time.
- **blog project** — serves `insights`, `insights.staging`, `insights.dev`
  today. Deletable only after step 0 and step 2, once `insights` is confirmed
  serving from Cloudflare.

## 3b. GitHub app installations and branch rules

The branch ruleset on `primary` was named "only netlify/vercel can deploy main"
and granted standing bypass to the Netlify and Vercel GitHub Apps. It was
replaced on 2026-08-06 with one requiring a pull request and green deploy
checks, bypassable by organization admins only, still blocking deletion and
force-push. The two app bypasses are gone.

The app *installations* remain on the organization. Once step 1 and step 3 are
done, `netlify` (app 13473) and `vercel` (app 8329) have nothing left to serve
and their installations can be removed. Deleting a site or project does not
remove the app's access to the organization's repositories.

## 4. Sanity

Last. Only after Vercel is gone and the export from step 0 is verified readable.
