"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { useAgentProfile } from "@/components/AgentProfileProvider";
import { SUBNAV_ITEMS, PRIMARY_NAV_COUNT } from "@/lib/mockData";

// Shared sticky top navigation used on the home dashboard and every subpage.
// Primary items show inline; the rest collapse into a More dropdown so the bar
// stays clean as the app grows. The agent chip links to Settings.
export default function MainNav({ active }: { active?: string }) {
  const { profile, initials } = useAgentProfile();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const primary = SUBNAV_ITEMS.slice(0, PRIMARY_NAV_COUNT);
  const overflow = SUBNAV_ITEMS.slice(PRIMARY_NAV_COUNT);
  const overflowActive = overflow.some((i) => i.href === active);

  // Close the More menu on outside click or Escape.
  useEffect(() => {
    if (!moreOpen) return;
    const onDown = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMoreOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

  const linkClass = (isActive: boolean) =>
    `rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-mr-base text-white shadow-sm"
        : "text-body hover:bg-mr-pale/20 hover:text-mr-base"
    }`;

  return (
    <header className="sticky top-0 z-30 border-b border-mr-base/10 bg-surface-light/70 backdrop-blur-xl backdrop-saturate-150 print:hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" aria-label="Marshall Reddick home">
            <Logo theme="light" variant="logotype" width={160} priority />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {primary.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={linkClass(item.href === active)}
              >
                {item.label}
              </Link>
            ))}

            <div className="relative" ref={moreRef}>
              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                aria-expanded={moreOpen}
                className={linkClass(overflowActive)}
              >
                More
                <span aria-hidden className="ml-1 text-xs">
                  {moreOpen ? "▴" : "▾"}
                </span>
              </button>

              {moreOpen ? (
                <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-white/60 bg-white/90 p-1.5 shadow-xl backdrop-blur-xl">
                  {overflow.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMoreOpen(false)}
                      className={`block rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                        item.href === active
                          ? "bg-mr-base text-white"
                          : "text-mr-dark hover:bg-mr-pale/20"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </nav>
        </div>

        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-full border border-mr-base/10 bg-white/60 py-1.5 pl-1.5 pr-3 shadow-sm backdrop-blur transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-mr-light"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-mr-light to-mr-base text-sm font-semibold text-white">
            {initials}
          </span>
          <span className="hidden text-sm font-semibold text-mr-dark sm:block">
            {profile.name}
          </span>
        </Link>
      </div>
    </header>
  );
}
