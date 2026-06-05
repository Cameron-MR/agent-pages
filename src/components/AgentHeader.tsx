"use client";

import { CURRENT_AGENT, AGENT_STATS, type StubContent } from "@/lib/mockData";

interface AgentHeaderProps {
  onOpenStub: (content: StubContent) => void;
}

// Agent profile header: welcome line, name, title, a swappable avatar block,
// and three fabricated, clickable stat tiles.
export default function AgentHeader({ onOpenStub }: AgentHeaderProps) {
  return (
    <section id="dashboard" className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        {/* Avatar placeholder. Gradient block with initials, easy to swap for a
            real photo later without touching layout. */}
        <div className="flex h-20 w-20 flex-none items-center justify-center rounded-3xl bg-gradient-to-br from-mr-light to-mr-base text-2xl font-bold text-white shadow-lg shadow-mr-base/20 sm:h-24 sm:w-24">
          {CURRENT_AGENT.initials}
        </div>

        <div>
          <p className="text-sm font-medium text-mr-light">
            Welcome back, {CURRENT_AGENT.name.split(" ")[0]}
          </p>
          <h1 className="mt-1 font-heading text-3xl font-bold tracking-tight text-mr-dark sm:text-4xl">
            {CURRENT_AGENT.name}
          </h1>
          <p className="mt-1 text-sm text-body">{CURRENT_AGENT.title}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {AGENT_STATS.map((stat) => (
          <button
            key={stat.label}
            type="button"
            onClick={() =>
              onOpenStub({
                kind: "Stat",
                title: stat.label,
                detail: stat.detail,
              })
            }
            className="group rounded-2xl border border-white/70 bg-white/60 p-5 text-left shadow-sm backdrop-blur-xl backdrop-saturate-150 transition duration-300 hover:-translate-y-0.5 hover:border-mr-light/40 hover:bg-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-mr-light"
          >
            <p className="font-heading text-3xl font-bold text-mr-base">
              {stat.value}
            </p>
            <p className="mt-1 text-sm font-medium text-body">{stat.label}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
