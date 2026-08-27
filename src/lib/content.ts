export const site = {
  name: "RAZA ALI",
  person: "Raza Ali",
  url: "https://razaali.vercel.app",
  email: "raza.aursoft@gmail.com",
  phone: "+971542714360",
  github: "https://github.com/razaali333",
  linkedin: "https://www.linkedin.com/in/raza-ali-626a12190/",
  instagram: "https://www.instagram.com/raza.fujtown/",
  resume: "https://razaali.vercel.app/resume.pdf",
  whatsapp: "https://wa.me/971542714360",
  tagline: "I make ideas & things alive.",
  role: "Full Stack Web Developer",
  gender: "Male",
  location: "Maldives",
  education: "BSCS, AWKUM University, 2015–2019",
  description:
    "Raza Ali is a full-stack web developer. He builds immersive web applications with React, Laravel, and MongoDB, and currently works at Centurion PLC.",
};

export const nav = [
  { href: "/about", label: "About", key: "about" },
  { href: "/experience", label: "Experience", key: "experience" },
  { href: "/work", label: "Work", key: "work" },
  { href: "/contact", label: "Contact", key: "contact" },
  { href: "/career", label: "Visit my career", key: "career" },
] as const;

export const assets = {
  character: "/assets/character/character_walk_01.svg",
  portrait: "/portrait.webp",
};

export const about = {
  greeting:
    "Hello! My name is Raza Ali. I am a software engineer and problem solver, dedicated to shipping web products that hold up in production. My journey in computer science began in 2015, when I started web development with PHP — that curiosity became a career.",
  body: "Since my engineering degree, the work has moved through agencies and product teams: Aursoft, Ferisoft, Fujtown, and now Centurion PLC. I care about React and Laravel in equal measure — interfaces people can use, and backends that stay fast. After product work at Fujtown through May 2026, I joined Centurion PLC in July 2026.",
  hero: "I'm a full-stack web developer. I specialize in reliable web experiences: React and Next.js on the front, Laravel, Node, and PHP on the back, with MongoDB or SQL when the product needs it.",
  resumeSummary:
    "Full-stack developer with 8+ years shipping production web applications (since Aursoft, 2018). Strong in React.js, Next.js, Laravel, and Node.js, with MongoDB and MySQL, plus AWS and Docker for deploys. Emphasis on SEO, performance, and work that stays live.",
};

export const experience = [
  {
    role: "Full Stack Web Developer",
    specialty: "",
    org: "Centurion PLC",
    href: "https://centurion.mv/",
    period: "Jul 2026 — Present",
    location: "",
    summary:
      "Full-stack engineer at Centurion PLC since July 2026 — production web platforms after product work at Fujtown.",
    bullets: [
      "Joined Centurion PLC in July 2026 to own full-stack delivery on live web platforms.",
      "Building features end to end with React, Next.js, Laravel, and PHP — UI, APIs, and deploys.",
      "Focused on performance, SEO, and keeping production systems reliable after the Fujtown handover.",
    ],
  },
  {
    role: "Full Stack Web Developer",
    specialty: "PHP",
    org: "Fujtown",
    href: "https://www.fujtown.com/",
    period: "Mar 2023 — May 2026",
    location: "Fujairah, UAE",
    summary:
      "Product-based full-stack work at Fujtown LLC — React, Next.js, Laravel, and PHP across live platforms.",
    bullets: [
      "Product-based full-stack work with React, Next.js, Tailwind, Laravel, CodeIgniter, PostgreSQL, and MySQL.",
      "Shipped directory and booking products for a large live user base in Fujairah, including fujtown.com.",
      "Built a custom inventory system that improved stock-tracking accuracy by 35%.",
      "Cut downtime about 15% with cPanel and server hardening; documentation reduced project delays by 20%.",
      "Debugged across multiple products and reduced production bugs by about 30%.",
    ],
  },
  {
    role: "Back End Web Developer",
    specialty: "",
    org: "Ferisoft",
    href: "https://www.ferisoft.com/",
    period: "Jun 2021 — Aug 2022",
    location: "Remote, Türkiye",
    summary:
      "Backend engineering at Ferisoft — Laravel, Node.js, Express, Firebase, and APIs.",
    bullets: [
      "Backend engineering with Laravel, Node.js, Express, Firebase, PostgreSQL/MySQL, and REST APIs.",
      "Integrated third-party services and cut system integration time by about 25%.",
      "Shipped 5+ full-stack PHP, JavaScript, and MySQL applications and improved runtime efficiency by about 30%.",
      "Extracted reusable components that shortened later project setup by about 15%.",
    ],
  },
  {
    role: "Full Stack Web Developer",
    specialty: "PHP",
    org: "Aursoft",
    href: "https://www.aursoft.com/",
    period: "Aug 2018 — May 2021",
    location: "Islamabad, Pakistan",
    summary:
      "Full-stack PHP work at Aursoft — React, Laravel, CodeIgniter, Ext-Sencha, and large user bases.",
    bullets: [
      "Full-stack PHP with React, Laravel, CodeIgniter, Ext-Sencha, PostgreSQL, and MySQL.",
      "Designed and deployed 10+ web applications; ran AWS EC2, S3, and RDS with 99.9% uptime.",
      "Cut API response time by about 30% and automated deploys, shortening release cycles by 40%.",
      "Worked with design on interfaces that lifted engagement about 25%; post-launch support held 95% client satisfaction.",
    ],
  },
];

