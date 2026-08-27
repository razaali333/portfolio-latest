import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { matchQuestion } from "@/lib/chat/match";
import { loadFaqs } from "@/lib/chat/load-faqs";
import { clientIp, rateLimit, sameOrigin, text } from "@/lib/chat/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FALLBACK =
  "I don’t have a stored answer for that. Leave an email and phone and Raza will follow up — or write directly via the contact page.";

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "Request origin is not allowed." }, { status: 403 });
  }

  const ip = clientIp(request);
  if (!rateLimit(`chat:${ip}`, 20, 10 * 60 * 1000)) {
    return NextResponse.json({ ok: false, error: "Too many messages. Try again in a few minutes." }, { status: 429 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const message = text(payload.message, 400);
  const sessionId = text(payload.sessionId, 80) || "anon";
  if (message.length < 2) {
    return NextResponse.json({ ok: false, error: "Type a slightly longer question." }, { status: 400 });
  }

  const faqs = await loadFaqs();
  const match = matchQuestion(message, faqs);
  const fallback = !match;

  if (prisma && !sessionId.startsWith("seed-")) {
    prisma.conversationLog
      .create({
        data: {
          sessionId,
          asked: message,
          matchedId: match && !match.id.startsWith("seed-") ? match.id : null,
          confidence: match?.confidence ?? 0,
          fallback,
        },
      })
      .catch(() => undefined);
  }

  if (match) {
    return NextResponse.json({
      ok: true,
      fallback: false,
      answer: match.answer,
      confidence: Number(match.confidence.toFixed(3)),
      prompt: match.prompt,
    });
  }

  return NextResponse.json({
    ok: true,
    fallback: true,
    answer: FALLBACK,
    confidence: 0,
  });
}
