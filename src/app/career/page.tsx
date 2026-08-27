"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import WalkableWorld from "@/components/WalkableWorld";
import {
  isAtlasSoundOn,
  setAtlasSound,
  unlockAtlasSound,
} from "@/lib/atlasSound";
import { site, walkWorlds } from "@/lib/content";

export default function CareerPage() {
  const [soundOn, setSoundOn] = useState(true);
  const [overviewOpen, setOverviewOpen] = useState(false);

  useLayoutEffect(() => {
    document.documentElement.dataset.act = "i";
    setSoundOn(isAtlasSoundOn());
    return () => {
      delete document.documentElement.dataset.act;
    };
  }, []);

  useEffect(() => {
    if (!overviewOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOverviewOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [overviewOpen]);

  return (
    <>
      <div className="home-entry-utilities">
        <Link className="home-language-switch" href="/">
          {site.person}
        </Link>
        <div className="home-entry-actions">
          <button
            className="career-overview-trigger"
            type="button"
            aria-expanded={overviewOpen}
            aria-controls="career-overview"
            onClick={() => setOverviewOpen(true)}
          >
            Quick overview
          </button>
          <a className="career-resume-link" href={site.resume} target="_blank" rel="noreferrer">
            Resume
          </a>
          <Link className="living-atlas-bookmark" href="/">
            <span className="living-atlas-bookmark__mark" aria-hidden="true">
              <i /><i /><i /><i /><i /><i />
            </span>
            Back to home
          </Link>
          <button
            className={`game-sound${soundOn ? "" : " is-muted"}`}
            type="button"
            aria-label={soundOn ? "Mute discovery sound" : "Unmute discovery sound"}
            aria-pressed={soundOn}
            title={soundOn ? "Sound on" : "Sound off"}
            onClick={() => {
              const next = !soundOn;
              unlockAtlasSound();
              setAtlasSound(next);
              setSoundOn(next);
            }}
          >
            ♪
          </button>
        </div>
      </div>
      <WalkableWorld soundOn={soundOn} />
      <aside
        id="career-overview"
        className={`career-overview${overviewOpen ? " is-open" : ""}`}
        aria-hidden={!overviewOpen}
        aria-label="Career overview"
      >
        <button
          className="career-overview__backdrop"
          type="button"
          aria-label="Close career overview"
          tabIndex={overviewOpen ? 0 : -1}
          onClick={() => setOverviewOpen(false)}
        />
        <div className="career-overview__panel" role="dialog" aria-modal="true" aria-labelledby="career-overview-title">
          <header className="career-overview__header">
            <div>
              <p className="career-overview__eyebrow">Career journey · 2015—present</p>
              <h1 id="career-overview-title">Experience at a glance</h1>
            </div>
            <button type="button" onClick={() => setOverviewOpen(false)} aria-label="Close career overview">×</button>
          </header>
          <p className="career-overview__intro">
            Full-stack developer building web products with React, Next.js, Laravel, Node.js, and PHP.
          </p>
          <ol className="career-timeline">
            {walkWorlds.slice(0, -1).map((world) => (
              <li key={world.key} style={{ ["--timeline-color" as string]: world.rgb.join(" ") }}>
                <span className="career-timeline__dot" aria-hidden="true" />
                <div>
                  <p className="career-timeline__date">{world.role}</p>
                  <h2>{world.name}</h2>
                  <p className="career-timeline__label">{world.label}</p>
                  <p>{world.description}</p>
                  <a href={world.href} target={world.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                    {world.href.startsWith("http") ? `Visit ${world.name}` : `Read more about ${world.name}`}
                  </a>
                </div>
              </li>
            ))}
          </ol>
          <footer className="career-overview__actions">
            <a href={site.resume} target="_blank" rel="noreferrer">Download resume</a>
            <a href={`mailto:${site.email}`}>Email me</a>
            <Link href="/work">View projects</Link>
          </footer>
        </div>
      </aside>
    </>
  );
}
