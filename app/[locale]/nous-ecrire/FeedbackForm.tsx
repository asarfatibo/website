"use client";

import { type FormEvent, useState } from "react";
import type { Dictionary } from "@/lib/i18n";

type State = "idle" | "sending" | "sent" | "error";

const EMAIL = "hello@bubbleout.fr";

export function FeedbackForm({ t }: { t: Dictionary["feedback"]["form"] }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<State>("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim() || !message.trim()) return;
    setState("sending");

    const subject = encodeURIComponent(t.mailSubject);
    const body = encodeURIComponent(
      `${t.mailFrom}${email.trim()}\n\n${message.trim()}`
    );

    try {
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      setState("sent");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="mt-8 rounded-2xl bg-white/70 px-8 py-10 text-center shadow-sm">
        <p className="text-3xl">✓</p>
        <p className="mt-3 text-lg font-bold text-ink">{t.sentTitle}</p>
        <p className="mt-2 text-ink/70">{t.sentBody}</p>
        <p className="mt-4 text-sm text-ink/50">
          {t.noMailConfigured}{" "}
          <a href={`mailto:${EMAIL}`} className="text-blue underline">
            {EMAIL}
          </a>
        </p>
        <button
          onClick={() => {
            setEmail("");
            setMessage("");
            setState("idle");
          }}
          className="mt-6 text-sm text-ink/50 underline"
        >
          {t.sendAnother}
        </button>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink placeholder:text-ink/40 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/10 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-ink" htmlFor="email">
          {t.emailLabel} <span className="text-blue">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder={t.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-ink" htmlFor="message">
          {t.messageLabel} <span className="text-blue">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={6}
          placeholder={t.messagePlaceholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputCls} resize-none`}
        />
      </div>

      {state === "error" && (
        <p className="text-sm text-red-500">
          {t.errorPrefix}
          <a href={`mailto:${EMAIL}`} className="underline">
            {EMAIL}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="w-full rounded-cta bg-blue py-4 text-center font-bold text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {state === "sending" ? t.submitting : t.submit}
      </button>
    </form>
  );
}
