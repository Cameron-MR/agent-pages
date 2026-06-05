"use client";

import type { HubTile, StubContent } from "@/lib/mockData";

interface AppTileProps {
  tile: HubTile;
  onOpenStub: (content: StubContent) => void;
}

// SSO-launcher style tile for the Software Launcher section. Square-ish, with a
// tinted glyph block and a "Launch" affordance to read like single sign-on.
export default function AppTile({ tile, onOpenStub }: AppTileProps) {
  return (
    <button
      type="button"
      onClick={() =>
        onOpenStub({
          kind: "Launch app",
          title: tile.title,
          detail: tile.detail,
        })
      }
      className="group flex flex-col items-start gap-3 rounded-2xl border border-white/70 bg-white/60 p-4 text-left shadow-sm backdrop-blur-xl backdrop-saturate-150 transition duration-300 hover:-translate-y-0.5 hover:border-mr-light/50 hover:bg-white/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-mr-light"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-mr-light/90 to-mr-base text-xs font-bold tracking-wide text-white shadow-inner">
        {tile.glyph}
      </span>
      <span className="w-full">
        <span className="block font-heading text-sm font-semibold text-mr-dark">
          {tile.title}
        </span>
        <span className="mt-0.5 block text-xs text-body">{tile.blurb}</span>
      </span>
      <span className="mt-auto text-xs font-medium text-mr-base transition-transform duration-300 group-hover:translate-x-0.5">
        Launch
      </span>
    </button>
  );
}
