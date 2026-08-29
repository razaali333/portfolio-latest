import type { Metadata } from "next";
import CareerTimeline from "@/components/CareerTimeline";
import { experience, site } from "@/lib/content";

const title = "Career and experience";
const description = `${site.person} — full-stack web developer at Centurion PLC. Prior roles at Fujtown, Ferisoft, and Aursoft. React, Next.js, Laravel, Node.js, and PHP.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/career" },
  openGraph: {
    title: `${title} | ${site.person}`,
    description,
    url: "/career",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${site.person}`,
    description,
  },
};

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${site.person} — ${title}`,
    url: `${site.url}/career`,
    description,
    mainEntity: {
      "@type": "Person",
      name: site.person,
      jobTitle: site.role,
      email: `mailto:${site.email}`,
      url: site.url,
      address: { "@type": "PostalAddress", addressCountry: "MV" },
      worksFor: {
        "@type": "Organization",
        name: "Centurion PLC",
        url: "https://centurion.mv/",
      },
      hasOccupation: experience.map((job) => ({
        "@type": "Occupation",
        name: job.role,
        occupationalCategory: job.org,
        description: job.summary,
      })),
    },
  };

  return (
    <>
      <noscript>
        <style>{`.home-game,.career-intro,.career-recruiter-cta,.home-entry-utilities{display:none!important}`}</style>
      </noscript>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <CareerTimeline title="Career and experience" />
      {children}
    </>
  );
}
