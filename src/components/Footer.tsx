"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/content";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="site-foot">
      <div className="shell">
        <p className="site-foot__word" aria-hidden="true">
          RAZA ALI
        </p>
        <div className="site-foot__row">
          <nav className="foot-nav" aria-label="Footer">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <a href={site.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={site.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <Link
              href="/privacy"
              aria-current={pathname === "/privacy" ? "page" : undefined}
            >
              Privacy
            </Link>
          </nav>
          <button
            className="to-top"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to Top
          </button>
        </div>
        <p className="site-foot__copy">
          © 2026 {site.person}
        </p>
      </div>
    </footer>
  );
}
