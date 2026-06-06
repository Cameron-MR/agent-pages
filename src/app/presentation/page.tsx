"use client";

import { useState } from "react";
import PageShell from "@/components/PageShell";
import { useAgentProfile } from "@/components/AgentProfileProvider";
import { LISTINGS } from "@/lib/mock/listings";

const C = {
  base: "#316878",
  dark: "#1C3C45",
  light: "#50AAC4",
  tint: "#EEF4F6",
  body: "#555555",
  muted: "#8a8a8a",
  line: "#e3e9eb",
};

// Branded Listing Presentation: a real, printable document the agent brings to
// a listing appointment. The document below is the print target (#print-area)
// and is shown on screen as-is, so what you see is exactly what prints.
export default function PresentationPage() {
  const { profile } = useAgentProfile();
  const [listingId, setListingId] = useState(LISTINGS[0].id);
  const [client, setClient] = useState("The Sample Family");
  const listing = LISTINGS.find((l) => l.id === listingId) ?? LISTINGS[0];
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const PLAN = [
    ["Professional media", "HDR photography, twilight shots, drone, and a 3D tour."],
    ["MLS + syndication", "Listed on the MLS and syndicated to Zillow, Realtor.com, and Redfin."],
    ["Dedicated property site", "A single-listing website with gallery and lead capture."],
    ["Social campaign", "Just-listed posts, stories, and targeted boosts."],
    ["Email blast", "Announcement to our sphere and matching buyer lists."],
    ["Open houses", "Launch weekend open house with neighbor preview."],
  ];

  const STEPS = [
    ["Day 1-3", "Sign the listing agreement, schedule media, begin disclosures."],
    ["Day 4-7", "Photos and staging, property site live, MLS entry ready."],
    ["Day 8", "Go live everywhere, social and email campaigns launch."],
    ["Week 2", "Open house weekend, showings, offer review strategy."],
  ];

  return (
    <PageShell
      active="/marketing"
      eyebrow="Marketing"
      title="Listing Presentation"
      description="A branded, printable presentation for your listing appointment. Pick the property, personalize, and print or save as PDF. The document below is exactly what prints."
    >
      {/* Controls */}
      <div className="mb-6 flex flex-wrap items-end gap-3 rounded-2xl border border-white/50 bg-white/60 p-4 shadow-sm backdrop-blur-xl backdrop-saturate-150 print:hidden">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-mr-dark">Property</span>
          <select
            value={listingId}
            onChange={(e) => setListingId(e.target.value)}
            className="rounded-xl border border-mr-base/15 bg-white px-3 py-2.5 text-sm text-mr-dark outline-none focus:border-mr-light"
          >
            {LISTINGS.map((l) => (
              <option key={l.id} value={l.id}>
                {l.address}, {l.city.split(",")[0]}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-mr-dark">Prepared for</span>
          <input
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="rounded-xl border border-mr-base/15 bg-white px-3 py-2.5 text-sm text-mr-dark outline-none focus:border-mr-light"
          />
        </label>
        <button
          type="button"
          onClick={() => window.print()}
          className="ml-auto rounded-full bg-mr-base px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-mr-mid"
        >
          <span aria-hidden>⎙</span> Print / Save PDF
        </button>
      </div>

      {/* The document (screen view = print output) */}
      <div className="overflow-hidden rounded-2xl shadow-xl">
        <div
          id="print-area"
          style={{
            background: "#fff",
            color: C.dark,
            fontFamily: "var(--font-open-sans), sans-serif",
            padding: 28,
          }}
        >
          {/* Cover band */}
          <div
            style={{
              background: C.base,
              color: "#fff",
              borderRadius: 14,
              padding: "26px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/white-logo.svg" alt="Marshall Reddick Real Estate" width={220} />
              <p style={{ margin: "8px 0 0", fontSize: 10, letterSpacing: 1, color: "rgba(255,255,255,0.8)" }}>
                REAL ESTATE &nbsp;|&nbsp; PROPERTY MANAGEMENT &nbsp;|&nbsp; PRIVATE LENDING
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, fontFamily: "var(--font-raleway), sans-serif" }}>
                Listing Presentation
              </h1>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "rgba(255,255,255,0.85)" }}>
                {listing.address}, {listing.city}
              </p>
              <p style={{ margin: "2px 0 0", fontSize: 11, color: "rgba(255,255,255,0.7)" }}>
                Prepared for {client} · {today}
              </p>
            </div>
          </div>

          {/* Hero photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={listing.photo}
            alt={listing.address}
            style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: 14, marginTop: 16 }}
          />

          {/* About the agent */}
          <div style={{ display: "flex", gap: 18, marginTop: 22, alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.photo}
              alt={profile.name}
              style={{ width: 84, height: 84, objectFit: "cover", objectPosition: "center 20%", borderRadius: "50%", flex: "0 0 auto" }}
            />
            <div>
              <p style={{ margin: 0, fontSize: 10, letterSpacing: 1.5, color: C.base, fontWeight: 700 }}>
                YOUR AGENT
              </p>
              <p style={{ margin: "3px 0 0", fontSize: 17, fontWeight: 700 }}>{profile.name}</p>
              <p style={{ margin: "1px 0 0", fontSize: 12, color: C.body }}>
                {profile.title}, {profile.brokerage} · {profile.license}
              </p>
              <p style={{ margin: "1px 0 0", fontSize: 12, color: C.base }}>
                {profile.phone} · {profile.email}
              </p>
            </div>
          </div>

          {/* Why Marshall Reddick */}
          <SectionLabel text="The Marshall Reddick advantage" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[
              ["Full service", "Real estate, property management, and lending under one roof."],
              ["Sharp pricing", "Data-driven CMA so we list at the number that sells."],
              ["Real reach", "A buyer network and investor community most brokerages don't have."],
            ].map(([t, d]) => (
              <div key={t} style={{ background: C.tint, borderRadius: 12, padding: "12px 14px" }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: C.dark }}>{t}</p>
                <p style={{ margin: "4px 0 0", fontSize: 11.5, color: C.body, lineHeight: 1.5 }}>{d}</p>
              </div>
            ))}
          </div>

          {/* Marketing plan */}
          <SectionLabel text="Marketing plan" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {PLAN.map(([t, d]) => (
              <div key={t} style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: "12px 14px" }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: C.base }}>
                  <span style={{ color: C.light }}>&#10003;</span> {t}
                </p>
                <p style={{ margin: "4px 0 0", fontSize: 11.5, color: C.body, lineHeight: 1.5 }}>{d}</p>
              </div>
            ))}
          </div>

          {/* Pricing strategy */}
          <SectionLabel text="Pricing strategy" />
          <div
            style={{
              background: C.base,
              color: "#fff",
              borderRadius: 14,
              padding: "16px 22px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p style={{ margin: 0, fontSize: 11, letterSpacing: 1, color: "rgba(255,255,255,0.8)" }}>
                RECOMMENDED LIST PRICE
              </p>
              <p style={{ margin: "2px 0 0", fontSize: 28, fontWeight: 700, fontFamily: "var(--font-raleway), sans-serif" }}>
                {listing.price}
              </p>
            </div>
            <p style={{ margin: 0, fontSize: 11.5, color: "rgba(255,255,255,0.85)", maxWidth: 300, lineHeight: 1.5 }}>
              Backed by a full comparative market analysis of recent sales,
              pendings, and active competition. We review it together page by page.
            </p>
          </div>

          {/* Timeline */}
          <SectionLabel text="Your first two weeks" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
            {STEPS.map(([t, d]) => (
              <div key={t} style={{ borderTop: `3px solid ${C.light}`, paddingTop: 8 }}>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: C.dark }}>{t}</p>
                <p style={{ margin: "4px 0 0", fontSize: 11, color: C.body, lineHeight: 1.5 }}>{d}</p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{ marginTop: 24, paddingTop: 12, borderTop: `2px solid ${C.base}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <span aria-hidden style={{ color: C.base, fontSize: 13 }}>&#8962;</span>
              <span style={{ fontSize: 10, color: C.body, fontWeight: 600 }}>
                Equal Housing Opportunity
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 9.5, color: C.muted, lineHeight: 1.5 }}>
              {profile.brokerage} · {profile.address} · {profile.license}. Fabricated
              sample presentation for reference design.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );

  function SectionLabel({ text }: { text: string }) {
    return (
      <p style={{ margin: "22px 0 8px", fontSize: 10, letterSpacing: 1.5, color: C.base, fontWeight: 700 }}>
        {text.toUpperCase()}
      </p>
    );
  }
}
