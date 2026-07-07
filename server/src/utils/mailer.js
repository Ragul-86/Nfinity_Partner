import { Resend } from 'resend';
import { logger } from './logger.js';

let client = null;

function getClient() {
  if (!process.env.RESEND_API_KEY) return null;
  if (client) return client;
  client = new Resend(process.env.RESEND_API_KEY);
  return client;
}

// Fire-and-forget: never let an email failure break the lead-submission request.
export async function notifyNewLead(lead) {
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  const from = process.env.SMTP_FROM || 'onboarding@resend.dev';
  const resend = getClient();

  if (!resend) {
    logger.warn('RESEND_API_KEY not set — lead notification email skipped.');
    return;
  }
  if (!to) {
    logger.warn('LEAD_NOTIFICATION_EMAIL not set — lead notification email skipped.');
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `Nfinity Partner Website <${from}>`,
      to,
      subject: `New lead: ${lead.name} (${lead.brandName || 'No brand name'})`,
      html: `
        <h2 style="color:#1a1a2e;">New Website Lead</h2>
        <p><strong>Name:</strong> ${lead.name}</p>
        <p><strong>Brand:</strong> ${lead.brandName || '—'}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>Phone:</strong> ${lead.phone}</p>
        <p><strong>Revenue range:</strong> ${lead.revenueRange}</p>
        <p><strong>Biggest bottleneck:</strong> ${lead.bottleneck}</p>
        <p><strong>Message:</strong> ${lead.message || '—'}</p>
        <p><strong>Source page:</strong> ${lead.sourcePage || '—'}</p>
        <hr/>
        <p style="color:#888;font-size:12px;">Submitted at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
      `,
    });

    if (error) {
      logger.error(`Resend error: ${JSON.stringify(error)}`);
    } else {
      logger.info(`Lead notification email sent — id: ${data.id}`);
    }
  } catch (err) {
    logger.error(`Failed to send lead notification email: ${err.message}`);
  }
}

export default notifyNewLead;
