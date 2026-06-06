"use client";

import { useAgentProfile } from "@/components/AgentProfileProvider";
import { DEFAULT_FEATURES, type Listing } from "@/lib/mock/listings";

const C = {
  base: "#316878",
  dark: "#1C3C45",
  light: "#50AAC4",
  tint: "#EEF4F6",
  body: "#555555",
  muted: "#8a8a8a",
  line: "#e3e9eb",
};

// Marshall Reddick branded property flyer, consistent with BrandedPrintSheet:
// teal header band, full-width hero photo, price block, features, photo strip,
// and an agent footer band. Hidden on screen, printed alone (#print-area).
export default function FlyerPrint({ listing }: { listing: Listing }) {
  const { profile } = useAgentProfile();
  const features = (listing.features ?? DEFAULT_FEATURES).slice(0, 6);
  const photos = [listing.photo, ...listing.gallery].slice(0, 3);

  return (
    <div
      id="print-area"
      className="print-sheet"
      style={{ color: C.dark, fontFamily: "var(--font-open-sans), sans-serif" }}
    >
      {/* Header band */}
      <div
        style={{
          background: C.base,
          color: "#fff",
          borderRadius: 14,
          padding: "18px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/white-logo.svg" alt="Marshall Reddick Real Estate" width={200} />
        <span
          style={{
            background: "#fff",
            color: C.base,
            borderRadius: 999,
            padding: "4px 14px",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          {listing.status}
        </span>
      </div>

      {/* Hero photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={listing.photo}
        alt={listing.address}
        style={{
          width: "100%",
          height: 330,
          objectFit: "cover",
          borderRadius: 14,
          marginTop: 16,
        }}
      />

      {/* Price + address */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginTop: 16,
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, fontFamily: "var(--font-raleway), sans-serif" }}>
            {listing.address}
          </h1>
          <p style={{ margin: "2px 0 0", color: C.body, fontSize: 14 }}>
            {listing.city}
          </p>
        </div>
        <p style={{ margin: 0, fontSize: 30, fontWeight: 700, color: C.base, fontFamily: "var(--font-raleway), sans-serif" }}>
          {listing.price}
        </p>
      </div>

      {/* Specs strip */}
      <div
        style={{
          marginTop: 12,
          display: "flex",
          gap: 10,
          fontSize: 13,
        }}
      >
        {[
          [`${listing.beds}`, "Beds"],
          [`${listing.baths}`, "Baths"],
          [listing.sqft, "Sqft"],
        ].map(([v, l]) => (
          <div
            key={l}
            style={{
              flex: 1,
              background: C.tint,
              borderRadius: 10,
              padding: "8px 12px",
              textAlign: "center",
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 16, color: C.dark }}>{v}</span>
            <span style={{ display: "block", fontSize: 11, color: C.body }}>{l}</span>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 14, fontSize: 13, lineHeight: 1.6, color: C.body }}>
        {listing.blurb}
      </p>

      {/* Features */}
      <p style={{ margin: "16px 0 6px", fontSize: 10, letterSpacing: 1.5, color: C.base, fontWeight: 700 }}>
        FEATURES
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, fontSize: 13, color: C.dark }}>
        {features.map((f) => (
          <span key={f}>
            <span style={{ color: C.light }}>&#10003;</span> {f}
          </span>
        ))}
      </div>

      {/* Photo strip */}
      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        {photos.slice(1).map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt={`${listing.address} ${i + 2}`}
            style={{ width: "50%", height: 130, objectFit: "cover", borderRadius: 10 }}
          />
        ))}
      </div>

      {/* Agent footer band */}
      <div
        style={{
          marginTop: 18,
          background: C.dark,
          color: "#fff",
          borderRadius: 14,
          padding: "16px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 15 }}>{profile.name}</p>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: "rgba(255,255,255,0.8)" }}>
            {profile.title}, {profile.brokerage}
          </p>
        </div>
        <div style={{ textAlign: "right", fontSize: 12 }}>
          <p style={{ margin: 0, color: "#fff" }}>{profile.phone}</p>
          <p style={{ margin: "2px 0 0", color: "rgba(255,255,255,0.85)" }}>{profile.email}</p>
          <p style={{ margin: "2px 0 0", color: "rgba(255,255,255,0.6)" }}>{profile.license}</p>
        </div>
      </div>

      <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6 }}>
        <span aria-hidden style={{ color: C.base, fontSize: 13 }}>&#8962;</span>
        <span style={{ fontSize: 9.5, color: C.muted }}>
          Equal Housing Opportunity · {profile.brokerage}. Fabricated sample
          flyer for reference design.
        </span>
      </div>
    </div>
  );
}