export const projects = [
  {
    id: "foiz",
    index: "01",
    eyebrow: "FOIZ",
    name: "FOIZ Fujairah Oil Marketplace",
    status: "live",
    summary:
      "At FOIZ, I played a crucial role in developing API and backend queries for their web application using Laravel and PostgreSQL. Our focus was on integrating new features and improving the user interface.",
    stack: ["PHP", "PostgreSQL", "JavaScript", "Bootstrap"],
    href: "https://www.foiz.gov.ae/",
    image: "/project-images/foiz-project.jpg",
  },
  {
    id: "sistouristvilla",
    index: "02",
    eyebrow: "Recent Project",
    name: "SisTouristVilla",
    status: "live",
    summary:
      "I led the development of a hotel booking site so customers could book rooms online — overseeing planning and development, including the design, payment gateway, and APIs.",
    stack: ["PHP", "JavaScript", "MySQL", "Payment Gateway", "Bootstrap 5"],
    href: "https://sistouristvilla.com/",
    image: "/project-images/sistouristvilla-project.jpg",
  },
  {
    id: "fujtown",
    index: "03",
    eyebrow: "Business directory",
    name: "fujtown.com",
    status: "live",
    summary:
      "A full-stack business directory using Laravel and Vue.js: business registration, listing management, search, authentication, and role-based access for businesses and administrators.",
    stack: ["Laravel", "Vue.js", "REST APIs"],
    href: "https://www.fujtown.com/",
    image: "/project-images/fujtown-project.jpg",
  },
  {
    id: "ypt",
    index: "04",
    eyebrow: "Fitness coaching",
    name: "ypt.com",
    status: "live",
    summary:
      "Online fitness coaching with Next.js and Laravel: authentication, payments, subscriptions, course and challenge modules, onboarding questionnaires, calorie calculators, and progress tracking.",
    stack: ["Next.js", "Laravel", "Payments"],
    href: "https://ypt.com/",
    image: "/bootywebapp.png",
  },
  {
    id: "dutch-driving",
    index: "05",
    eyebrow: "Driving school",
    name: "autorijschooldutchdriving.nl",
    status: "live",
    summary:
      "A Laravel driving-school platform for courses, instructors, and services, with student registration, booking, scheduling, and reporting for pass rates.",
    stack: ["Laravel", "PHP", "MySQL"],
    href: "https://autorijschooldutchdriving.nl/",
  },
  {
    id: "inventory",
    index: "06",
    eyebrow: "Inventory & POS",
    name: "inventory.aursoft.com",
    status: "live",
    summary:
      "Inventory and POS in CodeIgniter 3 and Sencha: real-time stock tracking, low-stock alerts, invoices, customer management, and sales reporting.",
    stack: ["CodeIgniter 3", "Ext-Sencha", "MySQL"],
    href: "https://inventory.aursoft.com/",
  },
  {
    id: "speed-typing",
    index: "07",
    eyebrow: "Recent Project",
    name: "Speed Typing",
    status: "demo",
    summary:
      "Helps you improve your typing by tracking progress in each round and scoring speed and accuracy through a table of statistics.",
    stack: ["Framer Motion", "Tailwind CSS", "TypeScript"],
    href: "https://razaali.vercel.app/typing",
    image: "/typing.png",
  },
  {
    id: "userdatapuller",
    index: "08",
    eyebrow: "Recent Project",
    name: "User Data Puller",
    status: "demo",
    summary:
      "Shows the kinds of information websites can collect from visitors — IP, location, browser, device, and more — even with typical privacy settings in place.",
    stack: ["Next.js", "TypeScript", "Browser APIs"],
    href: "https://razaali.vercel.app/userdatapuller",
    image: "/hackme.jpg",
  },
  {
    id: "ffa",
    index: "09",
    eyebrow: "Arts academy",
    name: "Fujairah Fine Arts Academy",
    status: "live",
    summary:
      "Institutional site for Fujairah Fine Arts Academy — courses, exhibitions, media, and registration in a bilingual English/Arabic layout.",
    stack: ["PHP", "JavaScript", "MySQL"],
    href: "https://ffaa.ae/",
    image: "/ffa.webp",
  },
];

