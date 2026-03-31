"use client";

import { useState, type FormEvent } from "react";

interface ContactFormDict {
  name: string;
  email: string;
  message: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
}

export default function ContactForm({ dict }: { dict: ContactFormDict }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      action="https://formspree.io/f/YOUR_FORM_ID"
      method="POST"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <div>
        <label htmlFor="name" className="block text-text text-sm font-medium mb-1">
          {dict.name}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full bg-surface border border-emerald-900/30 rounded-lg px-4 py-3 text-text placeholder-text-muted/50 focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-text text-sm font-medium mb-1">
          {dict.email}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full bg-surface border border-emerald-900/30 rounded-lg px-4 py-3 text-text placeholder-text-muted/50 focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-text text-sm font-medium mb-1">
          {dict.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full bg-surface border border-emerald-900/30 rounded-lg px-4 py-3 text-text placeholder-text-muted/50 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
      >
        {status === "sending" ? dict.sending : dict.submit}
      </button>

      {status === "success" && (
        <p className="text-emerald-400 text-sm text-center">{dict.success}</p>
      )}
      {status === "error" && (
        <p className="text-red-400 text-sm text-center">{dict.error}</p>
      )}
    </form>
  );
}
