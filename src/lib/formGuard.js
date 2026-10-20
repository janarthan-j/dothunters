import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_FILL_MS = 3000;

// Checks required fields, types, max lengths and email format.
// limits: { field: maxLength }; fields listed in `multiline` may contain line breaks.
export function validateFields(body, { required, limits, multiline = [] }) {
  const missing = required.filter((field) => !body?.[field]);
  if (missing.length > 0) return `Missing required fields: ${missing.join(", ")}`;

  for (const [field, max] of Object.entries(limits)) {
    const value = body[field];
    if (value === undefined || value === null || value === "") continue;
    if (typeof value !== "string") return `Invalid field: ${field}`;
    if (value.length > max) return `${field} must be at most ${max} characters`;
    if (!multiline.includes(field) && /[\r\n]/.test(value)) return `Invalid field: ${field}`;
  }

  if (!EMAIL_RE.test(body.email)) return "Invalid email address";
  return null;
}

// Honeypot field filled in, or form submitted faster than a human could fill it.
export function isLikelyBot(body) {
  if (body?.website) return true;
  const elapsed = Number(body?.elapsedMs);
  return !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS;
}

// Bots get a normal-looking success so they don't adapt; nothing is sent.
export const fakeSuccess = () => NextResponse.json({ ok: true });

export async function verifyTurnstile(token, request) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (process.env.NODE_ENV !== "production") return true;
    console.error("TURNSTILE_SECRET_KEY is not set; rejecting form submission");
    return false;
  }
  if (!token || typeof token !== "string") return false;

  const params = new URLSearchParams({ secret, response: token });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim();
  if (ip) params.set("remoteip", ip);

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: params,
    });
    const data = await res.json();
    return data.success === true;
  } catch (err) {
    console.error("Turnstile verification failed:", err);
    return false;
  }
}
