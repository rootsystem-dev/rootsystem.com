-- rootsystem-forms — the email domain, stored rather than derived at read time
--
-- The conflict record in the privacy policy names the firm a person writes on
-- behalf of. `firm` is a free-text field and an optional one, so the reliable
-- identifier for the organization behind an enquiry is the domain of the
-- address it came from.
--
-- Stored rather than parsed on every read for one reason: this table is a lead
-- inbox, and the rows are meant to be joined to a CRM that does not exist yet.
-- A merge key that lives in a query is a merge key that has to be reimplemented
-- by whatever does the merging, and the two implementations will disagree about
-- case, about plus-addressing, and about the rows written before either existed.
--
-- Nullable, and null for every row written before this migration. It is also
-- null-ish in meaning for a free mailbox: gmail.com identifies a mail provider,
-- not a firm. Anything reading this column has to treat a consumer domain as
-- "no organization known", which is why the column is not called `firm_domain`.
--
-- case_intake only. contact_submissions is the general enquiry form on
-- rootsystem.com and does not feed a conflict check.

ALTER TABLE case_intake ADD COLUMN email_domain TEXT;

-- Conflict screening asks "has anyone from this organization approached us
-- before", which is a lookup by domain across the whole table.
CREATE INDEX IF NOT EXISTS idx_intake_email_domain
  ON case_intake (email_domain)
  WHERE email_domain IS NOT NULL;
