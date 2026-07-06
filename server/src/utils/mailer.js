import nodemailer from 'nodemailer';
import { logger } from './logger.js';

let transporter = null;

function getTransporter() {
  if (!process.env.SMTP_HOST) return null;
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });

  return transporter;
}

// Fire-and-forget: never let an email failure break the lead-submission request.
export async function notifyNewLead(lead) {
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  const t = getTransporter();

  if (!t || !to) {
    logger.debug('SMTP not configured — skipping lead notification email.');
    return;
  }

  try {
    await t.sendMail({
      from: `"Nfinity Partner Website" <${process.env.SMTP_USER}>`,
      to,
      subject: `New lead: ${lead.name} (${lead.brandName || 'No brand name'})`,
      html: `
        <h2>New website lead</h2>
        <p><strong>Name:</strong> ${lead.name}</p>
        <p><strong>Brand:</strong> ${lead.brandName || '—'}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>Phone:</strong> ${lead.phone}</p>
        <p><strong>Revenue range:</strong> ${lead.revenueRange}</p>
        <p><strong>Biggest bottleneck:</strong> ${lead.bottleneck}</p>
        <p><strong>Message:</strong> ${lead.message || '—'}</p>
        <p><strong>Source page:</strong> ${lead.sourcePage || '—'}</p>
      `,
    });
  } catch (err) {
    logger.error(`Failed to send lead notification email: ${err.message}`);
  }
}

export default notifyNewLead;
