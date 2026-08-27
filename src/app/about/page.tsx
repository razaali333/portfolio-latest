import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import HeroPortrait from "@/components/HeroPortrait";
import PaperScene from "@/components/PaperScene";
import { about, site, stack } from "@/lib/content";

export const metadata: Metadata = {
  title: `About ${site.person}`,
  description: site.description,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PaperScene />
      <main id="main" className="page" tabIndex={-1}>
        <div className="shell">
          <Breadcrumb current={`About ${site.person}`} />

          <section id="intro" className="page-hero">
            <div className="page-hero__main">
              <p className="eyebrow">[ 01. ABOUT ]</p>
              <p className="lede" style={{ marginBottom: 8 }}>
                Hi, my name is
              </p>
              <h1>{site.person}.</h1>
              <p className="lede">{site.tagline}</p>
              <p className="body">{about.hero}</p>
              <p className="body">
                <a
                  className="link-arrow"
                  href={site.resume}
                  target="_blank"
                  rel="noreferrer"
                >
                  Check out my resume
                </a>
              </p>
            </div>
            <aside className="page-hero__aside page-hero__aside--portrait">
              <HeroPortrait />
              <p className="eyebrow">[ PROFILE ]</p>
              <ul className="plain-index">
                <li>01 {site.role}</li>
                <li>02 {site.location}</li>
                <li>03 {site.education}</li>
                <li>04 DIT — Diploma in Information Technology</li>
                <li>05 Centurion PLC</li>
              </ul>
            </aside>
          </section>

          <section className="sec">
            <header className="sec-head">
              <p className="eyebrow">[ ABOUT ME ]</p>
              <h2>How I got here.</h2>
            </header>
            <p className="body">{about.greeting}</p>
            <p className="body">{about.body}</p>
            <p className="body">{about.resumeSummary}</p>
          </section>

          <section className="sec">
            <header className="sec-head">
              <p className="eyebrow">[ STACK ]</p>
              <h2>Technologies I&apos;ve been working with recently.</h2>
            </header>
            <ul className="data-lines">
              {stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="sec">
            <header className="sec-head">
              <p className="eyebrow">[ ELSEWHERE ]</p>
              <h2>Find me.</h2>
            </header>
            <p className="home-fallback__person-links">
              <a href={site.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={site.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={site.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
              <Link href="/career">Visit my career</Link>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
