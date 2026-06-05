"use client";

import MainNav from "@/components/MainNav";
import BrandBar from "@/components/marketing/BrandBar";
import MarketingStudio from "@/components/marketing/MarketingStudio";

// Marketing Studio. Pick any listing and campaign and instantly get branded,
// agent-personalized assets: social graphics, a caption, a printable flyer, and
// email templates. Everything is mock and clearly branded.
export default function MarketingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-surface-light text-body">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-mr-light/15 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-12rem] top-40 h-[26rem] w-[26rem] rounded-full bg-mr-pale/25 blur-[130px]"
      />

      <div className="relative z-10">
        <MainNav active="/marketing" />

        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6">
          <header>
            <p className="text-xs font-semibold uppercase tracking-widest text-mr-light">
              Marketing
            </p>
            <h1 className="mt-1 font-heading text-3xl font-bold tracking-tight text-mr-dark sm:text-4xl">
              Marketing Studio
            </h1>
            <p className="mt-2 max-w-2xl text-base text-body">
              Turn any listing into agent-branded, client-ready marketing in
              seconds. Pick a listing and a campaign; everything below updates
              live and carries your details.
            </p>
          </header>

          <BrandBar />
          <MarketingStudio />
        </div>

        <footer className="border-t border-mr-base/10 bg-white/40 backdrop-blur print:hidden">
          <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-body sm:px-6">
            Agent Pages reference UI for Marshall Reddick Real Estate. All
            content shown is fabricated sample data.
          </div>
        </footer>
      </div>
    </main>
  );
}
