"use client";

import { useEffect, useState } from "react";
import MainNav from "@/components/MainNav";
import HeroBanner from "@/components/HeroBanner";
import TodayPanel from "@/components/TodayPanel";
import MarketPulse from "@/components/MarketPulse";
import PipelineSnapshot from "@/components/PipelineSnapshot";
import QuickLaunch from "@/components/QuickLaunch";
import HubGrid from "@/components/HubGrid";
import AnnouncementsPanel from "@/components/AnnouncementsPanel";
import StubModal from "@/components/StubModal";
import DashboardCustomizer, {
  DEFAULT_SECTIONS,
  loadSections,
  type SectionId,
} from "@/components/DashboardCustomizer";
import { type StubContent } from "@/lib/mockData";

// Agent command center home: the daily cockpit. The agent can customize which
// sections appear and in what order via the Customize panel; the choice is
// saved to localStorage. All data is fabricated.
export default function Home() {
  const [stub, setStub] = useState<StubContent | null>(null);
  const [sections, setSections] = useState<SectionId[]>(DEFAULT_SECTIONS);
  const [customizing, setCustomizing] = useState(false);

  // Load the saved layout after mount so SSR and first paint stay consistent.
  useEffect(() => {
    setSections(loadSections());
  }, []);

  const renderSection = (id: SectionId) => {
    switch (id) {
      case "today":
        return <TodayPanel key={id} onOpenStub={setStub} />;
      case "market":
        return <MarketPulse key={id} />;
      case "pipeline":
        return <PipelineSnapshot key={id} onOpenStub={setStub} />;
      case "quicklaunch":
        return <QuickLaunch key={id} onOpenStub={setStub} />;
      case "hub":
        return <HubGrid key={id} />;
      case "announcements":
        return <AnnouncementsPanel key={id} />;
      default:
        return null;
    }
  };

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
        <MainNav active="/" />

        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-10 sm:px-6">
          <HeroBanner />

          <div className="-mb-6 flex justify-end">
            <button
              type="button"
              onClick={() => setCustomizing(true)}
              className="flex items-center gap-2 rounded-full border border-mr-base/15 bg-white/70 px-4 py-2 text-sm font-medium text-mr-base shadow-sm backdrop-blur transition-colors hover:bg-white"
            >
              <span aria-hidden>⚙</span> Customize dashboard
            </button>
          </div>

          {sections.map((id) => renderSection(id))}
        </div>

        <footer className="border-t border-mr-base/10 bg-white/40 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-body sm:px-6">
            Agent Pages reference UI for Marshall Reddick Real Estate. All
            content shown is fabricated sample data.
          </div>
        </footer>
      </div>

      <StubModal content={stub} onClose={() => setStub(null)} />
      <DashboardCustomizer
        open={customizing}
        sections={sections}
        onChange={setSections}
        onClose={() => setCustomizing(false)}
      />
    </main>
  );
}
