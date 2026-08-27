"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type ChatMessage = {
  id: string;
  role: "bot" | "user";
  text: string;
  fallback?: boolean;
};

const SUGGESTIONS = [
  "What services do you provide?",
  "What is your rate?",
  "Can you show examples of similar projects?",
  "Do you work with existing teams?",
];

const GREETING: ChatMessage = {
  id: "hello",
  role: "bot",
  text: "Ask about services, stack, timelines, or how to start. If I don’t have it, I’ll take a contact so Raza can reply.",
};

function sessionId() {
  const key = "ra-chat-session";
  const existing = sessionStorage.getItem(key);
  if (existing) return existing;
  const next = crypto.randomUUID();
  sessionStorage.setItem(key, next);
  return next;
}

export default function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [lead, setLead] = useState(false);
  const [leadStatus, setLeadStatus] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const hidden = pathname === "/career" || pathname.startsWith("/studio");

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, lead, busy]);

  if (hidden) return null;

  const send = async (text: string) => {
    const message = text.trim();
    if (!message || busy) return;
    setInput("");
    setLead(false);
    setLeadStatus("");
    const user: ChatMessage = { id: crypto.randomUUID(), role: "user", text: message };
    setMessages((current) => [...current, user]);
    setBusy(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, sessionId: sessionId() }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        answer?: string;
        fallback?: boolean;
        error?: string;
      };
      const bot: ChatMessage = {
        id: crypto.randomUUID(),
        role: "bot",
        text: result.answer || result.error || "Could not reach the assistant. Email is on the contact page.",
        fallback: Boolean(result.fallback),
      };
      setMessages((current) => [...current, bot]);
      if (result.fallback) setLead(true);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "bot",
          text: "Network error. Use the contact page or WhatsApp instead.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  };

  const onLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(true);
    setLeadStatus("");
    try {
      const response = await fetch("/api/chat/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          phone: String(data.get("phone") || ""),
          topic: messages.filter((item) => item.role === "user").at(-1)?.text || "",
          website: String(data.get("website") || ""),
          conversation: messages.slice(-8).map((item) => ({ role: item.role, text: item.text })),
        }),
      });
      const result = (await response.json()) as { ok?: boolean; message?: string; error?: string };
      if (result.ok) {
        setLead(false);
        setMessages((current) => [
          ...current,
          {
            id: crypto.randomUUID(),
            role: "bot",
            text: result.message || "Thanks — he’ll follow up.",
          },
        ]);
        form.reset();
      } else {
        setLeadStatus(result.error || "Could not save that contact.");
      }
    } catch {
      setLeadStatus("Network error. Use the contact page instead.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={`chat-widget${open ? " is-open" : ""}`}>
      {open ? (
        <section className="chat-panel" aria-label="Assistant">
          <header className="chat-panel__head">
            <p className="chat-panel__kicker">assistant</p>
            <p className="chat-panel__title">Ask Raza’s desk</p>
            <button type="button" className="chat-panel__close" onClick={() => setOpen(false)} aria-label="Close chat">
              Close
            </button>
          </header>
          <div className="chat-panel__log" ref={listRef}>
            {messages.map((item) => (
              <p key={item.id} className={`chat-bubble chat-bubble--${item.role}`}>
                {item.text}
              </p>
            ))}
            {busy ? (
              <p className="chat-bubble chat-bubble--bot chat-bubble--typing" aria-live="polite">
                <i />
                <i />
                <i />
              </p>
            ) : null}
            {lead ? (
              <form className="chat-lead" onSubmit={onLead}>
                <p>Leave a contact and he’ll follow up.</p>
                <label className="contact-honeypot" aria-hidden="true">
                  <span>Website</span>
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </label>
                <input name="name" type="text" placeholder="Name" maxLength={80} autoComplete="name" />
                <input name="email" type="email" placeholder="Email" required maxLength={160} autoComplete="email" />
                <input name="phone" type="tel" placeholder="Phone" required maxLength={40} autoComplete="tel" />
                {leadStatus ? <span className="chat-lead__error">{leadStatus}</span> : null}
                <button type="submit" disabled={busy}>
                  Send contact
                </button>
                <Link href="/contact">Or use the full form</Link>
              </form>
            ) : null}
          </div>
          {!lead && messages.length < 4 ? (
            <div className="chat-suggest">
              {SUGGESTIONS.map((item) => (
                <button key={item} type="button" onClick={() => send(item)}>
                  {item}
                </button>
              ))}
            </div>
          ) : null}
          <form
            className="chat-compose"
            onSubmit={(event) => {
              event.preventDefault();
              void send(input);
            }}
          >
            <label className="visually-hidden" htmlFor="chat-input">
              Message
            </label>
            <input
              id="chat-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about work, stack, or timing"
              maxLength={400}
              autoComplete="off"
            />
            <button type="submit" disabled={busy || input.trim().length < 2}>
              Send
            </button>
            <p className="chat-compose__note">
              Short logs only. See <Link href="/privacy">privacy</Link>.
            </p>
          </form>
        </section>
      ) : null}
      <button
        type="button"
        className="chat-launcher"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close" : "Ask"}
      </button>
    </div>
  );
}
