import { writeFileSync } from "node:fs";
import { faqSeed } from "../src/lib/chat/faq-data";

function dollar(value: string) {
  return `$faq$${value}$faq$`;
}

function aliasesSql(aliases: string[]) {
  if (!aliases.length) return `'{}'::TEXT[]`;
  return `ARRAY[${aliases.map(dollar).join(", ")}]::TEXT[]`;
}

const blocks = faqSeed.map((item, index) => {
  const answers = item.answers
    .map(
      (answer) => `INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, ${dollar(answer.variant)}, ${dollar(answer.body)}, NOW(), NOW() FROM q;`,
    )
    .join("\n");

  return `-- ${index + 1}. ${item.prompt.replace(/\n/g, " ")}
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, ${dollar(item.category)}, ${dollar(item.prompt)}, ${aliasesSql(item.aliases)}, true, NOW(), NOW())
  RETURNING id
)
${answers}`;
});

const sql = `-- FAQ seed for Prisma Postgres
-- ${faqSeed.length} questions. Safe to re-run only after deleting existing rows.
-- Optional wipe (uncomment if you want a clean replace):
-- DELETE FROM "ConversationLog";
-- DELETE FROM "Answer";
-- DELETE FROM "Question";

BEGIN;

${blocks.join("\n\n")}

COMMIT;
`;

writeFileSync(new URL("../prisma/seed-faqs.sql", import.meta.url), sql);
console.log(`Wrote prisma/seed-faqs.sql (${faqSeed.length} questions)`);
