import { NextResponse } from "next/server";
import { site } from "@/lib/content";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, number[]>();

const TOPICS = new Set([
  "new-product",
  "laravel-react",
  "booking-directory",
  "retain",
  "other",
]);

function text(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function mailtoHref(fields: Record<string, string>) {
  const body = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    fields.company ? `Company: ${fields.company}` : "",
    `Topic: ${fields.topic}`,
    fields.target_url ? `URL: ${fields.target_url}` : "",
    fields.timing ? `Timing: ${fields.timing}` : "",
    `Budget: ${fields.budget}`,
    "",
    fields.message,
  ]
    .filter(Boolean)
    .join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(`Portfolio inquiry from ${fields.name}`)}&body=${encodeURIComponent(body)}`;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return NextResponse.json({ ok: false, error: "Request origin is not allowed." }, { status: 403 });
  }

  const ip = request.headers.get("x-nf-client-connection-ip")
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown";
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_ATTEMPTS) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  }
  recent.push(now);
  attempts.set(ip, recent);

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = text(payload.name, 80);
  const email = text(payload.email, 160);
  const message = text(payload.message, 4000);
  const topic = text(payload.topic, 40);
  const company = text(payload.company_name, 160);
  const target_url = text(payload.target_url, 500);
  const timing = text(payload.desired_timing, 40);
  const budget = text(payload.budget_range, 20) || "USD 1000";
  const website = text(payload.website, 200);
  const startedAt = Number(payload.started_at);

  if (website || !Number.isFinite(startedAt) || now - startedAt < 1500) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message || message.length < 20 || !TOPICS.has(topic)) {
    return NextResponse.json({ ok: false, error: "Please complete the required fields." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email." }, { status: 400 });
  }

  const fields = {
    name,
    email,
    company,
    topic,
    target_url,
    timing,
    budget: budget.startsWith("$") || budget.startsWith("USD") ? budget : `USD ${budget}`,
    message,
  };
  const fallback = mailtoHref(fields);

  try {
    const delivered = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        _replyto: email,
        company,
        topic,
        target_url,
        timing,
        budget: fields.budget,
        message,
        _subject: `Portfolio inquiry from ${name}`,
        _template: "table",
      }),
    });
    if (delivered.ok) {
      return NextResponse.json({ ok: true, mailto: fallback });
    }
  } catch {
    /* fall through to mailto */
  }

  return NextResponse.json({
    ok: false,
    mailto: fallback,
    error: "Could not send from the site. Your email app will open instead.",
  });
}
