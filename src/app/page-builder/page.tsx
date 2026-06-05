"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import {
  AUDIENCES,
  AUDIENCE_HEADLINES,
  BUILDER_MODULES,
  type Audience,
} from "@/lib/mock/pageBuilder";

// Client Page Builder. The agent picks an audience, toggles modules on or off,
// and watches a live phone-style preview update. Publishing is a placeholder.
// One agent, many configurations: each audience keeps its own module set.
export default function PageBuilderPage() {
  const [audience, setAudience] = useState<Audience>("Buyer");

  // Module on/off state keyed by audience, seeded from the defaults.
  const [config, setConfig] = useState<Record<Audience, Set<string>>>(() => {
    const initial = {} as Record<Audience, Set<string>>;
    AUDIENCES.forEach((aud) => {
      initial[aud] = new Set(
        BUILDER_MODULES.filter((m) => m.defaultOn.includes(aud)).map((m) => m.id)
      );
    });
    return initial;
  });

  const [published, setPublished] = useState(false);

  const activeSet = config[audience];

  const toggle = (id: string) => {
    setConfig((prev) => {
      const next = new Set(prev[audience]);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { ...prev, [audience]: next };
    });
    setPublished(false);
  };

  const enabledModules = useMemo(
    () => BUILDER_MODULES.filter((m) => activeSet.has(m.id)),
    [activeSet]
  );

  return (
    <PageShell
      active="/page-builder"
      eyebrow="Client-Facing Page"
      title="Page Builder"
      description="Customize the public page you share with clients. Switch audience, toggle modules, and preview live. One page, many configurations."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Left: controls */}
        <div className="lg:col-span-3">
          {/* Audience switcher */}
          <div className="rounded-2xl border border-white/50 bg-white/60 p-5 shadow-sm backdrop-blur-xl backdrop-saturate-150">
            <h2 className="font-heading text-base font-bold text-mr-dark">
              Audience
            </h2>
            <p className="mb-3 text-xs text-body">
              Each audience keeps its own set of modules.
            </p>
            <div className="flex flex-wrap gap-2">
              {AUDIENCES.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAudience(a)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    audience === a
                      ? "bg-mr-base text-white shadow-sm"
                      : "border border-mr-base/15 bg-white/70 text-body hover:text-mr-base"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Module toggles */}
          <div className="mt-4 rounded-2xl border border-white/50 bg-white/60 p-5 shadow-sm backdrop-blur-xl backdrop-saturate-150">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-heading text-base font-bold text-mr-dark">
                Modules
              </h2>
              <span className="text-xs text-body">
                {enabledModules.length} of {BUILDER_MODULES.length} on
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {BUILDER_MODULES.map((m) => {
                const on = activeSet.has(m.id);
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => toggle(m.id)}
                    className="flex items-center justify-between gap-4 rounded-xl border border-white/60 bg-white/60 p-3 text-left transition-colors hover:border-mr-light/50"
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-mr-dark">
                        {m.name}
                      </span>
                      <span className="block text-xs text-body">
                        {m.description}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={`relative h-6 w-11 flex-none rounded-full transition-colors ${
                        on ? "bg-mr-base" : "bg-mr-pale/40"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                          on ? "left-[1.375rem]" : "left-0.5"
                        }`}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Publish bar */}
          <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-white/50 bg-white/60 p-5 shadow-sm backdrop-blur-xl backdrop-saturate-150 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-mr-dark">
                Share link
              </p>
              <p className="text-xs text-body">
                marshallreddick.example/jordan-sample/
                {audience.toLowerCase()}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/p/jordan-sample"
                className="rounded-full border border-mr-base/20 bg-white/70 px-5 py-2.5 text-sm font-semibold text-mr-base transition-colors hover:bg-white"
              >
                Open live page
              </Link>
              <button
                type="button"
                onClick={() => setPublished(true)}
                className="rounded-full bg-mr-base px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-mr-mid"
              >
                {published ? "Published" : "Publish"}
              </button>
            </div>
          </div>
          {published ? (
            <p className="mt-2 text-xs font-medium text-mr-base">
              Changes published. Placeholder action, nothing is persisted.
            </p>
          ) : null}
        </div>

        {/* Right: live preview */}
        <div className="lg:col-span-2">
          <div className="sticky top-24">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-mr-light">
              Live preview
            </p>
            <PhonePreview audience={audience} enabledIds={activeSet} />
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function PhonePreview({
  audience,
  enabledIds,
}: {
  audience: Audience;
  enabledIds: Set<string>;
}) {
  const has = (id: string) => enabledIds.has(id);

  return (
    <div className="mx-auto w-full max-w-[20rem] overflow-hidden rounded-[2.5rem] border-[6px] border-mr-dark bg-mr-dark shadow-2xl">
      <div className="h-6 bg-mr-dark" />
      <div className="max-h-[34rem] overflow-y-auto bg-surface-light">
        {/* Hero */}
        {has("hero") ? (
          <div className="relative bg-gradient-to-br from-mr-base to-mr-dark p-5 text-white">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                JS
              </span>
              <div>
                <p className="font-heading text-sm font-bold">Jordan Sample</p>
                <p className="text-xs text-white/80">Marshall Reddick</p>
              </div>
            </div>
            <p className="mt-3 font-heading text-base font-bold leading-snug">
              {AUDIENCE_HEADLINES[audience]}
            </p>
          </div>
        ) : null}

        <div className="flex flex-col gap-3 p-4">
          {has("valuation") ? (
            <PreviewBlock title="What's my home worth?" tint>
              <div className="rounded-lg bg-white/70 p-2 text-xs text-body">
                Enter address ...
              </div>
            </PreviewBlock>
          ) : null}

          {has("search") ? (
            <PreviewBlock title="Search homes">
              <div className="rounded-lg border border-mr-base/15 bg-white p-2 text-xs text-body">
                City, zip, or MLS #
              </div>
            </PreviewBlock>
          ) : null}

          {has("rental") ? (
            <PreviewBlock title="Property management" tint>
              <p className="text-xs text-body">
                Full-service management for your rental.
              </p>
            </PreviewBlock>
          ) : null}

          {has("featured") ? (
            <PreviewBlock title="Featured listings">
              <div className="flex gap-2">
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="h-16 flex-1 rounded-lg bg-gradient-to-br from-mr-pale/50 to-mr-light/40"
                  />
                ))}
              </div>
            </PreviewBlock>
          ) : null}

          {has("about") ? (
            <PreviewBlock title="About Jordan">
              <p className="text-xs text-body">
                Orange County agent focused on a smooth, well-marketed sale.
              </p>
            </PreviewBlock>
          ) : null}

          {has("testimonials") ? (
            <PreviewBlock title="What clients say" tint>
              <p className="text-xs italic text-body">
                &ldquo;Made the whole thing easy.&rdquo;
              </p>
            </PreviewBlock>
          ) : null}

          {has("resources") ? (
            <PreviewBlock title="Free guides">
              <p className="text-xs text-body">Buyer and seller playbooks.</p>
            </PreviewBlock>
          ) : null}

          {has("contact") ? (
            <PreviewBlock title="Get in touch" tint>
              <div className="rounded-lg bg-mr-base py-1.5 text-center text-xs font-semibold text-white">
                Contact Jordan
              </div>
            </PreviewBlock>
          ) : null}

          {enabledIds.size === 0 ? (
            <p className="py-12 text-center text-xs text-body">
              No modules on. Toggle some to build the page.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function PreviewBlock({
  title,
  tint,
  children,
}: {
  title: string;
  tint?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-xl border p-3 ${
        tint
          ? "border-mr-light/30 bg-mr-pale/15"
          : "border-white/60 bg-white/70"
      }`}
    >
      <p className="mb-1.5 font-heading text-xs font-bold text-mr-dark">
        {title}
      </p>
      {children}
    </div>
  );
}
