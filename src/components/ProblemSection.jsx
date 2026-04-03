import React from "react";

const pains = [
  {
    heading: "Hours lost to formatting",
    body: "Every quarter, you spend evenings manually formatting the same report cards — adjusting fonts, aligning cells, fixing spacing — instead of resting or preparing lessons.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    heading: "Manually calculating averages",
    body: "Adding up grades on a spreadsheet, double-checking totals, converting scores to letter grades. One wrong formula and you're rechecking everything by hand.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    heading: "Repeating the same work every quarter",
    body: "Same template. Same layout. Same process. Quarter after quarter you rebuild the same report structure — even though nothing about it changes.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
];

export function ProblemSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
            The Problem
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Sound familiar?
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Teachers are spending too many hours on admin work that has nothing
            to do with teaching.
          </p>
        </div>

        {/* Pain point cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {pains.map((pain) => (
            <div
              key={pain.heading}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                {pain.icon}
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {pain.heading}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {pain.body}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 text-center">
          <p className="text-base font-semibold text-amber-900">
            The problem isn't your effort — it's the tool.
          </p>
          <p className="mt-1 text-sm text-amber-800">
            GradeFlow Reports was built to handle all of this automatically.
          </p>
        </div>
      </div>
    </section>
  );
}
