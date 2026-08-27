import { NextResponse } from "next/server";
import { STUDIO_COOKIE } from "@/lib/chat/admin";

export const runtime = "nodejs";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(STUDIO_COOKIE, "", { path: "/", maxAge: 0 });
  return response;
}
