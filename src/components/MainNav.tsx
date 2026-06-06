"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { useAgentProfile } from "@/components/AgentProfileProvider";
import { useNavPrefs } from "@/components/NavPrefsProvider";
import { NOTIFICATIONS } from "@/lib/mockData";

// Shared sticky top navigation used on the home dashboard and every subpage.
// Primary items show inline; the rest collapse into a More dropdown. Includes
// a command-palette trigger, a notifications bell, a mobile menu, and the
// agent chip linking to Settings.
export default function MainNav({ active }: { active?: string }) {
  const { profile, initials } = useAgentProfile();
  const { items, primaryCount } = useNavPrefs();
  const [moreOpen, setMoreOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [allRead, setAllRead] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      setAllRead(window.localStorage.getItem("mr-notifs-read") === "1");
    } catch {
      // ignore
    }
  }, []);

  const markAllRead = () => {
    setAllRead(true);
    try {
      window.localStorage.setItem("mr-notifs-read", "1");
    } catch {
      // ignore
    }
  };

  // Where each notification kind leads when clicked.
  const notifHref = (kind: string) =>
    kind === "lead"
      ? "/pipeline"
      : kind === "listing"
      ? "/listings"
      : kind === "transaction"
      ? "/pipeline"
      : "/p/jordan-sample";

  const primary = items.slice(0, primaryCount);
  const overflow = items.slice(primaryCount);
  const overflowActive = overflow.some((i) => i.href === active);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setBellOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMoreOpen(false);
        setBellOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const openSearch = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true })
    );
  };

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
                <div className="absolute left-0 mt-2 w-52 overflow-hidden rounded-2xl border border-mr-base/10 bg-white p-1.5 shadow-xl">
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

        <div className="flex items-center gap-2">
          {/* Command palette trigger */}
          <button
            type="button"
            onClick={openSearch}
            className="hidden items-center gap-2 rounded-full border border-mr-base/15 bg-white/70 px-3 py-1.5 text-xs font-medium text-body transition-colors hover:bg-white sm:flex"
          >
            <span aria-hidden>⌕</span> Search
            <span className="rounded border border-mr-base/15 px-1 text-[0.6rem] font-semibold">
              ⌘K
            </span>
          </button>

          {/* Notifications */}
          <div className="relative" ref={bellRef}>
            <button
              type="button"
              onClick={() => setBellOpen((v) => !v)}
              aria-label="Notifications"
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-mr-base/10 bg-white/60 text-mr-base transition-colors hover:bg-white"
            >
              <svg
                aria-hidden
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              {!allRead ? (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-mr-base px-1 text-[0.6rem] font-bold text-white">
                  {NOTIFICATIONS.length}
                </span>
              ) : null}
            </button>

            {bellOpen ? (
              <div className="absolute right-0 mt-2 w-80 overflow-hidden rounded-2xl border border-mr-base/10 bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-mr-base/10 px-4 py-3">
                  <span className="font-heading text-sm font-bold text-mr-dark">
                    Notifications
                  </span>
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="text-xs font-medium text-mr-base hover:text-mr-mid"
                  >
                    {allRead ? "All read" : "Mark all read"}
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {NOTIFICATIONS.map((n) => (
                    <Link
                      key={n.id}
                      href={notifHref(n.kind)}
                      onClick={() => setBellOpen(false)}
                      className="flex gap-3 border-b border-mr-base/5 px-4 py-3 last:border-0 hover:bg-mr-pale/10"
                    >
                      <span
                        aria-hidden
                        className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-mr-pale/25 text-xs"
                      >
                        {n.kind === "lead"
                          ? "★"
                          : n.kind === "listing"
                          ? "⌂"
                          : n.kind === "transaction"
                          ? "✓"
                          : "•"}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-mr-dark">
                          {n.title}
                        </p>
                        <p className="text-xs text-body">{n.detail}</p>
                        <p className="mt-0.5 text-[0.65rem] text-mr-pale">
                          {n.time}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* Agent chip */}
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-full border border-mr-base/10 bg-white/60 py-1.5 pl-1.5 pr-3 shadow-sm backdrop-blur transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-mr-light"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-mr-light to-mr-base text-sm font-semibold text-white">
              {initials}
            </span>
            <span className="hidden text-sm font-semibold text-mr-dark lg:block">
              {profile.name}
            </span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-mr-base/10 bg-white/60 text-mr-base md:hidden"
          >
            <span aria-hidden>{mobileOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen ? (
        <nav className="border-t border-mr-base/10 bg-white px-4 py-3 md:hidden">
          <div className="grid grid-cols-2 gap-2">
            {items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                  item.href === active
                    ? "bg-mr-base text-white"
                    : "text-mr-dark hover:bg-mr-pale/20"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
