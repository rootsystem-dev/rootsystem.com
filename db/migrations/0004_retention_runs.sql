-- rootsystem-forms — evidence that the retention job ran
--
-- The privacy policy commits to deleting the free-text matter description at
-- 90 days and contact enquiries at twelve months. A deletion that leaves no
-- trace cannot be evidenced to anyone who asks whether that commitment is
-- honored, and "the code says it does" is not evidence that it did.
--
-- One row per task per run, including runs that deleted nothing -- a zero is
-- the proof that the job executed and found nothing due, which is a different
-- fact from the job never having run. Reading this table for a gap in the
-- dates is how you find out the cron stopped firing.
--
-- Deliberately not a log of what was deleted. The whole point of the purge is
-- that the matter descriptions stop existing; recording which rows lost one,
-- let alone what they said, would rebuild a shadow of the thing being deleted.
-- Row counts only.

CREATE TABLE IF NOT EXISTS retention_runs (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  -- 'intake_summary' | 'contact_submissions' | 'intake_spam'. Text rather
  -- than a constrained set because D1 is SQLite and the task list will change
  -- as the policy does; the worker owns the vocabulary.
  task          TEXT    NOT NULL,
  rows_affected INTEGER NOT NULL,
  ran_at        TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- The question asked of this table is always "when did <task> last run", so
-- the index leads with the task and orders within it.
CREATE INDEX IF NOT EXISTS idx_retention_runs_task
  ON retention_runs (task, ran_at DESC);
