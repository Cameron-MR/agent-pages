"use client";

import { useRef } from "react";

// Device-aware carousel. On touch devices it scrolls by native swipe; on web
// it adds left/right arrow buttons (hidden on small screens). Children should
// be flex items with their own widths (e.g. w-64 flex-none).
export default function Carousel({
  children,
  ariaLabel = "Carousel",
}: {
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        aria-label={ariaLabel}
        className="flex snap-x gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      {/* Web-only arrows */}
      <button
        type="button"
        aria-label="Previous"
        onClick={() => scroll(-1)}
        className="absolute -left-4 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-mr-base/15 bg-white/90 text-mr-base shadow-md backdrop-blur transition-colors hover:bg-white sm:flex"
      >
        &larr;
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => scroll(1)}
        className="absolute -right-4 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-mr-base/15 bg-white/90 text-mr-base shadow-md backdrop-blur transition-colors hover:bg-white sm:flex"
      >
        &rarr;
      </button>
    </div>
  );
}
