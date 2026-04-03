import React from "react";

const steps = [
  {
    number: "01",
    label: "Input",
    title: "Enter grades in one table",
    body: "Type in your student grades — by subject, assignment, or term. One clean table, no spreadsheet gymnastics required.",
    color: "emerald",
    detail: (
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Grade Table</p>
        <div className="space-y-2">
          {["Maria — 92, 87, 95", "Carlos — 78, 82, 80", "Ana — 88, 91, 84"].map((row) => (
            <div key={row} className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700 font-mono">
              {row}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    number: "02",
    label: "Dashboard",
    title: "See performance instantly",
    body: "No formulas. No manual math. The moment grades are entered, averages, letter grades, and performance summaries update automatically.",
    color: "blue",
    detail: (
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="mb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Class Performance</p>
        <div className="space-y-2">
          {[
            { name: "Maria", pct: 91, grade: "A" },
            { name: "Carlos", pct: 80, grade: "B" },
            { name: "Ana", pct: 88, grade: "B+" },
          ].map((s) => (
            <div key={s.name} className="flex items-center gap-3">
              <span className="w-14 text-xs font-medium text-slate-600">{s.name}</span>
              <div className="flex-1 rounded-full bg-slate-100 h-2">
                <div
                  className="h-2 rounded-full bg-emerald-500"
                  style={{ width: `${s.pct}%` }}
                />
              </div>
              <span className="w-8 text-right text-xs font-bold text-slate-800">{s.grade}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg bg-emerald-50 px-3 py-2">
          <p className="text-xs text-emerald-800 font-semibold">Class average: 86.3 — B+</p>
        </div>
      </div>
    ),
  },
  {
    number: "03",
    label: "Report",
    title: "Generate report cards instantly",
    body: "One click exports clean, professional PDF report cards for every student — formatted, named, and ready to print or share.",
    color: "violet",
    detail: (
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Student Report Card</p>
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-slate-900">Maria Santos</p>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">Outstanding</span>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {[["Math", "A"], ["Sci", "B+"], ["Eng", "A+"]].map(([sub, gr]) => (
            <div key={sub} className="rounded-lg bg-slate-50 p-2 text-center">
              <p className="text-[9px] text-slate-500">{sub}</p>
              <p className="text-base font-extrabold text-slate-900">{gr}</p>
            </div>
          ))}
        </div>
        <button type="button" className="mt-3 w-full rounded-lg bg-slate-900 py-1.5 text-xs font-semibold text-white flex items-center justify-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          Export PDF
        </button>
      </div>
    ),
  },
];

export function SolutionSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
            How It Works
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Three steps. That's it.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            From a blank screen to a stack of printed report cards in under 10 minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              {/* Arrow connector (desktop) */}
              {i < steps.length - 1 && (
                <div className="absolute top-10 -right-4 z-10 hidden text-slate-300 lg:block">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}

              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 h-full">
                {/* Step badge */}
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                    {step.number}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    {step.label}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {step.body}
                </p>

                <div className="mt-5">{step.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
