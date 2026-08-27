import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { clientIp, isEmail, isPhone, rateLimit, sameOrigin, text } from "@/lib/chat/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "Request origin is not allowed." }, { status: 403 });
  }
  if (!rateLimit(`lead:${clientIp(request)}`, 8, 10 * 60 * 1000)) {
    return NextResponse.json({ ok: false, error: "Too many attempts." }, { status: 429 });
  }
  if (!prisma) {
    return NextResponse.json({ ok: false, error: "Lead capture is not connected yet." }, { status: 503 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (text(payload.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = text(payload.name, 80) || null;
  const email = text(payload.email, 160).toLowerCase();
  const phone = text(payload.phone, 40);
  const topic = text(payload.topic, 200) || null;
  const notes = text(payload.notes, 500) || null;
  const conversation = Array.isArray(payload.conversation)
    ? payload.conversation.slice(-8).map((item) => ({
        role: text((item as { role?: unknown }).role, 12),
        text: text((item as { text?: unknown }).text, 400),
      }))
    : null;

  if (!isEmail(email) || !isPhone(phone)) {
    return NextResponse.json({ ok: false, error: "Email and phone are required." }, { status: 400 });
  }

  await prisma.fallbackLead.create({
    data: {
      name,
      email,
      phone,
      topic,
      notes,
      ...(conversation ? { conversation } : {}),
    },
  });

  return NextResponse.json({
    ok: true,
    message: "Thanks — Raza will follow up at that email.",
  });
}
