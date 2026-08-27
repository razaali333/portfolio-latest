"use client";

import { FormEvent, useEffect, useState } from "react";

type Answer = { id?: string; variant: string; body: string };
type Question = {
  id: string;
  category: string;
  prompt: string;
  aliases: string[];
  active: boolean;
  answers: Answer[];
  _count?: { logs: number };
};

const empty = (): Question => ({
  id: "",
  category: "general",
  prompt: "",
  aliases: [],
  active: true,
  answers: [{ variant: "default", body: "" }],
});

export default function QuestionManager() {
  const [rows, setRows] = useState<Question[]>([]);
  const [draft, setDraft] = useState<Question>(empty());
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const response = await fetch("/api/studio/questions");
    const result = await response.json();
    if (!result.ok) setError(result.error || "Could not load questions.");
    else setRows(result.questions);
  };

  useEffect(() => {
    load().catch(() => setError("Could not load questions."));
  }, []);

  const save = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    const payload = {
      prompt: draft.prompt,
      category: draft.category,
      aliases: draft.aliases,
      active: draft.active,
      answers: draft.answers,
    };
    try {
      const response = await fetch(draft.id ? `/api/studio/questions/${draft.id}` : "/api/studio/questions", {
        method: draft.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!result.ok) {
        setError(result.error || "Save failed.");
        return;
      }
      setDraft(empty());
      await load();
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  };

  const seed = async (force: boolean) => {
    if (force && !window.confirm("Replace all training pairs with the portfolio defaults?")) return;
    setBusy(true);
    try {
      const response = await fetch("/api/studio/seed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ force }),
      });
      const result = await response.json();
      if (!result.ok) setError(result.error || "Seed failed.");
      else await load();
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="studio-train">
      <header className="sec-head">
        <p className="eyebrow">[ TRAINING ]</p>
        <h1>Question–answer pairs.</h1>
      </header>
      <p className="body">
        Aliases catch phrasing variants. Keep answers short. Seed loads the portfolio defaults if the table is empty.
      </p>
      <div className="studio-toolbar">
        <button type="button" onClick={() => seed(false)} disabled={busy}>
          Seed defaults
        </button>
        <button type="button" onClick={() => seed(true)} disabled={busy}>
          Replace with defaults
        </button>
      </div>
      <form className="studio-editor" onSubmit={save}>
        <label>
          Category
          <input
            value={draft.category}
            onChange={(event) => setDraft({ ...draft, category: event.target.value })}
            required
          />
        </label>
        <label>
          Question
          <input
            value={draft.prompt}
            onChange={(event) => setDraft({ ...draft, prompt: event.target.value })}
            required
          />
        </label>
        <label className="studio-editor__wide">
          Aliases (comma separated)
          <input
            value={draft.aliases.join(", ")}
            onChange={(event) =>
              setDraft({
                ...draft,
                aliases: event.target.value.split(",").map((item) => item.trim()).filter(Boolean),
              })
            }
          />
        </label>
        <label className="studio-editor__wide">
          Answer
          <textarea
            rows={5}
            value={draft.answers[0]?.body || ""}
            onChange={(event) =>
              setDraft({ ...draft, answers: [{ variant: "default", body: event.target.value }] })
            }
            required
          />
        </label>
        <label className="studio-check">
          <input
            type="checkbox"
            checked={draft.active}
            onChange={(event) => setDraft({ ...draft, active: event.target.checked })}
          />
          Active
        </label>
        {error ? <p className="form-status is-error studio-editor__wide">{error}</p> : null}
        <button type="submit" disabled={busy}>
          {draft.id ? "Update pair" : "Add pair"}
        </button>
        {draft.id ? (
          <button type="button" onClick={() => setDraft(empty())}>
            Cancel edit
          </button>
        ) : null}
      </form>
      <ul className="studio-list">
        {rows.map((row) => (
          <li key={row.id}>
            <div>
              <small>
                {row.category} · {row._count?.logs ?? 0} hits{row.active ? "" : " · off"}
              </small>
              <strong>{row.prompt}</strong>
              <p>{row.answers[0]?.body}</p>
            </div>
            <div className="studio-list__actions">
              <button type="button" onClick={() => setDraft(row)}>
                Edit
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (!window.confirm("Delete this pair?")) return;
                  await fetch(`/api/studio/questions/${row.id}`, { method: "DELETE" });
                  await load();
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
