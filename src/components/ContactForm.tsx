"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/content";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatUsd(value: number) {
  return usd.format(value);
}

export default function ContactForm() {
  const startedAt = useRef(0);
  const [sent, setSent] = useState(false);
  const [budget, setBudget] = useState(1000);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(true);
    setError("");
    const payload = {
      company_name: String(data.get("company_name") || ""),
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      topic: String(data.get("topic") || ""),
      target_url: String(data.get("target_url") || ""),
      desired_timing: String(data.get("desired_timing") || ""),
      budget_range: formatUsd(budget),
      message: String(data.get("message") || ""),
      website: String(data.get("website") || ""),
      started_at: String(startedAt.current),
    };
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        mailto?: string;
        error?: string;
      };
      if (result.ok) {
        setSent(true);
        return;
      }
      if (result.mailto) {
        window.location.href = result.mailto;
        setSent(true);
        return;
      }
      setError(result.error || "Could not send. Email me directly.");
    } catch {
      setError("Network error. Email me directly at " + site.email);
    } finally {
      setBusy(false);
    }
  };

  if (sent) {
    return (
      <p className="form-status is-success" role="status" aria-live="polite">
        Thanks — I’ll reply to the address you left. If nothing arrives, write {site.email}.
      </p>
    );
  }

  return (
    <form className="contact-form-mock" onSubmit={onSubmit}>
      <label className="contact-honeypot" aria-hidden="true">
        <span>Website</span>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label>
        <span>Company name</span>
        <input type="text" name="company_name" autoComplete="organization" maxLength={160} />
      </label>
      <label>
        <span>
          Name <em>required</em>
        </span>
        <input type="text" name="name" autoComplete="name" maxLength={80} required />
      </label>
      <label className="contact-form-mock__wide">
        <span>
          Email <em>required</em>
        </span>
        <input type="email" name="email" autoComplete="email" maxLength={160} required />
      </label>
      <label className="contact-form-mock__wide">
        <span>
          Topic <em>required</em>
        </span>
        <select name="topic" required defaultValue="">
          <option value="" disabled>
            Select an option
          </option>
          <option value="new-product">New product or website</option>
          <option value="laravel-react">Laravel / React build</option>
          <option value="booking-directory">Booking, directory, or marketplace</option>
          <option value="retain">Ongoing support and performance</option>
          <option value="other">Other or collaboration</option>
        </select>
      </label>
      <label className="contact-form-mock__wide">
        <span>Target URL</span>
        <input
          type="url"
          name="target_url"
          inputMode="url"
          maxLength={500}
          placeholder="https://"
        />
      </label>
      <label>
        <span>Desired timing</span>
        <select name="desired_timing" defaultValue="">
          <option value="">Not decided</option>
          <option value="soon">As soon as possible</option>
          <option value="one-to-three-months">Within one to three months</option>
          <option value="three-months-plus">More than three months from now</option>
        </select>
      </label>
      <label>
        <span>Budget range · USD</span>
        <div className="contact-budget">
          <strong className="contact-budget__value">{formatUsd(budget)}</strong>
          <input
            type="range"
            name="budget_range"
            min={100}
            max={5000}
            step={50}
            value={budget}
            onChange={(event) => setBudget(Number(event.target.value))}
            aria-valuemin={100}
            aria-valuemax={5000}
            aria-valuenow={budget}
            aria-valuetext={formatUsd(budget)}
          />
          <span className="contact-budget__scale">
            <i>$100</i>
            <i>$5,000</i>
          </span>
        </div>
      </label>
      <label className="contact-form-mock__wide">
        <span>
          Message <em>required</em>
        </span>
        <textarea name="message" rows={7} minLength={20} maxLength={4000} required />
      </label>
      <p className="privacy-note contact-form-mock__wide">
        Please review the <Link href="/privacy">Privacy Policy</Link> before
        sending. Your message is used only to assess the request and reply.
      </p>
      {error ? <p className="form-status is-error contact-form-mock__wide" role="alert">{error}</p> : null}
      <button type="submit" disabled={busy}>
        {busy ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
