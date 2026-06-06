"use client";

import { useState } from "react";
import { marketPulse } from "@/lib/mockData";

// Compact glass strip of Orange County market stats. Positive trends (those
// that start with a plus) get a green tint; everything else stays teal.
// Clicking a stat expands a one-line talking point an agent can use with
// clients, plus a 12-week mini trend bar. All fabricated sample data.

const TALKING_POINTS: Record<string, string> = {
  "Median sale price":
    "Prices are holding firm. Sellers who price at market are still getting strong offers; buyers should expect little room on list price.",
  "Median days on market":
    "Well-presented homes are moving fast. Buyers need to be pre-approved and ready to write within 48 hours of a new listing.",
  "Months of inventory":
    "Inventory remains tight relative to demand. New listings are seeing multiple showings in the first weekend.",
  "Sale to list":
    "Homes are closing very near asking. Lowball offers are rarely landing; strategy matters more than discounts.",
};

function fallbackPoint(label: string, trend: string): string {
  return `${label} is trending ${trend} versus last quarter. Ask your Marshall Reddick advisor what this means for your plan.`;
}

// Deterministic fake 12-week sparkline heights from the stat label.
function sparkHeights(label: string): number[] {
  let h = 0;
  for (let i = 0; i < label.length; i++) h = (h * 31 + label.charCodeAt(i)) >>> 0;
  return Array.from({ length: 12 }, (_, i) => 30 + ((h >> (i * 2)) % 60));
}

export default function MarketPulse() {
  const [openStat, setOpenStat] = useState<string | null>(null);
  const active = marketPulse.stats.find((s) => s.label === openStat) ?? null;

  return (
    <section>
      <h2 className="mb-4 font-heading text-2xl font-bold text-mr-dark">
        {marketPulse.region} market
      </h2>

      <div className="rounded-3xl border border-white/40 bg-white/60 p-4 shadow-sm backdrop-blur-xl backdrop-saturate-150">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {marketPulse.stats.map((stat) => {
            const positive = stat.trend.startsWith("+");
            const isOpen = openStat === stat.label;
            return (
              <button
                key={stat.label}
                type="button"
                onClick={() => setOpenStat(isOpen ? null : stat.label)}
                aria-expanded={isOpen}
                className={`rounded-2xl px-3 py-2 text-left transition-colors ${
                  isOpen
                    ? "bg-mr-pale/25 ring-1 ring-mr-light/50"
                    : "hover:bg-mr-pale/15"
                }`}
              >
                <p className="text-xs font-medium text-body">{stat.label}</p>
                <p className="mt-1 font-heading text-2xl font-bold text-mr-base">
                  {stat.value}
                </p>
                <p
                  className={`mt-0.5 text-xs font-medium ${
                    positive ? "text-emerald-600" : "text-mr-mid"
                  }`}
                >
                  {stat.trend}
                </p>
              </button>
            );
          })}
        </div>

        {active ? (
          <div className="mt-3 rounded-2xl border border-mr-base/10 bg-white/80 p-4">
            <div className="flex items-end justify-between gap-4">
              <p className="text-sm leading-relaxed text-body">
                {TALKING_POINTS[active.label] ??
                  fallbackPoint(active.label, active.trend)}
              </p>
              <div className="flex h-12 flex-none items-end gap-1" aria-hidden>
                {sparkHeights(active.label).map((v, i) => (
                  <span
                    key={i}
                    style={{ height: `${v}%` }}
                    className={`w-1.5 rounded-full ${
                      i === 11 ? "bg-mr-base" : "bg-mr-pale/60"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="mt-2 text-[0.65rem] uppercase tracking-wide text-mr-pale">
              12-week trend · fabricated sample data
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
