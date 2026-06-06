"use client";

import { useAgentProfile } from "@/components/AgentProfileProvider";

export interface PrintRow {
  label: string;
  value: string;
  strong?: boolean;
}

interface Props {
  title: string;
  subtitle?: string;
  rows: PrintRow[];
  // Optional inputs summary shown above the results.
  inputs?: PrintRow[];
  disclaimer?: string;
}

// Marshall Reddick brand palette (inline so it prints reliably).
const C = {
  base: "#316878",
  dark: "#1C3C45",
  light: "#50AAC4",
  pale: "#8BB8C4",
  tint: "#EEF4F6",
  body: "#555555",
  muted: "#8a8a8a",
  line: "#e3e9eb",
};

// A polished, branded print template shared by the calculators and the CMA
// builder. Teal header band, agent block, a bold "bottom line" result, a clean
// breakdown table, and an Equal Housing footer. Hidden on screen, printed alone.
export default function BrandedPrintSheet({
  title,
  subtitle,
  rows,
  inputs,
  disclaimer,
}: Props) {
  const { profile } = useAgentProfile();
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const strongRows = rows.filter((r) => r.strong);
  const lineRows = rows.filter((r) => !r.strong);

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
            PREPARED {today.toUpperCase()}
          </p>
          <h1 style={{ margin: "4px 0 0", fontSize: 22, fontWeight: 700, fontFamily: "var(--font-raleway), sans-serif" }}>
            {title}
          </h1>
          {subtitle ? (
            <p style={{ margin: "2px 0 0", fontSize: 12, color: "rgba(255,255,255,0.85)" }}>
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>

      {/* Agent + market meta */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          marginTop: 18,
          paddingBottom: 14,
          borderBottom: `1px solid ${C.line}`,
        }}
      >
        <div>
          <p style={{ margin: 0, fontSize: 10, letterSpacing: 1.5, color: C.base, fontWeight: 700 }}>
            PREPARED BY
          </p>
          <p style={{ margin: "4px 0 0", fontSize: 14, fontWeight: 700 }}>
            {profile.name}
          </p>
          <p style={{ margin: "1px 0 0", fontSize: 12, color: C.body }}>
            {profile.title}, {profile.brokerage}
          </p>
          <p style={{ margin: "1px 0 0", fontSize: 12, color: C.base }}>
            {profile.phone} &nbsp;·&nbsp; {profile.email}
          </p>
          <p style={{ margin: "1px 0 0", fontSize: 11, color: C.muted }}>
            {profile.license}
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ margin: 0, fontSize: 10, letterSpacing: 1.5, color: C.base, fontWeight: 700 }}>
            MARKET
          </p>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: C.dark }}>
            {profile.market}
          </p>
        </div>
      </div>

      {/* Bottom-line hero result(s) */}
      {strongRows.length ? (
        <div
          style={{
            marginTop: 18,
            borderRadius: 14,
            background: C.base,
            color: "#fff",
            padding: "18px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          {strongRows.map((r) => (
            <div key={r.label} style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 11, letterSpacing: 1, color: "rgba(255,255,255,0.8)" }}>
                {r.label.toUpperCase()}
              </p>
              <p style={{ margin: "4px 0 0", fontSize: 30, fontWeight: 700, fontFamily: "var(--font-raleway), sans-serif" }}>
                {r.value}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      {/* Assumptions */}
      {inputs && inputs.length ? (
        <Section label="Assumptions">
          <Table rows={inputs} />
        </Section>
      ) : null}

      {/* Breakdown */}
      <Section label="Breakdown">
        <Table rows={lineRows.length ? lineRows : rows} />
      </Section>

      {/* Footer */}
      <div style={{ marginTop: 26, paddingTop: 12, borderTop: `2px solid ${C.base}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
          <span aria-hidden style={{ color: C.base, fontSize: 13 }}>
            &#8962;
          </span>
          <span style={{ fontSize: 10, color: C.body, fontWeight: 600 }}>
            Equal Housing Opportunity
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 9.5, color: C.muted, lineHeight: 1.5 }}>
          {disclaimer ??
            "Estimate only. Figures are illustrative and not a guarantee, appraisal, or lending offer."}{" "}
          {profile.brokerage} · {profile.address} · {profile.license}. Reference
          sample. Not based on real client data.
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
      <div style={{ marginTop: 18 }}>
        <p style={{ margin: "0 0 8px", fontSize: 10, letterSpacing: 1.5, color: C.base, fontWeight: 700 }}>
          {label.toUpperCase()}
        </p>
        {children}
      </div>
    );
  }

  function Table({ rows: tableRows }: { rows: PrintRow[] }) {
    return (
      <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${C.line}` }}>
        {tableRows.map((r, i) => (
          <div
            key={r.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 16px",
              background: i % 2 === 0 ? C.tint : "#fff",
              fontSize: 13,
            }}
          >
            <span style={{ color: r.strong ? C.dark : C.body, fontWeight: r.strong ? 700 : 400 }}>
              {r.label}
            </span>
            <span style={{ color: C.dark, fontWeight: r.strong ? 700 : 500 }}>
              {r.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
}
