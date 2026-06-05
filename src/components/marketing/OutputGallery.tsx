"use client";

import { marketingOutputs, type StubContent } from "@/lib/mockData";
import AssetPreview from "./AssetPreviews";

interface OutputGalleryProps {
  onOpenStub: (content: StubContent) => void;
}

// The four generated assets, each as a glass card with a faux preview thumbnail
// and a cta. Clicking a card opens the shared modal with a larger preview.
export default function OutputGallery({ onOpenStub }: OutputGalleryProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {marketingOutputs.map((output) => (
        <button
          key={output.id}
          type="button"
          onClick={() =>
            onOpenStub({
              kind: "Marketing asset",
              title: output.name,
              detail: `Mock preview of the ${output.name.toLowerCase()} for the sample listing, auto-branded with Jordan Sample's name, phone, and the Marshall Reddick logo. The live studio would let the agent edit copy, swap photos, and publish or download. Fabricated sample, no real render.`,
              preview: <AssetPreview id={output.id} variant="full" />,
            })
          }
          className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/40 bg-white/60 p-4 text-left shadow-sm backdrop-blur-xl backdrop-saturate-150 transition duration-200 hover:-translate-y-0.5 hover:border-mr-light/50 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-mr-light"
        >
          <div className="mb-3">
            <AssetPreview id={output.id} variant="thumb" />
          </div>
          <p className="font-heading text-sm font-bold text-mr-dark">
            {output.name}
          </p>
          <p className="mt-1 flex-1 text-xs text-body">{output.desc}</p>
          <span className="mt-3 inline-flex w-fit items-center gap-1 rounded-full bg-mr-base px-3 py-1.5 text-xs font-semibold text-white transition-colors group-hover:bg-mr-mid">
            {output.cta}
          </span>
        </button>
      ))}
    </div>
  );
}
