"use client";

import { useState } from "react";
import Link from "next/link";
import { announcements } from "@/lib/mockData";

// "Company": glass rows for company announcements. Tag chip, bold title, and a
// short detail line. Calm by design, this sits low in the cockpit hierarchy.
// Rows expand on click to show the full notice plus a relevant action link.

// Where each announcement tag should send the agent. Fallback is Training.
const TAG_LINKS: Record<string, { href: string; label: string }> = {
  Event: { href: "/training", label: "See the calendar" },
  Tools: { href: "/marketing", label: "Open Marketing" },
  Wins: { href: "/production", label: "Open Production" },
  Compliance: { href: "/resources", label: "Open Resources" },
};

export default function AnnouncementsPanel() {
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  return (
    <section>
      <h2 className="mb-4 font-heading text-2xl font-bold text-mr-dark">
        Company
      </h2>

      <div className="flex flex-col gap-3">
        {announcements.map((item) => {
          const isOpen = openTitle === item.title;
          const link = TAG_LINKS[item.tag] ?? {
            href: "/training",
            label: "Learn more",
          };
          return (
            <div
              key={item.title}
              className={`rounded-2xl border border-white/40 bg-white/60 shadow-sm backdrop-blur-xl backdrop-saturate-150 transition-colors ${
                isOpen ? "bg-white/85" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenTitle(isOpen ? null : item.title)}
                aria-expanded={isOpen}
                className="flex w-full items-start gap-3 p-4 text-left"
              >
                <span className="mt-0.5 flex-none rounded-full bg-mr-pale/25 px-2.5 py-0.5 text-xs font-semibold text-mr-base">
                  {item.tag}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-heading text-sm font-bold text-mr-dark">
                    {item.title}
                  </p>
                  <p className="text-sm text-body">{item.detail}</p>
                </div>
                <span
                  aria-hidden
                  className="mt-1 flex-none text-xs text-mr-pale"
                >
                  {isOpen ? "▴" : "▾"}
                </span>
              </button>

              {isOpen ? (
                <div className="border-t border-mr-base/10 px-4 py-3">
                  <p className="text-sm leading-relaxed text-body">
                    Full notice would render here from the company feed. This
                    reference build keeps it short: {item.detail} Reach out to
                    your office manager with questions.
                  </p>
                  <Link
                    href={link.href}
                    className="mt-2 inline-block text-sm font-semibold text-mr-base hover:text-mr-mid"
                  >
                    {link.label} →
                  </Link>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
