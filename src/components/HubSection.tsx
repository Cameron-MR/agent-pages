"use client";

import AppTile from "@/components/AppTile";
import ToolCard from "@/components/ToolCard";
import type { HubSectionData, StubContent } from "@/lib/mockData";

interface HubSectionProps {
  section: HubSectionData;
  onOpenStub: (content: StubContent) => void;
}

// One labeled Resource Hub section. Renders the SSO launcher grid for "apps"
// layout, or the tool-card grid for "tools" layout.
export default function HubSection({ section, onOpenStub }: HubSectionProps) {
  return (
    <div className="rounded-3xl border border-white/60 bg-white/40 p-5 shadow-sm backdrop-blur-xl backdrop-saturate-150 sm:p-6">
      <div className="mb-5">
        <h3 className="font-heading text-lg font-bold text-mr-dark">
          {section.label}
        </h3>
        <p className="mt-1 text-sm text-body">{section.description}</p>
      </div>

      {section.layout === "apps" ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {section.tiles.map((tile) => (
            <AppTile key={tile.id} tile={tile} onOpenStub={onOpenStub} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {section.tiles.map((tile) => (
            <ToolCard key={tile.id} tile={tile} onOpenStub={onOpenStub} />
          ))}
        </div>
      )}
    </div>
  );
}
