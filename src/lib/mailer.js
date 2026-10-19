import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const SITE_URL = "https://dothunters.com";
const LOGO_URL = `${SITE_URL}/logo/logo-horizontal-white.png`;
const BRAND_RED = "#ef4444";
const FONT = "'Space Grotesk',Helvetica,Arial,sans-serif";

const teamInbox = () => process.env.CONTACT_TO_EMAIL || process.env.GMAIL_USER;

export const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// rows: [label, value] pairs; empty values are skipped
const filledRows = (rows) => rows.filter(([, value]) => value);

const rowsText = (rows) =>
  filledRows(rows).map(([label, value]) => `${label}: ${value}`).join("\n\n");

const rowsHtml = (rows) =>
  filledRows(rows)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #eeeeee;vertical-align:top;width:40%;font-size:13px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.04em">${escapeHtml(label)}</td>
          <td style="padding:14px 0 14px 16px;border-bottom:1px solid #eeeeee;vertical-align:top;font-size:15px;color:#111111;white-space:pre-wrap">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

// Branded shell: black header with logo, white card, footer. All styles inline for email clients.
function layout({ preheader, heading, intro, rows, cta }) {
  const button = cta
    ? `<tr><td style="padding:28px 0 4px">
        <a href="${escapeHtml(cta.href)}" style="display:inline-block;background:${BRAND_RED};color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:12px 24px;border-radius:9999px">${escapeHtml(cta.label)}</a>
      </td></tr>`
    : "";

  return `<!doctype html>
<html>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:${FONT}">
  <span style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(preheader)}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden">
        <tr><td style="background:#000000;padding:24px 32px;border-bottom:4px solid ${BRAND_RED}">
          <a href="${SITE_URL}"><img src="${LOGO_URL}" alt="DotHunters" height="36" style="display:block;height:36px;width:auto;border:0"></a>
        </td></tr>
        <tr><td style="padding:32px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="font-size:24px;font-weight:700;color:#111111;padding-bottom:12px">${escapeHtml(heading)}</td></tr>
            <tr><td style="font-size:15px;line-height:1.6;color:#374151;padding-bottom:20px">${escapeHtml(intro)}</td></tr>
            <tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #eeeeee">${rowsHtml(rows)}</table></td></tr>
            ${button}
          </table>
        </td></tr>
        <tr><td style="background:#fafafa;padding:20px 32px;font-size:12px;line-height:1.6;color:#6b7280">
          <strong style="color:#111111">DotHunters</strong> &middot;
          <a href="${SITE_URL}" style="color:${BRAND_RED};text-decoration:none">dothunters.com</a> &middot;
          <a href="mailto:hello@dothunters.com" style="color:${BRAND_RED};text-decoration:none">hello@dothunters.com</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// Internal notification to the team; replies go to the client
export async function sendNotification({ subject, heading, replyTo, name, rows }) {
  const intro = "A new submission came in through the website. Reply to this email to respond directly.";

  await transporter.sendMail({
    from: `"DotHunters Website" <${process.env.GMAIL_USER}>`,
    to: teamInbox(),
    replyTo,
    subject,
    text: `${heading}\n\n${intro}\n\n${rowsText(rows)}`,
    html: layout({
      preheader: subject,
      heading,
      intro,
      rows,
      cta: replyTo && { href: `mailto:${replyTo}`, label: `Reply to ${name || replyTo}` },
    }),
  });
}

// Copy of the submission sent to the client; replies go to the team inbox
export async function sendClientCopy({ to, name, subject, rows }) {
  const heading = `Thanks, ${name}!`;
  const intro =
    "We've received your message and will get back to you shortly. Here's a copy of what you sent. Just reply to this email if you want to add anything.";

  await transporter.sendMail({
    from: `"DotHunters" <${process.env.GMAIL_USER}>`,
    to,
    replyTo: teamInbox(),
    subject,
    text: `${heading}\n\n${intro}\n\n${rowsText(rows)}\n\n— The DotHunters team\n${SITE_URL}`,
    html: layout({
      preheader: "We've received your message. Here's a copy for your records.",
      heading,
      intro,
      rows,
      cta: { href: SITE_URL, label: "Visit dothunters.com" },
    }),
  });
}
