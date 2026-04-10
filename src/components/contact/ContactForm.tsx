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
      className="flex flex-col gap-5"
    >
      <div>
        <label htmlFor="name" className="block text-text text-sm font-medium mb-2">
          {dict.name}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full bg-bg-alt border rounded-lg px-4 py-3 text-text placeholder-text-muted/50 focus:outline-none focus:shadow-[0_0_15px_rgba(14,165,233,0.2)] transition-all duration-300"
          style={{ borderColor: "rgba(139, 92, 246, 0.15)" }}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-text text-sm font-medium mb-2">
          {dict.email}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full bg-bg-alt border rounded-lg px-4 py-3 text-text placeholder-text-muted/50 focus:outline-none focus:shadow-[0_0_15px_rgba(14,165,233,0.2)] transition-all duration-300"
          style={{ borderColor: "rgba(139, 92, 246, 0.15)" }}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-text text-sm font-medium mb-2">
          {dict.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full bg-bg-alt border rounded-lg px-4 py-3 text-text placeholder-text-muted/50 focus:outline-none focus:shadow-[0_0_15px_rgba(14,165,233,0.2)] transition-all duration-300 resize-none"
          style={{ borderColor: "rgba(139, 92, 246, 0.15)" }}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group relative w-full text-white font-medium py-3.5 rounded-lg overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(135deg, #0ea5e9, #a855f7)",
          boxShadow: "0 0 20px rgba(14, 165, 233, 0.2), 0 0 40px rgba(168, 85, 247, 0.1)",
        }}
      >
        <span className="relative z-10">
          {status === "sending" ? dict.sending : dict.submit}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>

      {status === "success" && (
        <p className="text-primary-light text-sm text-center font-medium">{dict.success}</p>
      )}
      {status === "error" && (
        <p className="text-red-400 text-sm text-center">{dict.error}</p>
      )}
    </form>
  );
}
