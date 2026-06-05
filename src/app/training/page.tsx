"use client";

import { useMemo, useState } from "react";
import PageShell from "@/components/PageShell";
import { useStub } from "@/components/pageShellContext";
import { COURSES, TRACKS, type Course, type Track } from "@/lib/mock/training";

type TrackFilter = "All" | Track;

// Training catalog. Track filter, an overall progress summary, and course
// cards with progress rings. Continue/Start is a placeholder action. All
// progress is fabricated.
export default function TrainingPage() {
  const [track, setTrack] = useState<TrackFilter>("All");

  const filtered = useMemo(
    () =>
      track === "All" ? COURSES : COURSES.filter((c) => c.track === track),
    [track]
  );

  const totalLessons = COURSES.reduce((s, c) => s + c.lessons, 0);
  const doneLessons = COURSES.reduce((s, c) => s + c.completedLessons, 0);
  const overallPct = Math.round((doneLessons / totalLessons) * 100);

  return (
    <PageShell
      active="/training"
      eyebrow="Learning"
      title="Training"
      description="Onboarding ramp and skill-building tracks. Pick up where you left off. Sample progress only."
    >
      {/* Overall progress banner */}
      <div className="mb-6 flex flex-col gap-5 rounded-2xl border border-white/50 bg-white/60 p-6 shadow-sm backdrop-blur-xl backdrop-saturate-150 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-lg font-bold text-mr-dark">
            Your overall progress
          </h2>
          <p className="mt-1 text-sm text-body">
            {doneLessons} of {totalLessons} lessons complete across all tracks.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-3 w-48 overflow-hidden rounded-full bg-mr-pale/25">
            <div
              className="h-full rounded-full bg-gradient-to-r from-mr-base to-mr-light transition-all duration-700"
              style={{ width: `${overallPct}%` }}
            />
          </div>
          <span className="font-heading text-xl font-bold text-mr-base">
            {overallPct}%
          </span>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {(["All", ...TRACKS] as TrackFilter[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTrack(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              track === t
                ? "bg-mr-base text-white shadow-sm"
                : "border border-mr-base/15 bg-white/60 text-body hover:text-mr-base"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </PageShell>
  );
}

function CourseCard({ course }: { course: Course }) {
  const openStub = useStub();
  const pct = Math.round((course.completedLessons / course.lessons) * 100);
  const done = pct === 100;
  const started = course.completedLessons > 0;
  const cta = done ? "Review" : started ? "Continue" : "Start";

  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/60 bg-white/60 p-5 shadow-sm backdrop-blur-xl backdrop-saturate-150 transition duration-200 hover:-translate-y-0.5 hover:border-mr-light/50 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="rounded-full bg-mr-pale/25 px-2.5 py-0.5 text-xs font-semibold text-mr-base">
            {course.track}
          </span>
          <h3 className="mt-3 font-heading text-base font-bold text-mr-dark">
            {course.title}
          </h3>
        </div>
        <Ring pct={pct} />
      </div>

      <p className="mt-2 flex-1 text-sm text-body">{course.summary}</p>

      <p className="mt-3 text-xs text-body">
        {course.completedLessons}/{course.lessons} lessons · {course.minutes}{" "}
        min
      </p>

      <button
        type="button"
        onClick={() =>
          openStub({
            kind: `Training · ${course.track}`,
            title: course.title,
            detail: `${cta} this course. The live player would open lesson ${
              done ? course.lessons : course.completedLessons + 1
            } of ${course.lessons} with video, notes, and a quiz. Progress is fabricated for this reference build.`,
          })
        }
        className={`mt-4 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
          done
            ? "border border-mr-base/20 bg-white/70 text-mr-base hover:bg-white"
            : "bg-mr-base text-white hover:bg-mr-mid"
        }`}
      >
        {cta}
      </button>
    </div>
  );
}

function Ring({ pct }: { pct: number }) {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" className="flex-none">
      <circle
        cx="24"
        cy="24"
        r={r}
        fill="none"
        stroke="#8BB8C4"
        strokeOpacity="0.3"
        strokeWidth="5"
      />
      <circle
        cx="24"
        cy="24"
        r={r}
        fill="none"
        stroke="#316878"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform="rotate(-90 24 24)"
      />
      <text
        x="24"
        y="24"
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-mr-dark font-heading text-[0.6rem] font-bold"
      >
        {pct}%
      </text>
    </svg>
  );
}
