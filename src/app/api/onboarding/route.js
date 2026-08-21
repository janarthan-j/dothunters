import { NextResponse } from "next/server";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const required = ["serviceSlug", "budget", "timeline", "name", "email"];
  const missing = required.filter((field) => !body?.[field]);

  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  console.log("New onboarding submission:", body);

  return NextResponse.json({ ok: true });
}