export const confidentialWork = {
  index: "—",
  eyebrow: "Under NDA",
  name: "Confidential engagements",
  status: "private",
  summary:
    "Part of my recent work is covered by non-disclosure agreements with private clients and internal product teams. Those systems cannot be named, linked, or screenshot here. The work typically covers production full-stack delivery — React, Next.js, Laravel, and PHP — including APIs, admin tools, and performance-sensitive public sites. I am glad to discuss the problem space, my role, and the stack in a conversation, without disclosing protected details.",
};

export const media = [
  {
    name: "About",
    href: "/about",
    role: "full-stack / React / MongoDB",
    blurb:
      "I make ideas and things alive — immersive web applications with React on MongoDB.",
  },
  {
    name: "Experience",
    href: "/experience",
    role: "Centurion PLC / Fujtown / Ferisoft / Aursoft",
    blurb:
      "Where I've worked: Aursoft, Ferisoft, Fujtown, and Centurion PLC.",
  },
  {
    name: "Work",
    href: "/work",
    role: "FOIZ / SisTouristVilla / Fujtown",
    blurb:
      "Some things I've built — marketplaces, booking, directories, and coaching platforms.",
  },
  {
    name: "Contact",
    href: "/contact",
    role: "raza.aursoft@gmail.com",
    blurb:
      "Always open for new opportunities. The inbox is open.",
  },
];

