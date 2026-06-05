"use client";

import { useMemo, useState } from "react";
import PageShell from "@/components/PageShell";
import BrandedPrintSheet, {
  type PrintRow,
} from "@/components/BrandedPrintSheet";
import { CMA_SUBJECT, CMA_COMPS } from "@/lib/mock/cma";

const money = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

const roundTo = (n: number, step: number) => Math.round(n / step) * step;

// CMA builder: pick comparable sales, and a suggested price range for the
// subject property is computed live from the included comps' price per sqft.
// Printable to a branded, agent-personalized PDF. All comps are fabricated.
export default function CmaPage() {
  const [sqft, setSqft] = useState(CMA_SUBJECT.sqft);
  const [included, setIncluded] = useState<Set<string>>(
    new Set(CMA_COMPS.map((c) => c.id))
  );

  const toggle = (id: string) =>
    setIncluded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const comps = CMA_COMPS.filter((c) => included.has(c.id));

  const analysis = useMemo(() => {
    if (comps.length === 0) {
      return { avgPsf: 0, low: 0, mid: 0, high: 0 };
    }
    const psfs = comps.map((c) => c.soldPrice / c.sqft);
    const avgPsf = psfs.reduce((a, b) => a + b, 0) / psfs.length;
    const minPsf = Math.min(...psfs);
    const maxPsf = Math.max(...psfs);
    return {
      avgPsf,
      low: roundTo(minPsf * sqft, 5000),
      mid: roundTo(avgPsf * sqft, 5000),
      high: roundTo(maxPsf * sqft, 5000),
    };
  }, [comps, sqft]);

  const printRows: PrintRow[] = [
    { label: "Average price / sqft", value: `${money(analysis.avgPsf)}/sqft` },
    { label: "Conservative", value: money(analysis.low) },
    { label: "Aggressive", value: money(analysis.high) },
    { label: "Suggested list price", value: money(analysis.mid), strong: true },
  ];
  const printInputs: PrintRow[] = [
    { label: "Subject", value: `${CMA_SUBJECT.address}, ${CMA_SUBJECT.city}` },
    {
      label: "Details",
      value: `${CMA_SUBJECT.beds} bd / ${CMA_SUBJECT.baths} ba / ${sqft.toLocaleString()} sqft`,
    },
    { label: "Comparable sales used", value: String(comps.length) },
  ];

  return (
    <PageShell
      active="/cma"
      eyebrow="Pricing"
      title="CMA Builder"
      description="Build a comparative market analysis. Toggle comps to refine the suggested price range, then print a branded report. Sample comps only."
    >
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-full border border-mr-base/20 bg-white/70 px-4 py-2 text-sm font-semibold text-mr-base transition-colors hover:bg-white"
        >
          <span aria-hidden>⎙</span> Print / Save PDF
        </button>
      </div>

      {/* Subject + result */}
      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/50 bg-white/60 p-6 shadow-sm backdrop-blur-xl backdrop-saturate-150">
          <h2 className="font-heading text-lg font-bold text-mr-dark">
            Subject property
          </h2>
          <p className="mt-1 text-sm font-medium text-mr-dark">
            {CMA_SUBJECT.address}
          </p>
          <p className="text-sm text-body">{CMA_SUBJECT.city}</p>
          <p className="mt-2 text-sm text-body">
            {CMA_SUBJECT.beds} bd · {CMA_SUBJECT.baths} ba
          </p>
          <label className="mt-4 block">
            <span className="mb-1 block text-sm font-medium text-mr-dark">
              Living area (sqft)
            </span>
            <input
              type="number"
              value={sqft}
              step={50}
              onChange={(e) => setSqft(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-mr-base/15 bg-white px-3 py-2.5 text-sm text-mr-dark outline-none focus:border-mr-light focus:ring-2 focus:ring-mr-light/40"
            />
          </label>
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-mr-light/30 bg-gradient-to-br from-mr-base to-mr-dark p-6 text-white shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-mr-pale">
            Suggested list price
          </p>
          <p className="mt-2 font-heading text-4xl font-bold">
            {money(analysis.mid)}
          </p>
          <p className="mt-1 text-sm text-white/80">
            Range {money(analysis.low)} – {money(analysis.high)} based on{" "}
            {comps.length} comparable {comps.length === 1 ? "sale" : "sales"} at
            an average of {money(analysis.avgPsf)}/sqft.
          </p>
          {comps.length === 0 ? (
            <p className="mt-2 text-sm text-mr-pale">
              Select at least one comp below.
            </p>
          ) : null}
        </div>
      </div>

      {/* Comps table */}
      <section className="mt-6 rounded-2xl border border-white/50 bg-white/60 p-6 shadow-sm backdrop-blur-xl backdrop-saturate-150">
        <h2 className="mb-4 font-heading text-lg font-bold text-mr-dark">
          Comparable sales
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-mr-base/10 text-xs uppercase tracking-wide text-body">
                <th className="pb-2 pr-3 font-medium">Use</th>
                <th className="pb-2 pr-3 font-medium">Address</th>
                <th className="pb-2 pr-3 text-right font-medium">Sold</th>
                <th className="pb-2 pr-3 text-right font-medium">Sqft</th>
                <th className="pb-2 pr-3 text-right font-medium">$/sqft</th>
                <th className="pb-2 text-right font-medium">Sold</th>
              </tr>
            </thead>
            <tbody>
              {CMA_COMPS.map((c) => {
                const on = included.has(c.id);
                return (
                  <tr
                    key={c.id}
                    className={`border-b border-mr-base/5 last:border-0 ${
                      on ? "" : "opacity-40"
                    }`}
                  >
                    <td className="py-3 pr-3">
                      <button
                        type="button"
                        onClick={() => toggle(c.id)}
                        aria-label={on ? "Exclude comp" : "Include comp"}
                        className={`flex h-5 w-5 items-center justify-center rounded border text-xs ${
                          on
                            ? "border-mr-base bg-mr-base text-white"
                            : "border-mr-base/30 text-transparent"
                        }`}
                      >
                        ✓
                      </button>
                    </td>
                    <td className="py-3 pr-3">
                      <span className="block font-medium text-mr-dark">
                        {c.address}
                      </span>
                      <span className="block text-xs text-body">
                        {c.beds} bd · {c.baths} ba · {c.distanceMi} mi
                      </span>
                    </td>
                    <td className="py-3 pr-3 text-right font-medium text-mr-dark">
                      {money(c.soldPrice)}
                    </td>
                    <td className="py-3 pr-3 text-right text-body">
                      {c.sqft.toLocaleString()}
                    </td>
                    <td className="py-3 pr-3 text-right text-body">
                      {money(c.soldPrice / c.sqft)}
                    </td>
                    <td className="py-3 text-right text-body">{c.soldAgo}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-body">
          Suggested range is illustrative and not an appraisal or guarantee of
          value.
        </p>
      </section>

      <BrandedPrintSheet
        title="Comparative Market Analysis"
        subtitle={`${CMA_SUBJECT.address}, ${CMA_SUBJECT.city}`}
        inputs={printInputs}
        rows={printRows}
        disclaimer="Comparative market analysis is an estimate of value, not an appraisal or guarantee. Based on fabricated sample comparables."
      />
    </PageShell>
  );
}
