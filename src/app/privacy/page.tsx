import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import PaperScene from "@/components/PaperScene";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How this site handles contact messages, the assistant, local journey state, and outbound links.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "localStorage",
    body: "localStorage stores the career-walk sound preference. These settings remain until site data is cleared. Name, email, and message content are not stored in localStorage.",
  },
  {
    title: "Journey data",
    body: "Walk coordinates and constellation images stay in the browser. A constellation PNG is created locally only when you choose to download it.",
  },
  {
    title: "Contact form",
    body: `The form collects company name, your name, email, topic, optional URL, timing, budget, and message. Submissions are sent to ${site.email} so I can evaluate the request and reply. If the site cannot deliver the message, your email app may open with the same details (mailto). First-time delivery through the site host may require a one-time confirmation email.`,
  },
  {
    title: "Site assistant",
    body: "The Ask button opens a Q&A assistant. Questions are matched against stored answers. Unanswered questions may be stored as short logs (the question text, whether it matched, and a confidence score) so the answers can be improved. If the assistant cannot answer, it asks for your name, email, and phone so I can follow up. That contact and the last few chat lines are stored as a lead. Do not send passwords or payment details in the assistant.",
  },
  {
    title: "Purpose of use",
    body: "Submitted information is used only to evaluate your request, respond, improve the assistant’s answers, and keep the correspondence needed to handle it.",
  },
  {
    title: "Third-party disclosure",
    body: "Contact-form messages are delivered through the form relay used by this site (FormSubmit) so they can reach my inbox. Assistant questions and fallback leads are stored in Prisma Postgres connected to this Vercel project. Information is not sold. Other disclosure happens only where required by law or needed to protect rights and safety.",
  },
  {
    title: "Cookies and analytics",
    body: "This site does not load Google Analytics. No advertising cookies are set. The assistant studio uses one httpOnly session cookie after you sign in at /studio/login.",
  },
  {
    title: "External services",
    body: "Links to GitHub, LinkedIn, Instagram, client sites, and the résumé PDF are governed by those destinations’ policies.",
  },
  {
    title: "Policy changes",
    body: "This policy may be updated when site features, legal requirements, or operating practices change.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PaperScene />
      <main id="main" className="page" tabIndex={-1}>
        <div className="shell">
          <Breadcrumb current="Privacy Policy" />
          <section className="page-hero">
            <div className="page-hero__main">
              <p className="eyebrow">[ PRIVACY ]</p>
              <h1>Privacy Policy</h1>
              <p className="lede">
                A policy for keeping the site useful without remembering more
                than it needs.
              </p>
              <p className="body">
                This page explains contact messages, outbound links, and the
                small amount of local journey state used on this site.
              </p>
            </div>
          </section>
          {sections.map((item) => (
            <section className="privacy-block" key={item.title}>
              <h2>{item.title}</h2>
              <p className="body">{item.body}</p>
            </section>
          ))}
          <section className="privacy-block">
            <h2>Contact</h2>
            <p className="body">
              Use the <Link href="/contact">Contact</Link> page for questions
              about this policy.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
