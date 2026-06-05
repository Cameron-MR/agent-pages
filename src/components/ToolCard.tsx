"use client";

import type { HubTile, StubContent } from "@/lib/mockData";

interface ToolCardProps {
  tile: HubTile;
  onOpenStub: (content: StubContent) => void;
}

// Tool card for the Build & Market, Resources & Scripts, Brand & Merch, and
// Training sections. Horizontal layout with a tinted glyph and an open arrow.
export default function ToolCard({ tile, onOpenStub }: ToolCardProps) {
  return (
    <button
      type="button"
      onClick={() =>
        onOpenStub({
          kind: "Tool",
          title: tile.title,
          detail: tile.detail,
        })
      }
      className="group flex items-center gap-4 rounded-2xl border border-white/70 bg-white/60 p-4 text-left shadow-sm backdrop-blur-xl backdrop-saturate-150 transition duration-300 hover:-translate-y-0.5 hover:border-mr-light/50 hover:bg-white/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-mr-light"
    >
      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-mr-pale/25 text-xs font-bold tracking-wide text-mr-base">
        {tile.glyph}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-heading text-sm font-semibold text-mr-dark">
          {tile.title}
        </span>
        <span className="mt-0.5 block truncate text-xs text-body">
          {tile.blurb}
        </span>
      </span>
      <span
        aria-hidden
        className="flex-none text-mr-pale transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-mr-base"
      >
        &rarr;
      </span>
    </button>
  );
}
