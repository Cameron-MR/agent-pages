"use client";

import { useAgentProfile } from "@/components/AgentProfileProvider";
import {
  effectivePrice,
  pricePerSqft,
  money,
  type Cma,
  type StatusSummary,
  type SuggestedRange,
} from "@/lib/mock/cma";

const C = {
  base: "#316878",
  dark: "#1C3C45",
  light: "#50AAC4",
  tint: "#EEF4F6",
  body: "#555555",
  muted: "#8a8a8a",
  line: "#e3e9eb",
};

// Branded, multi-section Comparative Market Analysis report. Hidden on screen,
// printed alone (#print-area). Mirrors the legacy CMA structure (cover, subject,
// suggested value, market summary, comparables) in Marshall Reddick style.
export default function CmaPrint({
  cma,
  range,
  summary,
}: {
  cma: Cma;
  range: SuggestedRange;
  summary: StatusSummary[];
}) {
  const { profile } = useAgentProfile();
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const s = cma.subject;

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
          padding: "22px 26px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/white-logo.svg" alt="Marshall Reddick Real Estate" width={210} />
          <p style={{ margin: "8px 0 0", fontSize: 10, letterSpacing: 1, color: "rgba(255,255,255,0.8)" }}>
            REAL ESTATE &nbsp;|&nbsp; PROPERTY MANAGEMENT &nbsp;|&nbsp; PRIVATE LENDING
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ margin: 0, fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,0.75)" }}>
            {today.toUpperCase()}
          </p>
          <h1 style={{ margin: "4px 0 0", fontSize: 22, fontWeight: 700, fontFamily: "var(--font-raleway), sans-serif" }}>
            Comparative Market Analysis
          </h1>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: "rgba(255,255,255,0.85)" }}>
            {s.address}, {s.city}
          </p>
        </div>
      </div>

      {/* Prepared-for / prepared-by */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          marginTop: 16,
          paddingBottom: 14,
          borderBottom: `1px solid ${C.line}`,
        }}
      >
        <div>
          <p style={{ margin: 0, fontSize: 10, letterSpacing: 1.5, color: C.base, fontWeight: 700 }}>
            PREPARED FOR
          </p>
          <p style={{ margin: "4px 0 0", fontSize: 14, fontWeight: 700 }}>
            {cma.client}
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ margin: 0, fontSize: 10, letterSpacing: 1.5, color: C.base, fontWeight: 700 }}>
            PREPARED BY
          </p>
          <p style={{ margin: "4px 0 0", fontSize: 14, fontWeight: 700 }}>
            {profile.name}
          </p>
          <p style={{ margin: "1px 0 0", fontSize: 12, color: C.body }}>
            {profile.brokerage} · {profile.phone}
          </p>
          <p style={{ margin: "1px 0 0", fontSize: 11, color: C.muted }}>
            {profile.license}
          </p>
        </div>
      </div>

      {/* Subject + suggested range */}
      <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={s.photo}
          alt={s.address}
          style={{ width: 200, height: 130, objectFit: "cover", borderRadius: 10 }}
        />
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: 10, letterSpacing: 1.5, color: C.base, fontWeight: 700 }}>
            SUBJECT PROPERTY
          </p>
          <p style={{ margin: "4px 0 0", fontSize: 16, fontWeight: 700 }}>
            {s.address}
          </p>
          <p style={{ margin: "1px 0 0", fontSize: 12, color: C.body }}>
            {s.beds} bd · {s.baths} ba · {s.sqft.toLocaleString()} sqft · built {s.year} · MLS {s.mlsId}
          </p>
          <div
            style={{
              marginTop: 12,
              background: C.base,
              color: "#fff",
              borderRadius: 12,
              padding: "12px 16px",
            }}
          >
            <p style={{ margin: 0, fontSize: 11, letterSpacing: 1, color: "rgba(255,255,255,0.8)" }}>
              SUGGESTED LIST PRICE
            </p>
            <p style={{ margin: "2px 0 0", fontSize: 26, fontWeight: 700, fontFamily: "var(--font-raleway), sans-serif" }}>
              {range.mid ? money(range.mid) : "—"}
            </p>
            <p style={{ margin: "2px 0 0", fontSize: 11, color: "rgba(255,255,255,0.85)" }}>
              {range.basis
                ? `${money(range.low)} – ${money(range.high)} · ${money(Math.round(range.avgPpsf))}/sqft across ${range.basis} comps`
                : "Add comps to calculate"}
            </p>
          </div>
        </div>
      </div>

      {/* Market summary */}
      <Section label="Market summary">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11.5 }}>
          <thead>
            <tr style={{ background: C.dark, color: "#fff" }}>
              {["Status", "Count", "Avg price", "Avg $/sqft", "Median", "Low", "High", "Avg DOM"].map(
                (h, i) => (
                  <th
                    key={h}
                    style={{
                      padding: "7px 10px",
                      textAlign: i === 0 ? "left" : "right",
                      fontWeight: 700,
                      fontSize: 10,
                    }}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {summary.map((row, i) => (
              <tr key={row.status} style={{ background: i % 2 ? "#fff" : C.tint }}>
                <td style={{ padding: "7px 10px", fontWeight: 600 }}>{row.status}</td>
                <td style={{ padding: "7px 10px", textAlign: "right" }}>{row.total}</td>
                <td style={{ padding: "7px 10px", textAlign: "right" }}>{money(row.avgPrice)}</td>
                <td style={{ padding: "7px 10px", textAlign: "right" }}>{money(Math.round(row.avgPpsf))}</td>
                <td style={{ padding: "7px 10px", textAlign: "right" }}>{money(row.median)}</td>
                <td style={{ padding: "7px 10px", textAlign: "right" }}>{money(row.low)}</td>
                <td style={{ padding: "7px 10px", textAlign: "right" }}>{money(row.high)}</td>
                <td style={{ padding: "7px 10px", textAlign: "right" }}>{row.avgDom}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* Comparables */}
      <Section label="Comparable listings">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11.5 }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${C.base}` }}>
              {["Address", "Status", "Bd/Ba", "Sqft", "$/sqft", "DOM", "Price"].map((h, i) => (
                <th
                  key={h}
                  style={{
                    padding: "7px 8px",
                    textAlign: i === 0 ? "left" : "right",
                    fontSize: 10,
                    color: C.base,
                    fontWeight: 700,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cma.comps.map((c, i) => (
              <tr key={c.id} style={{ background: i % 2 ? "#fff" : C.tint }}>
                <td style={{ padding: "7px 8px" }}>{c.address}</td>
                <td style={{ padding: "7px 8px", textAlign: "right" }}>{c.status}</td>
                <td style={{ padding: "7px 8px", textAlign: "right" }}>{c.beds}/{c.baths}</td>
                <td style={{ padding: "7px 8px", textAlign: "right" }}>{c.sqft.toLocaleString()}</td>
                <td style={{ padding: "7px 8px", textAlign: "right" }}>{money(Math.round(pricePerSqft(c)))}</td>
                <td style={{ padding: "7px 8px", textAlign: "right" }}>{c.dom}</td>
                <td style={{ padding: "7px 8px", textAlign: "right", fontWeight: 700 }}>{money(effectivePrice(c))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* Footer */}
      <div style={{ marginTop: 24, paddingTop: 12, borderTop: `2px solid ${C.base}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
          <span aria-hidden style={{ color: C.base, fontSize: 13 }}>&#8962;</span>
          <span style={{ fontSize: 10, color: C.body, fontWeight: 600 }}>
            Equal Housing Opportunity
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 9.5, color: C.muted, lineHeight: 1.5 }}>
          A comparative market analysis is an estimate of value, not an
          appraisal. {profile.brokerage} · {profile.address} · {profile.license}.
          Fabricated sample data for reference design.
        </p>
      </div>
    </div>
  );

  function Section({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) {
    return (
      <div style={{ marginTop: 20 }}>
        <p style={{ margin: "0 0 8px", fontSize: 10, letterSpacing: 1.5, color: C.base, fontWeight: 700 }}>
          {label.toUpperCase()}
        </p>
        {children}
      </div>
    );
  }
}
