"use client";

import { useEffect, useMemo, useState } from "react";
import PageShell from "@/components/PageShell";
import { COURSES, TRACKS, type Course, type Track } from "@/lib/mock/training";

type TrackFilter = "All" | Track;

// Training catalog. Track filter, an overall progress summary, course cards
// with progress rings, and a working faux course player: opening a course
// shows its lesson list and "Complete lesson" advances progress, persisted to
// localStorage (mr-training-progress). All content is fabricated.

const PROGRESS_KEY = "mr-training-progress";

function loadProgress(): Record<string, number> {
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY);
    const parsed = raw ? (JSON.parse(raw) as Record<string, number>) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveProgress(p: Record<string, number>) {
  try {
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
  } catch {
    // ignore
  }
}

export default function TrainingPage() {
  const [track, setTrack] = useState<TrackFilter>("All");
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  // Courses with any saved progress layered over the sample data.
  const courses: Course[] = useMemo(
    () =>
      COURSES.map((c) => ({
        ...c,
        completedLessons: Math.min(
          c.lessons,
          progress[c.id] ?? c.completedLessons
        ),
      })),
    [progress]
  );

  const filtered = useMemo(
    () =>
      track === "All" ? courses : courses.filter((c) => c.track === track),
    [track, courses]
  );

  const openCourse = courses.find((c) => c.id === openId) ?? null;

  const completeLesson = (c: Course) => {
    const next = {
      ...progress,
      [c.id]: Math.min(c.lessons, c.completedLessons + 1),
    };
    setProgress(next);
    saveProgress(next);
  };

  const totalLessons = courses.reduce((s, c) => s + c.lessons, 0);
  const doneLessons = courses.reduce((s, c) => s + c.completedLessons, 0);
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
          <CourseCard key={c.id} course={c} onOpen={() => setOpenId(c.id)} />
        ))}
      </div>

      {openCourse ? (
        <CoursePlayer
          course={openCourse}
          onComplete={() => completeLesson(openCourse)}
          onClose={() => setOpenId(null)}
        />
      ) : null}
    </PageShell>
  );
}

function CourseCard({
  course,
  onOpen,
}: {
  course: Course;
  onOpen: () => void;
}) {
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
        onClick={onOpen}
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

// Faux course player: lesson list with check states, a placeholder video pane,
// and a working "Complete lesson" that advances saved progress.
function CoursePlayer({
  course,
  onComplete,
  onClose,
}: {
  course: Course;
  onComplete: () => void;
  onClose: () => void;
}) {
  const done = course.completedLessons >= course.lessons;
  const current = Math.min(course.completedLessons + 1, course.lessons);

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-mr-dark/50 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/70 bg-white shadow-2xl"
      >
        {/* Faux video pane */}
        <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-mr-dark to-mr-base sm:h-56">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            &times;
          </button>
          <div className="text-center text-white">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-xl">
              &#9654;
            </span>
            <p className="mt-3 text-sm font-semibold">
              {done
                ? "Course complete. Replay any lesson."
                : `Lesson ${current}: sample player`}
            </p>
            <p className="text-xs text-white/70">
              Video, notes, and quiz would load here. Placeholder.
            </p>
          </div>
        </div>

        <div className="p-6">
          <span className="rounded-full bg-mr-pale/25 px-2.5 py-0.5 text-xs font-semibold text-mr-base">
            {course.track}
          </span>
          <h2 className="mt-2 font-heading text-xl font-bold text-mr-dark">
            {course.title}
          </h2>
          <p className="mt-1 text-sm text-body">{course.summary}</p>

          {/* Lesson list */}
          <div className="mt-4 max-h-48 overflow-y-auto rounded-2xl border border-mr-base/10">
            {Array.from({ length: course.lessons }, (_, i) => {
              const isDone = i < course.completedLessons;
              const isNext = i === course.completedLessons;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 border-b border-mr-base/5 px-4 py-2.5 text-sm last:border-0 ${
                    isNext ? "bg-mr-pale/15" : ""
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 flex-none items-center justify-center rounded-full text-xs font-bold ${
                      isDone
                        ? "bg-mr-base text-white"
                        : "border border-mr-base/20 text-mr-base"
                    }`}
                  >
                    {isDone ? "✓" : i + 1}
                  </span>
                  <span
                    className={
                      isDone ? "text-body line-through" : "font-medium text-mr-dark"
                    }
                  >
                    Lesson {i + 1} of {course.lessons}
                    {isNext && !done ? " · up next" : ""}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-full border border-mr-base/20 bg-white/70 px-5 py-2.5 text-sm font-semibold text-mr-base hover:bg-white"
            >
              Close
            </button>
            <button
              type="button"
              onClick={onComplete}
              disabled={done}
              className={`flex-1 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                done
                  ? "cursor-default bg-mr-pale/30 text-mr-base"
                  : "bg-mr-base text-white hover:bg-mr-mid"
              }`}
            >
              {done ? "All lessons complete" : `Complete lesson ${current}`}
            </button>
          </div>
        </div>
      </div>
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
