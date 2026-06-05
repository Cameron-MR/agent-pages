"use client";

import { useEffect, useRef, useState } from "react";
import { sampleProperty, type StubContent } from "@/lib/mockData";
import OutputGallery from "./OutputGallery";

interface AddressGeneratorProps {
  onOpenStub: (content: StubContent) => void;
}

// Phases cycled through during the mock 1.5s generation.
const PHASES = ["Pulling listing data", "Applying your brand", "Building assets"];

type Status = "idle" | "loading" | "done";

// The hero of the Marketing Studio. A prefilled address input and a teal
// Generate button that runs a 1.5s mock build, then reveals the OutputGallery
// with a smooth fade and slide. All state is local, no real backend.
export default function AddressGenerator({
  onOpenStub,
}: AddressGeneratorProps) {
  const [address, setAddress] = useState(sampleProperty.address);
  const [status, setStatus] = useState<Status>("idle");
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const phaseTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const doneTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleGenerate() {
    if (status === "loading") return;
    setStatus("loading");
    setRevealed(false);
    setPhase(0);
    setProgress(0);

    // Fill the progress bar over the run.
    requestAnimationFrame(() => setProgress(100));

    // Cycle the status text.
    let i = 0;
    phaseTimer.current = setInterval(() => {
      i = (i + 1) % PHASES.length;
      setPhase(i);
    }, 500);

    doneTimer.current = setTimeout(() => {
      if (phaseTimer.current) clearInterval(phaseTimer.current);
      setStatus("done");
    }, 1500);
  }

  // Trigger the reveal transition once the gallery mounts.
  useEffect(() => {
    if (status !== "done") return;
    const id = setTimeout(() => setRevealed(true), 30);
    return () => clearTimeout(id);
  }, [status]);

  // Clean up timers on unmount.
  useEffect(() => {
    return () => {
      if (phaseTimer.current) clearInterval(phaseTimer.current);
      if (doneTimer.current) clearTimeout(doneTimer.current);
    };
  }, []);

  const loading = status === "loading";

  return (
    <section>
      <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/60 p-6 shadow-xl shadow-mr-base/5 backdrop-blur-xl backdrop-saturate-150 sm:p-8">
        {/* Teal wash behind the glass. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-mr-light/20 blur-3xl"
        />

        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-mr-base/15 bg-mr-pale/20 px-3 py-1 text-xs font-medium text-mr-base">
            Sample property, mock generation
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-mr-dark sm:text-4xl">
            Generate marketing in seconds
          </h2>
          <p className="mt-2 text-sm text-body">
            Enter a listing address and we build the full agent-branded asset
            set. This demo runs on a fabricated Newport Beach listing.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            aria-label="Listing address"
            className="flex-1 rounded-2xl border border-white/60 bg-white/80 px-5 py-4 text-sm text-mr-dark shadow-inner outline-none transition focus:border-mr-light focus:ring-2 focus:ring-mr-light/40"
            placeholder="Enter a listing address"
          />
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="flex-none rounded-2xl bg-mr-base px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-mr-base/20 transition duration-200 hover:-translate-y-0.5 hover:bg-mr-mid disabled:cursor-not-allowed disabled:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-mr-light"
          >
            {loading ? "Generating" : "Generate"}
          </button>
        </div>

        {/* Loading state: animated progress bar and cycling status text. */}
        {loading ? (
          <div className="mt-5">
            <div className="h-2 w-full overflow-hidden rounded-full bg-mr-pale/20">
              <div
                className="h-full rounded-full bg-gradient-to-r from-mr-base to-mr-light transition-[width] ease-out"
                style={{ width: `${progress}%`, transitionDuration: "1500ms" }}
              />
            </div>
            <p className="mt-2 animate-pulse text-sm font-medium text-mr-base">
              {PHASES[phase]}
            </p>
          </div>
        ) : null}
      </div>

      {/* Output reveal */}
      {status === "done" ? (
        <div
          className={`mt-8 transition-all duration-500 ease-out ${
            revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="mb-4 flex items-baseline justify-between gap-3">
            <h3 className="font-heading text-xl font-bold text-mr-dark">
              Your assets are ready
            </h3>
            <button
              type="button"
              onClick={handleGenerate}
              className="text-xs font-semibold text-mr-base transition-colors hover:text-mr-mid"
            >
              Regenerate
            </button>
          </div>
          <OutputGallery onOpenStub={onOpenStub} />
        </div>
      ) : null}
    </section>
  );
}
