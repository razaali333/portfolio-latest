import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { studioAuthorized } from "@/lib/chat/admin";
import { faqSeed } from "@/lib/chat/faq-data";
import { clearFaqCache } from "@/lib/chat/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!(await studioAuthorized())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  if (!prisma) {
    return NextResponse.json({ ok: false, error: "Database is not connected." }, { status: 503 });
  }

  const payload = (await request.json().catch(() => ({}))) as { force?: boolean };
  const existing = await prisma.question.count();
  if (existing > 0 && !payload.force) {
    return NextResponse.json({ ok: true, skipped: true, count: existing });
  }

  if (payload.force) {
    await prisma.conversationLog.deleteMany();
    await prisma.answer.deleteMany();
    await prisma.question.deleteMany();
  }

  for (const item of faqSeed) {
    await prisma.question.create({
      data: {
        category: item.category,
        prompt: item.prompt,
        aliases: item.aliases,
        answers: {
          create: item.answers.map((answer) => ({
            variant: answer.variant,
            body: answer.body,
          })),
        },
      },
    });
  }

  clearFaqCache();
  return NextResponse.json({ ok: true, count: faqSeed.length });
}
