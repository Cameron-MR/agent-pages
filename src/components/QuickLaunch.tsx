"use client";

import { appLaunchers, type StubContent } from "@/lib/mockData";

interface QuickLaunchProps {
  onOpenStub: (content: StubContent) => void;
}

// "Launch": compact single sign-on style tiles for the external tools an agent
// opens all day. Wraps into a grid; each tile opens the shared stub modal.
export default function QuickLaunch({ onOpenStub }: QuickLaunchProps) {
  return (
    <section>
      <h2 className="mb-4 font-heading text-2xl font-bold text-mr-dark">
        Launch
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
        {appLaunchers.map((app) => (
          <button
            key={app.name}
            type="button"
            onClick={() =>
              onOpenStub({
                kind: "Launch tool",
                title: app.name,
                detail: `Placeholder single sign-on into ${app.name}. The live tile would open ${app.name} in a new tab with the agent already authenticated. ${app.desc}. Fabricated sample data.`,
              })
            }
            className="group flex h-full flex-col gap-2 rounded-2xl border border-white/40 bg-white/60 p-4 text-left shadow-sm backdrop-blur-xl backdrop-saturate-150 transition duration-200 hover:-translate-y-0.5 hover:border-mr-light/50 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-mr-light"
          >
            <span className="inline-flex w-fit rounded-full bg-mr-pale/25 px-2 py-0.5 text-xs font-medium text-mr-base">
              {app.category}
            </span>
            <span className="font-heading text-sm font-semibold text-mr-dark">
              {app.name}
            </span>
            <span className="text-xs text-body">{app.desc}</span>
            <span className="mt-auto text-xs font-medium text-mr-base transition-transform duration-200 group-hover:translate-x-0.5">
              Open
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
