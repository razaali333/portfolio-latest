-- FAQ seed for Prisma Postgres
-- 73 questions. Safe to re-run only after deleting existing rows.
-- Optional wipe (uncomment if you want a clean replace):
-- DELETE FROM "ConversationLog";
-- DELETE FROM "Answer";
-- DELETE FROM "Question";

BEGIN;

-- 1. Hello
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$greeting$faq$, $faq$Hello$faq$, ARRAY[$faq$hi$faq$, $faq$hey$faq$, $faq$good morning$faq$, $faq$good afternoon$faq$, $faq$who are you$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$I’m Raza’s site assistant. I can answer questions about services, stack, projects, timelines, and how to start work. Ask anything — if I don’t have it, I’ll take your email and phone so he can follow up.$faq$, NOW(), NOW() FROM q;

-- 2. What services do you provide?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$services$faq$, $faq$What services do you provide?$faq$, ARRAY[$faq$what do you do$faq$, $faq$what can you build$faq$, $faq$software engineering services$faq$, $faq$web development services$faq$, $faq$full stack services$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$I build production web products end to end: public sites, admin tools, APIs, and databases. Typical work is React or Next.js on the front, Laravel, Node, or PHP on the back, with PostgreSQL, MySQL, or MongoDB. Directories, booking, marketplaces, and coaching platforms are a natural fit.$faq$, NOW(), NOW() FROM q;

-- 3. Do you do full-stack applications?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$services$faq$, $faq$Do you do full-stack applications?$faq$, ARRAY[$faq$full stack developer$faq$, $faq$frontend and backend$faq$, $faq$end to end development$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Yes. I ship UI, APIs, and deploys as one piece of work. Recent roles at Fujtown and Centurion PLC are full-stack on live platforms, not front-end-only or ticket-only backend.$faq$, NOW(), NOW() FROM q;

-- 4. Do you build APIs?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$services$faq$, $faq$Do you build APIs?$faq$, ARRAY[$faq$api development$faq$, $faq$rest api$faq$, $faq$backend apis$faq$, $faq$laravel api$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Yes. REST APIs in Laravel, Node/Express, and PHP — including third-party integrations. At Ferisoft that was a core part of the job; FOIZ used Laravel and PostgreSQL for API and query work.$faq$, NOW(), NOW() FROM q;

-- 5. Do you design databases?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$services$faq$, $faq$Do you design databases?$faq$, ARRAY[$faq$database design$faq$, $faq$postgres schema$faq$, $faq$mysql database$faq$, $faq$mongodb schema$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Yes. I model PostgreSQL and MySQL for product data, and MongoDB when the document shape fits. Inventory, booking, directories, and payments all need a schema that stays fast after launch — that’s the bar.$faq$, NOW(), NOW() FROM q;

-- 6. Can you rebuild or improve an existing website?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$services$faq$, $faq$Can you rebuild or improve an existing website?$faq$, ARRAY[$faq$redesign my site$faq$, $faq$migrate my website$faq$, $faq$improve performance$faq$, $faq$seo work$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Yes. I take existing Laravel, PHP, React, or Next.js products and tighten performance, SEO, and reliability. At Fujtown, server hardening cut downtime about 15%, and debugging dropped production bugs about 30%. Send the URL and what hurts.$faq$, NOW(), NOW() FROM q;

-- 7. What technologies do you specialize in?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$stack$faq$, $faq$What technologies do you specialize in?$faq$, ARRAY[$faq$tech stack$faq$, $faq$what languages do you use$faq$, $faq$skills$faq$, $faq$tools you use$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Day to day: Next.js, React, TypeScript, JavaScript, Tailwind, Laravel, PHP, Node.js, Vue.js, MongoDB, PostgreSQL, MySQL, Firebase, AWS, and Docker. PHP since 2015; React and Laravel are the pair I reach for most.$faq$, NOW(), NOW() FROM q;

-- 8. What is your experience with Next.js?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$stack$faq$, $faq$What is your experience with Next.js?$faq$, ARRAY[$faq$nextjs experience$faq$, $faq$do you know next.js$faq$, $faq$next js developer$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$I have used Next.js in production since 2023 — product work at Fujtown and this portfolio. YPT’s coaching platform is Next.js with a Laravel API. I am comfortable with App Router, server routes, and keeping the front fast.$faq$, NOW(), NOW() FROM q;

-- 9. What is your experience with React?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$stack$faq$, $faq$What is your experience with React?$faq$, ARRAY[$faq$react.js$faq$, $faq$reactjs experience$faq$, $faq$do you know react$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$React since 2019, through Aursoft, Fujtown, and Centurion. Interfaces, design collaboration, and production UIs — not demos. I also work in Vue when the product is already there, as on fujtown.com.$faq$, NOW(), NOW() FROM q;

-- 10. What is your experience with Laravel?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$stack$faq$, $faq$What is your experience with Laravel?$faq$, ARRAY[$faq$laravel developer$faq$, $faq$php laravel$faq$, $faq$do you know laravel$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Laravel since 2018. It has been the backbone of directories, booking, driving-school ops, APIs, and admin tools. I also know CodeIgniter when a legacy PHP app needs care.$faq$, NOW(), NOW() FROM q;

-- 11. What is your experience with Node.js?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$stack$faq$, $faq$What is your experience with Node.js?$faq$, ARRAY[$faq$nodejs$faq$, $faq$express.js$faq$, $faq$node backend$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Node.js and Express since 2021 at Ferisoft — APIs, Firebase, and integrations. I still use Node beside Laravel when a product needs both, including this site’s routes.$faq$, NOW(), NOW() FROM q;

-- 12. Do you work with PostgreSQL and MySQL?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$stack$faq$, $faq$Do you work with PostgreSQL and MySQL?$faq$, ARRAY[$faq$postgres$faq$, $faq$mysql$faq$, $faq$sql databases$faq$, $faq$mongodb experience$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Yes. PostgreSQL and MySQL across Aursoft, Ferisoft, and Fujtown. MongoDB when the product wants documents. FOIZ is Laravel + PostgreSQL; several live sites run MySQL.$faq$, NOW(), NOW() FROM q;

-- 13. Do you use AWS or Docker?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$stack$faq$, $faq$Do you use AWS or Docker?$faq$, ARRAY[$faq$aws experience$faq$, $faq$docker deploys$faq$, $faq$hosting$faq$, $faq$deployment$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Yes. At Aursoft I ran AWS EC2, S3, and RDS with 99.9% uptime and automated deploys. Docker is in the toolkit. I also ship on cPanel, Vercel, and typical PHP hosts when that is what the product already uses.$faq$, NOW(), NOW() FROM q;

-- 14. Do you work with TypeScript?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$stack$faq$, $faq$Do you work with TypeScript?$faq$, ARRAY[$faq$typescript experience$faq$, $faq$javascript es6$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Yes. TypeScript and modern JavaScript on Next.js and React work. This portfolio is TypeScript. I don’t force TS onto a Laravel Blade app if it would slow the team down.$faq$, NOW(), NOW() FROM q;

-- 15. Can you show examples of similar projects?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$projects$faq$, $faq$Can you show examples of similar projects?$faq$, ARRAY[$faq$portfolio projects$faq$, $faq$case studies$faq$, $faq$what have you built$faq$, $faq$examples of your work$faq$, $faq$live websites$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Live work includes FOIZ (oil marketplace APIs), SisTouristVilla (hotel booking and payments), fujtown.com (business directory), a fitness coaching platform with subscriptions, a Dutch driving-school system, and an inventory/POS. See /work. Some recent work is under NDA and can’t be named.$faq$, NOW(), NOW() FROM q;

-- 16. Have you built booking or marketplace products?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$projects$faq$, $faq$Have you built booking or marketplace products?$faq$, ARRAY[$faq$hotel booking$faq$, $faq$directory website$faq$, $faq$marketplace$faq$, $faq$e-commerce$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Yes. SisTouristVilla is booking + payments. fujtown.com is a directory with registration, search, and roles. FOIZ is marketplace-side API work. Those are the closest public examples.$faq$, NOW(), NOW() FROM q;

-- 17. Have you built payment or subscription products?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$projects$faq$, $faq$Have you built payment or subscription products?$faq$, ARRAY[$faq$stripe$faq$, $faq$payment gateway$faq$, $faq$subscriptions$faq$, $faq$saas$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Yes. SisTouristVilla includes a payment gateway. The coaching platform has authentication, payments, and subscriptions. I integrate the gateway you already use rather than inventing a new one.$faq$, NOW(), NOW() FROM q;

-- 18. What kind of project types do you take?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$projects$faq$, $faq$What kind of project types do you take?$faq$, ARRAY[$faq$what projects do you accept$faq$, $faq$ideal client$faq$, $faq$what do you not do$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Best fit: web products that have to stay live — Laravel/React/Next platforms, APIs, directories, booking, admin tools, and performance work. I don’t take mobile-native apps or chain/crypto work. If the brief is unclear, the contact form is the right next step.$faq$, NOW(), NOW() FROM q;

-- 19. What is your development process?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$process$faq$, $faq$What is your development process?$faq$, ARRAY[$faq$how do you work$faq$, $faq$workflow$faq$, $faq$project process$faq$, $faq$how do you start a project$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Short brief first (goal, URL, timing, budget). Then a scoped plan: what ships, what waits, and how we’ll talk. I build in slices you can click, not a six-month reveal. Deploys stay boring — staging, then production.$faq$, NOW(), NOW() FROM q;

-- 20. What is your approach to testing and code quality?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$process$faq$, $faq$What is your approach to testing and code quality?$faq$, ARRAY[$faq$testing$faq$, $faq$qa$faq$, $faq$code quality$faq$, $faq$do you write tests$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$I test the paths that break products: payments, booking, auth, and API contracts. Reviews and staging before production. At Fujtown, focused debugging cut production bugs about 30%. I don’t pad a quote with a theatre of unused test frameworks.$faq$, NOW(), NOW() FROM q;

-- 21. How do you handle project updates and progress reporting?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$process$faq$, $faq$How do you handle project updates and progress reporting?$faq$, ARRAY[$faq$status updates$faq$, $faq$communication during project$faq$, $faq$progress reports$faq$, $faq$weekly updates$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Async by default: email or WhatsApp with what shipped, what’s next, and blockers. For longer work, a short weekly note is enough. You will not need a stand-up to know whether the build is moving.$faq$, NOW(), NOW() FROM q;

-- 22. How do you handle NDA or confidential work?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$process$faq$, $faq$How do you handle NDA or confidential work?$faq$, ARRAY[$faq$nda$faq$, $faq$confidential$faq$, $faq$can you work under nda$faq$, $faq$private projects$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Yes. Part of my recent work is under NDA and is not listed on /work. I can talk about the problem, my role, and the stack without naming protected systems. Send an NDA if you need one before the brief.$faq$, NOW(), NOW() FROM q;

-- 23. Do you work with existing teams or only solo?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$collaboration$faq$, $faq$Do you work with existing teams or only solo?$faq$, ARRAY[$faq$join my team$faq$, $faq$work with designers$faq$, $faq$collaborate with developers$faq$, $faq$agency partner$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Both. I have shipped inside product teams (Fujtown, Centurion) and as the engineer owning a build. I work fine next to designers, PMs, and other developers. I can also take a scoped product solo if that is what you need.$faq$, NOW(), NOW() FROM q;

-- 24. Can you work with our existing codebase?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$collaboration$faq$, $faq$Can you work with our existing codebase?$faq$, ARRAY[$faq$legacy laravel$faq$, $faq$existing react app$faq$, $faq$take over a project$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Yes. Most of the useful work is already-running PHP, Laravel, React, or Next.js. I read the repo, note risk, then change what matters. A handover and access list is enough to start.$faq$, NOW(), NOW() FROM q;

-- 25. What is your rate?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$pricing$faq$, $faq$What is your rate?$faq$, ARRAY[$faq$how much do you charge$faq$, $faq$pricing$faq$, $faq$hourly rate$faq$, $faq$what is your rate for a website$faq$, $faq$cost of a project$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$I quote from a brief, not a fake hourly board. The contact form uses USD 100–5,000 for typical slices of product work. Larger platforms are scoped separately. If you know the outcome, I’ll price the work to get there.$faq$, NOW(), NOW() FROM q;

-- 26. What is your rate for a landing page or small site?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$pricing$faq$, $faq$What is your rate for a landing page or small site?$faq$, ARRAY[$faq$cheap website$faq$, $faq$small project cost$faq$, $faq$brochure site$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Small public sites sit at the lower end of the USD 100–5,000 range on the contact form, depending on copy, CMS, and whether you need forms, SEO, or a CMS. Send the URL or a reference and a budget mark.$faq$, NOW(), NOW() FROM q;

-- 27. Do you take fixed-price or retainer work?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$pricing$faq$, $faq$Do you take fixed-price or retainer work?$faq$, ARRAY[$faq$fixed bid$faq$, $faq$monthly retainer$faq$, $faq$engagement models$faq$, $faq$ongoing contract$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Both. A fixed quote for a defined slice, or a retainer for ongoing support and performance (the contact form has that topic). I don’t start open-ended builds without a cap you can see.$faq$, NOW(), NOW() FROM q;

-- 28. How long does a project take?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$timeline$faq$, $faq$How long does a project take?$faq$, ARRAY[$faq$timeline$faq$, $faq$how soon can you start$faq$, $faq$duration$faq$, $faq$delivery time$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$A small site or API slice can land in a few weeks. A directory, booking, or coaching platform is usually one to three months for a first honest version. Timing on the contact form (soon / 1–3 months / later) is how I plan around Centurion work.$faq$, NOW(), NOW() FROM q;

-- 29. How soon can you start?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$timeline$faq$, $faq$How soon can you start?$faq$, ARRAY[$faq$availability this week$faq$, $faq$start immediately$faq$, $faq$when are you free$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$I work at Centurion PLC and take selected freelance work around that. Start dates depend on scope. If you need something immediately, say so on the contact form and I’ll tell you the first open window.$faq$, NOW(), NOW() FROM q;

-- 30. What is the timeline for a large web application?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$timeline$faq$, $faq$What is the timeline for a large web application?$faq$, ARRAY[$faq$big project duration$faq$, $faq$saas timeline$faq$, $faq$complex build$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Larger products are phased: a first live slice, then the rest. Expect months, not a weekend. I’ll still give you something clickable early so you can judge the work before the whole map is drawn.$faq$, NOW(), NOW() FROM q;

-- 31. Are you available for freelance work?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$availability$faq$, $faq$Are you available for freelance work?$faq$, ARRAY[$faq$hire you$faq$, $faq$are you free$faq$, $faq$open for work$faq$, $faq$new opportunities$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Yes — selected work, not every inbound. Full-time is Centurion PLC; freelance is scoped around that. The inbox is open: raza.aursoft@gmail.com or the contact form.$faq$, NOW(), NOW() FROM q;

-- 32. Where are you based and what timezone do you work in?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$availability$faq$, $faq$Where are you based and what timezone do you work in?$faq$, ARRAY[$faq$location$faq$, $faq$timezone$faq$, $faq$maldives$faq$, $faq$uae$faq$, $faq$remote$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$I am based in the Maldives and have shipped product work from Fujairah, UAE. Remote is normal. I overlap Gulf and South-Asia hours easily; Europe is fine with async updates.$faq$, NOW(), NOW() FROM q;

-- 33. How do you prefer to communicate?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$communication$faq$, $faq$How do you prefer to communicate?$faq$, ARRAY[$faq$whatsapp$faq$, $faq$email$faq$, $faq$slack$faq$, $faq$working style$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Email for briefs and files. WhatsApp for short status. I write clearly and don’t hide behind process. If your team lives in Slack, I can join for the duration of the work.$faq$, NOW(), NOW() FROM q;

-- 34. How can I contact you?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$communication$faq$, $faq$How can I contact you?$faq$, ARRAY[$faq$email address$faq$, $faq$phone number$faq$, $faq$whatsapp number$faq$, $faq$contact details$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Email raza.aursoft@gmail.com, phone +971 54 271 4360, or WhatsApp on that number. The contact form on /contact is the cleanest way to include budget and timing.$faq$, NOW(), NOW() FROM q;

-- 35. How do you handle maintenance and support after delivery?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$maintenance$faq$, $faq$How do you handle maintenance and support after delivery?$faq$, ARRAY[$faq$after launch$faq$, $faq$bug fixes after delivery$faq$, $faq$support plan$faq$, $faq$warranty$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Launch is not the end. I fix defects from the build, then we can move to a retainer for updates and performance. At Aursoft, post-launch support held high client satisfaction. Say if you want ongoing care on the contact form.$faq$, NOW(), NOW() FROM q;

-- 36. Do you offer hosting and monitoring?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$maintenance$faq$, $faq$Do you offer hosting and monitoring?$faq$, ARRAY[$faq$will you host it$faq$, $faq$uptime$faq$, $faq$server management$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$I can deploy to AWS, Vercel, or the PHP host you already pay for, and keep an eye on uptime when we agree a retainer. I don’t lock you into a host I own — you should keep the accounts.$faq$, NOW(), NOW() FROM q;

-- 37. How many years of experience do you have?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$experience$faq$, $faq$How many years of experience do you have?$faq$, ARRAY[$faq$years of experience$faq$, $faq$how long have you been a developer$faq$, $faq$seniority$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Production web work since Aursoft in 2018 (8+ years), and web development with PHP since 2015. BSCS from AWKUM, 2015–2019. Employers: Aursoft, Ferisoft, Fujtown, now Centurion PLC.$faq$, NOW(), NOW() FROM q;

-- 38. Where have you worked?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$experience$faq$, $faq$Where have you worked?$faq$, ARRAY[$faq$employers$faq$, $faq$centurion$faq$, $faq$fujtown$faq$, $faq$ferisoft$faq$, $faq$aursoft$faq$, $faq$work history$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Aursoft (2018–2021, Islamabad), Ferisoft (2021–2022, remote Türkiye), Fujtown (2023–May 2026, Fujairah), Centurion PLC (July 2026–present). The career walk on /career is the same timeline, in order.$faq$, NOW(), NOW() FROM q;

-- 39. Can we schedule a call?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$contact$faq$, $faq$Can we schedule a call?$faq$, ARRAY[$faq$book a meeting$faq$, $faq$discovery call$faq$, $faq$let's talk$faq$, $faq$follow up$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Yes. Leave your email and phone here if this chat doesn’t cover it, or use /contact. I’ll reply with a time that works around the Centurion day.$faq$, NOW(), NOW() FROM q;

-- 40. Do you work with Vue.js?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$stack$faq$, $faq$Do you work with Vue.js?$faq$, ARRAY[$faq$vue$faq$, $faq$vuejs$faq$, $faq$do you know vue$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Yes. fujtown.com is Laravel with Vue.js for the directory UI: registration, listings, search, and roles. I reach for React or Next.js on new fronts, and Vue when the product is already there.$faq$, NOW(), NOW() FROM q;

-- 41. Do you use Tailwind CSS?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$stack$faq$, $faq$Do you use Tailwind CSS?$faq$, ARRAY[$faq$tailwind$faq$, $faq$bootstrap$faq$, $faq$css frameworks$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Yes. Tailwind on Fujtown-era and current React/Next work. I also ship Bootstrap when that is the existing design system, as on FOIZ and SisTouristVilla.$faq$, NOW(), NOW() FROM q;

-- 42. What is your experience with PHP?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$stack$faq$, $faq$What is your experience with PHP?$faq$, ARRAY[$faq$php developer$faq$, $faq$plain php$faq$, $faq$codeigniter$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$PHP since 2015. Laravel and CodeIgniter in production at Aursoft and Fujtown. Inventory/POS at inventory.aursoft.com is CodeIgniter 3 with Sencha. I still take PHP products that have to stay live, not only greenfield Next.js.$faq$, NOW(), NOW() FROM q;

-- 43. Do you work with Firebase?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$stack$faq$, $faq$Do you work with Firebase?$faq$, ARRAY[$faq$firebase$faq$, $faq$google firebase$faq$, $faq$realtime database$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Yes. Firebase showed up in backend work at Ferisoft alongside Node and Laravel. I use it when auth, hosting, or realtime fits; SQL stays the default for booking and inventory.$faq$, NOW(), NOW() FROM q;

-- 44. Can you build authentication and role-based access?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$stack$faq$, $faq$Can you build authentication and role-based access?$faq$, ARRAY[$faq$login system$faq$, $faq$user roles$faq$, $faq$admin permissions$faq$, $faq$rbac$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Yes. Directories and coaching platforms need businesses vs admins, students vs operators. fujtown.com has authentication and role-based access. I wire the roles to the real jobs, not a generic user table.$faq$, NOW(), NOW() FROM q;

-- 45. Do you build admin dashboards?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$stack$faq$, $faq$Do you build admin dashboards?$faq$, ARRAY[$faq$admin panel$faq$, $faq$cms$faq$, $faq$back office$faq$, $faq$operations dashboard$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Yes. Listing management, booking/ops screens, inventory, invoices, and reporting. The driving-school platform includes scheduling and pass-rate reporting. Admin tools are usually Laravel or a React/Next front on the same APIs.$faq$, NOW(), NOW() FROM q;

-- 46. Can you help with SEO and page speed?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$services$faq$, $faq$Can you help with SEO and page speed?$faq$, ARRAY[$faq$core web vitals$faq$, $faq$slow website$faq$, $faq$google ranking$faq$, $faq$lighthouse$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Yes. Performance and SEO are part of how I ship, not an add-on slide. Public sites at Fujtown and Centurion work need to stay fast. Send the URL and whether the pain is crawl, LCP, or a heavy admin.$faq$, NOW(), NOW() FROM q;

-- 47. Do you make websites mobile responsive?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$services$faq$, $faq$Do you make websites mobile responsive?$faq$, ARRAY[$faq$mobile friendly$faq$, $faq$responsive design$faq$, $faq$works on phone$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Yes. Public products are built to work on a phone first. Directories, booking, and coaching UIs are useless if they only look right on a laptop. I check the flows that matter on a small screen, not only a desktop mock.$faq$, NOW(), NOW() FROM q;

-- 48. Can you build a bilingual English and Arabic site?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$services$faq$, $faq$Can you build a bilingual English and Arabic site?$faq$, ARRAY[$faq$arabic website$faq$, $faq$rtl$faq$, $faq$multilingual$faq$, $faq$two languages$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Yes. Fujairah Fine Arts Academy is a bilingual English/Arabic layout. RTL, copy in two languages, and a CMS the staff can actually edit are the usual constraints. Tell me which language is source of truth.$faq$, NOW(), NOW() FROM q;

-- 49. Tell me about the FOIZ project.
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$projects$faq$, $faq$Tell me about the FOIZ project.$faq$, ARRAY[$faq$foiz$faq$, $faq$fujairah oil$faq$, $faq$oil marketplace$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$FOIZ is the Fujairah Oil Industry Zone marketplace. I worked on API and backend queries in Laravel and PostgreSQL, plus feature work and UI improvements. Live at foiz.gov.ae.$faq$, NOW(), NOW() FROM q;

-- 50. Tell me about SisTouristVilla.
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$projects$faq$, $faq$Tell me about SisTouristVilla.$faq$, ARRAY[$faq$hotel website$faq$, $faq$sistouristvilla$faq$, $faq$villa booking$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$SisTouristVilla is a hotel booking site I led: planning, design, payment gateway, and APIs so guests can book rooms online. PHP, JavaScript, MySQL, Bootstrap 5. Live at sistouristvilla.com.$faq$, NOW(), NOW() FROM q;

-- 51. Tell me about fujtown.com.
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$projects$faq$, $faq$Tell me about fujtown.com.$faq$, ARRAY[$faq$fujtown directory$faq$, $faq$business listing site$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$fujtown.com is a full-stack business directory: registration, listing management, search, auth, and roles for businesses and admins. Laravel and Vue.js. I also did product-based full-stack work at Fujtown LLC from 2023 to May 2026.$faq$, NOW(), NOW() FROM q;

-- 52. Have you built an inventory or POS system?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$projects$faq$, $faq$Have you built an inventory or POS system?$faq$, ARRAY[$faq$inventory software$faq$, $faq$point of sale$faq$, $faq$stock management$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Yes. inventory.aursoft.com is inventory and POS in CodeIgniter 3 and Ext-Sencha: live stock, low-stock alerts, invoices, customers, and sales reporting. At Fujtown a custom inventory build improved stock-tracking accuracy by about 35%.$faq$, NOW(), NOW() FROM q;

-- 53. Have you built a learning or coaching platform?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$projects$faq$, $faq$Have you built a learning or coaching platform?$faq$, ARRAY[$faq$online courses$faq$, $faq$fitness app$faq$, $faq$ypt$faq$, $faq$lms$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Yes. The coaching product uses Next.js and Laravel: auth, payments, subscriptions, courses and challenges, onboarding questionnaires, calorie calculators, and progress tracking. That is the closest public example of a membership product.$faq$, NOW(), NOW() FROM q;

-- 54. Who owns the code and the accounts when we finish?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$process$faq$, $faq$Who owns the code and the accounts when we finish?$faq$, ARRAY[$faq$intellectual property$faq$, $faq$source code ownership$faq$, $faq$github access$faq$, $faq$who owns the repo$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$You keep the product accounts: domain, host, GitHub, payments. I deliver the repo and a handover. I don’t hold the keys after the work unless you ask me to retain on a named account.$faq$, NOW(), NOW() FROM q;

-- 55. Do you provide documentation and handover?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$process$faq$, $faq$Do you provide documentation and handover?$faq$, ARRAY[$faq$docs$faq$, $faq$readme$faq$, $faq$how do we take over$faq$, $faq$knowledge transfer$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Yes. Env list, how to deploy, and the few commands that matter. At Fujtown, documentation cut project delays about 20%. I won’t write a novel nobody reads — I’ll write what the next engineer needs.$faq$, NOW(), NOW() FROM q;

-- 56. How do you handle change requests after we agree scope?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$process$faq$, $faq$How do you handle change requests after we agree scope?$faq$, ARRAY[$faq$scope creep$faq$, $faq$extra features$faq$, $faq$revisions$faq$, $faq$change order$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$If it changes the outcome, we re-quote that slice. Small copy and layout fixes inside the agreed screens stay in the work. I would rather pause and price a new module than silently grow a fixed bid.$faq$, NOW(), NOW() FROM q;

-- 57. Do you work from Figma or do you also design?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$process$faq$, $faq$Do you work from Figma or do you also design?$faq$, ARRAY[$faq$ui design$faq$, $faq$figma$faq$, $faq$do you need a designer$faq$, $faq$ux$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$I can implement a Figma file tightly, and I have worked with design on interfaces that lifted engagement. I am not a brand studio. If you have no designer, we keep the UI simple and consistent rather than inventing a visual identity from nothing.$faq$, NOW(), NOW() FROM q;

-- 58. What do you need from me to start?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$process$faq$, $faq$What do you need from me to start?$faq$, ARRAY[$faq$requirements$faq$, $faq$brief$faq$, $faq$kickoff$faq$, $faq$what access do you need$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Goal, URL or references, timing, and a budget mark (the contact form covers that). Then repo or host access, payment credentials if we touch checkout, and who signs off. A one-page brief beats a 40-page spec that nobody maintains.$faq$, NOW(), NOW() FROM q;

-- 59. Do you use Git and code review?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$process$faq$, $faq$Do you use Git and code review?$faq$, ARRAY[$faq$github$faq$, $faq$version control$faq$, $faq$pull requests$faq$, $faq$ci cd$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Yes. GitHub is how the work moves. At Aursoft, automated deploys shortened release cycles about 40%. Staging, then production. You can see the history; I don’t ship from a laptop unzip.$faq$, NOW(), NOW() FROM q;

-- 60. How do you handle security on a web app?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$process$faq$, $faq$How do you handle security on a web app?$faq$, ARRAY[$faq$security$faq$, $faq$https$faq$, $faq$sql injection$faq$, $faq$xss$faq$, $faq$hardening$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Auth that is actually checked, parameterized queries, HTTPS, and least privilege on the server. At Fujtown, cPanel and server hardening cut downtime about 15%. I don’t run a pentest theatre on a brochure site; I do lock the doors that production actually uses.$faq$, NOW(), NOW() FROM q;

-- 61. Can you subcontract for an agency?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$collaboration$faq$, $faq$Can you subcontract for an agency?$faq$, ARRAY[$faq$white label$faq$, $faq$agency developer$faq$, $faq$overflow work$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Yes, for scoped Laravel/React/Next/PHP work, including existing codebases. I stay in your tools and your client’s name if that is the deal. NDA first if the end client is confidential.$faq$, NOW(), NOW() FROM q;

-- 62. Do you speak English well enough for client work?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$collaboration$faq$, $faq$Do you speak English well enough for client work?$faq$, ARRAY[$faq$english$faq$, $faq$language$faq$, $faq$communication skills$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Yes. Professional work has been in English across Pakistan, Türkiye (remote), the UAE, and the Maldives. I write status in plain sentences. Arabic UI copy I implement; I don’t pretend to be a native Arabic copywriter.$faq$, NOW(), NOW() FROM q;

-- 63. How do payments work?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$pricing$faq$, $faq$How do payments work?$faq$, ARRAY[$faq$invoice$faq$, $faq$deposit$faq$, $faq$payment terms$faq$, $faq$milestone payments$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Quoted in USD. Typical shape is a start payment, then the rest on agreed slices you can click. Exact split is in the quote, not a surprise at the end. The contact form’s USD 100–5,000 slider is the conversation starter, not a hidden hourly trap.$faq$, NOW(), NOW() FROM q;

-- 64. Do you build WordPress sites?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$pricing$faq$, $faq$Do you build WordPress sites?$faq$, ARRAY[$faq$wordpress$faq$, $faq$elementor$faq$, $faq$woocommerce$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Not as a WordPress specialist. If you need custom PHP, Laravel, React, or Next.js, that is the work. A simple WP brochure is usually faster with someone who lives in that stack. I can still rescue a PHP site that has grown past a theme.$faq$, NOW(), NOW() FROM q;

-- 65. Do you build native iOS or Android apps?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$pricing$faq$, $faq$Do you build native iOS or Android apps?$faq$, ARRAY[$faq$mobile app$faq$, $faq$react native$faq$, $faq$flutter$faq$, $faq$app store$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$No native apps. I build web products that work well on a phone, including booking and membership flows. If you need App Store binaries, pair me with a mobile engineer or keep the product on the web.$faq$, NOW(), NOW() FROM q;

-- 66. Do you work weekends or evenings?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$availability$faq$, $faq$Do you work weekends or evenings?$faq$, ARRAY[$faq$after hours$faq$, $faq$timezone overlap$faq$, $faq$weekend work$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Centurion is the weekday job. Freelance sits around that — evenings and planned windows, not 24/7 chat. Europe and Gulf overlap is fine with async notes. Rush weekends get called out in the quote.$faq$, NOW(), NOW() FROM q;

-- 67. Are you hiring or looking for a full-time job?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$availability$faq$, $faq$Are you hiring or looking for a full-time job?$faq$, ARRAY[$faq$job offer$faq$, $faq$join our company$faq$, $faq$full time role$faq$, $faq$relocation$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$I am employed at Centurion PLC (July 2026–present). I take selected freelance and product work. A full-time move is a different conversation — use the contact form and say so clearly.$faq$, NOW(), NOW() FROM q;

-- 68. What did you do at Centurion PLC?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$experience$faq$, $faq$What did you do at Centurion PLC?$faq$, ARRAY[$faq$centurion plc$faq$, $faq$current job$faq$, $faq$maldives job$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Full-stack engineer since July 2026: production web platforms after the Fujtown handover. React, Next.js, Laravel, and PHP — UI, APIs, and deploys, with performance and SEO on live systems.$faq$, NOW(), NOW() FROM q;

-- 69. What did you do at Fujtown?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$experience$faq$, $faq$What did you do at Fujtown?$faq$, ARRAY[$faq$fujtown llc$faq$, $faq$uae experience$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Full-stack product work, March 2023–May 2026, Fujairah: React, Next.js, Tailwind, Laravel, CodeIgniter, PostgreSQL/MySQL. Directory and booking products, inventory accuracy, less downtime, fewer production bugs. fujtown.com is the public directory.$faq$, NOW(), NOW() FROM q;

-- 70. What is your education?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$experience$faq$, $faq$What is your education?$faq$, ARRAY[$faq$degree$faq$, $faq$university$faq$, $faq$bscs$faq$, $faq$diploma$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$BSCS, AWKUM University, 2015–2019, and a Diploma in Information Technology. The useful part is production work since 2018, not the paper.$faq$, NOW(), NOW() FROM q;

-- 71. Where can I see your GitHub or résumé?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$experience$faq$, $faq$Where can I see your GitHub or résumé?$faq$, ARRAY[$faq$github$faq$, $faq$cv$faq$, $faq$resume$faq$, $faq$linkedin$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$GitHub github.com/razaali333, LinkedIn linkedin.com/in/raza-ali-626a12190, résumé at razaali.vercel.app/resume.pdf. Live products are on /work — that is stronger than a repo dump.$faq$, NOW(), NOW() FROM q;

-- 72. What happens if something breaks after launch?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$maintenance$faq$, $faq$What happens if something breaks after launch?$faq$, ARRAY[$faq$bugs after go live$faq$, $faq$hotfix$faq$, $faq$production issue$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$Defects from the build get fixed. New ideas are new work or a retainer. If you want me on-call for uptime, say so up front so it is in the quote, not assumed.$faq$, NOW(), NOW() FROM q;

-- 73. Why should I hire you instead of an agency?
WITH q AS (
  INSERT INTO "Question" (id, category, prompt, aliases, active, "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, $faq$contact$faq$, $faq$Why should I hire you instead of an agency?$faq$, ARRAY[$faq$why you$faq$, $faq$vs agency$faq$, $faq$vs freelancer marketplace$faq$]::TEXT[], true, NOW(), NOW())
  RETURNING id
)
INSERT INTO "Answer" (id, "questionId", variant, body, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, q.id, $faq$default$faq$, $faq$You talk to the person who ships. 8+ years of live Laravel/React/PHP products — directories, booking, APIs, inventory — not a bench of juniors. Agencies are right for brand theatre; I am right when the site has to stay up.$faq$, NOW(), NOW() FROM q;

COMMIT;
