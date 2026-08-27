"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="page" tabIndex={-1}>
      <div className="shell">
        <section className="page-hero">
          <div className="page-hero__main">
            <p className="eyebrow">[ ERROR ]</p>
            <h1>Something interrupted the journey.</h1>
            <p className="lede">Try loading this section again.</p>
            <button className="home-action home-action--primary" type="button" onClick={reset}>Try again</button>
          </div>
        </section>
      </div>
    </main>
  );
}
