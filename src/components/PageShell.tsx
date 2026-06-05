"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import StubModal from "@/components/StubModal";
import { PageShellContext } from "@/components/pageShellContext";
import { SUBNAV_ITEMS, CURRENT_AGENT, type StubContent } from "@/lib/mockData";

interface PageShellProps {
  // The active route, used to highlight the current nav item.
  active?: string;
  // Optional eyebrow + title rendered in a glass page header. Omit to render
  // a bare shell (used by pages that bring their own hero).
  eyebrow?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

// Shared chrome for every agent-side subpage. Holds the stub modal state,
// renders the glassy sticky nav, ambient teal washes, an optional page header,
// and the footer. Keeps subpages thin so they read as pure content.
export default function PageShell({
  active,
  eyebrow,
  title,
  description,
  children,
}: PageShellProps) {
  const [stub, setStub] = useState<StubContent | null>(null);

  return (
    <main className="relative min-h-screen overflow-hidden bg-surface-light text-body">
      {/* Ambient teal washes so the glass has light to refract. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-mr-light/15 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-12rem] top-40 h-[26rem] w-[26rem] rounded-full bg-mr-pale/25 blur-[130px]"
      />

      <div className="relative z-10">
        <header className="sticky top-0 z-30 border-b border-mr-base/10 bg-surface-light/70 backdrop-blur-xl backdrop-saturate-150">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-8">
              <Link href="/" aria-label="Marshall Reddick home">
                <Logo theme="light" variant="logotype" width={170} priority />
              </Link>

              <nav className="hidden items-center gap-1 lg:flex">
                {SUBNAV_ITEMS.map((item) => {
                  const isActive = item.href === active;
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
                setStub({
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

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          {title ? (
            <div className="mb-8">
              <Link
                href="/"
                className="text-xs font-medium text-mr-base hover:text-mr-mid"
              >
                &larr; Back to command center
              </Link>
              {eyebrow ? (
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-mr-light">
                  {eyebrow}
                </p>
              ) : null}
              <h1 className="mt-1 font-heading text-3xl font-bold tracking-tight text-mr-dark sm:text-4xl">
                {title}
              </h1>
              {description ? (
                <p className="mt-2 max-w-2xl text-sm text-body">{description}</p>
              ) : null}
            </div>
          ) : null}

          {/* Expose the stub opener to descendants via context, so any card or
              button on a subpage can open the shared modal without prop drilling. */}
          <PageShellContext.Provider value={setStub}>
            {children}
          </PageShellContext.Provider>
        </div>

        <footer className="border-t border-mr-base/10 bg-white/40 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-body sm:px-6">
            Agent Pages reference UI for Marshall Reddick Real Estate. All
            content shown is fabricated sample data.
          </div>
        </footer>
      </div>

      <StubModal content={stub} onClose={() => setStub(null)} />
    </main>
  );
}
