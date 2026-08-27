"use client";

import { useEffect, useState } from "react";

type Lead = {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  topic: string | null;
  notes: string | null;
  status: string;
  createdAt: string;
};

export default function LeadInbox() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState("");

  const load = async () => {
    const response = await fetch("/api/studio/leads");
    const result = await response.json();
    if (!result.ok) setError(result.error || "Could not load leads.");
    else setLeads(result.leads);
  };

  useEffect(() => {
    load().catch(() => setError("Could not load leads."));
  }, []);

  return (
    <section className="studio-leads">
      <header className="sec-head">
        <p className="eyebrow">[ LEADS ]</p>
        <h1>Fallback contacts.</h1>
      </header>
      {error ? <p className="form-status is-error">{error}</p> : null}
      <ul className="studio-list">
        {leads.length ? (
          leads.map((lead) => (
            <li key={lead.id}>
              <div>
                <small>
                  {new Date(lead.createdAt).toLocaleString()} · {lead.status}
                </small>
                <strong>
                  {lead.name || "Unnamed"} · {lead.email}
                </strong>
                <p>
                  {lead.phone || "No phone"}
                  {lead.topic ? ` · ${lead.topic}` : ""}
                </p>
              </div>
              <select
                value={lead.status}
                onChange={async (event) => {
                  await fetch("/api/studio/leads", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: lead.id, status: event.target.value }),
                  });
                  await load();
                }}
              >
                <option value="new">new</option>
                <option value="contacted">contacted</option>
                <option value="closed">closed</option>
              </select>
            </li>
          ))
        ) : (
          <li>No fallback leads yet.</li>
        )}
      </ul>
    </section>
  );
}
