# Apex cutover runbook — rootsystem.com off Netlify, onto the Worker

Prepared 2026-07-29 and **executed the same evening, Approach B.**
`rootsystem.com` now serves the Astro build from the `rootsystem-www` Worker.

## Execution record — 2026-07-29, ~22:40 PDT

| Step | Result |
|---|---|
| Pre-flight `dns-verify.sh --http` | `GATE: PASS`, 0 mismatches |
| Apex A `b8e3227946323c46dbce815235152e82` → `proxied: true` | done; content still `104.198.14.52` |
| Netlify still serving through the proxy | confirmed (`server: cloudflare`, `cf-ray`, legacy title) |
| Worker route created | `cfacb0f2dda74596b45274ed80c892a5`, `rootsystem.com/*` → `rootsystem-www` |
| Apex serves the rebuild | confirmed |
| Mail | 5 MX, SPF, DMARC, 6 verification TXT all intact |
| Contact form → D1 | confirmed, row `id 4` (test row, safe to delete) |
| `www` 301 | **NOT DONE — blocked, see below** |
| Post-flight `dns-verify.sh --http` | `GATE: PASS`, 0 mismatches |

### Two things did not go as written

**`wrangler deploy` did not create the route.** The `routes` block was added to
`wrangler.jsonc` and the deploy reported success, but `GET /zones/:id/workers/routes`
came back empty and the apex kept serving Netlify — a silent no-op, not an error.
Creating it through the API worked immediately. **Do not treat a successful
`wrangler deploy` as evidence that a route exists; query the API.**

**The `www` 301 could not be created with the current token.** Both available
paths are refused:

- Rulesets (`http_request_dynamic_redirect`): `"request is not authorized"`
- Page Rules: `code 1011, "Page Rules endpoint does not support account owned tokens."`

`www.rootsystem.com` was therefore left untouched — it still CNAMEs to
`rootsystem.netlify.app` and **still serves the legacy site**, so the two
hostnames currently disagree. Resolve by either:

1. Cloudflare dashboard → Rules → Redirect Rules → single redirect,
   `http.host eq "www.rootsystem.com"` → `301` to
   `concat("https://rootsystem.com", http.request.uri.path)`, preserve query; or
2. Granting the API token **Zone → Config Rules → Edit** on this zone, after
   which the `PUT` in step 5 below works as written.

Then replace the `www` CNAME as step 5 describes — the DNS change is deliberately
left until the redirect exists, so there is never a window where `www` resolves
to Cloudflare with no rule to act on it.

---

## Original plan, retained for reference and rollback

Decisions already made:

- `www.rootsystem.com` 301-redirects to the bare apex. Every canonical, sitemap
  and OG URL the build emits uses the apex (`site: 'https://rootsystem.com'` in
  `sites/www/astro.config.mjs`), so this makes DNS agree with the markup.
- `forensics.rootsystem.com` is **not** part of this cutover. Its information
  architecture is unresolved — see `docs/forensics-ia-open-problem.md`. It stays
  on `workers.dev` with no zone record.

## State at time of writing

Zone `rootsystem.com` = `6404dc8cf899e2a7d7af28bd94f1b198`, nameservers already
Cloudflare (`dilbert` / `karina`). This is a records-and-routes change inside the
zone, not a delegation change.

| Record | Content | Proxied | ID |
|---|---|---|---|
| `A rootsystem.com` | `104.198.14.52` (Netlify) | no | `b8e3227946323c46dbce815235152e82` |
| `CNAME www` | `rootsystem.netlify.app` | no | `7cd5f569c298bb416543532611676c2b` |

**Those two records are the entire cutover.** The apex also carries 5 MX records
and 7 TXT records — SPF plus Google, Slack, 1Password, OpenAI and Miro domain
verifications. Do not touch them. Deleting apex records indiscriminately takes
down Google Workspace mail and invalidates every domain verification.

All commands below assume `cd sites/www` and run through the secret shim:

