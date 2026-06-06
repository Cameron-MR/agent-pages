"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageShell from "@/components/PageShell";
import Photo from "@/components/Photo";
import { useAgentProfile } from "@/components/AgentProfileProvider";
import {
  DEFAULT_TOUR,
  loadTour,
  saveTour,
  lookupMls,
  SAMPLE_MLS_IDS,
  type Tour,
  type TourStop,
} from "@/lib/mock/tour";

// Property Tour Builder. The agent assembles an ordered tour of homes by MLS
// listing ID (pulled from the MLS, mocked for now), adds showing times and
// notes, then previews the client-facing tour page. Advisor details come from
// the agent profile. All data is fabricated.
export default function TourBuilderPage() {
  const router = useRouter();
  const { profile } = useAgentProfile();
  const [tour, setTour] = useState<Tour>(DEFAULT_TOUR);
  const [mlsId, setMlsId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setTour(loadTour());
  }, []);

  const update = (patch: Partial<Tour>) => setTour((t) => ({ ...t, ...patch }));

  const updateStop = (id: string, patch: Partial<TourStop>) =>
    setTour((t) => ({
      ...t,
      stops: t.stops.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }));

  const addStop = (rawId: string) => {
    const rec = lookupMls(rawId);
    if (!rec) {
      setError("Enter an MLS listing ID.");
      return;
    }
    setError("");
    const stop: TourStop = {
      ...rec,
      id: "s" + Date.now(),
      mlsId: rawId.trim().toUpperCase(),
      showingTime: "",
      notes: "",
    };
    setTour((t) => ({ ...t, stops: [...t.stops, stop] }));
    setMlsId("");
  };

  const moveStop = (id: string, dir: -1 | 1) =>
    setTour((t) => {
      const i = t.stops.findIndex((s) => s.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= t.stops.length) return t;
      const stops = [...t.stops];
      [stops[i], stops[j]] = [stops[j], stops[i]];
      return { ...t, stops };
    });

  const removeStop = (id: string) =>
    setTour((t) => ({ ...t, stops: t.stops.filter((s) => s.id !== id) }));

  const preview = () => {
    saveTour(tour);
    router.push("/tour/jordan-sample");
  };

  return (
    <PageShell
      active="/marketing"
      eyebrow="Marketing"
      title="Property Tour Builder"
      description="Assemble a branded tour of homes for a client by MLS listing ID, set showing times, and share a beautiful tour page. Property details pull from the MLS. Sample data only."
    >
      <div className="flex flex-col gap-6">
        {/* 1. Tour details */}
        <section className="rounded-2xl border border-white/50 bg-white/60 p-6 shadow-sm backdrop-blur-xl backdrop-saturate-150">
          <h2 className="font-heading text-lg font-bold text-mr-dark">
            1. Tour details
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Text label="Client name" value={tour.client} onChange={(v) => update({ client: v })} />
            <Text label="Headline" value={tour.headline} onChange={(v) => update({ headline: v })} />
            <Text label="City / area" value={tour.city} onChange={(v) => update({ city: v })} />
            <Text label="Cover photo URL" value={tour.coverPhoto} onChange={(v) => update({ coverPhoto: v })} />
          </div>
        </section>

        {/* 2. Advisor (from profile) */}
        <section className="rounded-2xl border border-white/50 bg-white/60 p-6 shadow-sm backdrop-blur-xl backdrop-saturate-150">
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-heading text-lg font-bold text-mr-dark">
              2. Your contact info
            </h2>
            <span className="rounded-full bg-mr-pale/25 px-3 py-1 text-xs font-medium text-mr-base">
              From your profile
            </span>
          </div>
          <div className="mt-4 flex items-center gap-4 rounded-xl border border-white/60 bg-white/70 p-4">
            <Photo
              src={profile.photo}
              alt={profile.name}
              className="h-14 w-14 flex-none rounded-full object-cover object-[center_20%]"
            />
            <div className="text-sm">
              <p className="font-heading text-base font-bold text-mr-dark">
                {profile.name}
              </p>
              <p className="text-body">
                {profile.title}, {profile.brokerage}
              </p>
              <p className="text-mr-base">
                {profile.phone} · {profile.email}
              </p>
              <p className="text-xs text-body">
                {profile.license} · {profile.address}
              </p>
            </div>
          </div>
          <p className="mt-2 text-xs text-body">
            Edit these in Settings; they appear on the tour you share.
          </p>
        </section>

        {/* 3. Properties */}
        <section className="rounded-2xl border border-white/50 bg-white/60 p-6 shadow-sm backdrop-blur-xl backdrop-saturate-150">
          <h2 className="font-heading text-lg font-bold text-mr-dark">
            3. Properties
          </h2>
          <p className="mt-1 text-sm text-body">
            Add homes by MLS listing ID. Details pull from the MLS automatically.
          </p>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <input
              value={mlsId}
              onChange={(e) => setMlsId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addStop(mlsId)}
              placeholder="MLS listing ID (e.g., OC1005)"
              className="flex-1 rounded-xl border border-mr-base/15 bg-white px-4 py-2.5 text-sm text-mr-dark outline-none focus:border-mr-light focus:ring-2 focus:ring-mr-light/40"
            />
            <button
              type="button"
              onClick={() => addStop(mlsId)}
              className="rounded-full bg-mr-base px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-mr-mid"
            >
              Add property
            </button>
          </div>
          {error ? (
            <p className="mt-1 text-xs font-medium text-red-600">{error}</p>
          ) : null}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs text-body">Try:</span>
            {SAMPLE_MLS_IDS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => addStop(id)}
                className="rounded-full border border-mr-base/15 px-2.5 py-0.5 text-xs font-medium text-mr-base hover:bg-mr-pale/20"
              >
                {id}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-body">
            Mock MLS data for now. The live MLS API will plug in here later.
          </p>

          {/* Stop list */}
          <div className="mt-5 flex flex-col gap-3">
            {tour.stops.map((s, i) => (
              <div
                key={s.id}
                className="flex flex-col gap-3 rounded-2xl border border-white/60 bg-white/70 p-3 sm:flex-row"
              >
                <div className="relative h-28 w-full flex-none overflow-hidden rounded-xl sm:w-40">
                  <Photo
                    src={s.photo}
                    alt={s.address}
                    className="h-28 w-full object-cover"
                  />
                  <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-mr-base text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-heading text-sm font-bold text-mr-dark">
                        {s.address}
                      </p>
                      <p className="text-xs text-body">
                        {s.city} · {s.price} · {s.beds} bd / {s.baths} ba /{" "}
                        {s.sqft} sqft
                      </p>
                      <p className="text-xs text-mr-pale">MLS {s.mlsId}</p>
                    </div>
                    <div className="flex flex-none items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveStop(s.id, -1)}
                        disabled={i === 0}
                        aria-label="Move up"
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-mr-base/15 text-mr-base disabled:opacity-30"
                      >
                        ▴
                      </button>
                      <button
                        type="button"
                        onClick={() => moveStop(s.id, 1)}
                        disabled={i === tour.stops.length - 1}
                        aria-label="Move down"
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-mr-base/15 text-mr-base disabled:opacity-30"
                      >
                        ▾
                      </button>
                      <button
                        type="button"
                        onClick={() => removeStop(s.id)}
                        aria-label="Remove"
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-mr-base/15 text-mr-base hover:bg-mr-pale/20"
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    <input
                      value={s.showingTime}
                      onChange={(e) =>
                        updateStop(s.id, { showingTime: e.target.value })
                      }
                      placeholder="Showing time"
                      className="rounded-lg border border-mr-base/15 bg-white px-3 py-1.5 text-xs text-mr-dark outline-none focus:border-mr-light"
                    />
                    <input
                      value={s.notes}
                      onChange={(e) =>
                        updateStop(s.id, { notes: e.target.value })
                      }
                      placeholder="Notes for the client"
                      className="rounded-lg border border-mr-base/15 bg-white px-3 py-1.5 text-xs text-mr-dark outline-none focus:border-mr-light sm:col-span-2"
                    />
                  </div>
                </div>
              </div>
            ))}
            {tour.stops.length === 0 ? (
              <p className="rounded-xl border border-dashed border-mr-base/20 px-3 py-8 text-center text-sm text-body">
                No properties yet. Add one by MLS ID above.
              </p>
            ) : null}
          </div>
        </section>

        {/* Action bar */}
        <div className="sticky bottom-4 flex items-center justify-between gap-4 rounded-2xl border border-white/50 bg-white/80 p-4 shadow-lg backdrop-blur-xl">
          <p className="text-sm text-body">
            {tour.stops.length} stop{tour.stops.length === 1 ? "" : "s"} on this
            tour
          </p>
          <button
            type="button"
            onClick={preview}
            disabled={tour.stops.length === 0}
            className="rounded-full bg-mr-base px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-mr-mid disabled:opacity-40"
          >
            Generate &amp; preview tour
          </button>
        </div>
      </div>
    </PageShell>
  );
}

function Text({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-mr-dark">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-mr-base/15 bg-white px-3 py-2.5 text-sm text-mr-dark outline-none transition focus:border-mr-light focus:ring-2 focus:ring-mr-light/40"
      />
    </label>
  );
}