export const walkWorlds = [
  {
    key: "moss",
    slug: "about",
    name: "About",
    verb: "build",
    label: "full-stack / React / MongoDB",
    role: "I make ideas & things alive",
    description:
      "Software engineer and problem solver. Web development with PHP since 2015; now React, Laravel, and immersive apps at Centurion PLC.",
    achievement: "A decade-long progression from PHP foundations to end-to-end product engineering.",
    stack: ["React", "Next.js", "Laravel", "Node.js"],
    rgb: [122, 167, 142],
    start: 1680,
    end: 3180,
    href: "/about",
    ask: {
      prompt: "Reveal what I ship",
      options: [
        { label: "Web products — React to Laravel", ok: true },
        { label: "Native iOS and Android apps", ok: false },
      ],
      reveal: "Web products. React, Next.js, Laravel, PHP. No native apps.",
    },
  },
  {
    key: "taupe",
    slug: "aursoft",
    name: "Aursoft",
    verb: "ship",
    label: "Full Stack Web Developer @ PHP",
    role: "Aug 2018 — May 2021",
    description:
      "React, Tailwind, Laravel, CodeIgniter, Ext-Sencha, PostgreSQL/MySQL. Testing, design, and a large user base.",
    achievement: "Delivered and maintained full-stack software for a large production user base.",
    stack: ["React", "Laravel", "PostgreSQL", "Tailwind"],
    rgb: [111, 184, 198],
    start: 3380,
    end: 4880,
    href: "https://www.aursoft.com/",
    ask: {
      prompt: "Reveal the delivery stack",
      options: [
        { label: "Aug 2018 — May 2021", ok: true },
        { label: "Mar 2023 — May 2026", ok: false },
      ],
      reveal: "Full-stack at Aursoft in Islamabad, 2018–2021.",
    },
  },
  {
    key: "islog",
    slug: "ferisoft",
    name: "Ferisoft",
    verb: "connect",
    label: "Back End Web Developer",
    role: "Jun 2021 — Aug 2022",
    description:
      "Laravel, Node.js, Express, Firebase, and APIs. Backend, testing, and interactivity.",
    achievement: "Built API-driven backend features connecting Laravel, Node.js, and Firebase services.",
    stack: ["Laravel", "Node.js", "Express", "Firebase"],
    rgb: [216, 185, 76],
    start: 5080,
    end: 6480,
    href: "https://www.ferisoft.com/",
    ask: {
      prompt: "Reveal the engineering focus",
      options: [
        { label: "Backend and APIs", ok: true },
        { label: "Brand-only landing pages", ok: false },
      ],
      reveal: "Laravel, Node, Express, Firebase — remote Türkiye.",
    },
  },
  {
    key: "ojicra",
    slug: "fujtown",
    name: "Fujtown",
    verb: "launch",
    label: "Full Stack Web Developer @ PHP",
    role: "Mar 2023 — May 2026",
    description:
      "React, Next.js, Tailwind, Laravel, CodeIgniter, PostgreSQL/MySQL. Design, development, and product work in Fujairah.",
    achievement: "Shipped a searchable business directory with listings, authentication, and role-based workflows.",
    stack: ["Next.js", "Vue.js", "Laravel", "MySQL"],
    rgb: [105, 107, 116],
    start: 6680,
    end: 8180,
    href: "https://www.fujtown.com/",
    ask: {
      prompt: "Reveal the product architecture",
      options: [
        { label: "A business directory", ok: true },
        { label: "A hotel booking engine", ok: false },
      ],
      reveal: "Laravel + Vue directory: listings, search, auth, roles.",
    },
  },
  {
    key: "monoomoi",
    slug: "centurion",
    name: "Centurion PLC",
    verb: "build",
    label: "Full Stack Web Developer",
    role: "Jul 2026 — Present",
    description:
      "Current role since July 2026. Full-stack delivery on production web platforms after Fujtown.",
    achievement: "Currently delivering full-stack features for production platforms in the Maldives.",
    stack: ["React", "Laravel", "TypeScript", "Performance"],
    rgb: [197, 111, 94],
    start: 8380,
    end: 9480,
    href: "https://centurion.mv/",
    ask: {
      prompt: "Reveal my current chapter",
      options: [
        { label: "Centurion PLC, Maldives", ok: true },
        { label: "Still at Fujtown", ok: false },
      ],
      reveal: "Full-stack at Centurion PLC since July 2026.",
    },
  },
  {
    key: "monoerabi",
    slug: "contact",
    name: "Contact",
    verb: "write",
    label: "inbox open",
    role: "Get in touch",
    description:
      "Always open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you.",
    achievement: "The next chapter starts with a conversation.",
    stack: ["Remote", "Full stack", "Product", "Collaboration"],
    rgb: [139, 119, 170],
    start: 9580,
    end: 10780,
    href: "/contact",
    ask: {
      prompt: "Reveal the fastest way to connect",
      options: [
        { label: "Contact form or email", ok: true },
        { label: "Recruiter portal only", ok: false },
      ],
      reveal: "Contact page, email, or WhatsApp — inbox is open.",
    },
  },
] as const;