```bash
CF_ZONE=6404dc8cf899e2a7d7af28bd94f1b198
api() {  # api <METHOD> <PATH> [JSON]
  mise exec -- fnox run -- sh -c "curl -sS -X $1 \
    -H \"Authorization: Bearer \$CLOUDFLARE_API_TOKEN\" \
    -H 'Content-Type: application/json' \
    'https://api.cloudflare.com/client/v4/zones/$CF_ZONE/$2' \
    ${3:+--data '$3'}" | python3 -m json.tool
}
```

## Choose an approach first

### Approach A — Workers Custom Domain (what the handoff assumed)

Cloudflare's standard path for Workers. It provisions the certificate and manages
the hostname's DNS record itself. The tradeoff: the existing A record must be
gone before the custom domain can take the hostname, so there is a gap — seconds
to a minute — where the apex does not resolve. Rollback means recreating the A
record and waiting on DNS again.

### Approach B — Proxied record plus a Worker route (lower risk)

Turn the existing apex A record orange-cloud so it proxies through Cloudflare
while still pointing at Netlify, then attach a route. The Worker intercepts the
request before the origin is consulted, so Netlify remains a live fallback that
is never reached. **Rollback is deleting the route** — traffic falls straight
back to Netlify with no DNS propagation involved.

Approach B is the safer one to run while watching, and is what the steps below
use. Approach A's variant steps are noted where they differ.

---

## 1. Pre-flight

```bash
./scripts/dns-verify.sh --http          # from the repo root; record the output
curl -sSI https://rootsystem.com | head -20    # expect: server: Netlify
git status --short                      # expect clean; the branch must be pushed
yarn build                              # must pass before anything moves
```

Confirm the Worker serving the current build is the one you intend:

```bash
mise exec -- fnox run -- wrangler deployments list | head
```

Do not proceed if `dns-verify.sh` reports anything beyond the known
`rob.` / `kyle.` delegation WARN.

## 2. Proxy the apex record (Approach B)

Keeps the content pointing at Netlify; only the proxy flag changes.

```bash
api PATCH "dns_records/b8e3227946323c46dbce815235152e82" '{"proxied":true}'
```

Verify Cloudflare is now answering for the apex, and that the site still loads
from Netlify through the proxy — this is the checkpoint that proves proxying did
not break the origin before any Worker is involved:

```bash
dig +short rootsystem.com            # expect Cloudflare anycast IPs, not 104.198.14.52
curl -sSI https://rootsystem.com | grep -iE "^server|^cf-"
```

If the site does not load here, `PATCH` `{"proxied":false}` and stop. Nothing
else has changed yet.

> **Approach A instead:** delete the record rather than proxying it —
> `api DELETE "dns_records/b8e3227946323c46dbce815235152e82"` — and skip to
> step 3 with `custom_domain: true`. The apex is down from this moment until the
> custom domain finishes provisioning.

## 3. Attach the Worker

Add to `sites/www/wrangler.jsonc` so the binding is in version control rather
than dashboard-only state:

```jsonc
  "routes": [
    { "pattern": "rootsystem.com/*", "zone_name": "rootsystem.com" }
  ],
```

For Approach A this is instead:

```jsonc
  "routes": [
    { "pattern": "rootsystem.com", "custom_domain": true }
  ],
```

This edit is **deliberately not applied** in the repo — applying it means the
next `wrangler deploy` performs the cutover, including from CI. Add it as part of
running this runbook, not before.

Then:

```bash
mise exec -- fnox run -- wrangler deploy
```

## 4. Verify the apex serves the rebuild

```bash
curl -sSI https://rootsystem.com | grep -iE "^server|^cf-|^content-type"
curl -sS https://rootsystem.com | grep -o "<title>[^<]*</title>"
# expect: <title>Root System — A sweat equity company</title>
```

Then check the things most likely to be quietly wrong:

```bash
curl -sS https://rootsystem.com/robots.txt | head -3
curl -sSI https://rootsystem.com/sitemap-index.xml | head -3
curl -sSI https://rootsystem.com/fellowship | grep -i "^location"   # -> /apply
curl -sS https://rootsystem.com/images/rootsystem-card.png -o /dev/null -w "%{http_code} %{size_download}\n"
```

And confirm the contact form still reaches D1 — it is the only non-static route,
so it is the only thing that can break differently on a custom domain:

