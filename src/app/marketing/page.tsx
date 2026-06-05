"use client";

import { useState } from "react";
import TopNav from "@/components/TopNav";
import StubModal from "@/components/StubModal";
import BrandBar from "@/components/marketing/BrandBar";
import AddressGenerator from "@/components/marketing/AddressGenerator";
import ToolStrip from "@/components/marketing/ToolStrip";
import { type StubContent } from "@/lib/mockData";

// Marketing Studio subpage. Turn any listing into agent-branded, client-ready
// marketing. The address generator is the headline demo moment; everything is
// mock and clearly branded. Apple Liquid Glass aesthetic matching the home.
export default function MarketingPage() {
  const [stub, setStub] = useState<StubContent | null>(null);

  return (
    <main className="relative min-h-screen overflow-hidden bg-surface-light text-body">
      {/* Ambient teal washes so the glass has light to refract. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-mr-light/15 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-12rem] top-40 h-[26rem] w-[26rem] rounded-full bg-mr-pale/25 blur-[130px]"
      />

      <div className="relative z-10">
        <TopNav onOpenStub={setStub} />

        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6">
          <header>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-mr-dark sm:text-4xl">
              Marketing Studio
            </h1>
            <p className="mt-2 text-base text-body">
              Turn any listing into agent-branded, client-ready marketing.
            </p>
          </header>

          <BrandBar />
          <AddressGenerator onOpenStub={setStub} />
          <ToolStrip onOpenStub={setStub} />
        </div>

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
