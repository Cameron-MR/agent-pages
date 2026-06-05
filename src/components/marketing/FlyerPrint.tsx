"use client";

import { useAgentProfile } from "@/components/AgentProfileProvider";
import { DEFAULT_FEATURES, type Listing } from "@/lib/mock/listings";

// Printable, Marshall Reddick branded property flyer personalized to the agent.
// Hidden on screen (.print-sheet) and shown alone when printing (#print-area,
// see globals.css). Only one print-area should be mounted at a time.
export default function FlyerPrint({ listing }: { listing: Listing }) {
  const { profile } = useAgentProfile();
  const features = (listing.features ?? DEFAULT_FEATURES).slice(0, 6);
  const photos = [listing.photo, ...listing.gallery].slice(0, 3);

  return (
    <div id="print-area" className="print-sheet text-[#1C3C45]">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "3px solid #316878",
          paddingBottom: 14,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/colored-logo.svg" alt="Marshall Reddick Real Estate" width={240} />
        <p
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#316878",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          {listing.status}
        </p>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={listing.photo}
        alt={listing.address}
        style={{
          width: "100%",
          height: 320,
          objectFit: "cover",
          borderRadius: 10,
          marginTop: 18,
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginTop: 18,
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700 }}>
            {listing.address}
          </h1>
          <p style={{ margin: "2px 0 0", color: "#555", fontSize: 14 }}>
            {listing.city}
          </p>
        </div>
        <p style={{ margin: 0, fontSize: 30, fontWeight: 700, color: "#316878" }}>
          {listing.price}
        </p>
      </div>

      <p style={{ marginTop: 8, fontSize: 14, color: "#1C3C45" }}>
        {listing.beds} bed &nbsp;·&nbsp; {listing.baths} bath &nbsp;·&nbsp;{" "}
        {listing.sqft} sqft
      </p>

      <p style={{ marginTop: 14, fontSize: 13, lineHeight: 1.6, color: "#555" }}>
        {listing.blurb}
      </p>

      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        {photos.slice(1).map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt={`${listing.address} ${i + 2}`}
            style={{ width: "50%", height: 140, objectFit: "cover", borderRadius: 8 }}
          />
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <p
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 1,
            color: "#316878",
            fontWeight: 700,
          }}
        >
          Features
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 6,
            marginTop: 6,
            fontSize: 13,
            color: "#1C3C45",
          }}
        >
          {features.map((f) => (
            <span key={f}>• {f}</span>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: 22,
          borderTop: "1px solid #ddd",
          paddingTop: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 15 }}>
            {profile.name}
          </p>
          <p style={{ margin: "2px 0 0", color: "#555", fontSize: 12 }}>
            {profile.title}, {profile.brokerage}
          </p>
        </div>
        <div style={{ textAlign: "right", fontSize: 12, color: "#316878" }}>
          <p style={{ margin: 0 }}>{profile.phone}</p>
          <p style={{ margin: "2px 0 0" }}>{profile.email}</p>
          <p style={{ margin: "2px 0 0", color: "#8a8a8a" }}>{profile.license}</p>
        </div>
      </div>

      <p style={{ marginTop: 12, fontSize: 10, color: "#8a8a8a" }}>
        {profile.brokerage} · Real Estate | Property Management | Private
        Lending. Fabricated sample flyer for reference design.
      </p>
    </div>
  );
}
