"use client";

import { marketingTools, type StubContent } from "@/lib/mockData";

interface ToolStripProps {
  onOpenStub: (content: StubContent) => void;
}

// "Builders": the marketing tools an agent can open. Glass tiles with an abbr
// badge; each opens the shared modal framed as launching that builder.
export default function ToolStrip({ onOpenStub }: ToolStripProps) {
  return (
    <section>
      <h2 className="mb-4 font-heading text-2xl font-bold text-mr-dark">
        Builders
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {marketingTools.map((tool) => (
          <button
            key={tool.name}
            type="button"
            onClick={() =>
              onOpenStub({
                kind: "Launch builder",
                title: tool.name,
                detail: `Placeholder for the ${tool.name}. The live builder would open here so the agent can ${tool.desc.toLowerCase().replace(/\.$/, "")}. Fabricated sample, no real tool wired yet.`,
              })
            }
            className="group flex items-center gap-4 rounded-2xl border border-white/40 bg-white/60 p-4 text-left shadow-sm backdrop-blur-xl backdrop-saturate-150 transition duration-200 hover:-translate-y-0.5 hover:border-mr-light/50 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-mr-light"
          >
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-mr-pale/25 text-xs font-bold tracking-wide text-mr-base">
              {tool.abbr}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-heading text-sm font-semibold text-mr-dark">
                {tool.name}
              </span>
              <span className="block truncate text-xs text-body">
                {tool.desc}
              </span>
            </span>
            <span
              aria-hidden
              className="flex-none text-mr-pale transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-mr-base"
            >
              &rarr;
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
