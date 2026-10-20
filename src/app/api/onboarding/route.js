import { NextResponse } from "next/server";
import { services } from "@/data/services";
import onboardingQuestions from "@/data/onboardingQuestions";
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
    required: ["serviceSlug", "budget", "timeline", "name", "email"],
    limits: { serviceSlug: 100, budget: 100, timeline: 100, name: 100, email: 254, company: 150, notes: 5000 },
    multiline: ["notes"],
  });
  if (invalid) return NextResponse.json({ error: invalid }, { status: 400 });

  const service = services.find((s) => s.slug === body.serviceSlug);
  if (!service) return NextResponse.json({ error: "Unknown service" }, { status: 400 });

  // Only answers to this service's questions, and only from their listed options
  const questions = onboardingQuestions[body.serviceSlug] || [];
  const badAnswer = questions.find((q) => body.details?.[q.id] && !q.options.includes(body.details[q.id]));
  if (badAnswer) return NextResponse.json({ error: `Invalid answer: ${badAnswer.label}` }, { status: 400 });

  if (!(await verifyTurnstile(body.turnstileToken, request))) {
    return NextResponse.json({ error: "Verification failed, please try again" }, { status: 403 });
  }

  const serviceTitle = service.title;
  const detailRows = questions.map((q) => [q.label, body.details?.[q.id]]);

  const rows = [
    ["Service", serviceTitle],
    ...detailRows,
    ["Budget", body.budget],
    ["Timeline", body.timeline],
    ["Name", body.name],
    ["Email", body.email],
    ["Company", body.company],
    ["Notes", body.notes],
  ];

  try {
    await sendNotification({
      subject: `New project request: ${serviceTitle} — ${body.name}`,
      heading: `New ${serviceTitle} request`,
      name: body.name,
      replyTo: body.email,
      rows,
    });
  } catch (err) {
    console.error("Onboarding email failed:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  // Team already has the submission, so a failed client copy shouldn't fail the request
  try {
    await sendClientCopy({ to: body.email, name: body.name, subject: `Your ${serviceTitle} project request — DotHunters`, rows });
  } catch (err) {
    console.error("Onboarding client copy failed:", err);
  }

  return NextResponse.json({ ok: true });
}
