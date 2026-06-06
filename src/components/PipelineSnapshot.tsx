"use client";

import Link from "next/link";
import { PIPELINE_STAGES, type StubContent } from "@/lib/mockData";

interface PipelineSnapshotProps {
  onOpenStub: (content: StubContent) => void;
}

// Light CRM-style strip showing fabricated clients across the pipeline stages.
// Scrolls horizontally on small screens, settles into columns on wide ones.
export default function PipelineSnapshot({
  onOpenStub,
}: PipelineSnapshotProps) {
  return (
    <section id="pipeline" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-mr-dark">
            Pipeline Snapshot
          </h2>
          <p className="mt-1 text-sm text-body">
            Sample clients moving through the pipeline. All names are made up.
          </p>
        </div>
        <Link
          href="/pipeline"
          className="flex-none rounded-full border border-mr-base/20 bg-white/70 px-4 py-2 text-sm font-semibold text-mr-base transition-colors hover:bg-white"
        >
          Open pipeline
        </Link>
      </div>

      <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-5 lg:overflow-visible">
        {PIPELINE_STAGES.map((stage) => (
          <div
            key={stage.id}
            className="w-64 flex-none snap-start rounded-2xl border border-white/60 bg-white/45 p-4 shadow-sm backdrop-blur-xl backdrop-saturate-150 lg:w-auto"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-heading text-sm font-bold text-mr-dark">
                {stage.label}
              </h3>
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-mr-pale/25 px-2 text-xs font-semibold text-mr-base">
                {stage.clients.length}
              </span>
            </div>
            <p className="mb-3 text-xs text-body">{stage.hint}</p>

            <div className="flex flex-col gap-2">
              {stage.clients.map((client) => (
                <button
                  key={client.id}
                  type="button"
                  onClick={() =>
                    onOpenStub({
                      kind: `Pipeline · ${stage.label}`,
                      title: client.name,
                      detail: `Placeholder client card for ${client.name} (${client.detail}). The live card would show contact details, market analysis status, notes, and the next scheduled touch. This is fabricated sample data.`,
                    })
                  }
                  className="w-full rounded-xl border border-white/70 bg-white/70 p-3 text-left shadow-sm transition-colors hover:border-mr-light/50 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-mr-light"
                >
                  <span className="flex items-center gap-2">
                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-gradient-to-br from-mr-light to-mr-base text-[0.6rem] font-bold text-white">
                      {client.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-mr-dark">
                        {client.name}
                      </span>
                      <span className="block truncate text-xs text-body">
                        {client.detail}
                      </span>
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
