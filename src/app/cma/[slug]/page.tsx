"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import Photo from "@/components/Photo";
import { useAgentProfile } from "@/components/AgentProfileProvider";
import { downloadVcard } from "@/lib/vcard";
import { googleMapsEmbed, zillowUrl, appleMapsUrl } from "@/lib/mock/tour";
import {
  DEFAULT_CMA,
  loadCma,
  summaryByStatus,
  suggestedRange,
  pricePerSqft,
  effectivePrice,
  money,
  type Cma,
} from "@/lib/mock/cma";

// Live, client-facing Comparative Market Analysis (output of the CMA builder).
// Marshall Reddick branded: subject hero, suggested price range, market summary,
// comparables with Zillow + Apple Maps links, a map, and the agent card.
export default function CmaLivePage() {
  const { profile, initials } = useAgentProfile();
  const [cma, setCma] = useState<Cma>(DEFAULT_CMA);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    setCma(loadCma());
  }, []);

  const s = cma.subject;
  const summary = summaryByStatus(cma.comps);
  const range = suggestedRange(cma.comps, s.sqft);

  const shareCma = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Market analysis: ${s.address}`,
          url,
        });
        return;
      }
      await navigator.clipboard?.writeText(url);
    } catch {
      // ignore
    }
    setShared(true);
    setTimeout(() => setShared(false), 1800);
  };

  return (
    <main className="min-h-screen bg-surface-light pb-24 text-body">
      <header className="sticky top-0 z-30 border-b-2 border-mr-light bg-gradient-to-r from-mr-dark to-mr-base">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          <Logo theme="dark" variant="logotype" width={170} priority />
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-mr-pale">
            Market Analysis
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden text-white">
        <Photo
          src={s.photo}
          alt={s.address}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-mr-dark/95 via-mr-dark/85 to-mr-base/75"
        />
        <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-mr-pale">
            Comparative Market Analysis
          </p>
          <h1 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
            {s.address}
          </h1>
          <p className="mt-1 text-white/85">
            {s.city} · Prepared for {cma.client}
          </p>

          <div className="mt-6 rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-mr-pale">
              Suggested list price
            </p>
            <p className="mt-1 font-heading text-4xl font-bold">
              {range.mid ? money(range.mid) : "—"}
            </p>
            <p className="mt-1 text-sm text-white/85">
              {range.basis
                ? `${money(range.low)} to ${money(range.high)}, based on ${range.basis} comparable homes at ${money(Math.round(range.avgPpsf))}/sqft.`
                : "No comparables yet."}
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[
                ["Conservative", range.low],
                ["Suggested", range.mid],
                ["Aggressive", range.high],
              ].map(([label, v]) => (
                <div
                  key={label as string}
                  className="rounded-2xl border border-white/15 bg-white/5 p-3"
                >
                  <p className="font-heading text-lg font-bold">
                    {v ? money(v as number) : "—"}
                  </p>
                  <p className="text-[0.6rem] text-white/70">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Subject details */}
        <section className="mt-8 rounded-2xl border border-white/60 bg-white/70 p-6 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-mr-dark">
            Your home
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              [`${s.beds}`, "Beds"],
              [`${s.baths}`, "Baths"],
              [s.sqft.toLocaleString(), "Sqft"],
              [`${s.year}`, "Year built"],
            ].map(([v, l]) => (
              <div
                key={l}
                className="rounded-xl border border-white/60 bg-white/60 p-3 text-center"
              >
                <p className="font-heading text-lg font-bold text-mr-dark">{v}</p>
                <p className="text-xs text-body">{l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Market summary */}
        <section className="mt-8">
          <h2 className="mb-3 font-heading text-2xl font-bold text-mr-dark">
            Market summary
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/60 bg-white/70 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-mr-dark text-xs uppercase tracking-wide text-white">
                  <th className="px-3 py-2 font-semibold">Status</th>
                  <th className="px-3 py-2 text-right font-semibold">Count</th>
                  <th className="px-3 py-2 text-right font-semibold">Avg price</th>
                  <th className="px-3 py-2 text-right font-semibold">$/sqft</th>
                  <th className="px-3 py-2 text-right font-semibold">Avg DOM</th>
                </tr>
              </thead>
              <tbody>
                {summary.map((row, i) => (
                  <tr key={row.status} className={i % 2 ? "bg-white/40" : "bg-mr-pale/10"}>
                    <td className="px-3 py-2 font-medium text-mr-dark">{row.status}</td>
                    <td className="px-3 py-2 text-right text-body">{row.total}</td>
                    <td className="px-3 py-2 text-right text-mr-dark">{money(row.avgPrice)}</td>
                    <td className="px-3 py-2 text-right text-body">{money(Math.round(row.avgPpsf))}</td>
                    <td className="px-3 py-2 text-right text-body">{row.avgDom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Comparables */}
        <section className="mt-8">
          <h2 className="mb-3 font-heading text-2xl font-bold text-mr-dark">
            Comparable homes
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {cma.comps.map((c) => (
              <div
                key={c.id}
                className="overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-sm"
              >
                <div className="relative h-40">
                  <Photo src={c.photo} alt={c.address} className="h-40 w-full object-cover" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-mr-dark">
                    {c.status}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-heading text-lg font-bold text-mr-base">
                        {money(effectivePrice(c))}
                      </p>
                      <p className="text-sm font-medium text-mr-dark">{c.address}</p>
                    </div>
                    <p className="text-right text-xs text-body">
                      {money(Math.round(pricePerSqft(c)))}/sqft
                      <br />
                      {c.dom} DOM
                    </p>
                  </div>
                  <p className="mt-1 text-xs text-body">
                    {c.beds} bd · {c.baths} ba · {c.sqft.toLocaleString()} sqft · {c.year}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <a
                      href={zillowUrl(c)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-full bg-mr-base px-3 py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-mr-mid"
                    >
                      View on Zillow
                    </a>
                    <a
                      href={appleMapsUrl(c)}
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

        {/* Map */}
        <section className="mt-8">
          <h2 className="mb-3 font-heading text-2xl font-bold text-mr-dark">
            Subject and comps
          </h2>
          <div className="overflow-hidden rounded-2xl border border-white/60 shadow-sm">
            <iframe
              key={cma.comps.map((c) => c.id).join("-")}
              title="CMA map"
              src={googleMapsEmbed([s, ...cma.comps])}
              className="h-72 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        {/* Agent card */}
        <section className="mt-8 overflow-hidden rounded-3xl bg-gradient-to-br from-mr-dark to-mr-base p-6 text-white shadow-lg sm:p-8">
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
          <p className="mt-4 text-sm text-white/85">
            Questions about your home&rsquo;s value or a pricing strategy? Let&rsquo;s talk.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
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
            onClick={shareCma}
            className="mt-3 w-full rounded-full bg-white py-3 text-sm font-semibold text-mr-dark transition-transform hover:-translate-y-0.5"
          >
            {shared ? "Link copied" : "Text this analysis to a client"}
          </button>
          {/* Real .vcf download */}
          <button
            type="button"
            onClick={() => downloadVcard(profile)}
            className="mt-2 w-full rounded-full border border-white/30 bg-white/10 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
          >
            Save {profile.name.split(" ")[0]} to contacts
          </button>
        </section>

        <footer className="mt-10 text-center">
          <p className="font-heading text-sm font-bold uppercase tracking-widest text-mr-base">
            {profile.brokerage}
          </p>
          <p className="mt-2 text-xs text-body">
            A comparative market analysis is an estimate of value, not an
            appraisal. Fabricated sample data for reference design.
          </p>
          <p className="mt-3">
            <Link href="/cma" className="text-xs text-mr-base underline">
              Back to the CMA builder
            </Link>
          </p>
        </footer>
      </div>

      {/* Sticky CTA: price + one-tap text to the agent */}
      <div className="fixed bottom-4 left-0 right-0 z-40 px-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 rounded-full bg-mr-dark py-2 pl-6 pr-2 text-sm font-semibold text-white shadow-2xl">
          <span className="flex items-center gap-2">
            <span aria-hidden className="text-mr-light">●</span>
            Suggested list price {range.mid ? money(range.mid) : "—"}
          </span>
          <a
            href={`sms:${profile.phone.replace(/[^0-9+]/g, "")}?&body=${encodeURIComponent(`Hi ${profile.name.split(" ")[0]}, I reviewed the market analysis for ${s.address}. Let's talk pricing.`)}`}
            className="rounded-full bg-mr-light px-4 py-2 text-xs font-semibold text-mr-dark transition-colors hover:bg-white"
          >
            Talk pricing
          </a>
        </div>
      </div>
    </main>
  );
}
