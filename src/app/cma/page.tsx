"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PageShell from "@/components/PageShell";
import Photo from "@/components/Photo";
import CmaPrint from "@/components/cma/CmaPrint";
import {
  DEFAULT_CMA,
  loadCma,
  saveCma,
  lookupCma,
  summaryByStatus,
  suggestedRange,
  pricePerSqft,
  effectivePrice,
  money,
  SAMPLE_CMA_IDS,
  loadSavedCmas,
  saveCmaAs,
  deleteSavedCma,
  type Cma,
  type SavedCma,
} from "@/lib/mock/cma";

// CMA builder. The agent sets a subject home by MLS ID, adds comparable
// listings by MLS ID, and gets a live suggested price range and market summary.
// Then preview the client report page or print the branded report. Property
// data comes from the MLS (mocked for now). All data is fabricated.
export default function CmaPage() {
  const router = useRouter();
  const [cma, setCma] = useState<Cma>(DEFAULT_CMA);
  const [subjectId, setSubjectId] = useState("");
  const [compId, setCompId] = useState("");
  const [saved, setSaved] = useState<SavedCma[]>([]);
  const [savedNote, setSavedNote] = useState(false);

  useEffect(() => {
    setCma(loadCma());
    setSaved(loadSavedCmas());
  }, []);

  const saveCurrent = () => {
    setSaved(saveCmaAs(`${cma.client} - ${cma.subject.address}`, cma));
    saveCma(cma);
    setSavedNote(true);
    setTimeout(() => setSavedNote(false), 1600);
  };

  const loadSaved = (s: SavedCma) => {
    setCma(s.cma);
    saveCma(s.cma);
  };

  const setSubject = (rawId: string) => {
    const rec = lookupCma(rawId);
    if (!rec) return;
    setCma((c) => ({ ...c, subject: rec }));
    setSubjectId("");
  };

  const addComp = (rawId: string) => {
    const rec = lookupCma(rawId);
    if (!rec) return;
    setCma((c) => ({
      ...c,
      comps: [...c.comps, { ...rec, id: rec.mlsId + "-" + Date.now() }],
    }));
    setCompId("");
  };

  const removeComp = (id: string) =>
    setCma((c) => ({ ...c, comps: c.comps.filter((x) => x.id !== id) }));

  const summary = useMemo(() => summaryByStatus(cma.comps), [cma.comps]);
  const range = useMemo(
    () => suggestedRange(cma.comps, cma.subject.sqft),
    [cma.comps, cma.subject.sqft]
  );

  const preview = () => {
    saveCma(cma);
    router.push("/cma/jordan-sample");
  };

  return (
    <PageShell
      active="/cma"
      eyebrow="Pricing"
      title="CMA Builder"
      description="Build a comparative market analysis from MLS listing IDs. Pick a subject home and comps; the suggested range and market summary update live. Preview the client report or print a branded PDF. Sample MLS data."
    >
      {/* Saved analyses + actions */}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/50 bg-white/60 p-4 shadow-sm backdrop-blur-xl backdrop-saturate-150">
        <span className="text-sm font-semibold text-mr-dark">Saved:</span>
        {saved.length === 0 ? (
          <span className="text-sm text-body">None yet.</span>
        ) : (
          saved.map((s) => (
            <span
              key={s.id}
              className="flex items-center gap-1 rounded-full border border-mr-base/15 bg-white/70 py-1 pl-3 pr-1"
            >
              <button
                type="button"
                onClick={() => loadSaved(s)}
                className="text-xs font-medium text-mr-dark hover:text-mr-base"
              >
                {s.name} <span className="text-mr-pale">· {s.savedAt}</span>
              </button>
              <button
                type="button"
                onClick={() => setSaved(deleteSavedCma(s.id))}
                aria-label={`Delete ${s.name}`}
                className="flex h-5 w-5 items-center justify-center rounded-full text-mr-base hover:bg-mr-pale/25"
              >
                &times;
              </button>
            </span>
          ))
        )}
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={saveCurrent}
            className="rounded-full border border-mr-base/20 bg-white/70 px-4 py-2 text-sm font-semibold text-mr-base transition-colors hover:bg-white"
          >
            {savedNote ? "Saved" : "Save"}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-full border border-mr-base/20 bg-white/70 px-4 py-2 text-sm font-semibold text-mr-base transition-colors hover:bg-white"
          >
            <span aria-hidden>⎙</span> Print report
          </button>
          <button
            type="button"
            onClick={preview}
            className="rounded-full bg-mr-base px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-mr-mid"
          >
            Preview client report
          </button>
        </div>
      </div>

      {/* Subject + suggested range */}
      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-white/50 bg-white/60 p-5 shadow-sm backdrop-blur-xl backdrop-saturate-150">
          <h2 className="font-heading text-lg font-bold text-mr-dark">
            Subject property
          </h2>
          <div className="mt-3 flex gap-2">
            <input
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setSubject(subjectId)}
              placeholder="MLS ID (e.g., OC2001)"
              className="flex-1 rounded-xl border border-mr-base/15 bg-white px-3 py-2 text-sm text-mr-dark outline-none focus:border-mr-light focus:ring-2 focus:ring-mr-light/40"
            />
            <button
              type="button"
              onClick={() => setSubject(subjectId)}
              className="rounded-full bg-mr-base px-4 py-2 text-sm font-semibold text-white hover:bg-mr-mid"
            >
              Set
            </button>
          </div>
          <div className="mt-3 overflow-hidden rounded-xl border border-white/60">
            <Photo
              src={cma.subject.photo}
              alt={cma.subject.address}
              className="h-32 w-full object-cover"
            />
            <div className="p-3">
              <p className="font-heading text-sm font-bold text-mr-dark">
                {cma.subject.address}
              </p>
              <p className="text-xs text-body">{cma.subject.city}</p>
              <p className="mt-1 text-xs text-body">
                {cma.subject.beds} bd · {cma.subject.baths} ba ·{" "}
                {cma.subject.sqft.toLocaleString()} sqft · {cma.subject.year}
              </p>
              <p className="text-xs text-mr-pale">MLS {cma.subject.mlsId}</p>
            </div>
          </div>
          <label className="mt-3 block">
            <span className="mb-1 block text-xs font-medium text-mr-dark">
              Prepared for (client)
            </span>
            <input
              value={cma.client}
              onChange={(e) => setCma((c) => ({ ...c, client: e.target.value }))}
              className="w-full rounded-xl border border-mr-base/15 bg-white px-3 py-2 text-sm text-mr-dark outline-none focus:border-mr-light focus:ring-2 focus:ring-mr-light/40"
            />
          </label>
        </section>

        <section className="lg:col-span-2 rounded-2xl border border-mr-light/30 bg-gradient-to-br from-mr-base to-mr-dark p-6 text-white shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-mr-pale">
            Suggested list price
          </p>
          <p className="mt-2 font-heading text-4xl font-bold">
            {range.mid ? money(range.mid) : "—"}
          </p>
          <p className="mt-1 text-sm text-white/85">
            {range.basis
              ? `Range ${money(range.low)} – ${money(range.high)} from ${range.basis} comps at an average of ${money(Math.round(range.avgPpsf))}/sqft.`
              : "Add comparable listings to calculate."}
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              ["Conservative", range.low],
              ["Suggested", range.mid],
              ["Aggressive", range.high],
            ].map(([label, v]) => (
              <div
                key={label as string}
                className="rounded-xl border border-white/15 bg-white/5 p-3 text-center"
              >
                <p className="font-heading text-lg font-bold">
                  {v ? money(v as number) : "—"}
                </p>
                <p className="text-[0.65rem] text-white/70">{label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Market summary by status */}
      <section className="mt-6 rounded-2xl border border-white/50 bg-white/60 p-6 shadow-sm backdrop-blur-xl backdrop-saturate-150">
        <h2 className="mb-4 font-heading text-lg font-bold text-mr-dark">
          Market summary
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-mr-base/10 text-xs uppercase tracking-wide text-body">
                <th className="pb-2 pr-3 font-medium">Status</th>
                <th className="pb-2 pr-3 text-right font-medium">Count</th>
                <th className="pb-2 pr-3 text-right font-medium">Avg price</th>
                <th className="pb-2 pr-3 text-right font-medium">Avg $/sqft</th>
                <th className="pb-2 pr-3 text-right font-medium">Median</th>
                <th className="pb-2 pr-3 text-right font-medium">Low</th>
                <th className="pb-2 pr-3 text-right font-medium">High</th>
                <th className="pb-2 text-right font-medium">Avg DOM</th>
              </tr>
            </thead>
            <tbody>
              {summary.map((s) => (
                <tr key={s.status} className="border-b border-mr-base/5 last:border-0">
                  <td className="py-2 pr-3 font-medium text-mr-dark">{s.status}</td>
                  <td className="py-2 pr-3 text-right text-body">{s.total}</td>
                  <td className="py-2 pr-3 text-right text-mr-dark">{money(s.avgPrice)}</td>
                  <td className="py-2 pr-3 text-right text-body">{money(Math.round(s.avgPpsf))}</td>
                  <td className="py-2 pr-3 text-right text-body">{money(s.median)}</td>
                  <td className="py-2 pr-3 text-right text-body">{money(s.low)}</td>
                  <td className="py-2 pr-3 text-right text-body">{money(s.high)}</td>
                  <td className="py-2 text-right text-body">{s.avgDom}</td>
                </tr>
              ))}
              {summary.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-sm text-body">
                    Add comps to see the market summary.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      {/* Comparables */}
      <section className="mt-6 rounded-2xl border border-white/50 bg-white/60 p-6 shadow-sm backdrop-blur-xl backdrop-saturate-150">
        <h2 className="font-heading text-lg font-bold text-mr-dark">
          Comparable listings
        </h2>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={compId}
            onChange={(e) => setCompId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addComp(compId)}
            placeholder="Add a comp by MLS ID"
            className="flex-1 rounded-xl border border-mr-base/15 bg-white px-4 py-2.5 text-sm text-mr-dark outline-none focus:border-mr-light focus:ring-2 focus:ring-mr-light/40"
          />
          <button
            type="button"
            onClick={() => addComp(compId)}
            className="rounded-full bg-mr-base px-6 py-2.5 text-sm font-semibold text-white hover:bg-mr-mid"
          >
            Add comp
          </button>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-xs text-body">Try:</span>
          {SAMPLE_CMA_IDS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => addComp(id)}
              className="rounded-full border border-mr-base/15 px-2.5 py-0.5 text-xs font-medium text-mr-base hover:bg-mr-pale/20"
            >
              {id}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-body">
          Mock MLS data for now. The live MLS API will plug in here later.
        </p>

        <div className="mt-4 flex flex-col gap-2">
          {cma.comps.map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-3 rounded-xl border border-white/60 bg-white/70 p-3"
            >
              <Photo
                src={c.photo}
                alt={c.address}
                className="h-14 w-20 flex-none rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-mr-dark">
                  {c.address}
                </p>
                <p className="text-xs text-body">
                  {c.beds} bd · {c.baths} ba · {c.sqft.toLocaleString()} sqft ·{" "}
                  {money(Math.round(pricePerSqft(c)))}/sqft · {c.dom} DOM
                </p>
              </div>
              <div className="flex-none text-right">
                <span className="rounded-full bg-mr-pale/25 px-2 py-0.5 text-[0.65rem] font-semibold text-mr-base">
                  {c.status}
                </span>
                <p className="mt-1 text-sm font-semibold text-mr-dark">
                  {money(effectivePrice(c))}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeComp(c.id)}
                aria-label="Remove"
                className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-mr-base/15 text-mr-base hover:bg-mr-pale/20"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </section>

      <CmaPrint cma={cma} range={range} summary={summary} />
    </PageShell>
  );
}
