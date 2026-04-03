import React, { useState } from "react";

const initialForm = { name: "", email: "", school: "" };

export function DemoForm({ formRef }) {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    if (submitError) setSubmitError("");
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/request-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        let message = "Could not send your request. Please try again.";
        try {
          const body = await response.json();
          if (body?.error) message = body.error;
        } catch {
          // Keep fallback message.
        }
        throw new Error(message);
      }

      setSubmitted(true);
      setForm(initialForm);
    } catch (err) {
      setSubmitError(err.message || "Could not send your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="demo-form"
      ref={formRef}
      className="border-y border-slate-200 bg-slate-950 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Copy */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
              Get a Demo
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              See it in action.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-400 sm:text-lg">
              We'll walk you through a live demo tailored to your class size and
              workflow. No pressure, no sales pitch — just the tool working.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "10-minute walkthrough, not a 45-minute call",
                "See real grade inputs and live PDF output",
                "Ask questions and get honest answers",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l7.879-7.879a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-sm text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Form */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            {submitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l7.879-7.879a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Request received!
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  We'll be in touch within one business day to schedule your
                  demo.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="text-lg font-bold text-white">
                  Request a Free Demo
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  We'll reach out to schedule a quick walkthrough.
                </p>

                <div className="mt-6 space-y-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="demo-name"
                      className="block text-sm font-medium text-slate-300"
                    >
                      Your name <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      id="demo-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Ms. Rivera"
                      autoComplete="name"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="demo-email"
                      className="block text-sm font-medium text-slate-300"
                    >
                      Work email <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      id="demo-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@school.edu"
                      autoComplete="email"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* School (optional) */}
                  <div>
                    <label
                      htmlFor="demo-school"
                      className="block text-sm font-medium text-slate-300"
                    >
                      School{" "}
                      <span className="text-slate-500 font-normal">
                        (optional)
                      </span>
                    </label>
                    <input
                      id="demo-school"
                      type="text"
                      name="school"
                      value={form.school}
                      onChange={handleChange}
                      placeholder="Lincoln Elementary"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {submitError && (
                  <p
                    role="alert"
                    className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                  >
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 w-full rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/40 transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Sending…" : "Request Demo →"}
                </button>

                <p className="mt-4 text-center text-xs text-slate-500">
                  No commitment. We'll reach out within 1 business day.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
