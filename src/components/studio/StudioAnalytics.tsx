"use client";

import { useEffect, useState } from "react";

type Analytics = {
  messages: number;
  fallbacks: number;
  fallbackRate: number;
  leads: number;
  conversionRate: number;
  topQuestions: { id: string | null; count: number; prompt: string | null; category: string | null }[];
  unmatched: { asked: string; createdAt: string }[];
};

const pct = (value: number) => `${Math.round(value * 100)}%`;

export default function StudioAnalytics() {
  const [data, setData] = useState<Analytics | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/studio/analytics")
      .then((response) => response.json())
      .then((result) => {
        if (!result.ok) setError(result.error || "Could not load analytics.");
        else setData(result);
      })
      .catch(() => setError("Could not load analytics."));
  }, []);

  if (error) return <p className="form-status is-error">{error}</p>;
  if (!data) return <p className="lede">Loading the last 30 days…</p>;

  return (
    <section className="studio-dash">
      <header className="sec-head">
        <p className="eyebrow">[ 30 DAYS ]</p>
        <h1>Assistant traffic.</h1>
      </header>
      <ul className="studio-stats">
        <li>
          <strong>{data.messages}</strong>
          <span>messages</span>
        </li>
        <li>
          <strong>{pct(data.fallbackRate)}</strong>
          <span>fallback rate</span>
        </li>
        <li>
          <strong>{data.leads}</strong>
          <span>leads</span>
        </li>
        <li>
          <strong>{pct(data.conversionRate)}</strong>
          <span>lead conversion</span>
        </li>
      </ul>
      <div className="studio-split">
        <article>
          <h2>Most matched</h2>
          <ol>
            {data.topQuestions.length ? (
              data.topQuestions.map((item) => (
                <li key={item.id || item.prompt}>
                  <span>{item.prompt || "Deleted question"}</span>
                  <em>{item.count}</em>
                </li>
              ))
            ) : (
              <li>No matched questions yet.</li>
            )}
          </ol>
        </article>
        <article>
          <h2>Recent unmatched</h2>
          <ol>
            {data.unmatched.length ? (
              data.unmatched.map((item) => (
                <li key={`${item.createdAt}-${item.asked}`}>
                  <span>{item.asked}</span>
                </li>
              ))
            ) : (
              <li>No fallbacks in this window.</li>
            )}
          </ol>
        </article>
      </div>
    </section>
  );
}
