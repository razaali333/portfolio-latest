export type FaqSeed = {
  category: string;
  prompt: string;
  aliases: string[];
  answers: { variant: string; body: string }[];
};

export const faqSeed: FaqSeed[] = [
  {
    category: "greeting",
    prompt: "Hello",
    aliases: ["hi", "hey", "good morning", "good afternoon", "who are you"],
    answers: [
      {
        variant: "default",
        body: "I’m Raza’s site assistant. I can answer questions about services, stack, projects, timelines, and how to start work. Ask anything — if I don’t have it, I’ll take your email and phone so he can follow up.",
      },
    ],
  },
  {
    category: "services",
    prompt: "What services do you provide?",
    aliases: [
      "what do you do",
      "what can you build",
      "software engineering services",
      "web development services",
      "full stack services",
    ],
    answers: [
      {
        variant: "default",
        body: "I build production web products end to end: public sites, admin tools, APIs, and databases. Typical work is React or Next.js on the front, Laravel, Node, or PHP on the back, with PostgreSQL, MySQL, or MongoDB. Directories, booking, marketplaces, and coaching platforms are a natural fit.",
      },
    ],
  },
  {
    category: "services",
    prompt: "Do you do full-stack applications?",
    aliases: ["full stack developer", "frontend and backend", "end to end development"],
    answers: [
      {
        variant: "default",
        body: "Yes. I ship UI, APIs, and deploys as one piece of work. Recent roles at Fujtown and Centurion PLC are full-stack on live platforms, not front-end-only or ticket-only backend.",
      },
    ],
  },
  {
    category: "services",
    prompt: "Do you build APIs?",
    aliases: ["api development", "rest api", "backend apis", "laravel api"],
    answers: [
      {
        variant: "default",
        body: "Yes. REST APIs in Laravel, Node/Express, and PHP — including third-party integrations. At Ferisoft that was a core part of the job; FOIZ used Laravel and PostgreSQL for API and query work.",
      },
    ],
  },
  {
    category: "services",
    prompt: "Do you design databases?",
    aliases: ["database design", "postgres schema", "mysql database", "mongodb schema"],
    answers: [
      {
        variant: "default",
        body: "Yes. I model PostgreSQL and MySQL for product data, and MongoDB when the document shape fits. Inventory, booking, directories, and payments all need a schema that stays fast after launch — that’s the bar.",
      },
    ],
  },
  {
    category: "services",
    prompt: "Can you rebuild or improve an existing website?",
    aliases: ["redesign my site", "migrate my website", "improve performance", "seo work"],
    answers: [
      {
        variant: "default",
        body: "Yes. I take existing Laravel, PHP, React, or Next.js products and tighten performance, SEO, and reliability. At Fujtown, server hardening cut downtime about 15%, and debugging dropped production bugs about 30%. Send the URL and what hurts.",
      },
    ],
  },
  {
    category: "stack",
    prompt: "What technologies do you specialize in?",
    aliases: ["tech stack", "what languages do you use", "skills", "tools you use"],
    answers: [
      {
        variant: "default",
        body: "Day to day: Next.js, React, TypeScript, JavaScript, Tailwind, Laravel, PHP, Node.js, Vue.js, MongoDB, PostgreSQL, MySQL, Firebase, AWS, and Docker. PHP since 2015; React and Laravel are the pair I reach for most.",
      },
    ],
  },
  {
    category: "stack",
    prompt: "What is your experience with Next.js?",
    aliases: ["nextjs experience", "do you know next.js", "next js developer"],
    answers: [
      {
        variant: "default",
        body: "I have used Next.js in production since 2023 — product work at Fujtown and this portfolio. YPT’s coaching platform is Next.js with a Laravel API. I am comfortable with App Router, server routes, and keeping the front fast.",
      },
    ],
  },
  {
    category: "stack",
    prompt: "What is your experience with React?",
    aliases: ["react.js", "reactjs experience", "do you know react"],
    answers: [
      {
        variant: "default",
        body: "React since 2019, through Aursoft, Fujtown, and Centurion. Interfaces, design collaboration, and production UIs — not demos. I also work in Vue when the product is already there, as on fujtown.com.",
      },
    ],
  },
  {
    category: "stack",
    prompt: "What is your experience with Laravel?",
    aliases: ["laravel developer", "php laravel", "do you know laravel"],
    answers: [
      {
        variant: "default",
        body: "Laravel since 2018. It has been the backbone of directories, booking, driving-school ops, APIs, and admin tools. I also know CodeIgniter when a legacy PHP app needs care.",
      },
    ],
  },
  {
    category: "stack",
    prompt: "What is your experience with Node.js?",
    aliases: ["nodejs", "express.js", "node backend"],
    answers: [
      {
        variant: "default",
        body: "Node.js and Express since 2021 at Ferisoft — APIs, Firebase, and integrations. I still use Node beside Laravel when a product needs both, including this site’s routes.",
      },
    ],
  },
  {
    category: "stack",
    prompt: "Do you work with PostgreSQL and MySQL?",
    aliases: ["postgres", "mysql", "sql databases", "mongodb experience"],
    answers: [
      {
        variant: "default",
        body: "Yes. PostgreSQL and MySQL across Aursoft, Ferisoft, and Fujtown. MongoDB when the product wants documents. FOIZ is Laravel + PostgreSQL; several live sites run MySQL.",
      },
    ],
  },
  {
    category: "stack",
    prompt: "Do you use AWS or Docker?",
    aliases: ["aws experience", "docker deploys", "hosting", "deployment"],
    answers: [
      {
        variant: "default",
        body: "Yes. At Aursoft I ran AWS EC2, S3, and RDS with 99.9% uptime and automated deploys. Docker is in the toolkit. I also ship on cPanel, Vercel, and typical PHP hosts when that is what the product already uses.",
      },
    ],
  },
  {
    category: "stack",
    prompt: "Do you work with TypeScript?",
    aliases: ["typescript experience", "javascript es6"],
    answers: [
      {
        variant: "default",
        body: "Yes. TypeScript and modern JavaScript on Next.js and React work. This portfolio is TypeScript. I don’t force TS onto a Laravel Blade app if it would slow the team down.",
      },
    ],
  },
  {
    category: "projects",
    prompt: "Can you show examples of similar projects?",
    aliases: [
      "portfolio projects",
      "case studies",
      "what have you built",
      "examples of your work",
      "live websites",
    ],
    answers: [
      {
        variant: "default",
        body: "Live work includes FOIZ (oil marketplace APIs), SisTouristVilla (hotel booking and payments), fujtown.com (business directory), a fitness coaching platform with subscriptions, a Dutch driving-school system, and an inventory/POS. See /work. Some recent work is under NDA and can’t be named.",
      },
    ],
  },
  {
    category: "projects",
    prompt: "Have you built booking or marketplace products?",
    aliases: ["hotel booking", "directory website", "marketplace", "e-commerce"],
    answers: [
      {
        variant: "default",
        body: "Yes. SisTouristVilla is booking + payments. fujtown.com is a directory with registration, search, and roles. FOIZ is marketplace-side API work. Those are the closest public examples.",
      },
    ],
  },
  {
    category: "projects",
    prompt: "Have you built payment or subscription products?",
    aliases: ["stripe", "payment gateway", "subscriptions", "saas"],
    answers: [
      {
        variant: "default",
        body: "Yes. SisTouristVilla includes a payment gateway. The coaching platform has authentication, payments, and subscriptions. I integrate the gateway you already use rather than inventing a new one.",
      },
    ],
  },
  {
    category: "projects",
    prompt: "What kind of project types do you take?",
    aliases: ["what projects do you accept", "ideal client", "what do you not do"],
    answers: [
      {
        variant: "default",
        body: "Best fit: web products that have to stay live — Laravel/React/Next platforms, APIs, directories, booking, admin tools, and performance work. I don’t take mobile-native apps or chain/crypto work. If the brief is unclear, the contact form is the right next step.",
      },
    ],
  },
  {
    category: "process",
    prompt: "What is your development process?",
    aliases: ["how do you work", "workflow", "project process", "how do you start a project"],
    answers: [
      {
        variant: "default",
        body: "Short brief first (goal, URL, timing, budget). Then a scoped plan: what ships, what waits, and how we’ll talk. I build in slices you can click, not a six-month reveal. Deploys stay boring — staging, then production.",
      },
    ],
  },
  {
    category: "process",
    prompt: "What is your approach to testing and code quality?",
    aliases: ["testing", "qa", "code quality", "do you write tests"],
    answers: [
      {
        variant: "default",
        body: "I test the paths that break products: payments, booking, auth, and API contracts. Reviews and staging before production. At Fujtown, focused debugging cut production bugs about 30%. I don’t pad a quote with a theatre of unused test frameworks.",
      },
    ],
  },
  {
    category: "process",
    prompt: "How do you handle project updates and progress reporting?",
    aliases: ["status updates", "communication during project", "progress reports", "weekly updates"],
    answers: [
      {
        variant: "default",
        body: "Async by default: email or WhatsApp with what shipped, what’s next, and blockers. For longer work, a short weekly note is enough. You will not need a stand-up to know whether the build is moving.",
      },
    ],
  },
  {
    category: "process",
    prompt: "How do you handle NDA or confidential work?",
    aliases: ["nda", "confidential", "can you work under nda", "private projects"],
    answers: [
      {
        variant: "default",
        body: "Yes. Part of my recent work is under NDA and is not listed on /work. I can talk about the problem, my role, and the stack without naming protected systems. Send an NDA if you need one before the brief.",
      },
    ],
  },
  {
    category: "collaboration",
    prompt: "Do you work with existing teams or only solo?",
    aliases: ["join my team", "work with designers", "collaborate with developers", "agency partner"],
    answers: [
      {
        variant: "default",
        body: "Both. I have shipped inside product teams (Fujtown, Centurion) and as the engineer owning a build. I work fine next to designers, PMs, and other developers. I can also take a scoped product solo if that is what you need.",
      },
    ],
  },
  {
    category: "collaboration",
    prompt: "Can you work with our existing codebase?",
    aliases: ["legacy laravel", "existing react app", "take over a project"],
    answers: [
      {
        variant: "default",
        body: "Yes. Most of the useful work is already-running PHP, Laravel, React, or Next.js. I read the repo, note risk, then change what matters. A handover and access list is enough to start.",
      },
    ],
  },
  {
    category: "pricing",
    prompt: "What is your rate?",
    aliases: [
      "how much do you charge",
      "pricing",
      "hourly rate",
      "what is your rate for a website",
      "cost of a project",
    ],
    answers: [
      {
        variant: "default",
        body: "I quote from a brief, not a fake hourly board. The contact form uses USD 100–5,000 for typical slices of product work. Larger platforms are scoped separately. If you know the outcome, I’ll price the work to get there.",
      },
    ],
  },
  {
    category: "pricing",
    prompt: "What is your rate for a landing page or small site?",
    aliases: ["cheap website", "small project cost", "brochure site"],
    answers: [
      {
        variant: "default",
        body: "Small public sites sit at the lower end of the USD 100–5,000 range on the contact form, depending on copy, CMS, and whether you need forms, SEO, or a CMS. Send the URL or a reference and a budget mark.",
      },
    ],
  },
  {
    category: "pricing",
    prompt: "Do you take fixed-price or retainer work?",
    aliases: ["fixed bid", "monthly retainer", "engagement models", "ongoing contract"],
    answers: [
      {
        variant: "default",
        body: "Both. A fixed quote for a defined slice, or a retainer for ongoing support and performance (the contact form has that topic). I don’t start open-ended builds without a cap you can see.",
      },
    ],
  },
  {
    category: "timeline",
    prompt: "How long does a project take?",
    aliases: ["timeline", "how soon can you start", "duration", "delivery time"],
    answers: [
      {
        variant: "default",
        body: "A small site or API slice can land in a few weeks. A directory, booking, or coaching platform is usually one to three months for a first honest version. Timing on the contact form (soon / 1–3 months / later) is how I plan around Centurion work.",
      },
    ],
  },
  {
    category: "timeline",
    prompt: "How soon can you start?",
    aliases: ["availability this week", "start immediately", "when are you free"],
    answers: [
      {
        variant: "default",
        body: "I work at Centurion PLC and take selected freelance work around that. Start dates depend on scope. If you need something immediately, say so on the contact form and I’ll tell you the first open window.",
      },
    ],
  },
  {
    category: "timeline",
    prompt: "What is the timeline for a large web application?",
    aliases: ["big project duration", "saas timeline", "complex build"],
    answers: [
      {
        variant: "default",
        body: "Larger products are phased: a first live slice, then the rest. Expect months, not a weekend. I’ll still give you something clickable early so you can judge the work before the whole map is drawn.",
      },
    ],
  },
  {
    category: "availability",
    prompt: "Are you available for freelance work?",
    aliases: ["hire you", "are you free", "open for work", "new opportunities"],
    answers: [
      {
        variant: "default",
        body: "Yes — selected work, not every inbound. Full-time is Centurion PLC; freelance is scoped around that. The inbox is open: raza.aursoft@gmail.com or the contact form.",
      },
    ],
  },
  {
    category: "availability",
    prompt: "Where are you based and what timezone do you work in?",
    aliases: ["location", "timezone", "maldives", "uae", "remote"],
    answers: [
      {
        variant: "default",
        body: "I am based in the Maldives and have shipped product work from Fujairah, UAE. Remote is normal. I overlap Gulf and South-Asia hours easily; Europe is fine with async updates.",
      },
    ],
  },
  {
    category: "communication",
    prompt: "How do you prefer to communicate?",
    aliases: ["whatsapp", "email", "slack", "working style"],
    answers: [
      {
        variant: "default",
        body: "Email for briefs and files. WhatsApp for short status. I write clearly and don’t hide behind process. If your team lives in Slack, I can join for the duration of the work.",
      },
    ],
  },
  {
    category: "communication",
    prompt: "How can I contact you?",
    aliases: ["email address", "phone number", "whatsapp number", "contact details"],
    answers: [
      {
        variant: "default",
        body: "Email raza.aursoft@gmail.com, phone +971 54 271 4360, or WhatsApp on that number. The contact form on /contact is the cleanest way to include budget and timing.",
      },
    ],
  },
  {
    category: "maintenance",
    prompt: "How do you handle maintenance and support after delivery?",
    aliases: ["after launch", "bug fixes after delivery", "support plan", "warranty"],
    answers: [
      {
        variant: "default",
        body: "Launch is not the end. I fix defects from the build, then we can move to a retainer for updates and performance. At Aursoft, post-launch support held high client satisfaction. Say if you want ongoing care on the contact form.",
      },
    ],
  },
  {
    category: "maintenance",
    prompt: "Do you offer hosting and monitoring?",
    aliases: ["will you host it", "uptime", "server management"],
    answers: [
      {
        variant: "default",
        body: "I can deploy to AWS, Vercel, or the PHP host you already pay for, and keep an eye on uptime when we agree a retainer. I don’t lock you into a host I own — you should keep the accounts.",
      },
    ],
  },
  {
    category: "experience",
    prompt: "How many years of experience do you have?",
    aliases: ["years of experience", "how long have you been a developer", "seniority"],
    answers: [
      {
        variant: "default",
        body: "Production web work since Aursoft in 2018 (8+ years), and web development with PHP since 2015. BSCS from AWKUM, 2015–2019. Employers: Aursoft, Ferisoft, Fujtown, now Centurion PLC.",
      },
    ],
  },
  {
    category: "experience",
    prompt: "Where have you worked?",
    aliases: ["employers", "centurion", "fujtown", "ferisoft", "aursoft", "work history"],
    answers: [
      {
        variant: "default",
        body: "Aursoft (2018–2021, Islamabad), Ferisoft (2021–2022, remote Türkiye), Fujtown (2023–May 2026, Fujairah), Centurion PLC (July 2026–present). The career walk on /career is the same timeline, in order.",
      },
    ],
  },
  {
    category: "contact",
    prompt: "Can we schedule a call?",
    aliases: ["book a meeting", "discovery call", "let's talk", "follow up"],
    answers: [
      {
        variant: "default",
        body: "Yes. Leave your email and phone here if this chat doesn’t cover it, or use /contact. I’ll reply with a time that works around the Centurion day.",
      },
    ],
  },
  {
    category: "stack",
    prompt: "Do you work with Vue.js?",
    aliases: ["vue", "vuejs", "do you know vue"],
    answers: [
      {
        variant: "default",
        body: "Yes. fujtown.com is Laravel with Vue.js for the directory UI: registration, listings, search, and roles. I reach for React or Next.js on new fronts, and Vue when the product is already there.",
      },
    ],
  },
  {
    category: "stack",
    prompt: "Do you use Tailwind CSS?",
    aliases: ["tailwind", "bootstrap", "css frameworks"],
    answers: [
      {
        variant: "default",
        body: "Yes. Tailwind on Fujtown-era and current React/Next work. I also ship Bootstrap when that is the existing design system, as on FOIZ and SisTouristVilla.",
      },
    ],
  },
  {
    category: "stack",
    prompt: "What is your experience with PHP?",
    aliases: ["php developer", "plain php", "codeigniter"],
    answers: [
      {
        variant: "default",
        body: "PHP since 2015. Laravel and CodeIgniter in production at Aursoft and Fujtown. Inventory/POS at inventory.aursoft.com is CodeIgniter 3 with Sencha. I still take PHP products that have to stay live, not only greenfield Next.js.",
      },
    ],
  },
  {
    category: "stack",
    prompt: "Do you work with Firebase?",
    aliases: ["firebase", "google firebase", "realtime database"],
    answers: [
      {
        variant: "default",
        body: "Yes. Firebase showed up in backend work at Ferisoft alongside Node and Laravel. I use it when auth, hosting, or realtime fits; SQL stays the default for booking and inventory.",
      },
    ],
  },
  {
    category: "stack",
    prompt: "Can you build authentication and role-based access?",
    aliases: ["login system", "user roles", "admin permissions", "rbac"],
    answers: [
      {
        variant: "default",
        body: "Yes. Directories and coaching platforms need businesses vs admins, students vs operators. fujtown.com has authentication and role-based access. I wire the roles to the real jobs, not a generic user table.",
      },
    ],
  },
  {
    category: "stack",
    prompt: "Do you build admin dashboards?",
    aliases: ["admin panel", "cms", "back office", "operations dashboard"],
    answers: [
      {
        variant: "default",
        body: "Yes. Listing management, booking/ops screens, inventory, invoices, and reporting. The driving-school platform includes scheduling and pass-rate reporting. Admin tools are usually Laravel or a React/Next front on the same APIs.",
      },
    ],
  },
  {
    category: "services",
    prompt: "Can you help with SEO and page speed?",
    aliases: ["core web vitals", "slow website", "google ranking", "lighthouse"],
    answers: [
      {
        variant: "default",
        body: "Yes. Performance and SEO are part of how I ship, not an add-on slide. Public sites at Fujtown and Centurion work need to stay fast. Send the URL and whether the pain is crawl, LCP, or a heavy admin.",
      },
    ],
  },
  {
    category: "services",
    prompt: "Do you make websites mobile responsive?",
    aliases: ["mobile friendly", "responsive design", "works on phone"],
    answers: [
      {
        variant: "default",
        body: "Yes. Public products are built to work on a phone first. Directories, booking, and coaching UIs are useless if they only look right on a laptop. I check the flows that matter on a small screen, not only a desktop mock.",
      },
    ],
  },
  {
    category: "services",
    prompt: "Can you build a bilingual English and Arabic site?",
    aliases: ["arabic website", "rtl", "multilingual", "two languages"],
    answers: [
      {
        variant: "default",
        body: "Yes. Fujairah Fine Arts Academy is a bilingual English/Arabic layout. RTL, copy in two languages, and a CMS the staff can actually edit are the usual constraints. Tell me which language is source of truth.",
      },
    ],
  },
  {
    category: "projects",
    prompt: "Tell me about the FOIZ project.",
    aliases: ["foiz", "fujairah oil", "oil marketplace"],
    answers: [
      {
        variant: "default",
        body: "FOIZ is the Fujairah Oil Industry Zone marketplace. I worked on API and backend queries in Laravel and PostgreSQL, plus feature work and UI improvements. Live at foiz.gov.ae.",
      },
    ],
  },
  {
    category: "projects",
    prompt: "Tell me about SisTouristVilla.",
    aliases: ["hotel website", "sistouristvilla", "villa booking"],
    answers: [
      {
        variant: "default",
        body: "SisTouristVilla is a hotel booking site I led: planning, design, payment gateway, and APIs so guests can book rooms online. PHP, JavaScript, MySQL, Bootstrap 5. Live at sistouristvilla.com.",
      },
    ],
  },
  {
    category: "projects",
    prompt: "Tell me about fujtown.com.",
    aliases: ["fujtown directory", "business listing site"],
    answers: [
      {
        variant: "default",
        body: "fujtown.com is a full-stack business directory: registration, listing management, search, auth, and roles for businesses and admins. Laravel and Vue.js. I also did product-based full-stack work at Fujtown LLC from 2023 to May 2026.",
      },
    ],
  },
  {
    category: "projects",
    prompt: "Have you built an inventory or POS system?",
    aliases: ["inventory software", "point of sale", "stock management"],
    answers: [
      {
        variant: "default",
        body: "Yes. inventory.aursoft.com is inventory and POS in CodeIgniter 3 and Ext-Sencha: live stock, low-stock alerts, invoices, customers, and sales reporting. At Fujtown a custom inventory build improved stock-tracking accuracy by about 35%.",
      },
    ],
  },
  {
    category: "projects",
    prompt: "Have you built a learning or coaching platform?",
    aliases: ["online courses", "fitness app", "ypt", "lms"],
    answers: [
      {
        variant: "default",
        body: "Yes. The coaching product uses Next.js and Laravel: auth, payments, subscriptions, courses and challenges, onboarding questionnaires, calorie calculators, and progress tracking. That is the closest public example of a membership product.",
      },
    ],
  },
  {
    category: "process",
    prompt: "Who owns the code and the accounts when we finish?",
    aliases: ["intellectual property", "source code ownership", "github access", "who owns the repo"],
    answers: [
      {
        variant: "default",
        body: "You keep the product accounts: domain, host, GitHub, payments. I deliver the repo and a handover. I don’t hold the keys after the work unless you ask me to retain on a named account.",
      },
    ],
  },
  {
    category: "process",
    prompt: "Do you provide documentation and handover?",
    aliases: ["docs", "readme", "how do we take over", "knowledge transfer"],
    answers: [
      {
        variant: "default",
        body: "Yes. Env list, how to deploy, and the few commands that matter. At Fujtown, documentation cut project delays about 20%. I won’t write a novel nobody reads — I’ll write what the next engineer needs.",
      },
    ],
  },
  {
    category: "process",
    prompt: "How do you handle change requests after we agree scope?",
    aliases: ["scope creep", "extra features", "revisions", "change order"],
    answers: [
      {
        variant: "default",
        body: "If it changes the outcome, we re-quote that slice. Small copy and layout fixes inside the agreed screens stay in the work. I would rather pause and price a new module than silently grow a fixed bid.",
      },
    ],
  },
  {
    category: "process",
    prompt: "Do you work from Figma or do you also design?",
    aliases: ["ui design", "figma", "do you need a designer", "ux"],
    answers: [
      {
        variant: "default",
        body: "I can implement a Figma file tightly, and I have worked with design on interfaces that lifted engagement. I am not a brand studio. If you have no designer, we keep the UI simple and consistent rather than inventing a visual identity from nothing.",
      },
    ],
  },
  {
    category: "process",
    prompt: "What do you need from me to start?",
    aliases: ["requirements", "brief", "kickoff", "what access do you need"],
    answers: [
      {
        variant: "default",
        body: "Goal, URL or references, timing, and a budget mark (the contact form covers that). Then repo or host access, payment credentials if we touch checkout, and who signs off. A one-page brief beats a 40-page spec that nobody maintains.",
      },
    ],
  },
  {
    category: "process",
    prompt: "Do you use Git and code review?",
    aliases: ["github", "version control", "pull requests", "ci cd"],
    answers: [
      {
        variant: "default",
        body: "Yes. GitHub is how the work moves. At Aursoft, automated deploys shortened release cycles about 40%. Staging, then production. You can see the history; I don’t ship from a laptop unzip.",
      },
    ],
  },
  {
    category: "process",
    prompt: "How do you handle security on a web app?",
    aliases: ["security", "https", "sql injection", "xss", "hardening"],
    answers: [
      {
        variant: "default",
        body: "Auth that is actually checked, parameterized queries, HTTPS, and least privilege on the server. At Fujtown, cPanel and server hardening cut downtime about 15%. I don’t run a pentest theatre on a brochure site; I do lock the doors that production actually uses.",
      },
    ],
  },
  {
    category: "collaboration",
    prompt: "Can you subcontract for an agency?",
    aliases: ["white label", "agency developer", "overflow work"],
    answers: [
      {
        variant: "default",
        body: "Yes, for scoped Laravel/React/Next/PHP work, including existing codebases. I stay in your tools and your client’s name if that is the deal. NDA first if the end client is confidential.",
      },
    ],
  },
  {
    category: "collaboration",
    prompt: "Do you speak English well enough for client work?",
    aliases: ["english", "language", "communication skills"],
    answers: [
      {
        variant: "default",
        body: "Yes. Professional work has been in English across Pakistan, Türkiye (remote), the UAE, and the Maldives. I write status in plain sentences. Arabic UI copy I implement; I don’t pretend to be a native Arabic copywriter.",
      },
    ],
  },
  {
    category: "pricing",
    prompt: "How do payments work?",
    aliases: ["invoice", "deposit", "payment terms", "milestone payments"],
    answers: [
      {
        variant: "default",
        body: "Quoted in USD. Typical shape is a start payment, then the rest on agreed slices you can click. Exact split is in the quote, not a surprise at the end. The contact form’s USD 100–5,000 slider is the conversation starter, not a hidden hourly trap.",
      },
    ],
  },
  {
    category: "pricing",
    prompt: "Do you build WordPress sites?",
    aliases: ["wordpress", "elementor", "woocommerce"],
    answers: [
      {
        variant: "default",
        body: "Not as a WordPress specialist. If you need custom PHP, Laravel, React, or Next.js, that is the work. A simple WP brochure is usually faster with someone who lives in that stack. I can still rescue a PHP site that has grown past a theme.",
      },
    ],
  },
  {
    category: "pricing",
    prompt: "Do you build native iOS or Android apps?",
    aliases: ["mobile app", "react native", "flutter", "app store"],
    answers: [
      {
        variant: "default",
        body: "No native apps. I build web products that work well on a phone, including booking and membership flows. If you need App Store binaries, pair me with a mobile engineer or keep the product on the web.",
      },
    ],
  },
  {
    category: "availability",
    prompt: "Do you work weekends or evenings?",
    aliases: ["after hours", "timezone overlap", "weekend work"],
    answers: [
      {
        variant: "default",
        body: "Centurion is the weekday job. Freelance sits around that — evenings and planned windows, not 24/7 chat. Europe and Gulf overlap is fine with async notes. Rush weekends get called out in the quote.",
      },
    ],
  },
  {
    category: "availability",
    prompt: "Are you hiring or looking for a full-time job?",
    aliases: ["job offer", "join our company", "full time role", "relocation"],
    answers: [
      {
        variant: "default",
        body: "I am employed at Centurion PLC (July 2026–present). I take selected freelance and product work. A full-time move is a different conversation — use the contact form and say so clearly.",
      },
    ],
  },
  {
    category: "experience",
    prompt: "What did you do at Centurion PLC?",
    aliases: ["centurion plc", "current job", "maldives job"],
    answers: [
      {
        variant: "default",
        body: "Full-stack engineer since July 2026: production web platforms after the Fujtown handover. React, Next.js, Laravel, and PHP — UI, APIs, and deploys, with performance and SEO on live systems.",
      },
    ],
  },
  {
    category: "experience",
    prompt: "What did you do at Fujtown?",
    aliases: ["fujtown llc", "uae experience"],
    answers: [
      {
        variant: "default",
        body: "Full-stack product work, March 2023–May 2026, Fujairah: React, Next.js, Tailwind, Laravel, CodeIgniter, PostgreSQL/MySQL. Directory and booking products, inventory accuracy, less downtime, fewer production bugs. fujtown.com is the public directory.",
      },
    ],
  },
  {
    category: "experience",
    prompt: "What is your education?",
    aliases: ["degree", "university", "bscs", "diploma"],
    answers: [
      {
        variant: "default",
        body: "BSCS, AWKUM University, 2015–2019, and a Diploma in Information Technology. The useful part is production work since 2018, not the paper.",
      },
    ],
  },
  {
    category: "experience",
    prompt: "Where can I see your GitHub or résumé?",
    aliases: ["github", "cv", "resume", "linkedin"],
    answers: [
      {
        variant: "default",
        body: "GitHub github.com/razaali333, LinkedIn linkedin.com/in/raza-ali-626a12190, résumé at razaali.vercel.app/resume.pdf. Live products are on /work — that is stronger than a repo dump.",
      },
    ],
  },
  {
    category: "maintenance",
    prompt: "What happens if something breaks after launch?",
    aliases: ["bugs after go live", "hotfix", "production issue"],
    answers: [
      {
        variant: "default",
        body: "Defects from the build get fixed. New ideas are new work or a retainer. If you want me on-call for uptime, say so up front so it is in the quote, not assumed.",
      },
    ],
  },
  {
    category: "contact",
    prompt: "Why should I hire you instead of an agency?",
    aliases: ["why you", "vs agency", "vs freelancer marketplace"],
    answers: [
      {
        variant: "default",
        body: "You talk to the person who ships. 8+ years of live Laravel/React/PHP products — directories, booking, APIs, inventory — not a bench of juniors. Agencies are right for brand theatre; I am right when the site has to stay up.",
      },
    ],
  },
];
