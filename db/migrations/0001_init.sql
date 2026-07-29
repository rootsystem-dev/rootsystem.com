-- rootsystem-forms — initial schema
--
-- One database, two tables. The two feeds are reviewed by the same person, so a
-- single D1 binding is simpler; the schemas differ enough that merging them
-- would mean nullable columns for half the fields of each.
--
-- CONFIDENTIALITY NOTE. case_intake receives free text from litigators
-- describing live matters. That text can easily contain privileged or
-- client-identifying detail, which creates both a conflict-check problem and a
-- confidentiality exposure. Two mitigations, neither of which is a substitute
-- for judgment:
--   1. The form tells submitters not to include privileged or client-
--      identifying detail at the enquiry stage.
--   2. No column invites a client name. `matter_summary` is deliberately
--      described to the user as "what the dispute turns on", not "the facts".
-- Rows should be triaged and cleared promptly rather than accumulating.

CREATE TABLE IF NOT EXISTS contact_submissions (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT    NOT NULL,
  email         TEXT    NOT NULL,
  message       TEXT    NOT NULL,
  -- Provenance, for telling real enquiries from noise without a full analytics
  -- stack. cf_country comes from the request, not from the submitter.
  cf_country    TEXT,
  user_agent    TEXT,
  created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
  -- Set when a submission has been read, so triage state is not tracked in
  -- somebody's head.
  handled_at    TEXT
);

CREATE INDEX IF NOT EXISTS idx_contact_unhandled
  ON contact_submissions (created_at)
  WHERE handled_at IS NULL;

CREATE TABLE IF NOT EXISTS case_intake (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  name            TEXT    NOT NULL,
  email           TEXT    NOT NULL,
  firm            TEXT,
  -- One of the four service modes in offering-scope.md, or 'unsure'. Stored as
  -- text rather than an enum because D1 is SQLite and the set will change as
  -- the offering does; validated at the endpoint.
  engagement_type TEXT,
  matter_summary  TEXT    NOT NULL,
  -- Free text rather than a date: "before the 30th", "expert reports due in
  -- three weeks" and "no deadline yet" are all more useful than a coerced date.
  timing          TEXT,
  referral_source TEXT,
  cf_country      TEXT,
  user_agent      TEXT,
  created_at      TEXT    NOT NULL DEFAULT (datetime('now')),
  handled_at      TEXT
);

CREATE INDEX IF NOT EXISTS idx_intake_unhandled
  ON case_intake (created_at)
  WHERE handled_at IS NULL;
