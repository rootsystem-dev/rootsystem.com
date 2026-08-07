/**
 * Outbound notification for clean form submissions, via Resend.
 *
 * Duplicated in sites/forensics for the same reason form.ts is: two consumers,
 * no shared package yet.
 *
 * Sending is from a dedicated subdomain (send.rootsystem.com) so that its SPF
 * and DKIM records sit apart from the apex records serving Google Workspace
 * mail. A misconfiguration here cannot affect delivery of real mail to the
 * domain.
 *
 * Nothing is sent for a submission with a spam verdict. The row is already in
 * D1; withholding the mail is the whole point of quarantining rather than
 * rejecting.
 */

/**
 * What happened to the notification. Mirrors the `status` column values in
 * db/migrations/0002_spam_and_delivery.sql, minus 'held', which the caller
 * decides without asking this module.
 *
 * 'pending' is returned when no API key is configured. That is a real state,
 * not an error: the gate and the schema ship before the Resend account exists,
 * and the rows accumulate as a backlog that can be swept once it does.
 */
export type NotifyResult = 'notified' | 'failed' | 'pending'

export type NotifyConfig = {
  apiKey: string | undefined
  from: string | undefined
  to: string | undefined
}

/**
 * POST a plain-text message to the Resend API.
 *
 * `replyTo` is the submitter's own address, so answering the notification
 * answers them rather than the sending subdomain, which receives no mail.
 *
 * Never throws. A submitter cannot act on a mail failure and their submission
 * is already stored, so a failure here is logged and reported back for the
 * status column rather than surfaced to them.
 */
export async function sendNotification(
  config: NotifyConfig,
  message: { subject: string; text: string; replyTo: string },
): Promise<NotifyResult> {
  const { apiKey, from, to } = config
  if (!apiKey || !from || !to) return 'pending'

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: message.replyTo,
        subject: message.subject,
        text: message.text,
      }),
    })

    if (!response.ok) {
      console.error('[notify] resend rejected', response.status, await response.text())
      return 'failed'
    }

    return 'notified'
  } catch (error) {
    console.error('[notify] resend unreachable', error)
    return 'failed'
  }
}

/** Render a set of labelled values as the body of a notification email. */
export function formatBody(fields: Array<[string, string | null]>): string {
  return fields
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n')
}
