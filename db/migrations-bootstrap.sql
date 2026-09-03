-- rootsystem-forms — adopt wrangler's migration tracking, after the fact
--
-- 0001, 0002 and 0003 were each applied with `wrangler d1 execute --file=`,
-- which does not write to the tracking table wrangler's `d1 migrations apply`
-- reads. The database therefore had the schema but no record of it, and the
-- obvious command was a trap: with no tracking table, `migrations apply`
-- treats all three files as pending, survives 0001 on IF NOT EXISTS, and then
-- fails on 0002's ALTER TABLE against a column that already exists.
--
-- This is not a migration and is deliberately not numbered into the sequence.
-- It is a one-time bootstrap that tells wrangler what is already true, so that
-- `wrangler d1 migrations apply rootsystem-forms --remote` becomes the correct
-- command from 0004 onward.
--
-- The table definition is copied from wrangler's own
-- `getCreateMigrationsTableQuery`, and `name` is the bare filename because
-- that is what wrangler inserts after running a file. Both have to match
-- exactly or wrangler will not recognize its own bookkeeping.
--
-- Idempotent: `name` is UNIQUE and the inserts are OR IGNORE, so re-running
-- this changes nothing. `applied_at` will say when the bootstrap ran rather
-- than when each migration actually ran, which is the one thing it cannot
-- reconstruct.
--
-- Run once per database, remote and local:
--   cd sites/forensics
--   npx wrangler d1 execute rootsystem-forms --remote --file=../../db/migrations-bootstrap.sql

CREATE TABLE IF NOT EXISTS "d1_migrations"(
	id         INTEGER PRIMARY KEY AUTOINCREMENT,
	name       TEXT UNIQUE,
	applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT OR IGNORE INTO d1_migrations (name) VALUES
  ('0001_init.sql'),
  ('0002_spam_and_delivery.sql'),
  ('0003_email_domain.sql');
