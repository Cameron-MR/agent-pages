"use client";

import { useState } from "react";
import PageShell from "@/components/PageShell";
import {
  COMMISSION_LEDGER,
  GOALS,
  LEADERBOARD,
  MONTHLY_VOLUME,
} from "@/lib/mock/production";

// Production page: goal rings, a monthly volume chart, the commission ledger,
// and the office leaderboard. Charts are pure CSS/SVG so there are no chart
// dependencies. All numbers are fabricated.
export default function ProductionPage() {
  const [ledgerFilter, setLedgerFilter] = useState<"All" | "Paid" | "Pending">(
    "All"
  );

  const maxVolume = Math.max(...MONTHLY_VOLUME.map((m) => m.volume));
  const ledger =
    ledgerFilter === "All"
      ? COMMISSION_LEDGER
      : COMMISSION_LEDGER.filter((e) => e.status === ledgerFilter);

  return (
    <PageShell
      active="/production"
      eyebrow="Performance"
      title="Production"
      description="Your commissions, goals, and where you stand in the office. Sample numbers only."
    >
      {/* Goal rings */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {GOALS.map((goal) => {
          const pct = Math.min(
            100,
            Math.round((goal.current / goal.target) * 100)
          );
          return (
            <div
              key={goal.label}
              className="flex items-center gap-5 rounded-2xl border border-white/50 bg-white/60 p-5 shadow-sm backdrop-blur-xl backdrop-saturate-150"
            >
              <GoalRingSvg pct={pct} />
              <div>
                <p className="text-xs font-medium text-body">{goal.label}</p>
                <p className="mt-1 font-heading text-2xl font-bold text-mr-dark">
                  {goal.display}
                </p>
                <p className="text-xs text-body">of {goal.targetDisplay}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Volume chart */}
      <section className="mt-6 rounded-2xl border border-white/50 bg-white/60 p-6 shadow-sm backdrop-blur-xl backdrop-saturate-150">
        <h2 className="font-heading text-lg font-bold text-mr-dark">
          Closed volume by month
        </h2>
        <p className="mb-6 text-xs text-body">Last six months, fabricated.</p>
        <div className="flex h-64 items-stretch gap-3 sm:gap-6">
          {MONTHLY_VOLUME.map((m) => {
            const h = Math.max(4, Math.round((m.volume / maxVolume) * 100));
            return (
              <div
                key={m.month}
                className="group flex flex-1 flex-col items-center gap-2"
              >
                {/* Bar track: a flex-1 column so the bar's percentage height
                    resolves against a real pixel height, not an auto height. */}
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="relative w-full rounded-t-lg bg-gradient-to-t from-mr-base to-mr-light shadow-inner transition-all duration-500"
                    style={{ height: `${h}%` }}
                  >
                    <span className="absolute -top-5 left-0 right-0 text-center text-xs font-semibold text-mr-base opacity-0 transition-opacity group-hover:opacity-100">
                      ${(m.volume / 1000000).toFixed(2)}M
                    </span>
                  </div>
                </div>
                <span className="text-xs text-body">{m.month}</span>
              </div>
            );
          })}
        </div>
      </section>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Commission ledger */}
        <section className="lg:col-span-3 rounded-2xl border border-white/50 bg-white/60 p-6 shadow-sm backdrop-blur-xl backdrop-saturate-150">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-mr-dark">
              Commission ledger
            </h2>
            <div className="flex rounded-full border border-mr-base/15 bg-white/70 p-1">
              {(["All", "Paid", "Pending"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setLedgerFilter(opt)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    ledgerFilter === opt
                      ? "bg-mr-base text-white"
                      : "text-body hover:text-mr-base"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-mr-base/10 text-xs uppercase tracking-wide text-body">
                  <th className="pb-2 pr-3 font-medium">Property</th>
                  <th className="pb-2 pr-3 font-medium">Side</th>
                  <th className="pb-2 pr-3 font-medium">Close</th>
                  <th className="pb-2 pr-3 text-right font-medium">GCI</th>
                  <th className="pb-2 text-right font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {ledger.map((e) => (
                  <tr
                    key={e.id}
                    className="border-b border-mr-base/5 last:border-0"
                  >
                    <td className="py-3 pr-3">
                      <span className="block font-medium text-mr-dark">
                        {e.property}
                      </span>
                      <span className="block text-xs text-body">
                        {e.salePrice}
                      </span>
                    </td>
                    <td className="py-3 pr-3 text-body">{e.side}</td>
                    <td className="py-3 pr-3 text-body">{e.closeDate}</td>
                    <td className="py-3 pr-3 text-right font-semibold text-mr-dark">
                      {e.gci}
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          e.status === "Paid"
                            ? "bg-mr-light/20 text-mr-base"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {e.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Leaderboard */}
        <section className="lg:col-span-2 rounded-2xl border border-white/50 bg-white/60 p-6 shadow-sm backdrop-blur-xl backdrop-saturate-150">
          <h2 className="mb-4 font-heading text-lg font-bold text-mr-dark">
            Office leaderboard
          </h2>
          <div className="flex flex-col gap-2">
            {LEADERBOARD.map((row) => (
              <div
                key={row.rank}
                className={`flex items-center gap-3 rounded-xl border p-3 ${
                  row.isYou
                    ? "border-mr-light/50 bg-mr-pale/20"
                    : "border-white/60 bg-white/60"
                }`}
              >
                <span
                  className={`flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-bold ${
                    row.rank <= 3
                      ? "bg-gradient-to-br from-mr-light to-mr-base text-white"
                      : "bg-mr-pale/30 text-mr-base"
                  }`}
                >
                  {row.rank}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-mr-dark">
                    {row.name}
                    {row.isYou ? (
                      <span className="ml-2 rounded-full bg-mr-base px-2 py-0.5 text-[0.6rem] font-bold text-white">
                        YOU
                      </span>
                    ) : null}
                  </p>
                  <p className="truncate text-xs text-body">{row.office}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-mr-dark">
                    {row.volume}
                  </p>
                  <p className="text-xs text-body">{row.units} units</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}

// Circular progress ring drawn with two stacked SVG circles.
function GoalRingSvg({ pct }: { pct: number }) {
  const radius = 30;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width="76" height="76" viewBox="0 0 76 76" className="flex-none">
      <circle
        cx="38"
        cy="38"
        r={radius}
        fill="none"
        stroke="#8BB8C4"
        strokeOpacity="0.25"
        strokeWidth="8"
      />
      <circle
        cx="38"
        cy="38"
        r={radius}
        fill="none"
        stroke="#316878"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform="rotate(-90 38 38)"
      />
      <text
        x="38"
        y="38"
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-mr-dark font-heading text-sm font-bold"
      >
        {pct}%
      </text>
    </svg>
  );
}
