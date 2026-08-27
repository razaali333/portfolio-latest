import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import PaperScene from "@/components/PaperScene";
import { confidentialWork, projects, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: `Some things ${site.person} has built — FOIZ, SisTouristVilla, Fujtown, and more.`,
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PaperScene />
      <main id="main" className="page" tabIndex={-1}>
        <div className="shell">
          <Breadcrumb current="Work" />
          <section id="intro" className="page-hero">
            <div className="page-hero__main">
              <p className="eyebrow">[ 03. WORK ]</p>
              <h1>Some Things I&apos;ve Built</h1>
              <p className="lede">
                Marketplaces, booking, business directories, coaching, POS, and
                experiments. A further set of engagements is confidential and is
                not listed by name.
              </p>
              <p className="body">
                Laravel and PostgreSQL APIs for FOIZ, hotel booking for
                SisTouristVilla, the Fujtown directory, and full-stack products
                shipped at Aursoft, Ferisoft, Fujtown, and Centurion PLC.
                Additional production work remains under NDA.
              </p>
            </div>
            <aside className="page-hero__aside">
              <p className="eyebrow">[ CODE ]</p>
              <ul className="plain-index">
                <li>01 FOIZ marketplace</li>
                <li>02 SisTouristVilla</li>
                <li>03 fujtown.com</li>
                <li>04 ypt.com / POS / demos</li>
                <li>05 Confidential / NDA</li>
              </ul>
            </aside>
          </section>

          <section className="sec">
            <header className="sec-head">
              <p className="eyebrow">[ SELECTED ]</p>
              <h2>Public work.</h2>
            </header>
            <div className="project-list">
              {projects.map((item) => (
                <article className="project-entry" id={item.id} key={item.id}>
                  <header className="project-entry__head">
                    <p className="project-entry__index">{item.index}</p>
                    <div>
                      <p className="eyebrow eyebrow--plain">{item.eyebrow}</p>
                      <h3>{item.name}</h3>
                    </div>
                    <p className="project-entry__status">{item.status}</p>
                  </header>
                  {"image" in item && item.image ? (
                    <figure className="project-entry__visual paper-print">
                      <Image
                        src={item.image}
                        alt={`${item.name} preview`}
                        width={1440}
                        height={900}
                      />
                    </figure>
                  ) : null}
                  <p className="lede project-entry__summary">{item.summary}</p>
                  <ul className="data-lines" style={{ marginLeft: 34 }}>
                    {item.stack.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  <p className="project-entry__links">
                    <a href={item.href} target="_blank" rel="noreferrer">
                      Open project
                    </a>
                  </p>
                </article>
              ))}
            </div>
            <article className="project-entry project-entry--nda" id="confidential">
              <header className="project-entry__head">
                <p className="project-entry__index">{confidentialWork.index}</p>
                <div>
                  <p className="eyebrow eyebrow--plain">{confidentialWork.eyebrow}</p>
                  <h3>{confidentialWork.name}</h3>
                </div>
                <p className="project-entry__status">{confidentialWork.status}</p>
              </header>
              <p className="lede project-entry__summary">{confidentialWork.summary}</p>
              <p className="project-entry__links">
                <a href={`mailto:${site.email}?subject=${encodeURIComponent("Confidential work — conversation")}`}>
                  Request a private discussion
                </a>
              </p>
            </article>
            <p style={{ marginTop: 36 }}>
              <a
                className="link-arrow"
                href={site.github}
                target="_blank"
                rel="noreferrer"
              >
                View GitHub profile
              </a>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
