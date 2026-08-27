import { prisma } from "@/lib/db";
import { type FaqCacheRow, getFaqCache, setFaqCache } from "@/lib/chat/http";
import { faqSeed } from "@/lib/chat/faq-data";

export async function loadFaqs(): Promise<FaqCacheRow[]> {
  const cached = getFaqCache();
  if (cached) return cached;

  if (!prisma) {
    const fallback = faqSeed.map((item, index) => ({
      id: `seed-${index}`,
      category: item.category,
      prompt: item.prompt,
      aliases: item.aliases,
      answers: item.answers,
    }));
    setFaqCache(fallback);
    return fallback;
  }

  const rows = await prisma.question.findMany({
    where: { active: true },
    include: { answers: { select: { variant: true, body: true } } },
    orderBy: { createdAt: "asc" },
  });
  const data = rows.map((row) => ({
    id: row.id,
    category: row.category,
    prompt: row.prompt,
    aliases: row.aliases,
    answers: row.answers,
  }));
  setFaqCache(data);
  return data;
}
