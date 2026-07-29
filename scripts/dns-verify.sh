#!/usr/bin/env bash
#
# DNS cutover verification for rootsystem.com.
#
# Compares what the current authoritative provider (DNSimple) answers against
# what the prospective one (Cloudflare) answers, record by record, by querying
# each nameserver directly rather than trusting a resolver cache.
#
# Run this before the nameserver change. A FAIL means do not flip.
# Run it again after the change, plus the HTTP checks, to confirm the cutover.
#
# Usage:
#   scripts/dns-verify.sh            compare DNS answers between providers
#   scripts/dns-verify.sh --http     also check redirect hostnames over HTTPS
#
# Requires no credentials -- it only performs public DNS and HTTP queries.

set -u

OLD_NS="ns1.dnsimple-edge.com"   # DNSimple, authoritative until cutover
NEW_NS="dilbert.ns.cloudflare.com" # Cloudflare, zone 6404dc8cf899e2a7d7af28bd94f1b198

pass=0
fail=0
expected=0

# DNS answer order is not significant, so answers are sorted before comparison
# to avoid false mismatches.
ask() {
  dig +short +time=5 +tries=2 "@$1" "$2" "$3" 2>/dev/null | sort | tr '\n' ' ' | sed 's/ *$//'
}

# compare <name> <type> [reason-if-difference-is-intended]
compare() {
  local name="$1" type="$2" note="${3:-}"
  local old new
  old=$(ask "$OLD_NS" "$name" "$type")
  new=$(ask "$NEW_NS" "$name" "$type")

  if [ "$old" = "$new" ]; then
    pass=$((pass + 1))
    printf '  MATCH     %-52s %-5s\n' "$name" "$type"
  elif [ -n "$note" ]; then
    expected=$((expected + 1))
    printf '  EXPECTED  %-52s %-5s (%s)\n' "$name" "$type" "$note"
    printf '            dnsimple  : %s\n' "${old:-<empty>}"
    printf '            cloudflare: %s\n' "${new:-<empty>}"
  else
    fail=$((fail + 1))
    printf '  MISMATCH  %-52s %-5s\n' "$name" "$type"
    printf '            dnsimple  : %s\n' "${old:-<empty>}"
    printf '            cloudflare: %s\n' "${new:-<empty>}"
  fi
}

echo "DNS comparison: $OLD_NS (current) vs $NEW_NS (prospective)"
echo

# Mail is the highest-consequence category -- a missing MX bounces mail.
compare rootsystem.com                                    MX
compare rootsystem.com                                    TXT
compare mail.rootsystem.com                               CNAME
compare calendar.rootsystem.com                           CNAME

# Web
compare rootsystem.com                                    A
compare www.rootsystem.com                                CNAME
compare insights.rootsystem.com                           CNAME
compare insights.dev.rootsystem.com                       CNAME
compare insights.staging.rootsystem.com                   CNAME
compare ngrok.rootsystem.com                              CNAME

# Third-party domain verification
compare _gh-rootsystem-dev-o.rootsystem.com               TXT
compare _github-pages-challenge-rootsystem-dev.rootsystem.com TXT

# Intended differences. Declared explicitly so they cannot be mistaken for
# drift, and so an unexpected difference still fails loudly.
compare dev.rootsystem.com  A   "removed on purpose -- confirmed legacy 2026-07-29"
compare _dmarc.rootsystem.com TXT "added during migration -- absent at DNSimple"

echo
printf 'match: %d   expected difference: %d   MISMATCH: %d\n' "$pass" "$expected" "$fail"

# Delegation is checked separately, and NOT with `dig +short`.
#
# A delegation's NS records are returned in the AUTHORITY section as a referral,
# not the ANSWER section. `dig +short` prints only the answer, so comparing two
# empty answers yields a false MATCH -- which is exactly the bug this replaced.
echo
echo "Delegation of rob. and kyle. to DNSimple:"
delegation_ok=1

for sub in rob kyle; do
  referral=$(dig "@${NEW_NS}" "${sub}.rootsystem.com" NS +norecurse 2>/dev/null \
    | awk '/AUTHORITY SECTION/,/^$/' | grep -c 'dnsimple-edge')
  if [ "$referral" -ge 2 ]; then
    printf '  OK        cloudflare refers %-32s to DNSimple (%s NS)\n' "${sub}.rootsystem.com" "$referral"
  else
    printf '  MISSING   cloudflare has no delegation for %s\n' "${sub}.rootsystem.com"
    delegation_ok=0
  fi

  # A real child zone answers its own SOA authoritatively. If the SOA that comes
  # back names the parent, the records are flat inside the parent zone and the
  # delegation depends on DNSimple continuing to serve a domain it is no longer
  # authoritative for -- which works, but is not a stable arrangement.
  soa=$(dig "@${OLD_NS}" "${sub}.rootsystem.com" SOA +norecurse 2>/dev/null \
    | awk '/ANSWER SECTION/,/^$/' | grep -c "^${sub}\.rootsystem\.com\.")
  if [ "$soa" -ge 1 ]; then
    printf '  OK        dnsimple hosts %s as its own zone\n' "${sub}.rootsystem.com"
  else
    printf '  WARN      dnsimple has no %s child zone -- records are flat in the parent\n' "${sub}.rootsystem.com"
  fi
done

echo
echo "Redirect hostname resolution:"
for host in meet.rob profile.rob meet.kyle zoom.kyle; do
  answer=$(dig +short +time=5 "@${OLD_NS}" "${host}.rootsystem.com" A 2>/dev/null | head -1)
  if [ -n "$answer" ]; then
    printf '  OK        %-52s %s\n' "${host}.rootsystem.com" "$answer"
  else
    printf '  MISSING   %-52s no A record\n' "${host}.rootsystem.com"
    delegation_ok=0
  fi
done

if [ "${1:-}" = "--http" ]; then
  echo
  echo "Redirect behaviour (HTTPS -- proves both the cert and the redirect):"
  for host in meet.rob profile.rob meet.kyle zoom.kyle; do
    result=$(curl -sI -m 10 -o /dev/null \
      -w '%{http_code} verify=%{ssl_verify_result} -> %{redirect_url}' \
      "https://${host}.rootsystem.com" 2>/dev/null)
    printf '  %-52s %s\n' "${host}.rootsystem.com" "${result:-no response}"
  done
fi

echo
if [ "$fail" -eq 0 ] && [ "$delegation_ok" -eq 1 ]; then
  echo "GATE: PASS"
  exit 0
fi
echo "GATE: FAIL -- do not change nameservers"
exit 1
