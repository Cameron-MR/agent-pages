"use client";

import { useEffect } from "react";

// The set of dashboard sections an agent can show, hide, and reorder. Hero is
// not listed here because the agent identity banner always shows.
export type SectionId =
  | "today"
  | "market"
  | "pipeline"
  | "quicklaunch"
  | "hub"
  | "announcements";

export const SECTION_LABELS: Record<SectionId, string> = {
  today: "Today (appointments, tasks, deadlines, leads)",
  market: "Market pulse",
  pipeline: "Pipeline snapshot",
  quicklaunch: "Quick launch apps",
  hub: "Everywhere else (hub grid)",
  announcements: "Announcements",
};

export const DEFAULT_SECTIONS: SectionId[] = [
  "today",
  "market",
  "pipeline",
  "quicklaunch",
  "hub",
  "announcements",
];

const STORAGE_KEY = "mr-dashboard-config";

// Read the saved layout, repairing it against the current section registry so
// renamed or removed sections never break the dashboard.
export function loadSections(): SectionId[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SECTIONS;
    const parsed = JSON.parse(raw) as SectionId[];
    const valid = parsed.filter((id) => id in SECTION_LABELS);
    return valid.length ? valid : DEFAULT_SECTIONS;
  } catch {
    return DEFAULT_SECTIONS;
  }
}

function saveSections(sections: SectionId[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sections));
  } catch {
    // Ignore write failures; choice still applies for this session.
  }
}

interface Props {
  open: boolean;
  // The currently visible sections, in order.
  sections: SectionId[];
  onChange: (next: SectionId[]) => void;
  onClose: () => void;
}

// Customize panel. Visible sections appear in order with reorder controls;
// hidden sections sit below and can be added back. Every change persists.
export default function DashboardCustomizer({
  open,
  sections,
  onChange,
  onClose,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const hidden = (Object.keys(SECTION_LABELS) as SectionId[]).filter(
    (id) => !sections.includes(id)
  );

  const apply = (next: SectionId[]) => {
    onChange(next);
    saveSections(next);
  };

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= sections.length) return;
    const next = [...sections];
    [next[index], next[target]] = [next[target], next[index]];
    apply(next);
  };

  const remove = (id: SectionId) => apply(sections.filter((s) => s !== id));
  const add = (id: SectionId) => apply([...sections, id]);
  const reset = () => apply(DEFAULT_SECTIONS);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Customize dashboard"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center bg-mr-dark/30 p-4 backdrop-blur-sm sm:items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/70 bg-white/90 p-7 shadow-[0_30px_80px_-30px_rgba(28,60,69,0.45)] backdrop-blur-2xl"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-mr-light">
              Personalize
            </p>
            <h2 className="mt-1 font-heading text-2xl font-bold text-mr-dark">
              Customize dashboard
            </h2>
            <p className="mt-1 text-sm text-body">
              Choose which sections show and in what order.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-mr-base/15 bg-white/70 text-mr-base hover:bg-white"
          >
            &times;
          </button>
        </div>

        <p className="mt-6 mb-2 text-xs font-semibold uppercase tracking-wide text-mr-base">
          Showing
        </p>
        <div className="flex flex-col gap-2">
          {sections.map((id, i) => (
            <div
              key={id}
              className="flex items-center gap-3 rounded-xl border border-white/60 bg-white/70 p-3"
            >
              <span className="flex flex-col">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  aria-label="Move up"
                  className="text-mr-base disabled:opacity-25"
                >
                  ▴
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === sections.length - 1}
                  aria-label="Move down"
                  className="text-mr-base disabled:opacity-25"
                >
                  ▾
                </button>
              </span>
              <span className="flex-1 text-sm font-medium text-mr-dark">
                {SECTION_LABELS[id]}
              </span>
              <button
                type="button"
                onClick={() => remove(id)}
                className="rounded-full border border-mr-base/15 px-3 py-1 text-xs font-medium text-mr-base hover:bg-mr-pale/20"
              >
                Hide
              </button>
            </div>
          ))}
          {sections.length === 0 ? (
            <p className="rounded-xl border border-dashed border-mr-base/20 px-3 py-6 text-center text-xs text-body">
              Nothing showing. Add a section below.
            </p>
          ) : null}
        </div>

        {hidden.length > 0 ? (
          <>
            <p className="mt-6 mb-2 text-xs font-semibold uppercase tracking-wide text-body">
              Hidden
            </p>
            <div className="flex flex-col gap-2">
              {hidden.map((id) => (
                <div
                  key={id}
                  className="flex items-center gap-3 rounded-xl border border-white/60 bg-white/40 p-3"
                >
                  <span className="flex-1 text-sm text-body">
                    {SECTION_LABELS[id]}
                  </span>
                  <button
                    type="button"
                    onClick={() => add(id)}
                    className="rounded-full bg-mr-base px-3 py-1 text-xs font-semibold text-white hover:bg-mr-mid"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : null}

        <div className="mt-7 flex items-center justify-between">
          <button
            type="button"
            onClick={reset}
            className="text-sm font-medium text-mr-base hover:text-mr-mid"
          >
            Reset to default
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-mr-base px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-mr-mid"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
