const buckets = new Map<string, number[]>();
const faqCache: { at: number; data: FaqCacheRow[] } = { at: 0, data: [] };

export type FaqCacheRow = {
  id: string;
  category: string;
  prompt: string;
  aliases: string[];
  answers: { variant: string; body: string }[];
};

export function rateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const recent = (buckets.get(key) || []).filter((time) => now - time < windowMs);
  if (recent.length >= max) return false;
  recent.push(now);
  buckets.set(key, recent);
  return true;
}

export function getFaqCache(ttlMs = 120_000) {
  if (Date.now() - faqCache.at < ttlMs) return faqCache.data;
  return null;
}

export function setFaqCache(data: FaqCacheRow[]) {
  faqCache.at = Date.now();
  faqCache.data = data;
}

export function clearFaqCache() {
  faqCache.at = 0;
  faqCache.data = [];
}

export function clientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export function text(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 16;
}
