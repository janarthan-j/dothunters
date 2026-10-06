import { NextResponse } from "next/server";
import { sendNotification } from "@/lib/mailer";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const required = ["name", "email", "service", "message"];
  const missing = required.filter((field) => !body?.[field]);

  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  try {
    await sendNotification({
      subject: `New contact message from ${body.name}`,
      replyTo: body.email,
      rows: [
        ["Name", body.name],
        ["Email", body.email],
        ["Company", body.company],
        ["Service", body.service],
        ["Budget", body.budget],
        ["Message", body.message],
      ],
    });
  } catch (err) {
    console.error("Contact email failed:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
