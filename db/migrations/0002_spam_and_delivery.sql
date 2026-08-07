-- rootsystem-forms — spam verdict and notification delivery state
--
-- Adds three columns to both tables. Two concerns that were previously not
-- recorded at all:
--
--   1. Whether a submission was judged spam, and on what basis. Before this,
--      a honeypot hit was discarded at the endpoint and left no trace, so
--      there was no way to see what the form was actually receiving.
--   2. Whether the submission has been emailed onward. Separate from
--      handled_at, which records that a person has read it. A row can be
--      delivered but untriaged, or triaged but never delivered.
--
-- Spam-ness is `spam_reason IS NOT NULL`. There is deliberately no boolean
-- alongside it: two columns encoding the same fact drift apart.

-- status  -- delivery state, one of:
--   'pending'   stored, notification not yet attempted (also the state when no
--               Resend key is configured, so these can be swept later)
--   'notified'  Resend accepted the message
--   'held'      deliberately not sent, because spam_reason is set
--   'failed'    send attempted and errored; detail is in the Worker log
--
-- spam_reason  -- comma-joined categories, currently 'honeypot' and
--                 'turnstile'. Both can apply to one submission.
--
-- spam_detail  -- free text supporting the verdict: the Turnstile error-codes,
--                 and the honeypot value truncated to 100 characters. Both are
--                 attacker-controlled and are written as bound parameters like
--                 every other field here.

ALTER TABLE contact_submissions ADD COLUMN status      TEXT NOT NULL DEFAULT 'pending';
ALTER TABLE contact_submissions ADD COLUMN spam_reason TEXT;
ALTER TABLE contact_submissions ADD COLUMN spam_detail TEXT;

ALTER TABLE case_intake ADD COLUMN status      TEXT NOT NULL DEFAULT 'pending';
ALTER TABLE case_intake ADD COLUMN spam_reason TEXT;
ALTER TABLE case_intake ADD COLUMN spam_detail TEXT;

-- The queue of clean submissions still awaiting a notification. Partial rather
-- than a plain index on status: 'held' rows are the majority once bots find the
-- form, and they are never candidates for sending.
CREATE INDEX IF NOT EXISTS idx_contact_pending
  ON contact_submissions (created_at)
  WHERE status = 'pending' AND spam_reason IS NULL;

CREATE INDEX IF NOT EXISTS idx_intake_pending
  ON case_intake (created_at)
  WHERE status = 'pending' AND spam_reason IS NULL;
