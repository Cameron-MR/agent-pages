"use client";

import { useState } from "react";
import TopNav from "@/components/TopNav";
import AgentHeader from "@/components/AgentHeader";
import HubSection from "@/components/HubSection";
import PipelineSnapshot from "@/components/PipelineSnapshot";
import StubModal from "@/components/StubModal";
import { HUB_SECTIONS, type StubContent } from "@/lib/mockData";

// Agent hub home: the agent's daily cockpit.
// Light, airy, glass-on-white with teal accents. Every surface is clickable
// and opens a shared stub modal so the reference UI feels live. All content is
// fabricated, real-estate-flavored sample data for Marshall Reddick only.
export default function Home() {
  const [stub, setStub] = useState<StubContent | null>(null);

  return (
    <main className="relative min-h-screen overflow-hidden bg-surface-light text-body">
      {/* Soft teal wash so the glass panels have light to refract. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-mr-light/20 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-12rem] top-32 h-[28rem] w-[28rem] rounded-full bg-mr-pale/30 blur-[130px]"
      />

      <div className="relative z-10">
        <TopNav onOpenStub={setStub} />

        <AgentHeader onOpenStub={setStub} />

        <section id="resource-hub" className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
          <div className="mb-6">
            <h2 className="font-heading text-2xl font-bold text-mr-dark">
              Resource Hub
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-body">
              Your launchpad for software, marketing, scripts, and brand assets.
              Everything here is a placeholder for this reference UI.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {HUB_SECTIONS.map((section) => (
              <HubSection
                key={section.id}
                section={section}
                onOpenStub={setStub}
              />
            ))}
          </div>
        </section>

        <PipelineSnapshot onOpenStub={setStub} />

        <footer className="border-t border-mr-base/10 bg-white/40 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-body sm:px-6">
            Agent Pages reference UI for Marshall Reddick Real Estate. All
            content shown is fabricated sample data.
          </div>
        </footer>
      </div>

      <StubModal content={stub} onClose={() => setStub(null)} />
    </main>
  );
}
