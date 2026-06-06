"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

interface Command {
  label: string;
  hint: string;
  href: string;
  keywords?: string;
}

// Quick-jump destinations and actions. All resolve to a route.
const COMMANDS: Command[] = [
  { label: "Dashboard", hint: "Command center", href: "/", keywords: "home cockpit" },
  { label: "Pipeline", hint: "Client pipeline", href: "/pipeline", keywords: "deals clients cma" },
  { label: "Listings", hint: "Your listings", href: "/listings", keywords: "inventory homes property" },
  { label: "Marketing Studio", hint: "Build collateral", href: "/marketing", keywords: "brochure social email" },
  { label: "Marketing Shop", hint: "Order print and swag", href: "/shop", keywords: "buy mailers door hangers business cards signs apparel order" },
  { label: "Tour Builder", hint: "Build a property tour", href: "/tour-builder", keywords: "tour route mls showing stops itinerary" },
  { label: "Production", hint: "Commissions and goals", href: "/production", keywords: "gci leaderboard volume" },
  { label: "Calculators", hint: "Net sheet, affordability", href: "/calculators", keywords: "math funds commission" },
  { label: "CMA Builder", hint: "Comparative market analysis", href: "/cma", keywords: "comps price valuation" },
  { label: "Resources & Scripts", hint: "Talk tracks and guides", href: "/resources", keywords: "scripts checklists templates" },
  { label: "Directory", hint: "Who to call", href: "/directory", keywords: "contacts vendors tc broker" },
  { label: "Training", hint: "Courses and onboarding", href: "/training", keywords: "learn lessons" },
  { label: "Page Builder", hint: "Client-facing page", href: "/page-builder", keywords: "public website audience" },
  { label: "Settings", hint: "Edit your profile", href: "/settings", keywords: "profile account name" },
  { label: "New CMA", hint: "Start a market analysis", href: "/cma", keywords: "create comps" },
  { label: "Seller net sheet", hint: "Estimate proceeds", href: "/calculators", keywords: "calculator seller" },
  { label: "View my public page", hint: "Client-facing preview", href: "/p/jordan-sample", keywords: "share public" },
];

// App-wide command palette. Press Cmd/Ctrl+K anywhere to open, type to filter,
// arrow keys to move, Enter to navigate. Mounted once via Providers.
export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
    }
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.hint.toLowerCase().includes(q) ||
        (c.keywords ?? "").toLowerCase().includes(q)
    );
  }, [query]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-[60] flex items-start justify-center bg-mr-dark/40 p-4 pt-[12vh] backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/70 bg-white shadow-[0_30px_80px_-20px_rgba(28,60,69,0.55)]"
      >
        <div className="flex items-center gap-3 border-b border-mr-base/10 px-4">
          <span aria-hidden className="text-mr-light">
            ⌕
          </span>
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter" && results[active]) {
                go(results[active].href);
              }
            }}
            placeholder="Jump to a page or action..."
            className="w-full bg-transparent py-3.5 text-sm text-mr-dark outline-none"
          />
          <span className="rounded-md border border-mr-base/15 px-1.5 py-0.5 text-[0.65rem] font-semibold text-body">
            ESC
          </span>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-body">
              No matches.
            </p>
          ) : (
            results.map((c, i) => (
              <button
                key={c.label}
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => go(c.href)}
                className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                  i === active ? "bg-mr-pale/25" : "hover:bg-mr-pale/15"
                }`}
              >
                <span>
                  <span className="block text-sm font-semibold text-mr-dark">
                    {c.label}
                  </span>
                  <span className="block text-xs text-body">{c.hint}</span>
                </span>
                <span aria-hidden className="text-mr-pale">
                  &rarr;
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
