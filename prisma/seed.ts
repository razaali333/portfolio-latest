import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { faqSeed } from "../src/lib/chat/faq-data";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is required to seed.");
  }

  const pool = new Pool({ connectionString: url, max: 1 });
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });
  const force = process.argv.includes("--force");
  const existing = await prisma.question.count();

  if (existing > 0 && !force) {
    console.log(`Seed skipped — ${existing} questions already present. Pass --force to replace.`);
    await prisma.$disconnect();
    await pool.end();
    return;
  }

  if (force && existing > 0) {
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

  console.log(`Seeded ${faqSeed.length} questions.`);
  await prisma.$disconnect();
  await pool.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
