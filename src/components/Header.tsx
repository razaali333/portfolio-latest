"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-head${scrolled ? " is-scrolled" : ""}`}>
      <div className="site-head__inner">
        <Link className="brand" href="/">
          RAZA<em>ALI</em>
        </Link>
        <nav className="language-switch" aria-label="Resume">
          <a href={site.resume} target="_blank" rel="noreferrer">
            Resume
          </a>
        </nav>
        <nav className="site-nav" aria-label="Primary navigation">
          {nav.map((item) => {
            const current =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