const CAREER_AT_ALIASES: Record<string, string> = {
  about: "moss",
  aursoft: "taupe",
  ferisoft: "islog",
  fujtown: "ojicra",
  centurion: "monoomoi",
  contact: "monoerabi",
  thanks: "thanks",
  finish: "thanks",
};

export function resolveCareerAt(at: string | null | undefined) {
  if (!at) return null;
  const key = at.trim().toLowerCase();
  if (CAREER_AT_ALIASES[key]) return CAREER_AT_ALIASES[key];
  const world = walkWorlds.find((item) => item.key === key || item.slug === key);
  return world?.key ?? null;
}

export const careerSkills = [
  { year: "2015", skill: "PHP", x: 1760 },
  { year: "2015", skill: "HTML5", x: 1980 },
  { year: "2015", skill: "CSS3", x: 2200 },
  { year: "2016", skill: "JavaScript", x: 2460 },
  { year: "2016", skill: "MySQL", x: 2700 },
  { year: "2017", skill: "Bootstrap", x: 2940 },
  { year: "2018", skill: "Laravel", x: 3480 },
  { year: "2018", skill: "CodeIgniter", x: 3720 },
  { year: "2019", skill: "React.js", x: 3980 },
  { year: "2019", skill: "PostgreSQL", x: 4220 },
  { year: "2020", skill: "AWS", x: 4460 },
  { year: "2020", skill: "Docker", x: 4680 },
  { year: "2021", skill: "Node.js", x: 5180 },
  { year: "2021", skill: "Express", x: 5420 },
  { year: "2022", skill: "Firebase", x: 5720 },
  { year: "2022", skill: "REST APIs", x: 6020 },
  { year: "2023", skill: "Next.js", x: 6880 },
  { year: "2023", skill: "Vue.js", x: 7180 },
  { year: "2024", skill: "Tailwind CSS", x: 7480 },
  { year: "2024", skill: "TypeScript", x: 7780 },
  { year: "2025", skill: "MongoDB", x: 8040 },
  { year: "2026", skill: "Centurion PLC", x: 8520 },
  { year: "2026", skill: "SEO / Performance", x: 8920 },
] as const;

export function careerSkillId(skill: (typeof careerSkills)[number]) {
  return `${skill.year}-${skill.skill}`;
}

export const careerYears = [
  { year: "2015", label: "Started with PHP", x: 2100 },
  { year: "2018", label: "Aursoft", x: 4000 },
  { year: "2021", label: "Ferisoft", x: 5600 },
  { year: "2023", label: "Fujtown", x: 7300 },
  { year: "2026", label: "Centurion PLC", x: 8700 },
] as const;

export const WORLD_LENGTH = 12600;

export const stack = [
  "Next.js",
  "React.js",
  "TypeScript",
  "JavaScript (ES6+)",
  "Tailwind CSS",
  "Laravel",
  "PHP",
  "Node.js",
  "Vue.js",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Firebase",
  "Framer Motion",
  "Google Ads",
];

export const googleAds = {
  summary:
    "Alongside product engineering I have run Google Ads for service businesses — search, landing pages, and conversion work. Campaigns for Meeraj Towing and Irfan Towing, with SEO and performance on the same sites.",
  campaigns: [
    {
      name: "Irfan Towing Service",
      metric: "67%",
      detail: "increase in qualified leads through targeted Google Ads campaigns",
      image: "/client-ad-1.png",
      width: 1226,
      height: 807,
    },
    {
      name: "Meeraj Towing Service",
      metric: "45%",
      detail: "increase in qualified leads; conversion rates improved about 60%",
      image: "/client-ad-2.png",
      width: 1574,
      height: 850,
    },
  ],
  notes: [
    "Google Ads campaign management for multiple clients",
    "SEO ranking improvements of 50+ positions on client sites",
    "Page load times reduced about 40% on those properties",
  ],
};

export const awards = [
  {
    title: "Appreciation Award",
    org: "TEDxAlBateen",
    detail:
      "Recognition for outstanding contribution and excellence in technical execution. Built the event platform — registrations, speaker management, and live coordination — in Laravel and Vue.js.",
  },
];
