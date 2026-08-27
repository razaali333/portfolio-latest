"use client";

import Link from "next/link";
import Image from "next/image";
import HeroPortrait from "@/components/HeroPortrait";
import { awards, experience, googleAds, projects, site, walkWorlds } from "@/lib/content";

const FEATURED_PROJECTS = projects
  .filter((project): project is (typeof projects)[number] & { image: string } =>
    Boolean(project.image),
  )
  .slice(0, 3);
const PROOF = [
  { value: "8+", label: "years shipping web products" },
  { value: "10+", label: "web applications delivered" },
  { value: "30%", label: "fewer bugs on product work" },
  { value: "React · Laravel", label: "front to back delivery" },
];

export default function LivingAtlas({ onReturn }: { onReturn?: () => void }) {
  const now = experience[0];
  return (
    <main id="main" className="living-atlas" tabIndex={-1}>
      <div className="living-atlas__content">
        {onReturn ? (
          <button className="atlas-world-return" type="button" onClick={onReturn}>
            <span className="atlas-world-return__copy"><small>WALK</small><b>Return to the world</b></span>
          </button>
        ) : null}

        <header className="home-fallback__intro home-milestone">
          <div className="home-fallback__intro-copy">
            <div className="home-hero-marks">
              <p className="home-fallback__eyebrow">{site.gender}, {site.location}</p>
              <span className="home-remote-badge">
                <i />
                Remote work
              </span>
            </div>
            <h1>
              <span className="home-fallback__subject">Hi, I&apos;m {site.person}.</span>
              <span className="home-fallback__statement">I build fast, scalable<br />web products.</span>
            </h1>
            <p className="home-fallback__summary">I take products from idea to production using React, Next.js, Laravel, Node.js, and PHP—combining thoughtful interfaces with reliable backend systems.</p>
            <div className="home-hero__actions">
              <Link className="home-action home-action--primary" href="/work">View selected work</Link>
              <Link className="home-action" href="/career">Explore career</Link>
              <a className="home-action home-action--text" href={site.resume} target="_blank" rel="noreferrer">Download résumé</a>
            </div>
            <Link className="home-career-teaser" href="/career">
              <span><small>INTERACTIVE CAREER ATLAS</small><b>Walk through {walkWorlds.length} chapters</b></span>
              <ol aria-hidden="true">{walkWorlds.map((world) => <li key={world.name} style={{ ["--chip" as string]: world.rgb.join(" ") }}><i /></li>)}</ol>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <HeroPortrait priority />
        </header>

        <section className="home-proof home-milestone" aria-label="Selected results">
          {PROOF.map((item) => <p key={item.label}><strong>{item.value}</strong><span>{item.label}</span></p>)}
        </section>

        <section className="home-featured home-milestone">
          <div className="home-section-head">
            <div><p>01 / SELECTED WORK</p><h2>Products built for real use.</h2></div>
            <Link className="link-arrow" href="/work">View all work</Link>
          </div>
          <div className="home-project-grid">
            {FEATURED_PROJECTS.map((project, index) => (
              <article className="home-project-card" key={project.id}>
                <div className="home-project-card__visual paper-print" data-index={`0${index + 1}`}>
                  <Image
                    src={project.image}
                    alt={`${project.name} project preview`}
                    fill
                    sizes="(max-width: 620px) 100vw, (max-width: 900px) 50vw, 33vw"
                  />
                  <span>{project.eyebrow}</span>
                </div>
                <p className="home-project-card__meta">{project.status} · {project.stack.slice(0, 2).join(" + ")}</p>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <ul aria-label={`${project.name} technologies`}>{project.stack.map((technology) => <li key={technology}>{technology}</li>)}</ul>
                <a href={project.href} target="_blank" rel="noreferrer">View {project.name} <span aria-hidden="true">↗</span></a>
              </article>
            ))}
          </div>
        </section>

        <section className="home-ads home-milestone" aria-labelledby="home-ads-title">
          <div className="home-section-head">
            <div>
              <p>02 / GOOGLE ADS</p>
              <h2 id="home-ads-title">Campaigns that brought in leads.</h2>
            </div>
          </div>
          <p className="home-ads__lede">{googleAds.summary}</p>
          <div className="home-ads-grid">
            {googleAds.campaigns.map((campaign) => (
              <article className="home-ad-card" key={campaign.name}>
                <div className="home-ad-card__visual paper-print">
                  <Image
                    src={campaign.image}
                    alt={`${campaign.name} Google Ads results`}
                    width={campaign.width}
                    height={campaign.height}
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                </div>
                <p className="home-ad-card__metric">{campaign.metric}</p>
                <h3>{campaign.name}</h3>
                <p>{campaign.detail}</p>
              </article>
            ))}
          </div>
          <ul className="home-ads__notes">
            {googleAds.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>

        <section className="home-awards home-milestone" aria-labelledby="home-awards-title">
          <div className="home-section-head">
            <div>
              <p>03 / APPRECIATION</p>
              <h2 id="home-awards-title">Awards.</h2>
            </div>
          </div>
          <div className="home-awards-grid">
            {awards.map((award) => (
              <article className="home-award-card" key={award.org}>
                <span className="home-award-stamp" aria-hidden="true">
                  Award
                  <b>winner</b>
                </span>
                <p className="home-award-card__kicker">{award.org}</p>
                <h3>{award.title}</h3>
                <p>{award.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-now home-milestone">
          <p className="home-section-index">04 / NOW</p>
          <div>
            <h2>Building production platforms at {now.org}.</h2>
            <p>{now.summary}</p>
            <p className="home-fallback__person-links"><span>{now.period}</span><a href={now.href} target="_blank" rel="noreferrer">Visit {now.org}</a></p>
          </div>
        </section>

        <section className="home-career-preview home-milestone">
          <div className="home-section-head">
            <div><p>05 / EXPERIENCE</p><h2>A career across products and platforms.</h2></div>
            <Link className="link-arrow" href="/experience">Full timeline</Link>
          </div>
          <ol>{experience.map((item) => <li key={item.org}><span>{item.period}</span><div><h3>{item.org}</h3><p>{item.role}{item.location ? ` · ${item.location}` : ""}</p></div></li>)}</ol>
        </section>

        <section className="home-contact-cta home-milestone">
          <p className="home-section-index">06 / LET&apos;S TALK</p>
          <h2>Have a product, platform, or technical challenge in mind?</h2>
          <p>I&apos;m always open to thoughtful opportunities and interesting collaborations.</p>
          <div className="home-hero__actions">
            <a className="home-action home-action--primary" href={`mailto:${site.email}`}>Start a conversation</a>
            <Link className="home-action" href="/contact">Contact details</Link>
            <a className="home-action home-action--text" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </section>
      </div>
    </main>
  );
}
