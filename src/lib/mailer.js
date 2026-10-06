import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// rows: [label, value] pairs rendered as a simple table + plain-text fallback
export async function sendNotification({ subject, replyTo, rows }) {
  const filled = rows.filter(([, value]) => value);
  const text = filled.map(([label, value]) => `${label}: ${value}`).join("\n\n");
  const html = `<table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${filled
    .map(
      ([label, value]) =>
        `<tr><td style="vertical-align:top;font-weight:600;color:#555">${escapeHtml(label)}</td><td style="white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
    )
    .join("")}</table>`;

  await transporter.sendMail({
    from: `"Dothunters Website" <${process.env.GMAIL_USER}>`,
    to: process.env.CONTACT_TO_EMAIL || process.env.GMAIL_USER,
    replyTo,
    subject,
    text,
    html,
  });
}
