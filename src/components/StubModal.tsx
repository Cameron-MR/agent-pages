"use client";

import { useEffect } from "react";
import type { StubContent } from "@/lib/mockData";

interface StubModalProps {
  content: StubContent | null;
  onClose: () => void;
}

// Shared light-glass stub modal. Any clickable surface in the hub opens it.
// Closable by backdrop click, the X button, or Escape. Renders nothing when
// no content is set.
export default function StubModal({ content, onClose }: StubModalProps) {
  useEffect(() => {
    if (!content) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [content, onClose]);

  if (!content) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="stub-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center bg-mr-dark/30 p-4 backdrop-blur-sm sm:items-center"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={`relative max-h-[90vh] w-full overflow-y-auto rounded-3xl border border-white/70 bg-white/80 p-7 shadow-[0_30px_80px_-30px_rgba(28,60,69,0.45)] backdrop-blur-2xl backdrop-saturate-150 sm:p-8 ${
          content.preview ? "max-w-2xl" : "max-w-lg"
        }`}
      >
        {/* Soft teal wash for depth. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-mr-light/25 blur-3xl"
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-mr-base/15 bg-white/70 text-mr-base transition-colors hover:bg-white hover:text-mr-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-mr-light"
        >
          <span aria-hidden className="text-lg leading-none">
            &times;
          </span>
        </button>

        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-widest text-mr-light">
            {content.kind}
          </p>
          <h2
            id="stub-modal-title"
            className="mt-2 font-heading text-2xl font-bold text-mr-dark"
          >
            {content.title}
          </h2>

          {content.preview ? (
            <div className="mt-5 overflow-hidden rounded-2xl border border-white/60 bg-white/50 p-4 shadow-inner">
              {content.preview}
            </div>
          ) : null}

          <p className="mt-4 text-sm leading-relaxed text-body">
            {content.detail}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-mr-base px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-mr-mid focus:outline-none focus-visible:ring-2 focus-visible:ring-mr-light"
            >
              Got it
            </button>
            <span className="rounded-full border border-mr-base/15 bg-mr-pale/20 px-3 py-1 text-xs font-medium text-mr-base">
              Placeholder preview
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
