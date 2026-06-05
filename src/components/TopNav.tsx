"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { SUBNAV_ITEMS, CURRENT_AGENT, type StubContent } from "@/lib/mockData";

interface TopNavProps {
  onOpenStub: (content: StubContent) => void;
}

// Light, glassy, sticky top navigation. Teal logotype on the left, real route
// links in the middle (shared with every subpage), and a clickable agent chip
// on the right. Dashboard is the active item on the home page.
export default function TopNav({ onOpenStub }: TopNavProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-mr-base/10 bg-surface-light/70 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" aria-label="Marshall Reddick home">
            <Logo theme="light" variant="logotype" width={170} priority />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {SUBNAV_ITEMS.map((item) => {
              const isActive = item.href === "/";
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-mr-base text-white shadow-sm"
                      : "text-body hover:bg-mr-pale/20 hover:text-mr-base"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <button
          type="button"
          onClick={() =>
            onOpenStub({
              kind: "Agent profile",
              title: CURRENT_AGENT.name,
              detail:
                "Placeholder for the agent profile menu. The live chip would open account settings, notification preferences, and a sign-out option.",
            })
          }
          className="flex items-center gap-3 rounded-full border border-mr-base/10 bg-white/60 py-1.5 pl-1.5 pr-3 shadow-sm backdrop-blur transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-mr-light"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-mr-light to-mr-base text-sm font-semibold text-white">
            {CURRENT_AGENT.initials}
          </span>
          <span className="hidden text-sm font-semibold text-mr-dark sm:block">
            {CURRENT_AGENT.name}
          </span>
        </button>
      </div>
    </header>
  );
}
