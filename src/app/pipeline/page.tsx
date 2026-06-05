"use client";

import { useMemo, useState } from "react";
import PageShell from "@/components/PageShell";
import {
  PIPELINE_DEALS,
  PIPELINE_STAGE_META,
  type PipelineDeal,
  type StageId,
} from "@/lib/mock/pipeline";

type SideFilter = "All" | "Buyer" | "Seller";

// Pipeline board for the client flow. Deals live in local state so the move
// actions feel live: each card can shift to the previous or next stage, and
// clicking a card opens a detail drawer. Filtering by side and a search box
// narrow the board. All data is fabricated.
export default function PipelinePage() {
  const [deals, setDeals] = useState<PipelineDeal[]>(PIPELINE_DEALS);
  const [side, setSide] = useState<SideFilter>("All");
  const [query, setQuery] = useState("");
  const [openDeal, setOpenDeal] = useState<PipelineDeal | null>(null);

  const stageIndex = (id: StageId) =>
    PIPELINE_STAGE_META.findIndex((s) => s.id === id);

  const moveDeal = (id: string, direction: -1 | 1) => {
    const shift = (deal: PipelineDeal): PipelineDeal => {
      const next = stageIndex(deal.stage) + direction;
      if (next < 0 || next >= PIPELINE_STAGE_META.length) return deal;
      return { ...deal, stage: PIPELINE_STAGE_META[next].id };
    };
    setDeals((prev) => prev.map((deal) => (deal.id === id ? shift(deal) : deal)));
    setOpenDeal((cur) => (cur && cur.id === id ? shift(cur) : cur));
  };

  const filtered = useMemo(() => {
    return deals.filter((deal) => {
      const matchSide = side === "All" || deal.side === side;
      const matchQuery =
        query.trim() === "" ||
        deal.name.toLowerCase().includes(query.toLowerCase()) ||
        deal.property.toLowerCase().includes(query.toLowerCase());
      return matchSide && matchQuery;
    });
  }, [deals, side, query]);

  const totalValue = filtered.reduce((sum, d) => {
    const n = Number(d.value.replace(/[^0-9]/g, ""));
    return sum + (Number.isFinite(n) ? n : 0);
  }, 0);

  return (
    <PageShell
      active="/pipeline"
      eyebrow="Client Management"
      title="Pipeline"
      description="Every client moving through your pipeline, from first market analysis request to follow-up. Drag-free stage moves, a detail drawer, and quick filters. Sample data only."
    >
      {/* Controls */}
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-white/50 bg-white/60 p-4 shadow-sm backdrop-blur-xl backdrop-saturate-150 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex rounded-full border border-mr-base/15 bg-white/70 p-1">
            {(["All", "Buyer", "Seller"] as SideFilter[]).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setSide(opt)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  side === opt
                    ? "bg-mr-base text-white shadow-sm"
                    : "text-body hover:text-mr-base"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or property"
            className="w-56 rounded-full border border-mr-base/15 bg-white/70 px-4 py-2 text-sm text-mr-dark outline-none transition focus:border-mr-light focus:ring-2 focus:ring-mr-light/40"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-heading text-lg font-bold text-mr-base">
              {filtered.length} deals
            </p>
            <p className="text-xs text-body">
              ${totalValue.toLocaleString()} potential volume
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              setOpenDeal({
                id: "new",
                name: "New client",
                property: "Add a client and property",
                side: "Seller",
                value: "$0",
                source: "Manual entry",
                lastTouch: "Just now",
                nextStep: "Fill out client details",
                stage: "request",
                initials: "+",
              })
            }
            className="rounded-full bg-mr-base px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-mr-mid focus:outline-none focus-visible:ring-2 focus-visible:ring-mr-light"
          >
            Add Client
          </button>
        </div>
      </div>

      {/* Board */}
      <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-5 lg:overflow-visible">
        {PIPELINE_STAGE_META.map((stage) => {
          const stageDeals = filtered.filter((d) => d.stage === stage.id);
          return (
            <div
              key={stage.id}
              className="w-72 flex-none snap-start rounded-2xl border border-white/60 bg-white/45 p-4 shadow-sm backdrop-blur-xl backdrop-saturate-150 lg:w-auto"
            >
              <div className="mb-1 flex items-center justify-between">
                <h3 className="font-heading text-sm font-bold text-mr-dark">
                  {stage.label}
                </h3>
                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-mr-pale/25 px-2 text-xs font-semibold text-mr-base">
                  {stageDeals.length}
                </span>
              </div>
              <p className="mb-3 text-xs text-body">{stage.hint}</p>

              <div className="flex flex-col gap-2">
                {stageDeals.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-mr-base/15 px-3 py-6 text-center text-xs text-body">
                    Nothing here
                  </p>
                ) : (
                  stageDeals.map((deal) => (
                    <DealCard
                      key={deal.id}
                      deal={deal}
                      onOpen={() => setOpenDeal(deal)}
                      onMove={moveDeal}
                      atStart={stageIndex(deal.stage) === 0}
                      atEnd={
                        stageIndex(deal.stage) ===
                        PIPELINE_STAGE_META.length - 1
                      }
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      <DealDrawer deal={openDeal} onClose={() => setOpenDeal(null)} />
    </PageShell>
  );
}

function DealCard({
  deal,
  onOpen,
  onMove,
  atStart,
  atEnd,
}: {
  deal: PipelineDeal;
  onOpen: () => void;
  onMove: (id: string, dir: -1 | 1) => void;
  atStart: boolean;
  atEnd: boolean;
}) {
  return (
    <div className="group rounded-xl border border-white/70 bg-white/70 p-3 shadow-sm transition-colors hover:border-mr-light/50 hover:bg-white">
      <button
        type="button"
        onClick={onOpen}
        className="flex w-full items-center gap-2 text-left focus:outline-none"
      >
        <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-gradient-to-br from-mr-light to-mr-base text-[0.6rem] font-bold text-white">
          {deal.initials}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-mr-dark">
            {deal.name}
          </span>
          <span className="block truncate text-xs text-body">
            {deal.property}
          </span>
        </span>
      </button>
      <div className="mt-2 flex items-center justify-between">
        <span className="rounded-full bg-mr-pale/25 px-2 py-0.5 text-[0.65rem] font-semibold text-mr-base">
          {deal.side} · {deal.value}
        </span>
        <span className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            type="button"
            disabled={atStart}
            onClick={() => onMove(deal.id, -1)}
            aria-label="Move to previous stage"
            className="flex h-6 w-6 items-center justify-center rounded-full border border-mr-base/15 text-mr-base disabled:opacity-30 hover:bg-mr-pale/20"
          >
            &larr;
          </button>
          <button
            type="button"
            disabled={atEnd}
            onClick={() => onMove(deal.id, 1)}
            aria-label="Move to next stage"
            className="flex h-6 w-6 items-center justify-center rounded-full border border-mr-base/15 text-mr-base disabled:opacity-30 hover:bg-mr-pale/20"
          >
            &rarr;
          </button>
        </span>
      </div>
    </div>
  );
}

function DealDrawer({
  deal,
  onClose,
}: {
  deal: PipelineDeal | null;
  onClose: () => void;
}) {
  if (!deal) return null;
  const stageLabel =
    PIPELINE_STAGE_META.find((s) => s.id === deal.stage)?.label ?? deal.stage;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex justify-end bg-mr-dark/30 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-full w-full max-w-md overflow-y-auto border-l border-white/70 bg-white/85 p-7 shadow-[0_0_80px_-20px_rgba(28,60,69,0.5)] backdrop-blur-2xl"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-mr-light to-mr-base text-base font-bold text-white">
              {deal.initials}
            </span>
            <div>
              <h2 className="font-heading text-xl font-bold text-mr-dark">
                {deal.name}
              </h2>
              <p className="text-sm text-body">{deal.property}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-mr-base/15 bg-white/70 text-mr-base hover:bg-white"
          >
            &times;
          </button>
        </div>

        <span className="mt-5 inline-block rounded-full bg-mr-base px-3 py-1 text-xs font-semibold text-white">
          {stageLabel}
        </span>

        <dl className="mt-5 grid grid-cols-2 gap-3">
          {[
            ["Side", deal.side],
            ["Value", deal.value],
            ["Source", deal.source],
            ["Last touch", deal.lastTouch],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl border border-white/60 bg-white/60 p-3"
            >
              <dt className="text-xs text-body">{label}</dt>
              <dd className="mt-0.5 text-sm font-semibold text-mr-dark">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-4 rounded-xl border border-mr-light/30 bg-mr-pale/15 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-mr-base">
            Next step
          </p>
          <p className="mt-1 text-sm text-mr-dark">{deal.nextStep}</p>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-mr-base px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-mr-mid"
          >
            Log a touch
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-mr-base/20 bg-white/70 px-5 py-2.5 text-sm font-semibold text-mr-base transition-colors hover:bg-white"
          >
            Open client record
          </button>
        </div>

        <p className="mt-6 text-xs text-body">
          Placeholder client record. The live drawer would pull contact details,
          analysis history, and scheduled touches from the CRM.
        </p>
      </div>
    </div>
  );
}
