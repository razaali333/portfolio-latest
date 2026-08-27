import { writeFileSync } from "node:fs";
import { faqSeed } from "../src/lib/chat/faq-data";

function lit(value: string) {
  return `'${value.replace(/'/g, "''")}'`;
}

function aliasesSql(aliases: string[]) {
  if (!aliases.length) return `'{}'::TEXT[]`;
  return `ARRAY[${aliases.map(lit).join(", ")}]::TEXT[]`;
}

const questions = faqSeed
  .map((item, i) => {
    const id = `faq_${String(i + 1).padStart(3, "0")}`;
    return `  (${lit(id)}, ${lit(item.category)}, ${lit(item.prompt)}, ${aliasesSql(item.aliases)}, true, NOW(), NOW())`;
  })
  .join(",\n");

const answers = faqSeed
  .map((item, i) => {
    const qid = `faq_${String(i + 1).padStart(3, "0")}`;
    return item.answers.map((answer, j) => {
      const aid = `ans_${String(i + 1).padStart(3, "0")}_${j + 1}`;
      return `  (${lit(aid)}, ${lit(qid)}, ${lit(answer.variant)}, ${lit(answer.body)}, NOW(), NOW())`;
    });
  })
  .flat()
  .join(",\n");

const sql = `-- Paste into Prisma Studio → SQL → Run SQL
-- If rows already exist, run the three DELETEs first, then the two INSERTs.

-- DELETE FROM "ConversationLog";
-- DELETE FROM "Answer";
-- DELETE FROM "Question";

INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
VALUES
${questions};

INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
VALUES
${answers};
`;

writeFileSync("prisma/seed-faqs-studio.sql", sql);
console.log(`Wrote prisma/seed-faqs-studio.sql (${faqSeed.length} questions)`);
