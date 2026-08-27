import { createHmac, timingSafeEqual, createHash } from "node:crypto";
import { cookies } from "next/headers";

export const STUDIO_COOKIE = "ra_studio";
const MAX_AGE = 60 * 60 * 24 * 7;

function secret() {
  return process.env.CHAT_ADMIN_SECRET || process.env.CHAT_ADMIN_PASSWORD || "";
}

export function adminConfigured() {
  return Boolean(process.env.CHAT_ADMIN_PASSWORD && secret());
}

export function checkPassword(password: string) {
  const expected = process.env.CHAT_ADMIN_PASSWORD || "";
  if (!expected || !password) return false;
  const left = createHash("sha256").update(password).digest();
  const right = createHash("sha256").update(expected).digest();
  return timingSafeEqual(left, right);
}

export function signStudioSession() {
  const exp = String(Date.now() + MAX_AGE * 1000);
  const sig = createHmac("sha256", secret()).update(exp).digest("hex");
  return `${exp}.${sig}`;
}

export function verifyStudioSession(token: string | undefined) {
  if (!token || !secret()) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const expected = createHmac("sha256", secret()).update(exp).digest("hex");
  if (expected.length !== sig.length) return false;
  return timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
}

export async function studioAuthorized() {
  try {
    const store = await cookies();
    return verifyStudioSession(store.get(STUDIO_COOKIE)?.value);
  } catch {
    return false;
  }
}

export function studioCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  };
}
