import { NextResponse } from "next/server";
import { prisma, requirePrisma } from "@/lib/db";
import { studioAuthorized } from "@/lib/chat/admin";
import { clearFaqCache, text } from "@/lib/chat/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await studioAuthorized())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  if (!prisma) {
    return NextResponse.json({ ok: false, error: "Database is not connected." }, { status: 503 });
  }

  const questions = await prisma.question.findMany({
    include: { answers: true, _count: { select: { logs: true } } },
    orderBy: [{ category: "asc" }, { createdAt: "asc" }],
  });
  return NextResponse.json({ ok: true, questions });
}

export async function POST(request: Request) {
  if (!(await studioAuthorized())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  const db = requirePrisma();
  const payload = (await request.json()) as Record<string, unknown>;
  const prompt = text(payload.prompt, 240);
  const category = text(payload.category, 40) || "general";
  const aliases = Array.isArray(payload.aliases)
    ? payload.aliases.map((item) => text(item, 160)).filter(Boolean)
    : [];
  const answers = Array.isArray(payload.answers)
    ? payload.answers
        .map((item) => ({
          variant: text((item as { variant?: unknown }).variant, 32) || "default",
          body: text((item as { body?: unknown }).body, 1200),
        }))
        .filter((item) => item.body)
    : [];

  if (!prompt || !answers.length) {
    return NextResponse.json({ ok: false, error: "Question and at least one answer are required." }, { status: 400 });
  }

  const question = await db.question.create({
    data: {
      prompt,
      category,
      aliases,
      answers: { create: answers },
    },
    include: { answers: true },
  });
  clearFaqCache();
  return NextResponse.json({ ok: true, question });
}
