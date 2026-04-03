import React from "react";

export function HeroSection({ onRequestDemo, onSampleReport }) {
  return (
    <section className="overflow-hidden bg-white pt-20 pb-12 sm:pt-28 sm:pb-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Built for teachers
          </span>
        </div>

        {/* Headline */}
        <h1 className="mx-auto mt-6 max-w-3xl text-center text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-6xl lg:text-[5rem]">
          Turn grades into{" "}
          <span className="text-emerald-600">report&nbsp;cards</span>{" "}
          in seconds.
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-6 max-w-xl text-center text-lg leading-8 text-slate-600 sm:text-xl">
          Input your class grades, instantly see student performance, and export
          clean printable PDFs — without spending hours on formatting.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onRequestDemo}
            className="w-full rounded-full bg-emerald-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500 sm:w-auto"
          >
            Request a Demo
          </button>
          <button
            type="button"
            onClick={onSampleReport}
            className="w-full rounded-full border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 sm:w-auto"
          >
            See Sample Report
          </button>
        </div>

        {/* UI Mockup */}
        <div className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/70">
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-5 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
            <span className="ml-3 text-xs font-medium text-slate-400">
              GradeFlow Reports
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Left: Grade input */}
            <div className="border-b border-slate-100 p-6 sm:border-b-0 sm:border-r">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
                Grade Input
              </p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs font-semibold text-slate-500">
                    <th className="pb-3 pr-3">Student</th>
                    <th className="pb-3 pr-2">Math</th>
                    <th className="pb-3 pr-2">Science</th>
                    <th className="pb-3">English</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { name: "Maria Santos", math: 92, sci: 87, eng: 95 },
                    { name: "Carlos Reyes", math: 78, sci: 82, eng: 80 },
                    { name: "Ana Torres", math: 88, sci: 91, eng: 84 },
                    { name: "Luis Rivera", math: 95, sci: 76, eng: 89 },
                  ].map((s) => (
                    <tr key={s.name}>
                      <td className="py-2.5 pr-3 font-medium text-slate-800">
                        {s.name}
                      </td>
                      <td className="py-2.5 pr-2 text-slate-600">{s.math}</td>
                      <td className="py-2.5 pr-2 text-slate-600">{s.sci}</td>
                      <td className="py-2.5 text-slate-600">{s.eng}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 rounded-xl border-2 border-dashed border-slate-200 py-3 text-center text-sm text-slate-400">
                + Add student
              </div>
            </div>

            {/* Right: Report card preview */}
            <div className="bg-emerald-50/40 p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
                Generated Report Card
              </p>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Student Report
                    </p>
                    <p className="mt-0.5 font-bold text-slate-900">
                      Maria Santos
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                    Outstanding
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { label: "Math", grade: "A", score: "92" },
                    { label: "Science", grade: "B+", score: "87" },
                    { label: "English", grade: "A+", score: "95" },
                  ].map((sub) => (
                    <div
                      key={sub.label}
                      className="rounded-lg bg-slate-50 p-2.5 text-center"
                    >
                      <p className="text-[10px] text-slate-500">{sub.label}</p>
                      <p className="mt-0.5 text-lg font-extrabold text-slate-900">
                        {sub.grade}
                      </p>
                      <p className="text-[10px] text-slate-400">{sub.score}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 rounded-lg bg-emerald-50 p-3">
                  <p className="text-[10px] font-semibold uppercase text-emerald-800">
                    Teacher's Comment
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    Maria consistently demonstrates exceptional effort and strong
                    academic performance across all subjects.
                  </p>
                </div>

                <button
                  type="button"
                  className="mt-3 w-full rounded-lg bg-slate-900 py-2 text-xs font-semibold text-white"
                >
                  Export PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
