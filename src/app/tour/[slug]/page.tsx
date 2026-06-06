"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import Photo from "@/components/Photo";
import { useAgentProfile } from "@/components/AgentProfileProvider";
import {
  DEFAULT_TOUR,
  loadTour,
  googleMapsEmbed,
  zillowUrl,
  appleMapsUrl,
  type Tour,
} from "@/lib/mock/tour";

// Client-facing property tour page (the output of the Tour Builder). Branded
// Marshall Reddick: top bar, hero with stats, a live route map with numbered
// pins, Compare Properties, an All Properties table, and the agent contact
// card. Reads the tour the agent built. All content is fabricated.
export default function TourPage() {
  const { profile, initials } = useAgentProfile();
  const [tour, setTour] = useState<Tour>(DEFAULT_TOUR);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    setTour(loadTour());
  }, []);

  const shareTour = async () => {
    const url = window.location.href;
    const text = `${tour.headline} — a home tour from ${profile.name}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: tour.headline, text, url });
        return;
      }
      await navigator.clipboard?.writeText(url);
    } catch {
      // ignore (user cancelled share or clipboard blocked)
    }
    setShared(true);
    setTimeout(() => setShared(false), 1800);
  };

  const stops = tour.stops;
  const priceNums = stops
    .map((s) => Number(s.price.replace(/[^0-9]/g, "")))
    .filter((n) => Number.isFinite(n) && n > 0);
  const min = priceNums.length ? Math.min(...priceNums) : 0;
  const max = priceNums.length ? Math.max(...priceNums) : 0;
  const fmt = (n: number) =>
    n >= 1000000 ? `$${(n / 1000000).toFixed(2)}M` : `$${Math.round(n / 1000)}K`;
  const beds = stops.map((s) => s.beds);
  const bedRange =
    beds.length === 0
      ? "—"
      : Math.min(...beds) === Math.max(...beds)
      ? `${beds[0]}`
      : `${Math.min(...beds)}-${Math.max(...beds)}`;

  return (
    <main className="min-h-screen bg-surface-light pb-24 text-body">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b-2 border-mr-light bg-gradient-to-r from-mr-dark to-mr-base">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
          <Logo theme="dark" variant="logotype" width={170} priority />
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-mr-pale">
            Property Tour
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Hero */}
        <section className="pt-10 text-center">
          <span className="inline-block rounded-full border border-mr-base/15 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-widest text-mr-base">
            {profile.brokerage}
          </span>
          <h1 className="mt-4 font-heading text-3xl font-bold text-mr-dark sm:text-4xl">
            {tour.headline}
          </h1>
          <p className="mt-2 text-sm text-body">
            Prepared for {tour.client} · {tour.city}
          </p>
        </section>

        {/* Stats */}
        <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            [String(stops.length), "Homes"],
            [bedRange, "Beds"],
            [priceNums.length ? `${fmt(min)}-${fmt(max)}` : "—", "Price range"],
            [
              priceNums.length ? fmt(Math.round((min + max) / 2)) : "—",
              "Midpoint",
            ],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-2xl border border-white/60 bg-white/70 p-4 text-center shadow-sm"
            >
              <p className="font-heading text-xl font-bold text-mr-dark">
                {value}
              </p>
              <p className="mt-0.5 text-[0.65rem] uppercase tracking-wide text-body">
                {label}
              </p>
            </div>
          ))}
        </section>

        {/* Live map */}
        <section className="mt-10">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="font-heading text-2xl font-bold text-mr-dark">
              Tour route
            </h2>
            <span className="text-xs text-body">{stops.length} stops</span>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/60 shadow-sm">
            <iframe
              key={stops.map((s) => s.id).join("-")}
              title="Tour route map"
              src={googleMapsEmbed(stops)}
              className="h-72 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        {/* Compare properties */}
        <section className="mt-10">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="font-heading text-2xl font-bold text-mr-dark">
              Compare homes
            </h2>
            <span className="text-xs text-body">swipe</span>
          </div>
          <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
            {stops.map((s, i) => (
              <div
                key={s.id}
                className="w-64 flex-none snap-start overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-sm"
              >
                <div className="relative h-36">
                  <Photo
                    src={s.photo}
                    alt={s.address}
                    className="h-36 w-full object-cover"
                  />
                  <span className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-mr-base text-sm font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <div className="p-4">
                  <p className="font-heading text-lg font-bold text-mr-base">
                    {s.price}
                  </p>
                  <p className="mt-1 text-sm font-medium text-mr-dark">
                    {s.address}
                  </p>
                  <p className="text-xs text-body">{s.city}</p>
                  <p className="mt-2 text-xs text-body">
                    {s.beds} bd · {s.baths} ba · {s.sqft} sqft
                  </p>
                  {s.showingTime ? (
                    <p className="mt-2 inline-block rounded-full bg-mr-pale/25 px-2.5 py-0.5 text-xs font-semibold text-mr-base">
                      {s.showingTime}
                    </p>
                  ) : null}
                  <div className="mt-3 flex gap-2">
                    <a
                      href={zillowUrl(s)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-full bg-mr-base px-3 py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-mr-mid"
                    >
                      View on Zillow
                    </a>
                    <a
                      href={appleMapsUrl(s)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-full border border-mr-base/20 bg-white px-3 py-2 text-center text-xs font-semibold text-mr-base transition-colors hover:bg-mr-pale/20"
                    >
                      Navigate
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All properties */}
        <section className="mt-10">
          <h2 className="mb-3 font-heading text-2xl font-bold text-mr-dark">
            All homes
          </h2>
          <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-sm">
            {stops.map((s, i) => (
              <div
                key={s.id}
                className="flex items-center gap-3 border-b border-mr-base/10 p-4 last:border-0"
              >
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-mr-dark text-xs font-bold text-white">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-heading text-sm font-bold text-mr-dark">
                    {s.address}
                  </p>
                  <p className="truncate text-xs text-body">
                    {s.city} · {s.beds} bd / {s.baths} ba / {s.sqft} sqft
                    {s.notes ? ` · ${s.notes}` : ""}
                  </p>
                  <div className="mt-1 flex gap-3 text-xs">
                    <a
                      href={zillowUrl(s)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-mr-base hover:text-mr-mid"
                    >
                      View on Zillow
                    </a>
                    <a
                      href={appleMapsUrl(s)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-mr-base hover:text-mr-mid"
                    >
                      Navigate
                    </a>
                  </div>
                </div>
                <div className="flex-none text-right">
                  <p className="font-heading text-sm font-bold text-mr-base">
                    {s.price}
                  </p>
                  {s.showingTime ? (
                    <p className="text-xs text-body">{s.showingTime}</p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-2 text-center text-xs text-body">
            Property details pulled from the MLS. Sample data only.
          </p>
        </section>

        {/* Agent card */}
        <section className="mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-mr-dark to-mr-base p-6 text-white shadow-lg sm:p-8">
          <div className="flex items-center gap-4">
            <Photo
              src={profile.photo}
              alt={profile.name}
              className="h-16 w-16 flex-none rounded-full object-cover object-[center_20%] ring-2 ring-white/30"
            />
            <div>
              <p className="font-heading text-xl font-bold">{profile.name}</p>
              <p className="text-sm text-mr-pale">
                {profile.brokerage} · {profile.title}
              </p>
              <span className="sr-only">{initials}</span>
            </div>
          </div>
          <div className="mt-4 space-y-0.5 text-sm text-white/85">
            <p>{profile.address}</p>
            <p>{profile.phone}</p>
            <p className="text-xs text-white/60">{profile.license}</p>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <a
              href={`tel:${profile.phone.replace(/[^0-9+]/g, "")}`}
              className="rounded-full bg-mr-light py-3 text-center text-sm font-semibold text-mr-dark transition-colors hover:bg-white"
            >
              Call
            </a>
            <a
              href={`sms:${profile.phone.replace(/[^0-9+]/g, "")}`}
              className="rounded-full border border-white/30 bg-white/10 py-3 text-center text-sm font-semibold transition-colors hover:bg-white/20"
            >
              Text
            </a>
          </div>
          <button
            type="button"
            onClick={shareTour}
            className="mt-3 w-full rounded-full bg-white py-3 text-sm font-semibold text-mr-dark transition-transform hover:-translate-y-0.5"
          >
            {shared ? "Link copied" : "Text this tour to a client"}
          </button>
        </section>

        <footer className="mt-10 text-center">
          <p className="font-heading text-sm font-bold uppercase tracking-widest text-mr-base">
            {profile.brokerage}
          </p>
          <p className="mt-2 text-xs text-body">
            Prices and availability are subject to change. Square footage is
            approximate. For tours and current pricing, contact your Marshall
            Reddick advisor. Fabricated sample tour for reference design.
          </p>
        </footer>
      </div>

      {/* Sticky route bar */}
      <div className="fixed bottom-4 left-0 right-0 z-40 px-4">
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-2 rounded-full bg-mr-dark px-6 py-3.5 text-sm font-semibold text-white shadow-2xl">
          <span aria-hidden className="text-mr-light">
            ●
          </span>
          Start the full tour route · {stops.length} stops
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-body">
        <Link href="/tour-builder" className="underline">
          Back to the tour builder
        </Link>
      </div>
    </main>
  );
}
