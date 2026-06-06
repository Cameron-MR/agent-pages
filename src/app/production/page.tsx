"use client";

import { useState } from "react";
import PageShell from "@/components/PageShell";
import {
  COMMISSION_LEDGER,
  GOALS,
  LEADERBOARD,
  MONTHLY_VOLUME,
  CLUB_TIERS,
  CLUB_PROGRESS,
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
      {/* President's / Chairman's Club */}
      <ClubMeter />

      {/* Goal rings */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
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

// President's / Chairman's Club progress. Qualify by units OR volume, so each
// metric gets its own thermometer with tier ticks, and the status reflects the
// OR logic. Fabricated current totals.
function ClubMeter() {
  const pres = CLUB_TIERS[0];
  const chair = CLUB_TIERS[1];
  const { units, volume } = CLUB_PROGRESS;

  const money = (n: number) =>
    n >= 1000000 ? `$${(n / 1000000).toFixed(2)}M` : `$${(n / 1000).toFixed(0)}K`;

  const qualifiesChair = units >= chair.units || volume >= chair.volume;
  const qualifiesPres = units >= pres.units || volume >= pres.volume;

  let status: string;
  if (qualifiesChair) {
    status = "Chairman's Club achieved. Congratulations.";
  } else if (qualifiesPres) {
    const u = Math.max(0, chair.units - units);
    const v = Math.max(0, chair.volume - volume);
    status = `President's Club achieved. ${u} units or ${money(v)} volume to Chairman's Club.`;
  } else {
    const u = Math.max(0, pres.units - units);
    const v = Math.max(0, pres.volume - volume);
    status = `${u} units or ${money(v)} volume to President's Club.`;
  }

  return (
    <section className="rounded-2xl border border-mr-light/30 bg-gradient-to-br from-mr-base to-mr-dark p-6 text-white shadow-sm">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-mr-pale">
            2026 Awards
          </p>
          <h2 className="mt-1 font-heading text-xl font-bold">
            President&rsquo;s &amp; Chairman&rsquo;s Club
          </h2>
        </div>
        <p className="text-sm text-white/85">{status}</p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <ClubBar
          label="Units"
          current={units}
          currentLabel={`${units}`}
          presThreshold={pres.units}
          chairThreshold={chair.units}
          presLabel={`${pres.units}`}
          chairLabel={`${chair.units}`}
        />
        <ClubBar
          label="Volume"
          current={volume}
          currentLabel={money(volume)}
          presThreshold={pres.volume}
          chairThreshold={chair.volume}
          presLabel={money(pres.volume)}
          chairLabel={money(chair.volume)}
        />
      </div>
      <p className="mt-4 text-xs text-mr-pale">
        Qualify for either club by hitting the units OR the volume threshold.
      </p>
    </section>
  );
}

function ClubBar({
  label,
  current,
  currentLabel,
  presThreshold,
  chairThreshold,
  presLabel,
  chairLabel,
}: {
  label: string;
  current: number;
  currentLabel: string;
  presThreshold: number;
  chairThreshold: number;
  presLabel: string;
  chairLabel: string;
}) {
  const fill = Math.min(100, Math.round((current / chairThreshold) * 100));
  const presPct = Math.round((presThreshold / chairThreshold) * 100);
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-mr-pale">
          {label}
        </span>
        <span className="font-heading text-lg font-bold text-white">
          {currentLabel}
        </span>
      </div>
      <div className="relative mt-3 h-3 w-full rounded-full bg-white/15">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-mr-light to-white"
          style={{ width: `${fill}%` }}
        />
        {/* President's tier tick */}
        <div
          className="absolute top-[-3px] h-[18px] w-0.5 bg-white/70"
          style={{ left: `${presPct}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-[0.65rem] text-white/70">
        <span>President&rsquo;s {presLabel}</span>
        <span>Chairman&rsquo;s {chairLabel}</span>
      </div>
    </div>
  );
}
