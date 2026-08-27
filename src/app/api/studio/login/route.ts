import { NextResponse } from "next/server";
import {
  STUDIO_COOKIE,
  adminConfigured,
  checkPassword,
  signStudioSession,
  studioCookieOptions,
} from "@/lib/chat/admin";
import { rateLimit, sameOrigin, text, clientIp } from "@/lib/chat/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "Request origin is not allowed." }, { status: 403 });
  }
  if (!adminConfigured()) {
    return NextResponse.json({ ok: false, error: "Set CHAT_ADMIN_PASSWORD on the host." }, { status: 503 });
  }
  if (!rateLimit(`studio-login:${clientIp(request)}`, 8, 15 * 60 * 1000)) {
    return NextResponse.json({ ok: false, error: "Too many attempts." }, { status: 429 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!checkPassword(text(payload.password, 200))) {
    return NextResponse.json({ ok: false, error: "Wrong password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(STUDIO_COOKIE, signStudioSession(), studioCookieOptions());
  return response;
}
