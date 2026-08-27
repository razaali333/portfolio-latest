import { NextResponse } from "next/server";
import { requirePrisma } from "@/lib/db";
import { studioAuthorized } from "@/lib/chat/admin";
import { clearFaqCache, text } from "@/lib/chat/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  if (!(await studioAuthorized())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  const { id } = await params;
  const db = requirePrisma();
  const payload = (await request.json()) as Record<string, unknown>;

  const data: {
    prompt?: string;
    category?: string;
    aliases?: string[];
    active?: boolean;
  } = {};
  if (typeof payload.prompt === "string") data.prompt = text(payload.prompt, 240);
  if (typeof payload.category === "string") data.category = text(payload.category, 40);
  if (Array.isArray(payload.aliases)) {
    data.aliases = payload.aliases.map((item) => text(item, 160)).filter(Boolean);
  }
  if (typeof payload.active === "boolean") data.active = payload.active;

  const answers = Array.isArray(payload.answers)
    ? payload.answers
        .map((item) => ({
          id: text((item as { id?: unknown }).id, 40),
          variant: text((item as { variant?: unknown }).variant, 32) || "default",
          body: text((item as { body?: unknown }).body, 1200),
        }))
        .filter((item) => item.body)
    : null;

  const question = await db.$transaction(async (tx) => {
    const updated = await tx.question.update({ where: { id }, data });
    if (answers) {
      await tx.answer.deleteMany({ where: { questionId: id } });
      await tx.answer.createMany({
        data: answers.map((answer) => ({
          questionId: id,
          variant: answer.variant,
          body: answer.body,
        })),
      });
    }
    return tx.question.findUnique({ where: { id: updated.id }, include: { answers: true } });
  });

  clearFaqCache();
  return NextResponse.json({ ok: true, question });
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await studioAuthorized())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  const { id } = await params;
  const db = requirePrisma();
  await db.question.delete({ where: { id } });
  clearFaqCache();
  return NextResponse.json({ ok: true });
}
