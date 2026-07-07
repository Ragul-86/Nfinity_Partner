import { Resend } from 'resend';
import { logger } from './logger.js';

let client = null;

function getClient() {
  if (!process.env.RESEND_API_KEY) return null;
  if (client) return client;
  client = new Resend(process.env.RESEND_API_KEY);
  return client;
}

/* ─── Label maps ─────────────────────────────────────────────────────────── */

const REVENUE_LABELS = {
  '<10L':     'Under ₹10L / month',
  '10L-50L':  '₹10L – ₹50L / month',
  '50L-2Cr':  '₹50L – ₹2Cr / month',
  '2Cr+':     '₹2Cr+ / month',
};

const BOTTLENECK_LABELS = {
  acquisition: 'Getting new customers (acquisition)',
  conversion:  'Turning traffic into sales (conversion)',
  retention:   'Getting customers to buy again (retention)',
  tracking:    "Can't tell what's actually working (tracking)",
  not_sure:    "Not sure — that's what I want to find out",
};

/* ─── HTML email builder ─────────────────────────────────────────────────── */

function buildLeadEmailHtml(lead, submittedAt) {
  const row = (label, value) => `
    <tr>
      <td style="padding:10px 16px;background:#f8f9fa;border-bottom:1px solid #e9ecef;
                 font-weight:600;color:#495057;width:200px;vertical-align:top;
                 font-family:Arial,sans-serif;font-size:14px;">
        ${label}
      </td>
      <td style="padding:10px 16px;background:#ffffff;border-bottom:1px solid #e9ecef;
                 color:#212529;font-family:Arial,sans-serif;font-size:14px;">
        ${value || '—'}
      </td>
    </tr>`;

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f2f5;font-family:Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f2f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0a1428 0%,#1a2f5e 100%);
                     padding:28px 32px;border-radius:12px 12px 0 0;text-align:center;">
            <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:3px;
                      text-transform:uppercase;color:#3fe0e0;">NFINITY PARTNER</p>
            <h1 style="margin:10px 0 4px;font-size:22px;font-weight:700;color:#ffffff;">
              🎯 New Growth Strategy Call Lead
            </h1>
            <p style="margin:0;font-size:13px;color:#94a3b8;">
              Submitted ${submittedAt}
            </p>
          </td>
        </tr>

        <!-- Lead details table -->
        <tr>
          <td style="background:#ffffff;padding:0;border-radius:0 0 12px 12px;
                     overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              ${row('👤 Name',                  lead.name)}
              ${row('🏢 Business Name',          lead.brandName)}
              ${row('📞 Phone Number',           lead.phone)}
              ${row('📧 Email Address',          lead.email)}
              ${row('💰 Monthly Revenue',        REVENUE_LABELS[lead.revenueRange] || lead.revenueRange)}
              ${row('🎯 Biggest Growth Challenge', BOTTLENECK_LABELS[lead.bottleneck] || lead.bottleneck)}
              ${lead.message ? row('💬 Message', lead.message) : ''}
              ${row('🔗 Source Page',            lead.sourcePage || 'Direct')}
            </table>

            <!-- CTA footer -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:24px 32px;background:#f8f9fa;border-top:2px solid #2f6fff;
                           border-radius:0 0 12px 12px;text-align:center;">
                  <p style="margin:0 0 16px;font-size:14px;color:#6c757d;">
                    This lead was submitted via the Nfinity Partner website contact form.
                    Respond within 24 hours to maximise conversion.
                  </p>
                  <a href="mailto:${lead.email}"
                     style="display:inline-block;padding:12px 28px;background:linear-gradient(90deg,#2f6fff,#3fe0e0);
                            color:#050b16;font-weight:700;font-size:14px;text-decoration:none;
                            border-radius:999px;letter-spacing:0.5px;">
                    Reply to ${lead.name}
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer note -->
        <tr>
          <td style="padding:16px;text-align:center;">
            <p style="margin:0;font-size:11px;color:#adb5bd;">
              Nfinity Partner · Tiruppur, Tamil Nadu · nfinitypartner.com
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;
}

/* ─── Main export ─────────────────────────────────────────────────────────── */

/**
 * Sends a lead notification email via Resend.
 * Returns true on success, throws on failure so the caller can decide
 * whether to surface the error or swallow it.
 */
export async function notifyNewLead(lead) {
  const to    = process.env.LEAD_NOTIFICATION_EMAIL;
  const from  = process.env.SMTP_FROM || 'onboarding@resend.dev';
  const resend = getClient();

  if (!resend) {
    logger.warn('RESEND_API_KEY not set — lead notification email skipped.');
    return false;
  }
  if (!to) {
    logger.warn('LEAD_NOTIFICATION_EMAIL not set — lead notification email skipped.');
    return false;
  }

  const submittedAt = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'long',
    timeStyle: 'short',
  });

  const subject = `New Growth Strategy Call Lead - ${lead.brandName} | ${lead.name}`;

  const { data, error } = await resend.emails.send({
    from: `Nfinity Partner <${from}>`,
    to,
    subject,
    html: buildLeadEmailHtml(lead, submittedAt),
  });

  if (error) {
    // Throw so leadController can log it and decide on response
    throw new Error(`Resend API error: ${JSON.stringify(error)}`);
  }

  logger.info(`Lead notification email sent — id: ${data.id} | subject: "${subject}"`);
  return true;
}

export default notifyNewLead;
