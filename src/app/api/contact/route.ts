import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/data";

const CONTACT_TO = process.env.CONTACT_TO ?? "guptasameer533@gmail.com";

async function sendViaResend(name: string, email: string, message: string, apiKey: string) {
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
    to: CONTACT_TO,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });
  return !error;
}

// zero-config fallback — free, no account; needs a one-time email activation
async function sendViaFormSubmit(name: string, email: string, message: string) {
  const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_TO}`, {
    method: "POST",
    // FormSubmit rejects requests without a web origin
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: siteConfig.url,
      Referer: `${siteConfig.url}/`,
    },
    body: JSON.stringify({
      name,
      email,
      message,
      _subject: `Portfolio message from ${name}`,
      _template: "table",
      _captcha: "false",
    }),
  });
  if (!res.ok) return false;
  const body = await res.json().catch(() => null);
  return body?.success === true || body?.success === "true";
}

export async function POST(req: Request) {
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (name.length > 100 || email.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: "too_long" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    const sent = apiKey
      ? await sendViaResend(name, email, message, apiKey)
      : await sendViaFormSubmit(name, email, message);
    if (!sent) {
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
