"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import PageShell from "@/components/PageShell";
import { useAgentProfile } from "@/components/AgentProfileProvider";
import {
  getResourceDoc,
  loadDocChecks,
  saveDocChecks,
  RESOURCE_DOCS,
  type ResourceDoc,
} from "@/lib/mock/resourceDocs";

// Live, branded resource document. The checklist is interactive (check state
// persists per device) with a progress bar, and the same document prints as
// a polished branded PDF via the hidden print sheet below.
export default function ResourceDocPage() {
  const params = useParams<{ docId: string }>();
  const doc = getResourceDoc(params.docId);

  if (!doc) {
    return (
      <PageShell
        active="/resources"
        eyebrow="Resources"
        title="Document not found"
        description="That document does not exist."
      >
        <Link href="/resources" className="text-sm font-semibold text-mr-base underline">
          Back to Resources
        </Link>
      </PageShell>
    );
  }

  return <DocView doc={doc} />;
}

function DocView({ doc }: { doc: ResourceDoc }) {
  const [checks, setChecks] = useState<string[]>([]);

  useEffect(() => {
    setChecks(loadDocChecks(doc.id));
  }, [doc.id]);

  const allKeys = useMemo(
    () =>
      doc.sections.flatMap((s, si) => s.items.map((_, ii) => `${si}-${ii}`)),
    [doc]
  );
  const pct = allKeys.length
    ? Math.round((checks.filter((c) => allKeys.includes(c)).length / allKeys.length) * 100)
    : 0;

  const toggle = (key: string) => {
    const next = checks.includes(key)
      ? checks.filter((c) => c !== key)
      : [...checks, key];
    setChecks(next);
    saveDocChecks(doc.id, next);
  };

  const reset = () => {
    setChecks([]);
    saveDocChecks(doc.id, []);
  };

  const related = RESOURCE_DOCS.filter(
    (d) => d.id !== doc.id && d.category === doc.category
  ).slice(0, 3);

  return (
    <PageShell
      active="/resources"
      eyebrow={`Resources · ${doc.category}`}
      title={doc.title}
      description={doc.intro}
    >
      {/* Action bar */}
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-white/50 bg-white/60 p-5 shadow-sm backdrop-blur-xl backdrop-saturate-150 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="h-2.5 w-44 overflow-hidden rounded-full bg-mr-pale/25">
            <div
              className="h-full rounded-full bg-gradient-to-r from-mr-base to-mr-light transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-mr-base">{pct}% done</span>
          <span className="text-xs text-body">· {doc.minutes} min · for the {doc.audience.toLowerCase()}</span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-mr-base/20 bg-white/70 px-4 py-2 text-sm font-semibold text-mr-base transition-colors hover:bg-white"
          >
            Reset checks
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-full bg-mr-base px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-mr-mid"
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* Live document */}
      <article className="overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-lg backdrop-blur">
        {/* Document masthead */}
        <div className="bg-gradient-to-r from-mr-dark to-mr-base px-8 py-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-mr-pale">
            Marshall Reddick Real Estate · Agent Resource
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold">{doc.title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/85">{doc.intro}</p>
        </div>

        <div className="px-6 py-8 sm:px-10">
          {doc.sections.map((section, si) => (
            <section key={si} className={si > 0 ? "mt-10" : ""}>
              <div className="flex items-baseline gap-3">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-mr-base font-heading text-sm font-bold text-white">
                  {si + 1}
                </span>
                <h2 className="font-heading text-xl font-bold text-mr-dark">
                  {section.heading}
                </h2>
              </div>
              {section.note ? (
                <p className="mt-1 pl-10 text-sm italic text-body">{section.note}</p>
              ) : null}

              <div className="mt-4 flex flex-col gap-1.5 sm:pl-10">
                {section.items.map((item, ii) => {
                  const key = `${si}-${ii}`;
                  const done = checks.includes(key);
                  return (
                    <div
                      key={key}
                      className={`rounded-xl border px-4 py-3 transition-colors ${
                        done
                          ? "border-mr-light/40 bg-mr-pale/15"
                          : "border-mr-base/10 bg-white/70 hover:border-mr-light/40"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggle(key)}
                        className="flex w-full items-start gap-3 text-left"
                      >
                        <span
                          className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md border text-[0.65rem] font-bold transition-colors ${
                            done
                              ? "border-mr-base bg-mr-base text-white"
                              : "border-mr-base/30 text-transparent"
                          }`}
                        >
                          ✓
                        </span>
                        <span
                          className={`text-sm leading-relaxed ${
                            done ? "text-body line-through" : "text-mr-dark"
                          }`}
                        >
                          {item.text}
                        </span>
                      </button>
                      {item.sub && item.sub.length ? (
                        <ul className="mt-2 flex flex-col gap-1 pl-8">
                          {item.sub.map((s, k) => (
                            <li
                              key={k}
                              className={`relative pl-4 text-sm leading-relaxed text-body before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-mr-light ${
                                done ? "opacity-60" : ""
                              }`}
                            >
                              {s}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}

          <p className="mt-10 border-t border-mr-base/10 pt-4 text-xs text-body">
            Marshall Reddick Real Estate agent resource. Internal reference;
            confirm current process with your sales manager.
          </p>
        </div>
      </article>

      {/* Related */}
      {related.length ? (
        <div className="mt-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-mr-base">
            More in {doc.category}
          </p>
          <div className="flex flex-wrap gap-2">
            {related.map((d) => (
              <Link
                key={d.id}
                href={`/resources/${d.id}`}
                className="rounded-full border border-mr-base/20 bg-white/70 px-4 py-2 text-sm font-semibold text-mr-base transition-colors hover:bg-white"
              >
                {d.title}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-6">
        <Link href="/resources" className="text-sm font-medium text-mr-base hover:text-mr-mid">
          ← Back to Resources
        </Link>
      </div>

      <DocPrint doc={doc} />
    </PageShell>
  );
}

// Branded print version (hidden on screen; the only thing that prints).
function DocPrint({ doc }: { doc: ResourceDoc }) {
  const { profile } = useAgentProfile();
  const C = {
    base: "#316878",
    dark: "#1C3C45",
    tint: "#EEF4F6",
    body: "#555555",
    muted: "#8a8a8a",
    line: "#e3e9eb",
  };
  return (
    <div
      id="print-area"
      className="print-sheet"
      style={{ color: C.dark, fontFamily: "var(--font-open-sans), sans-serif" }}
    >
      <div
        style={{
          background: C.base,
          color: "#fff",
          borderRadius: 14,
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/white-logo.svg" alt="Marshall Reddick Real Estate" width={190} />
          <p style={{ margin: "7px 0 0", fontSize: 9, letterSpacing: 1, color: "rgba(255,255,255,0.8)" }}>
            REAL ESTATE &nbsp;|&nbsp; PROPERTY MANAGEMENT &nbsp;|&nbsp; PRIVATE LENDING
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ margin: 0, fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,0.75)" }}>
            AGENT RESOURCE · {doc.category.toUpperCase()}
          </p>
          <h1 style={{ margin: "4px 0 0", fontSize: 20, fontWeight: 700, fontFamily: "var(--font-raleway), sans-serif" }}>
            {doc.title}
          </h1>
        </div>
      </div>

      <p style={{ margin: "14px 0 0", fontSize: 11.5, color: C.body, lineHeight: 1.5 }}>
        {doc.intro}
      </p>

      {doc.sections.map((section, si) => (
        <div key={si} style={{ marginTop: 16 }}>
          <p style={{ margin: "0 0 6px", fontSize: 10, letterSpacing: 1.5, color: C.base, fontWeight: 700 }}>
            {si + 1}. {section.heading.toUpperCase()}
          </p>
          {section.items.map((item, ii) => (
            <div key={ii} style={{ padding: "4px 0 4px 2px" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span
                  style={{
                    width: 10,
                    height: 10,
                    marginTop: 2.5,
                    flex: "none",
                    border: `1.4px solid ${C.base}`,
                    borderRadius: 3,
                  }}
                />
                <span style={{ fontSize: 10.5, lineHeight: 1.45 }}>{item.text}</span>
              </div>
              {item.sub && item.sub.length ? (
                <div style={{ paddingLeft: 26 }}>
                  {item.sub.map((s, k) => (
                    <p key={k} style={{ margin: "2px 0 0", fontSize: 9.5, color: C.body, lineHeight: 1.4 }}>
                      &ndash; {s}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ))}

      <div style={{ marginTop: 18, paddingTop: 10, borderTop: `2px solid ${C.base}` }}>
        <p style={{ margin: 0, fontSize: 9, color: C.muted, lineHeight: 1.5 }}>
          {profile.name} · {profile.brokerage} · {profile.phone} · {profile.license}.
          Internal agent resource. Equal Housing Opportunity.
        </p>
      </div>
    </div>
  );
}
