'use client';

import React from "react";
import { HeroSection } from "./src/components/HeroSection";
import { ProblemSection } from "./src/components/ProblemSection";
import { SolutionSection } from "./src/components/SolutionSection";

// ─── Small reusable primitives ───────────────────────────────────────────────

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "light",
}) {
  const alignment =
    align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl";
  const titleColor = theme === "dark" ? "text-white" : "text-slate-900";
  const descriptionColor = theme === "dark" ? "text-slate-300" : "text-slate-600";

  return (
    <div className={alignment}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`text-3xl font-semibold tracking-tight sm:text-4xl ${titleColor}`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-base leading-7 sm:text-lg ${descriptionColor}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          >
            Close
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

function InfoCard({ title, children, tone = "light" }) {
  const tones = {
    light: "border-slate-200 bg-white",
    warm: "border-amber-200 bg-amber-50/70",
    mint: "border-emerald-200 bg-emerald-50/70",
  };

  return (
    <div className={`rounded-3xl border p-6 ${tones[tone]}`}>
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600 sm:text-base">
        {children}
      </div>
    </div>
  );
}

function Bullet({ children }) {
  return (
    <div className="flex gap-3">
      <div className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-500" />
      <p>{children}</p>
    </div>
  );
}

function goToApp() {
  window.location.href = '/results';
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 [font-family:ui-rounded,system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif]">

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
          <span className="text-lg font-bold tracking-tight text-slate-900">
            GradeFlow<span className="text-emerald-600">Reports</span>
          </span>
          <a
            href="/results"
            className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500"
          >
            Try Now →
          </a>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <HeroSection onRequestDemo={goToApp} onSampleReport={goToApp} />

      {/* ── Problem ──────────────────────────────────────────────────────── */}
      <ProblemSection />

      {/* ── Solution ─────────────────────────────────────────────────────── */}
      <SolutionSection />

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="border-y border-slate-200 bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
              Features
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need. Nothing you don't.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              Designed to be simple enough that you don't need training to use it.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18M10 3v18M14 3v18" />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">Fast grade input table</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Enter all your student grades in one clean table. Add subjects, scores, and notes
                without juggling multiple spreadsheets or formatting headaches.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-7 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">Live performance dashboard</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                As you enter grades, the dashboard automatically calculates averages, assigns letter
                grades, and highlights students who may need extra attention.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">Clean PDF report export</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Generate individual report cards for every student in one click. Clean layout,
                consistent formatting, ready to print or email to parents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Try Now CTA ───────────────────────────────────────────────────── */}
      <section id="try-now" className="border-y border-slate-200 bg-slate-950 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center sm:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
            No sign-up required
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Upload your Excel. Get report cards instantly.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
            Use the DepEd-ready template, fill in your class data, and generate print-ready
            report cards in seconds — completely free to try.
          </p>
          <a
            href="/results"
            className="mt-10 inline-block rounded-full bg-emerald-500 px-10 py-4 text-base font-semibold text-white shadow-xl shadow-emerald-900/40 transition hover:bg-emerald-400"
          >
            Try Now — it's free →
          </a>
          <p className="mt-4 text-xs text-slate-500">No account. No credit card. Just upload and go.</p>
        </div>
      </section>

      {/* ── Trust Section ─────────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
              Why Teachers Choose Us
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Built for teachers. Designed for simplicity.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {[
              {
                quote:
                  "I stopped losing Sundays to report writing. This gave me a first draft for the whole class in one sitting.",
                name: "Maya R.",
                role: "Grade 6 Teacher",
                tone: "light",
              },
              {
                quote:
                  "Parents noticed the difference immediately. The reports look professional and they actually understand what we covered.",
                name: "Kenji L.",
                role: "Language Tutor",
                tone: "warm",
              },
              {
                quote:
                  "I used to dread report card week. Now I actually finish early and have time to review comments before sending.",
                name: "Sara M.",
                role: "Elementary Teacher",
                tone: "mint",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-7"
              >
                <svg
                  className="h-6 w-6 text-emerald-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="mt-4 text-sm leading-7 text-slate-700">{t.quote}</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              "Built for teachers",
              "Designed for simplicity",
              "No training required",
              "Print-ready PDFs",
            ].map((label) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l7.879-7.879a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-semibold text-slate-700">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="border-t border-slate-200 bg-emerald-600 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to save hours on report cards?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-emerald-100 sm:text-lg">
            See how GradeFlow Reports works with your class size and workflow. Takes 10 minutes,
            no commitment required.
          </p>
          <a
            href="/results"
            className="mt-10 inline-block rounded-full bg-white px-9 py-4 text-base font-semibold text-emerald-700 shadow-xl shadow-emerald-800/20 transition hover:bg-emerald-50"
          >
            Try Now — Upload Your Excel →
          </a>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <span className="text-sm font-semibold text-slate-700">
              GradeFlow<span className="text-emerald-600">Reports</span>
            </span>
            <p className="text-sm text-slate-500">
              Built for teachers. Simple by design.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
