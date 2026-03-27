import React, { useState } from "react";

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

export default function LandingPage() {
  const [modal, setModal] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [calculator, setCalculator] = useState({
    students: 24,
    minutesPerStudent: 6,
  });
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Teacher",
    students: "",
    useCase: "",
  });

  const savedHours =
    ((calculator.students * calculator.minutesPerStudent) / 60).toFixed(1);

  const openModal = (name) => setModal(name);
  const closeModal = () => setModal(null);

  const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    if (submitError) {
      setSubmitError("");
    }
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/request-demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        let message = "Could not send your request. Please try again.";
        try {
          const errorBody = await response.json();
          if (errorBody?.error) {
            message = errorBody.error;
          }
        } catch {
          // Keep fallback message if JSON parsing fails.
        }
        throw new Error(message);
      }

      openModal("demo-request");
      setForm({
        name: "",
        email: "",
        role: "Teacher",
        students: "",
        useCase: "",
      });
    } catch (error) {
      setSubmitError(error.message || "Could not send your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(251,191,36,0.18),_transparent_26%),linear-gradient(180deg,_#fffdf8_0%,_#f8fafc_42%,_#ffffff_100%)] text-slate-900 [font-family:ui-rounded,system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif]">
      <section className="border-b border-slate-200/70">
        <div className="mx-auto max-w-7xl px-6 py-6 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-4 rounded-full border border-slate-200/80 bg-white/80 px-5 py-3 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-lg font-semibold tracking-tight text-slate-900">
                GradeFlow Reports
              </span>
              <span className="ml-3 text-sm text-slate-500">
                Automated reports, certificates, and feedback for classes and 1-on-1 learners
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollToId("pricing")}
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Pricing
              </button>
              <button
                type="button"
                onClick={() => scrollToId("demo-form")}
                className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Request Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800">
              Built for teachers managing classes and tutors supporting individual students
            </div>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              Grading, report writing, and student feedback should not eat your evenings.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
              Upload student grades, lesson notes, or performance data and generate report cards,
              certificates, and polished feedback in minutes, whether you teach full classes or
              one student at a time.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollToId("demo-form")}
                className="rounded-full bg-emerald-600 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500"
              >
                Request Demo
              </button>
              <button
                type="button"
                onClick={() => scrollToId("how-it-works")}
                className="rounded-full border border-slate-300 bg-white px-7 py-4 text-base font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
              >
                See How It Works
              </button>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                <div className="text-2xl font-semibold text-slate-900">Hours back</div>
                <p className="mt-1 text-sm text-slate-600">
                  Replace repetitive grading admin with one upload and consistent outputs.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                <div className="text-2xl font-semibold text-slate-900">Better feedback</div>
                <p className="mt-1 text-sm text-slate-600">
                  Turn rough notes into student-ready comments for progress reports and lessons.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                <div className="text-2xl font-semibold text-slate-900">Professional output</div>
                <p className="mt-1 text-sm text-slate-600">
                  Deliver clean reports and certificates that feel worth paying for.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-10 hidden h-32 w-32 rounded-full bg-amber-200/60 blur-3xl sm:block" />
            <div className="absolute -right-10 bottom-10 hidden h-40 w-40 rounded-full bg-emerald-200/60 blur-3xl sm:block" />
            <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200/70">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">Today’s workload</p>
                  <p className="text-lg font-semibold text-slate-900">Class 7A + 6 tutoring students</p>
                </div>
                <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                  14 minutes to generate
                </div>
              </div>
              <div className="mt-5 grid gap-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-900">Bulk report cards</p>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                      28 students
                    </span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-200">
                    <div className="h-2 w-4/5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    Grades imported, comments generated, formatting applied.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-medium text-slate-500">Feedback example</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    “Maria is using more complete sentences in speaking tasks and responds well to
                    correction. Next step: build confidence with past tense during role-play.”
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-amber-50 p-4">
                    <p className="text-sm font-medium text-amber-800">Certificates</p>
                    <p className="mt-2 text-sm text-amber-900">
                      Auto-filled names, levels, course dates, and signatures.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-emerald-50 p-4">
                    <p className="text-sm font-medium text-emerald-800">Class summary</p>
                    <p className="mt-2 text-sm text-emerald-900">
                      Spot trends in reading, attendance, and improvement before parent meetings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white/70">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:px-10">
          <InfoCard title="For teachers" tone="light">
            <Bullet>Generate bulk report cards without rewriting the same sentence 30 times.</Bullet>
            <Bullet>See class summaries quickly so parent updates and admin reports take less effort.</Bullet>
            <Bullet>Keep feedback consistent across students, even when multiple teachers contribute notes.</Bullet>
          </InfoCard>
          <InfoCard title="For tutors" tone="warm">
            <Bullet>Turn lesson notes into personalized feedback your students can actually understand.</Bullet>
            <Bullet>Create quick session summaries after each lesson instead of writing them from scratch.</Bullet>
            <Bullet>Send professional reports and certificates that make your service feel more valuable.</Bullet>
          </InfoCard>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="How It Works"
          title="Three steps from raw student data to ready-to-send outputs"
          description="Designed for the way teachers and tutors already work: spreadsheets, rubrics, lesson notes, and progress scores."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <InfoCard title="1. Upload grades or notes" tone="mint">
            <p>
              Add a spreadsheet, paste lesson notes, or upload simple performance records. No
              special formatting needed to get started.
            </p>
          </InfoCard>
          <InfoCard title="2. Generate reports, certificates, and feedback">
            <p>
              The app turns your data into report cards, progress summaries, personalized comments,
              and printable certificates in one flow.
            </p>
          </InfoCard>
          <InfoCard title="3. Download or send">
            <p>
              Export polished documents for students, parents, or school records, or send feedback
              directly after each lesson.
            </p>
          </InfoCard>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Visual Demo"
                title="See the dashboard, the report, and the feedback side by side"
                description="This section is built to help visitors picture the product immediately, not guess what it does."
                theme="dark"
              />
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => openModal("demo")}
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  View Demo
                </button>
                <button
                  type="button"
                  onClick={() => openModal("sample-output")}
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Try Sample Output
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-3xl bg-white p-5 text-slate-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Dashboard</p>
                      <p className="text-lg font-semibold">Generated today</p>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      12 outputs
                    </span>
                  </div>
                  <div className="mt-5 space-y-3">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-sm font-medium">Report cards</p>
                      <p className="mt-1 text-sm text-slate-500">24 Grade 5 students</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-sm font-medium">Lesson feedback</p>
                      <p className="mt-1 text-sm text-slate-500">6 ESL learners</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-sm font-medium">Certificates</p>
                      <p className="mt-1 text-sm text-slate-500">Conversation course completion</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-3xl bg-amber-50 p-5 text-slate-900">
                    <p className="text-sm font-medium text-amber-800">Generated report</p>
                    <p className="mt-3 text-lg font-semibold">Student: Ethan Cruz</p>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-2xl bg-white p-3">
                        <p className="text-slate-500">Reading</p>
                        <p className="font-semibold">B+</p>
                      </div>
                      <div className="rounded-2xl bg-white p-3">
                        <p className="text-slate-500">Participation</p>
                        <p className="font-semibold">Excellent</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-3xl bg-emerald-50 p-5 text-slate-900">
                    <p className="text-sm font-medium text-emerald-800">Feedback text example</p>
                    <p className="mt-3 text-sm leading-6">
                      Ethan shows stronger comprehension when previewing new vocabulary before
                      reading tasks. Continued practice with inferencing questions will help him
                      explain answers more confidently.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Why People Pay"
          title="The value is practical and immediate"
          description="This is not about replacing teaching. It is about removing the repetitive writing and formatting work around it."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <InfoCard title="For teachers">
            <Bullet>Saves hours every week during grading periods and parent-report cycles.</Bullet>
            <Bullet>Avoids repetitive formatting across report cards, summaries, and certificates.</Bullet>
            <Bullet>Reduces copy-paste mistakes and inconsistent wording across students.</Bullet>
          </InfoCard>
          <InfoCard title="For tutors" tone="mint">
            <Bullet>Writes feedback faster after each lesson while still sounding personal.</Bullet>
            <Bullet>Creates professional-looking reports that impress parents and paying clients.</Bullet>
            <Bullet>Helps justify premium pricing by making progress more visible and tangible.</Bullet>
          </InfoCard>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white/80">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Interactive Proof"
            title="Let visitors engage with the promise before they commit"
            description="The best validation pages let people test the value mentally and emotionally, not just read about it."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <InfoCard title="See sample report card">
              <p>
                Preview a clean, parent-ready report with grades, progress notes, and a consistent
                summary style.
              </p>
              <button
                type="button"
                onClick={() => openModal("sample-report")}
                className="mt-4 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                See sample report card
              </button>
            </InfoCard>
            <InfoCard title="See sample feedback for a student" tone="warm">
              <p>
                Show how rough notes become clear, encouraging feedback for a language learner or
                individual student.
              </p>
              <button
                type="button"
                onClick={() => openModal("sample-feedback")}
                className="mt-4 rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
              >
                See sample feedback
              </button>
            </InfoCard>
            <InfoCard title="Calculate time saved per week" tone="mint">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Students</span>
                <input
                  type="number"
                  min="1"
                  value={calculator.students}
                  onChange={(e) =>
                    setCalculator((current) => ({
                      ...current,
                      students: Number(e.target.value) || 0,
                    }))
                  }
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-500"
                />
              </label>
              <label className="mt-4 block">
                <span className="text-sm font-medium text-slate-700">
                  Minutes you spend per student
                </span>
                <input
                  type="number"
                  min="1"
                  value={calculator.minutesPerStudent}
                  onChange={(e) =>
                    setCalculator((current) => ({
                      ...current,
                      minutesPerStudent: Number(e.target.value) || 0,
                    }))
                  }
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-500"
                />
              </label>
              <div className="mt-4 rounded-2xl bg-emerald-100 p-4">
                <p className="text-sm text-emerald-900">
                  Estimated weekly admin time you could recover
                </p>
                <p className="mt-2 text-3xl font-semibold text-emerald-950">{savedHours} hours</p>
              </div>
            </InfoCard>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Social Proof"
          title="Specific wins beat vague praise"
          description="These testimonials are written to feel like real outcomes from real teaching workflows."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <InfoCard title="“I stopped losing Sundays to report writing.”">
            <p>
              “I teach Grade 6 and used to spend hours cleaning up report card comments. This gave
              me a usable first draft for the whole class in one sitting.”
            </p>
            <p className="font-medium text-slate-900">Maya R., Elementary Teacher</p>
          </InfoCard>
          <InfoCard title="“Parents noticed the difference immediately.”" tone="warm">
            <p>
              “I tutor English learners one-on-one. The feedback summaries look polished, and
              parents now understand exactly what we covered and what comes next.”
            </p>
            <p className="font-medium text-slate-900">Kenji L., Language Tutor</p>
          </InfoCard>
          <InfoCard title="“It made my service feel more premium.”" tone="mint">
            <p>
              “I teach online speaking lessons and send weekly progress notes. Having certificates
              and branded-looking summaries helped me justify raising my monthly package price.”
            </p>
            <p className="font-medium text-slate-900">Sara M., Freelance Instructor</p>
          </InfoCard>
        </div>
      </section>

      <section id="pricing" className="border-y border-slate-200 bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Pricing Validation"
            title="Simple pricing to test willingness to pay"
            description="The goal here is to find out whether teachers and tutors will actually start a trial or request access when the value is clear."
            align="center"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">
                Free Trial
              </p>
              <p className="mt-4 text-5xl font-semibold">7 days</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Test report cards, certificates, and feedback generation with real student data.
              </p>
              <button
                type="button"
                onClick={() => openModal("early-access")}
                className="mt-8 w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Start Free Trial
              </button>
            </div>

            <div className="rounded-[2rem] border border-emerald-300 bg-emerald-50 p-8 text-slate-950 shadow-lg shadow-emerald-500/10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
                Teachers
              </p>
              <p className="mt-4 text-5xl font-semibold">$12</p>
              <p className="mt-1 text-sm text-slate-600">per month</p>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Simple plan for classroom teachers who need bulk report cards, class summaries, and
                consistent outputs without extra formatting work.
              </p>
              <button
                type="button"
                onClick={() => openModal("early-access")}
                className="mt-8 w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Start Free Trial
              </button>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">
                Tutors
              </p>
              <p className="mt-4 text-5xl font-semibold">$9</p>
              <p className="mt-1 text-sm text-slate-300">per month</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Solo-friendly pricing for tutors who want faster lesson feedback, client-ready
                progress reports, and certificates that look polished.
              </p>
              <button
                type="button"
                onClick={() => openModal("early-access")}
                className="mt-8 w-full rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
        <div className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,_#ecfdf5,_#fff7ed)] p-10 shadow-lg shadow-slate-200/60">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
              Final CTA
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Less time grading. More time teaching.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              If the app can save time on grading admin and make your reports look better, it is
              worth seeing in action with your own workflow.
            </p>
            <button
              type="button"
              onClick={() => scrollToId("demo-form")}
              className="mt-8 rounded-full bg-emerald-600 px-7 py-4 text-base font-semibold text-white transition hover:bg-emerald-500"
            >
              Request Demo
            </button>
          </div>
        </div>
      </section>

      <section id="demo-form" className="border-t border-slate-200 bg-white/80">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div>
            <SectionHeading
              eyebrow="Demo Request"
              title="Tell us who you teach and what you need help generating"
              description="This form is part of the validation strategy: who requests demos, what role they choose, and how many students they manage all signal real demand."
            />
          </div>
          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Name</span>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleFormChange}
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Role</span>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleFormChange}
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500"
                >
                  <option>Teacher</option>
                  <option>Tutor</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  Number of students (optional)
                </span>
                <input
                  name="students"
                  value={form.students}
                  onChange={handleFormChange}
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500"
                  placeholder="e.g. 32"
                />
              </label>
            </div>
            <label className="mt-5 block">
              <span className="text-sm font-medium text-slate-700">
                What would you use this for?
              </span>
              <textarea
                name="useCase"
                value={form.useCase}
                onChange={handleFormChange}
                rows={5}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500"
                placeholder="Report cards, lesson feedback, certificate generation, parent updates, language learner comments..."
              />
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full rounded-full bg-slate-950 px-6 py-4 text-base font-semibold text-white transition hover:bg-slate-800"
            >
              {isSubmitting ? "Submitting..." : "Request Demo"}
            </button>
            {submitError ? <p className="mt-4 text-sm text-rose-600">{submitError}</p> : null}
            <p className="mt-4 text-sm text-slate-500">
              This can connect to a CRM or email tool later. For now, the action validates purchase
              intent and interest by role.
            </p>
          </form>
        </div>
      </section>

      <Modal open={modal === "demo"} title="Product Demo Preview" onClose={closeModal}>
        <div className="space-y-4 text-slate-700">
          <p>
            A teacher uploads a grade sheet. A tutor pastes lesson notes. In both cases, the app
            generates structured outputs with clean formatting and editable comments.
          </p>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="font-semibold text-slate-900">What the demo would show</p>
            <p className="mt-3 text-sm leading-6">
              Dashboard upload, generated report card preview, editable feedback comments, and a
              one-click certificate export for student or parent delivery.
            </p>
          </div>
        </div>
      </Modal>

      <Modal open={modal === "sample-output"} title="Sample Output" onClose={closeModal}>
        <div className="space-y-4 text-slate-700">
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm font-medium text-amber-800">Report summary</p>
            <p className="mt-2 text-sm leading-6">
              “Amira consistently completes written tasks on time and has improved her use of
              transition phrases. Next month we will focus on organizing longer responses.”
            </p>
          </div>
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
            <p className="text-sm font-medium text-emerald-800">Tutor feedback</p>
            <p className="mt-2 text-sm leading-6">
              “Today we practiced speaking about past travel experiences. Diego used more complete
              answers than last week and needed less prompting with irregular verbs.”
            </p>
          </div>
        </div>
      </Modal>

      <Modal open={modal === "sample-report"} title="Sample Report Card" onClose={closeModal}>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Student</p>
              <p className="text-xl font-semibold text-slate-900">Leah Santos</p>
            </div>
            <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700">
              Term 2
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-4">
              <p className="text-sm text-slate-500">Listening</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">A-</p>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <p className="text-sm text-slate-500">Writing</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">B+</p>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <p className="text-sm text-slate-500">Participation</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">Strong</p>
            </div>
          </div>
          <p className="mt-6 text-sm leading-6 text-slate-700">
            Leah contributes regularly, follows instructions well, and is becoming more confident in
            speaking tasks. Continued practice with paragraph structure will strengthen her written
            responses.
          </p>
        </div>
      </Modal>

      <Modal open={modal === "sample-feedback"} title="Sample Student Feedback" onClose={closeModal}>
        <div className="space-y-4 text-sm leading-6 text-slate-700">
          <p>
            “You are responding faster in conversation practice and using more complete answers than
            before. Your pronunciation of longer words is improving too.”
          </p>
          <p>
            “For the next lesson, we will focus on asking follow-up questions naturally so your
            conversations sound more confident and less memorized.”
          </p>
        </div>
      </Modal>

      <Modal open={modal === "early-access"} title="Launching Soon" onClose={closeModal}>
        <div className="space-y-4 text-slate-700">
          <p className="text-lg font-medium text-slate-900">Launching soon — request early access.</p>
          <p>
            This click is treated as pricing interest. Send people to the demo request form or wire
            this to your waitlist flow once you start collecting live leads.
          </p>
          <button
            type="button"
            onClick={() => {
              closeModal();
              scrollToId("demo-form");
            }}
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Request early access
          </button>
        </div>
      </Modal>

      <Modal open={modal === "demo-request"} title="Demo Request Received" onClose={closeModal}>
        <div className="space-y-4 text-slate-700">
          <p className="text-lg font-medium text-slate-900">
            Thanks, {form.name || "there"}.
          </p>
          <p>
            This submission captures strong validation data: role, student count, and intended use
            case. You can replace this modal with a real form submission endpoint anytime.
          </p>
        </div>
      </Modal>
    </div>
  );
}
