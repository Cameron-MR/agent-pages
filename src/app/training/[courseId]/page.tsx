"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import PageShell from "@/components/PageShell";
import {
  getCourse,
  courseLessons,
  loadCourseProgress,
  saveCourseProgress,
  type CourseBlock,
  type InteractiveCourse,
} from "@/lib/mock/courses";

// Guided interactive course player. Module sidebar with progress, typed
// content blocks (text, callouts, lists, tables, quizzes, an interactive
// property classifier, takeaways), checkpoint quizzes with instant feedback,
// and per-device progress. Completing the last lesson shows a completion
// screen with every takeaway from the course.
export default function CoursePage() {
  const params = useParams<{ courseId: string }>();
  const course = getCourse(params.courseId);

  if (!course) {
    return (
      <PageShell
        active="/training"
        eyebrow="Training"
        title="Course not found"
        description="That course does not exist."
      >
        <Link href="/training" className="text-sm font-semibold text-mr-base underline">
          Back to Training
        </Link>
      </PageShell>
    );
  }

  return <CoursePlayer course={course} />;
}

function CoursePlayer({ course }: { course: InteractiveCourse }) {
  const lessons = useMemo(() => courseLessons(course), [course]);
  const [done, setDone] = useState<string[]>([]);
  const [activeId, setActiveId] = useState(lessons[0].id);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    const saved = loadCourseProgress(course.id);
    setDone(saved);
    // Resume at the first incomplete lesson.
    const next = lessons.find((l) => !saved.includes(l.id));
    setActiveId((next ?? lessons[0]).id);
  }, [course.id, lessons]);

  const active = lessons.find((l) => l.id === activeId) ?? lessons[0];
  const activeIndex = lessons.findIndex((l) => l.id === active.id);
  const pct = Math.round((done.length / lessons.length) * 100);
  const courseComplete = done.length === lessons.length;

  const completeLesson = () => {
    const next = done.includes(active.id) ? done : [...done, active.id];
    setDone(next);
    saveCourseProgress(course.id, next);
    if (activeIndex < lessons.length - 1) {
      setActiveId(lessons[activeIndex + 1].id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setCelebrate(true);
    }
  };

  const allTakeaways = lessons.flatMap((l) =>
    l.blocks.filter((b): b is Extract<CourseBlock, { kind: "takeaways" }> => b.kind === "takeaways").flatMap((b) => b.items)
  );

  return (
    <PageShell
      active="/training"
      eyebrow={`Training · ${course.category}`}
      title={course.title}
      description={course.summary}
    >
      {/* Progress header */}
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-white/50 bg-white/60 p-5 shadow-sm backdrop-blur-xl backdrop-saturate-150 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="h-2.5 w-44 overflow-hidden rounded-full bg-mr-pale/25">
            <div
              className="h-full rounded-full bg-gradient-to-r from-mr-base to-mr-light transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-mr-base">
            {done.length}/{lessons.length} lessons
          </span>
          <span className="text-xs text-body">· {course.level}</span>
        </div>
        <Link
          href="/training"
          className="text-sm font-medium text-mr-base hover:text-mr-mid"
        >
          ← All training
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        {/* Module sidebar */}
        <aside className="h-fit rounded-2xl border border-white/50 bg-white/60 p-4 shadow-sm backdrop-blur-xl backdrop-saturate-150 lg:sticky lg:top-24">
          {course.modules.map((m, mi) => (
            <div key={m.id} className={mi > 0 ? "mt-4" : ""}>
              <p className="px-2 text-xs font-semibold uppercase tracking-wide text-mr-base">
                Module {mi + 1}: {m.title}
              </p>
              <div className="mt-1.5 flex flex-col gap-1">
                {m.lessons.map((l) => {
                  const isDone = done.includes(l.id);
                  const isActive = l.id === active.id;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => setActiveId(l.id)}
                      className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm transition-colors ${
                        isActive
                          ? "bg-mr-base font-semibold text-white shadow-sm"
                          : "text-mr-dark hover:bg-mr-pale/20"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 flex-none items-center justify-center rounded-full text-[0.6rem] font-bold ${
                          isDone
                            ? "bg-mr-light text-mr-dark"
                            : isActive
                            ? "border border-white/50 text-white"
                            : "border border-mr-base/25 text-mr-base"
                        }`}
                      >
                        {isDone ? "✓" : ""}
                      </span>
                      <span className="min-w-0 flex-1 truncate">{l.title}</span>
                      <span
                        className={`flex-none text-[0.65rem] ${
                          isActive ? "text-white/70" : "text-body"
                        }`}
                      >
                        {l.minutes}m
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </aside>

        {/* Lesson content */}
        <div>
          {celebrate || (courseComplete && activeIndex === lessons.length - 1 && done.includes(active.id)) ? (
            <CompletionCard
              course={course}
              takeaways={allTakeaways}
              onReview={() => {
                setCelebrate(false);
                setActiveId(lessons[0].id);
              }}
            />
          ) : (
            <article className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-mr-base">
                Lesson {activeIndex + 1} of {lessons.length} · {active.minutes} min
              </p>
              <h2 className="mt-1 font-heading text-2xl font-bold text-mr-dark">
                {active.title}
              </h2>

              <div className="mt-5 flex flex-col gap-5">
                {active.blocks.map((b, i) => (
                  <Block key={`${active.id}-${i}`} block={b} />
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-mr-base/10 pt-5">
                <button
                  type="button"
                  disabled={activeIndex === 0}
                  onClick={() => setActiveId(lessons[activeIndex - 1].id)}
                  className={`rounded-full border border-mr-base/20 bg-white/70 px-5 py-2.5 text-sm font-semibold transition-colors ${
                    activeIndex === 0
                      ? "cursor-default text-mr-pale"
                      : "text-mr-base hover:bg-white"
                  }`}
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={completeLesson}
                  className="rounded-full bg-mr-base px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-mr-mid"
                >
                  {activeIndex === lessons.length - 1
                    ? done.includes(active.id)
                      ? "View completion"
                      : "Finish course"
                    : done.includes(active.id)
                    ? "Next lesson →"
                    : "Complete and continue →"}
                </button>
              </div>
            </article>
          )}
        </div>
      </div>
    </PageShell>
  );
}

// ---------------------------------------------------------------------------
// Blocks
// ---------------------------------------------------------------------------

function Block({ block }: { block: CourseBlock }) {
  switch (block.kind) {
    case "text":
      return <p className="text-sm leading-relaxed text-body">{block.body}</p>;
    case "callout":
      return (
        <div className="rounded-2xl border border-mr-light/40 bg-mr-pale/15 p-5">
          <p className="font-heading text-sm font-bold text-mr-base">
            {block.title}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-mr-dark">{block.body}</p>
        </div>
      );
    case "list":
      return (
        <div>
          {block.title ? (
            <p className="mb-2 font-heading text-sm font-bold text-mr-dark">
              {block.title}
            </p>
          ) : null}
          <div className="flex flex-col gap-1.5">
            {block.items.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-mr-base/10 bg-white/70 px-4 py-2.5"
              >
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-mr-pale/30 text-[0.65rem] font-bold text-mr-base">
                  {block.ordered ? i + 1 : "•"}
                </span>
                <span className="text-sm leading-relaxed text-mr-dark">{item}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case "table":
      return (
        <div>
          {block.title ? (
            <p className="mb-2 font-heading text-sm font-bold text-mr-dark">
              {block.title}
            </p>
          ) : null}
          <div className="overflow-hidden rounded-2xl border border-mr-base/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-mr-dark text-left text-white">
                  {block.headers.map((h, i) => (
                    <th key={i} className="px-4 py-2.5 text-xs font-bold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr key={ri} className={ri % 2 ? "bg-white/70" : "bg-mr-pale/10"}>
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`px-4 py-2.5 ${
                          ci === 0 ? "font-semibold text-mr-dark" : "text-body"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case "quiz":
      return <Quiz block={block} />;
    case "classifier":
      return <Classifier />;
    case "takeaways":
      return (
        <div className="rounded-2xl bg-gradient-to-br from-mr-dark to-mr-base p-6 text-white">
          <p className="font-heading text-sm font-bold uppercase tracking-wide text-mr-pale">
            Key takeaways
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {block.items.map((t, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-mr-light text-[0.6rem] font-bold text-mr-dark">
                  ✓
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      );
    default:
      return null;
  }
}

// Checkpoint quiz with instant feedback.
function Quiz({
  block,
}: {
  block: Extract<CourseBlock, { kind: "quiz" }>;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const correct = picked === block.answer;

  return (
    <div className="rounded-2xl border border-mr-base/15 bg-white/80 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-mr-base">
        Checkpoint
      </p>
      <p className="mt-1 font-heading text-base font-bold text-mr-dark">
        {block.question}
      </p>
      <div className="mt-3 flex flex-col gap-2">
        {block.options.map((opt, i) => {
          const isPicked = picked === i;
          const isAnswer = i === block.answer;
          const show = picked !== null;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setPicked(i)}
              className={`rounded-xl border px-4 py-2.5 text-left text-sm transition-colors ${
                show && isAnswer
                  ? "border-emerald-400 bg-emerald-50 font-semibold text-emerald-800"
                  : show && isPicked && !isAnswer
                  ? "border-red-300 bg-red-50 text-red-700"
                  : isPicked
                  ? "border-mr-base bg-mr-pale/20 text-mr-dark"
                  : "border-mr-base/15 bg-white/70 text-mr-dark hover:border-mr-light/60"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {picked !== null ? (
        <p
          className={`mt-3 rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
            correct ? "bg-emerald-50 text-emerald-800" : "bg-mr-pale/15 text-mr-dark"
          }`}
        >
          {correct ? "Correct. " : "Not quite. "}
          {block.explain}
        </p>
      ) : null}
    </div>
  );
}

// Live Reddick Property Rating classifier (the ebook formulas, interactive).
function Classifier() {
  const [median, setMedian] = useState(400000);
  const [value, setValue] = useState(350000);
  const [perUnit, setPerUnit] = useState(false);

  const bands = perUnit
    ? { lux: 0.9, a: 0.7, b: 0.5, c: 0.3 }
    : { lux: 1.3, a: 1.0, b: 0.8, c: 0.5 };

  const m = Math.max(1, median);
  const ratio = value / m;
  const cls =
    ratio > bands.lux
      ? "Luxury"
      : ratio > bands.a
      ? "A Class"
      : ratio > bands.b
      ? "B Class"
      : ratio > bands.c
      ? "C Class"
      : "D Class";

  // Border check: within 5% of any dividing line.
  const nearLine = [bands.lux, bands.a, bands.b, bands.c].some(
    (line) => Math.abs(ratio - line) <= 0.05
  );

  const money = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  const scalePct = Math.min(100, (ratio / (bands.lux * 1.25)) * 100);

  return (
    <div className="rounded-2xl border border-mr-light/40 bg-white/80 p-5">
      <p className="font-heading text-sm font-bold text-mr-dark">
        Reddick Property Rating classifier
      </p>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-mr-dark">
            MSA median home price
          </span>
          <input
            type="number"
            value={median}
            step={10000}
            onChange={(e) => setMedian(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-mr-base/15 bg-white px-3 py-2 text-sm text-mr-dark outline-none focus:border-mr-light focus:ring-2 focus:ring-mr-light/40"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-mr-dark">
            Property value {perUnit ? "(per unit)" : ""}
          </span>
          <input
            type="number"
            value={value}
            step={10000}
            onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-mr-base/15 bg-white px-3 py-2 text-sm text-mr-dark outline-none focus:border-mr-light focus:ring-2 focus:ring-mr-light/40"
          />
        </label>
        <div>
          <span className="mb-1 block text-xs font-medium text-mr-dark">
            Property type
          </span>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => setPerUnit(false)}
              className={`flex-1 rounded-xl px-2 py-2 text-xs font-semibold transition-colors ${
                !perUnit
                  ? "bg-mr-base text-white"
                  : "border border-mr-base/15 bg-white/70 text-body"
              }`}
            >
              SFR
            </button>
            <button
              type="button"
              onClick={() => setPerUnit(true)}
              className={`flex-1 rounded-xl px-2 py-2 text-xs font-semibold transition-colors ${
                perUnit
                  ? "bg-mr-base text-white"
                  : "border border-mr-base/15 bg-white/70 text-body"
              }`}
            >
              Per unit
            </button>
          </div>
        </div>
      </div>

      {/* Scale */}
      <div className="relative mt-5 h-3 overflow-hidden rounded-full bg-gradient-to-r from-mr-pale/40 via-mr-light/50 to-mr-base">
        <span
          className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-mr-dark shadow transition-all duration-300"
          style={{ left: `${scalePct}%` }}
        />
      </div>
      <div className="mt-1 flex justify-between text-[0.65rem] text-body">
        <span>D</span>
        <span>C</span>
        <span>B</span>
        <span>A</span>
        <span>Luxury</span>
      </div>

      <div className="mt-4 rounded-xl bg-mr-pale/15 p-4 text-center">
        <p className="text-xs text-body">
          {money(value)} is {Math.round(ratio * 100)}% of the {money(m)} median
        </p>
        <p className="mt-1 font-heading text-2xl font-bold text-mr-base">{cls}</p>
        {nearLine ? (
          <p className="mt-1 text-xs font-medium text-amber-700">
            Within 5% of a dividing line: use the physical attributes (type,
            age, size, condition) as the tiebreaker.
          </p>
        ) : null}
      </div>
    </div>
  );
}

// Completion screen with every takeaway from the course.
function CompletionCard({
  course,
  takeaways,
  onReview,
}: {
  course: InteractiveCourse;
  takeaways: string[];
  onReview: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/60 shadow-lg">
      <div className="bg-gradient-to-br from-mr-dark to-mr-base px-8 py-10 text-center text-white">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mr-light text-2xl text-mr-dark">
          ✓
        </span>
        <h2 className="mt-4 font-heading text-3xl font-bold">Course complete</h2>
        <p className="mt-2 text-sm text-mr-pale">
          {course.title} · every lesson and checkpoint finished.
        </p>
      </div>
      <div className="bg-white/85 p-8 backdrop-blur">
        <p className="font-heading text-sm font-bold uppercase tracking-wide text-mr-base">
          Everything you should walk away with
        </p>
        <ul className="mt-3 flex flex-col gap-2">
          {takeaways.map((t, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-mr-dark">
              <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-mr-pale/30 text-[0.6rem] font-bold text-mr-base">
                ✓
              </span>
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={onReview}
            className="flex-1 rounded-full border border-mr-base/20 bg-white/70 px-5 py-2.5 text-sm font-semibold text-mr-base transition-colors hover:bg-white"
          >
            Review the course
          </button>
          <Link
            href="/training"
            className="flex-1 rounded-full bg-mr-base px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-mr-mid"
          >
            Back to Training
          </Link>
        </div>
      </div>
    </div>
  );
}
