/**
 * The retention job for rootsystem-forms.
 *
 * The privacy policy at rootsystem.com/privacy commits to three deletions.
 * This Worker is the thing that performs them. Until it was deployed the
 * policy was a promise nothing kept, which is why it exists at all.
 *
 * Design notes, each of which is a decision rather than a default:
 *
 * No fetch handler. A scheduled-only Worker has no HTTP surface, so there is
 * nothing to authenticate and nothing to reach. The cost is that it cannot be
 * triggered by hand in production; the answer to "did it run" is the
 * retention_runs table, not a request.
 *
 * The 90-day intake purge is unconditional -- there is no "unless it became an
 * engagement" test, because this database is a lead inbox and does not know
 * which enquiries became matters. That was decided rather than overlooked; see
 * the policy and issue #67. It rests on matters being carried into the
 * engagement record before day 90.
 *
 * The intake purge blanks a column and never deletes a row. The conflict
 * record -- who approached the practice, on which side, and when -- lives in
 * the same row and is retained for as long as the practice operates. A DELETE
 * here would quietly destroy the thing the conflict screen runs against.
 *
 * Every task writes a row to retention_runs even when it changed nothing. A
 * zero proves the job ran and found nothing due; a missing row proves the job
 * did not run. Those are different facts and the table has to tell them apart.
 *
 * Tasks are independent. One failing does not prevent the others, because a
 * transient D1 error on one statement is not a reason to skip a deletion that
 * is due today and would otherwise wait until tomorrow.
 */

interface Env {
  DB: D1Database
}

/** One unit of retention work: a statement, and the name it logs under. */
type Task = {
  /** Recorded in retention_runs.task. Stable -- it is how history is read. */
  name: string
  /** Human-readable, for the log line only. */
  description: string
  sql: string
}

/**
 * The three commitments, in the order the policy states them.
 *
 * Dates are compared with SQLite's `datetime('now', ...)` rather than a value
 * computed in JavaScript, so the cutoff is evaluated by the same clock and
 * calendar that wrote `created_at`. A Date built in the Worker would introduce
 * a second notion of "now" and a timezone question that does not need to exist.
 */
const TASKS: Task[] = [
  {
    name: 'intake_summary',
    description: 'blank matter descriptions older than 90 days',
    // `<> ''` keeps the count honest: without it every already-purged row is
    // re-counted as affected on every run, and the log stops meaning anything.
    sql: `UPDATE case_intake
             SET matter_summary = ''
           WHERE matter_summary <> ''
             AND created_at <= datetime('now', '-90 days')`,
  },
  {
    name: 'contact_submissions',
    description: 'delete contact enquiries older than twelve months',
    sql: `DELETE FROM contact_submissions
           WHERE created_at <= datetime('now', '-12 months')`,
  },
  {
    name: 'intake_spam',
    description: 'delete spam-judged intake rows older than twelve months',
    // Spam rows are the one case where a case_intake row is deleted outright.
    // They carry no conflict record worth keeping: a submission judged
    // automated did not come from a firm that might appear opposite us later.
    sql: `DELETE FROM case_intake
           WHERE spam_reason IS NOT NULL
             AND created_at <= datetime('now', '-12 months')`,
  },
]

export default {
  async scheduled(_event: ScheduledController, env: Env): Promise<void> {
    for (const task of TASKS) {
      try {
        const result = await env.DB.prepare(task.sql).run()
        const rows = result.meta.changes ?? 0

        // Logged before the insert, so that a failure to record the run still
        // leaves the count in the Worker log rather than nowhere.
        console.log(`retention: ${task.name} ${task.description}: ${rows} rows`)

        await env.DB.prepare(
          `INSERT INTO retention_runs (task, rows_affected) VALUES (?, ?)`,
        )
          .bind(task.name, rows)
          .run()
      } catch (error) {
        // Swallowed on purpose: the next task is still due today. The failure
        // shows up as a gap in retention_runs for this task, which is the
        // signal to look at the Worker log.
        console.error(`retention: ${task.name} failed`, error)
      }
    }
  },
}
