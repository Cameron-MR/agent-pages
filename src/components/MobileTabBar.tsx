"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// App-style bottom tab bar, phones only (hidden at md+ and on print). Gives
// the agent side a native-app feel; client-facing pages (/p, /tour, /cma
// live pages) do not render it because they don't use PageShell/MainNav.
const TABS = [
  {
    href: "/",
    label: "Home",
    d: "M3 10.5 12 3l9 7.5M5 9.5V21h5v-6h4v6h5V9.5",
  },
  {
    href: "/pipeline",
    label: "Pipeline",
    d: "M4 6h16M4 12h10M4 18h7",
  },
  {
    href: "/listings",
    label: "Listings",
    d: "M3 11l9-7 9 7M5 10v10h14V10M9 21v-6h6v6",
  },
  {
    href: "/marketing",
    label: "Marketing",
    d: "M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1zM16 8a5 5 0 0 1 0 8",
  },
  {
    href: "/cma",
    label: "CMA",
    d: "M4 19V5M4 19h16M8 16v-5M12 16V8M16 16v-3M20 16V6",
  },
] as const;

export default function MobileTabBar() {
  const pathname = usePathname() ?? "/";

  // Only on agent-side surfaces; never on the client-facing pages.
  if (
    pathname.startsWith("/p/") ||
    pathname.startsWith("/tour/") ||
    (pathname.startsWith("/cma/") && pathname !== "/cma")
  ) {
    return null;
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-mr-base/10 bg-white/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl backdrop-saturate-150 md:hidden print:hidden"
    >
      <div className="mx-auto flex max-w-md items-stretch justify-between px-2">
        {TABS.map((t) => {
          const active = isActive(t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[0.65rem] font-medium transition-colors ${
                active ? "text-mr-base" : "text-body/70 hover:text-mr-base"
              }`}
            >
              <svg
                aria-hidden
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={active ? 2.4 : 1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={t.d} />
              </svg>
              {t.label}
              <span
                aria-hidden
                className={`h-1 w-1 rounded-full ${
                  active ? "bg-mr-light" : "bg-transparent"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