```bash
mise exec -- fnox run -- wrangler d1 execute rootsystem-forms --remote \
  --command "SELECT COUNT(*) FROM contact_submissions"
# submit the form at https://rootsystem.com/contact, then re-run and expect +1
```

## 5. Point www at the apex with a 301

Replace the Netlify CNAME with a proxied record so the edge can act on it, then
add a single redirect rule.

```bash
api DELETE "dns_records/7cd5f569c298bb416543532611676c2b"
api POST "dns_records" '{"type":"CNAME","name":"www","content":"rootsystem.com","proxied":true,"ttl":1}'
```

The redirect rule itself lives in the `http_request_dynamic_redirect` phase.
Fetch the phase entrypoint first — do not assume it exists or that it is empty,
because overwriting it would discard any rule already there:

```bash
api GET "rulesets/phases/http_request_dynamic_redirect/entrypoint"
```

If the phase has no ruleset yet:

```bash
api PUT "rulesets/phases/http_request_dynamic_redirect/entrypoint" '{
  "rules": [{
    "action": "redirect",
    "expression": "(http.host eq \"www.rootsystem.com\")",
    "description": "www -> apex, 301",
    "action_parameters": {
      "from_value": {
        "status_code": 301,
        "target_url": { "expression": "concat(\"https://rootsystem.com\", http.request.uri.path)" },
        "preserve_query_string": true
      }
    }
  }]
}'
```

If it already has rules, append rather than replace. Verify:

```bash
curl -sSI https://www.rootsystem.com | grep -iE "^HTTP|^location"
# expect 301 and location: https://rootsystem.com/
curl -sSI https://www.rootsystem.com/about | grep -i "^location"
# expect the path to survive: https://rootsystem.com/about
```

## 6. Post-flight

```bash
./scripts/dns-verify.sh --http      # diff against the step 1 output
```

Mail is the thing worth re-checking explicitly, because it shares the apex with
the record that moved:

```bash
dig +short rootsystem.com MX | sort          # expect all 5 Google records
dig +short rootsystem.com TXT | grep spf     # expect v=spf1 a include:_spf.google.com ~all
```

Then send a test message to `partners@rootsystem.com` and confirm delivery. DNS
looking right is not the same as mail flowing.

## Rollback

**Approach B** — delete the route and redeploy, or remove it in the dashboard.
Traffic returns to Netlify immediately; no DNS wait, because the record still
points there:

```bash
# remove the "routes" block from wrangler.jsonc, then
mise exec -- fnox run -- wrangler deploy
api PATCH "dns_records/b8e3227946323c46dbce815235152e82" '{"proxied":false}'
```

**Approach A** — recreate the record and wait for propagation:

```bash
api POST "dns_records" '{"type":"A","name":"@","content":"104.198.14.52","proxied":false,"ttl":1}'
```

**www**, either way:

```bash
api POST "dns_records" '{"type":"CNAME","name":"www","content":"rootsystem.netlify.app","proxied":false,"ttl":1}'
# and delete the redirect rule from the dynamic_redirect ruleset
```

## Do not do these during the cutover

- **Do not delete the Netlify site.** Stopping builds is safe; the published
  deploy keeps serving and is the rollback target. Under Approach B it is also
  the live fallback origin.
- **Do not touch the apex MX or TXT records.**
- **Do not export or decommission Sanity yet.** The old `insights` posts exist
  only in Sanity and the Vercel deployment, and Taproot has zero published posts.
  `npx sanity dataset export production` needs an interactive `sanity login`
  first. This must happen before any teardown.
- **`git push -u` trips the destructive-op guard** — it reads `-u` as force. Use
  `git push origin <branch>`.

## Follow-on, after the apex is confirmed

1. `insights.rootsystem.com` → `/taproot` 301, as a zone-level Redirect Rule.
   Not a build artifact — Astro cannot emit a page for a hostname it does not
   serve.
2. Stop Netlify builds. Leave the site itself in place.
3. Sanity dataset export, then decommission Vercel blog, then Sanity — each only
   after its hostname is confirmed serving from Cloudflare.
