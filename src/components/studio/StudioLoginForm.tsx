"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function StudioLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const password = String(new FormData(event.currentTarget).get("password") || "");
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/studio/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (result.ok) {
        router.replace("/studio");
        router.refresh();
        return;
      }
      setError(result.error || "Could not sign in.");
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="contact-form-mock studio-login" onSubmit={onSubmit}>
      <label className="contact-form-mock__wide">
        <span>
          Password <em>required</em>
        </span>
        <input type="password" name="password" required autoComplete="current-password" />
      </label>
      {error ? <p className="form-status is-error contact-form-mock__wide">{error}</p> : null}
      <button type="submit" disabled={busy}>
        {busy ? "Checking…" : "Enter studio"}
      </button>
    </form>
  );
}
