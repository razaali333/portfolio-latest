import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { studioAuthorized } from "@/lib/chat/admin";
import { text } from "@/lib/chat/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!(await studioAuthorized())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  if (!prisma) {
    return NextResponse.json({ ok: false, error: "Database is not connected." }, { status: 503 });
  }

  const url = new URL(request.url);
  const take = Math.min(100, Number(url.searchParams.get("take") || 50));
  const leads = await prisma.fallbackLead.findMany({
    orderBy: { createdAt: "desc" },
    take,
  });
  return NextResponse.json({ ok: true, leads });
}

export async function PATCH(request: Request) {
  if (!(await studioAuthorized())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  if (!prisma) {
    return NextResponse.json({ ok: false, error: "Database is not connected." }, { status: 503 });
  }

  const payload = (await request.json()) as Record<string, unknown>;
  const id = text(payload.id, 40);
  const status = text(payload.status, 20);
  if (!id || !["new", "contacted", "closed"].includes(status)) {
    return NextResponse.json({ ok: false, error: "Invalid lead update." }, { status: 400 });
  }

  const lead = await prisma.fallbackLead.update({ where: { id }, data: { status } });
  return NextResponse.json({ ok: true, lead });
}
