import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import PaperScene from "@/components/PaperScene";
import { experience, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Experience",
  description: `Where ${site.person} has worked — Centurion PLC, Fujtown, Ferisoft, and Aursoft.`,
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <PaperScene />
      <main id="main" className="page" tabIndex={-1}>
        <div className="shell">
          <Breadcrumb current="Experience" />
          <section id="intro" className="page-hero">
            <div className="page-hero__main">
              <p className="eyebrow">[ 02. EXPERIENCE ]</p>
              <h1>Where I&apos;ve Worked</h1>
              <p className="lede">
                Full-stack and backend roles across Aursoft, Ferisoft, Fujtown,
                and Centurion PLC.
              </p>
              <p className="body">
                PHP, Laravel, React, Next.js, Node.js, and PostgreSQL/MySQL —
                from Islamabad to remote Türkiye to Fujairah, then Centurion
                PLC in July 2026.
              </p>
            </div>
            <aside className="page-hero__aside">
              <p className="eyebrow">[ NOW ]</p>
              <ul className="plain-index">
                <li>01 Full Stack / Centurion PLC</li>
                <li>02 Full Stack / Fujtown</li>
                <li>03 Back End / Ferisoft</li>
                <li>04 Full Stack / Aursoft</li>
              </ul>
            </aside>
          </section>

          <section className="sec">
            <header className="sec-head">
              <p className="eyebrow">[ ROLES ]</p>
              <h2>Selected timeline.</h2>
            </header>
            <ul className="home-fallback__media-list">
              {experience.map((item) => (
                <li key={`${item.org}-${item.role}`}>
                  <div>
                    <strong>
                      {item.role}
                      {item.specialty ? ` @ ${item.specialty}` : ""}
                    </strong>
                    <span style={{ display: "block", marginTop: 4 }}>
                      <a href={item.href} target="_blank" rel="noreferrer">
                        {item.org}
                      </a>
                    </span>
                    {item.location ? (
                      <span style={{ display: "block", marginTop: 4 }}>
                        {item.location}
                      </span>
                    ) : null}
                  </div>
                  <span>
                    {item.period}
                    <br />
                    {item.summary}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {experience.map((item) => (
            <section className="sec" key={item.org}>
              <header className="sec-head">
                <p className="eyebrow">[ {item.org.toUpperCase()} ]</p>
                <h2>
                  {item.role}
                  {item.specialty ? ` @ ${item.specialty}` : ""}
                </h2>
              </header>
              <p className="body">
                {item.period}
                {item.location ? ` · ${item.location}` : ""}
                {" · "}
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </a>
              </p>
              <ul className="data-lines">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
