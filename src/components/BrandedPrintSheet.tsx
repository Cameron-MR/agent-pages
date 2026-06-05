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

// A Marshall Reddick branded, agent-personalized print sheet. Hidden on screen
// (.print-sheet) and shown alone when printing (#print-area, see globals.css).
// Used by the calculators so any result can be saved as a branded PDF via the
// browser's print-to-PDF. Only one of these should be mounted at a time.
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

  return (
    <div id="print-area" className="print-sheet text-[#1C3C45]">
      {/* Header band */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          borderBottom: "3px solid #316878",
          paddingBottom: 16,
        }}
      >
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/colored-logo.svg" alt="Marshall Reddick Real Estate" width={260} />
          <p style={{ marginTop: 8, fontSize: 11, color: "#555" }}>
            Real Estate | Property Management | Private Lending
          </p>
        </div>
        <div style={{ textAlign: "right", fontSize: 12, lineHeight: 1.5 }}>
          <p style={{ fontWeight: 700, fontSize: 15, color: "#1C3C45" }}>
            {profile.name}
          </p>
          <p style={{ color: "#555" }}>{profile.title}</p>
          <p style={{ color: "#316878" }}>{profile.phone}</p>
          <p style={{ color: "#316878" }}>{profile.email}</p>
          <p style={{ color: "#555" }}>{profile.license}</p>
        </div>
      </div>

      {/* Title */}
      <div style={{ marginTop: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#1C3C45", margin: 0 }}>
          {title}
        </h1>
        {subtitle ? (
          <p style={{ marginTop: 4, color: "#555", fontSize: 13 }}>{subtitle}</p>
        ) : null}
        <p style={{ marginTop: 4, color: "#8a8a8a", fontSize: 12 }}>
          Prepared {today} for {profile.market}
        </p>
      </div>

      {/* Inputs */}
      {inputs && inputs.length ? (
        <div style={{ marginTop: 24 }}>
          <p
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: 1,
              color: "#316878",
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            Assumptions
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <tbody>
              {inputs.map((r) => (
                <tr key={r.label}>
                  <td style={{ padding: "6px 0", color: "#555" }}>{r.label}</td>
                  <td style={{ padding: "6px 0", textAlign: "right", color: "#1C3C45" }}>
                    {r.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {/* Results */}
      <div style={{ marginTop: 24 }}>
        <p
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 1,
            color: "#316878",
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          Summary
        </p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.label}
                style={r.strong ? { borderTop: "2px solid #316878" } : undefined}
              >
                <td
                  style={{
                    padding: "10px 0",
                    color: r.strong ? "#1C3C45" : "#555",
                    fontWeight: r.strong ? 700 : 400,
                  }}
                >
                  {r.label}
                </td>
                <td
                  style={{
                    padding: "10px 0",
                    textAlign: "right",
                    color: r.strong ? "#316878" : "#1C3C45",
                    fontWeight: r.strong ? 700 : 500,
                    fontSize: r.strong ? 18 : 14,
                  }}
                >
                  {r.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 40,
          borderTop: "1px solid #ddd",
          paddingTop: 12,
          fontSize: 10,
          color: "#8a8a8a",
        }}
      >
        <p>
          {disclaimer ??
            "Estimate only. Figures are illustrative and not a guarantee, appraisal, or lending offer."}
        </p>
        <p style={{ marginTop: 4 }}>
          {profile.brokerage} · Reference sample. Not based on real client data.
        </p>
      </div>
    </div>
  );
}
