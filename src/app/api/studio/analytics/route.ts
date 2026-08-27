import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { studioAuthorized } from "@/lib/chat/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await studioAuthorized())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  if (!prisma) {
    return NextResponse.json({ ok: false, error: "Database is not connected." }, { status: 503 });
  }

  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const [total, fallbacks, leads, top] = await Promise.all([
    prisma.conversationLog.count({ where: { createdAt: { gte: since } } }),
    prisma.conversationLog.count({ where: { createdAt: { gte: since }, fallback: true } }),
    prisma.fallbackLead.count({ where: { createdAt: { gte: since } } }),
    prisma.conversationLog.groupBy({
      by: ["matchedId"],
      where: { createdAt: { gte: since }, fallback: false, matchedId: { not: null } },
      _count: { matchedId: true },
      orderBy: { _count: { matchedId: "desc" } },
      take: 8,
    }),
  ]);

  const ids = top.map((row) => row.matchedId).filter((id): id is string => Boolean(id));
  const questions = ids.length
    ? await prisma.question.findMany({
        where: { id: { in: ids } },
        select: { id: true, prompt: true, category: true },
      })
    : [];
  const labels = new Map(questions.map((item) => [item.id, item]));

  const unmatched = await prisma.conversationLog.findMany({
    where: { createdAt: { gte: since }, fallback: true },
    orderBy: { createdAt: "desc" },
    take: 12,
    select: { asked: true, createdAt: true },
  });

  return NextResponse.json({
    ok: true,
    windowDays: 30,
    messages: total,
    fallbacks,
    fallbackRate: total ? fallbacks / total : 0,
    leads,
    conversionRate: fallbacks ? leads / fallbacks : 0,
    topQuestions: top.map((row) => ({
      id: row.matchedId,
      count: row._count.matchedId,
      prompt: row.matchedId ? labels.get(row.matchedId)?.prompt : null,
      category: row.matchedId ? labels.get(row.matchedId)?.category : null,
    })),
    unmatched,
  });
}
