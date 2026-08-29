"use client";

import Link from "next/link";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import WalkableWorld from "@/components/WalkableWorld";
import {
  isAtlasSoundOn,
  setAtlasSound,
  unlockAtlasSound,
} from "@/lib/atlasSound";
import { site, walkWorlds } from "@/lib/content";

function CareerWalk() {
  const params = useSearchParams();
  const [soundOn, setSoundOn] = useState(true);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [introOpen, setIntroOpen] = useState(false);
  const [destination, setDestination] = useState<string | null>(params.get("at"));
  const [navigationNonce, setNavigationNonce] = useState(0);
  const [worldKey, setWorldKey] = useState(0);
  const [finishScene, setFinishScene] = useState(false);
  const [autoTour, setAutoTour] = useState(false);
  const overviewTriggerRef = useRef<HTMLButtonElement>(null);
  const overviewPanelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    document.documentElement.dataset.act = "i";
    setSoundOn(isAtlasSoundOn());
    return () => {
      delete document.documentElement.dataset.act;
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("career-intro-seen", "1");
      setIntroOpen(false);
      return;
    }
    if (!params.get("at") && !sessionStorage.getItem("career-intro-seen")) setIntroOpen(true);
  }, [params]);

  useEffect(() => {
    if (finishScene) document.documentElement.dataset.careerFinish = "true";
    else delete document.documentElement.dataset.careerFinish;
    return () => { delete document.documentElement.dataset.careerFinish; };
  }, [finishScene]);

  useEffect(() => {
    if (!overviewOpen) return;
    const panel = overviewPanelRef.current;
    panel?.querySelector<HTMLElement>("button, a")?.focus();
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOverviewOpen(false);
        overviewTriggerRef.current?.focus();
      }
      if (event.key === "Tab" && panel) {
        const items = [...panel.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled])')];
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [overviewOpen]);

  return (
    <>
      <div className={`home-entry-utilities${finishScene ? " is-finish" : ""}`}>
        <Link className="home-language-switch" href="/">
          {site.person}
        </Link>
        <div className="home-entry-actions">
          <button
            ref={overviewTriggerRef}
            className="career-overview-trigger"
            type="button"
            aria-expanded={overviewOpen}
            aria-controls="career-overview"
            onClick={() => setOverviewOpen(true)}
          >
            Timeline
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
      <WalkableWorld
        key={worldKey}
        soundOn={soundOn}
        startAt={destination}
        navigationNonce={navigationNonce}
        paused={overviewOpen || introOpen}
        autoTour={autoTour}
        onAutoTourChange={setAutoTour}
        onThanksChange={setFinishScene}
      />
      <nav className={`career-recruiter-cta${finishScene ? " is-finish" : ""}`} aria-label="Career actions">
        <span><i /> Available for opportunities</span>
        <Link href="/work">Selected work</Link>
        <a href={site.resume} target="_blank" rel="noreferrer">Résumé</a>
        <a href={`mailto:${site.email}`}>Contact</a>
      </nav>
      {introOpen ? (
        <section className="career-intro" role="dialog" aria-modal="true" aria-labelledby="career-intro-title">
          <div className="career-intro__card">
            <p>Career · 2015—present</p>
            <h1 id="career-intro-title">Read the timeline, or walk it.</h1>
            <span>Roles, dates, and impact are on every chapter. Use the timeline if you need the résumé version first.</span>
            <div className="career-intro__buttons">
              <button
                type="button"
                className="career-intro__btn-primary"
                autoFocus
                onClick={() => {
                  sessionStorage.setItem("career-intro-seen", "1");
                  setIntroOpen(false);
                  setOverviewOpen(true);
                }}
              >
                Open timeline
              </button>
              <button
                type="button"
                onClick={() => {
                  sessionStorage.setItem("career-intro-seen", "1");
                  setIntroOpen(false);
                }}
              >
                Walk myself
              </button>
              <button
                type="button"
                onClick={() => {
                  sessionStorage.setItem("career-intro-seen", "1");
                  setIntroOpen(false);
                  setAutoTour(true);
                }}
              >
                Guided 60s tour
              </button>
            </div>
          </div>
        </section>
      ) : null}
      <aside
        id="career-overview"
        className={`career-overview${overviewOpen ? " is-open" : ""}`}
        aria-hidden={!overviewOpen}
        inert={!overviewOpen ? true : undefined}
        aria-label="Career overview"
      >
        <button
          className="career-overview__backdrop"
          type="button"
          aria-label="Close career overview"
          tabIndex={overviewOpen ? 0 : -1}
          onClick={() => setOverviewOpen(false)}
        />
        <div ref={overviewPanelRef} className="career-overview__panel" role="dialog" aria-modal="true" aria-labelledby="career-overview-title">
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
            {walkWorlds.map((world) => (
              <li key={world.key} style={{ ["--timeline-color" as string]: world.rgb.join(" ") }}>
                <span className="career-timeline__dot" aria-hidden="true" />
                <div>
                  <p className="career-timeline__date">{world.role}</p>
                  <h2>{world.name}</h2>
                  <p className="career-timeline__label">{world.label}</p>
                  {world.location ? <p className="career-timeline__place">{world.location}</p> : null}
                  <p>{world.description}</p>
                  <p className="career-timeline__achievement">{world.achievement}</p>
                  <ul className="career-timeline__proof">
                    {world.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <button type="button" onClick={() => {
                    setDestination(world.slug);
                    setNavigationNonce((value) => value + 1);
                    setOverviewOpen(false);
                    overviewTriggerRef.current?.focus();
                  }}>Jump to this chapter</button>
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
            <button type="button" onClick={() => {
              localStorage.removeItem("career-walk-progress");
              setDestination(null);
              setWorldKey((value) => value + 1);
              setOverviewOpen(false);
            }}>Start again</button>
          </footer>
        </div>
      </aside>
    </>
  );
}

export default function CareerPage() {
  return (
    <Suspense fallback={null}>
      <CareerWalk />
    </Suspense>
  );
}
