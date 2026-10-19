import { NextResponse } from "next/server";
import { fakeSuccess, isLikelyBot, validateFields, verifyTurnstile } from "@/lib/formGuard";
import { sendClientCopy, sendNotification } from "@/lib/mailer";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (isLikelyBot(body)) return fakeSuccess();

  const invalid = validateFields(body, {
    required: ["name", "email", "service", "message"],
    limits: { name: 100, email: 254, company: 150, service: 100, budget: 100, message: 5000 },
    multiline: ["message"],
  });
  if (invalid) return NextResponse.json({ error: invalid }, { status: 400 });

  if (!(await verifyTurnstile(body.turnstileToken, request))) {
    return NextResponse.json({ error: "Verification failed, please try again" }, { status: 403 });
  }

  const rows = [
    ["Name", body.name],
    ["Email", body.email],
    ["Company", body.company],
    ["Service", body.service],
    ["Budget", body.budget],
    ["Message", body.message],
  ];

  try {
    await sendNotification({
      subject: `New contact message from ${body.name}`,
      heading: "New contact message",
      name: body.name,
      replyTo: body.email,
      rows,
    });
  } catch (err) {
    console.error("Contact email failed:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  // Team already has the submission, so a failed client copy shouldn't fail the request
  try {
    await sendClientCopy({ to: body.email, name: body.name, subject: "We received your message — DotHunters", rows });
  } catch (err) {
    console.error("Contact client copy failed:", err);
  }

  return NextResponse.json({ ok: true });
}
