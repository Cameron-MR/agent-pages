"use client";

import { useState } from "react";

interface PhotoProps {
  src: string;
  alt: string;
  className?: string;
}

// Remote image with a graceful fallback. If the URL fails to load (a slow or
// blocked host, or a dead link) we swap in a teal gradient block so the layout
// never breaks. Uses a plain img tag on purpose so remote hosts like Unsplash
// need no next/image remotePatterns config.
export default function Photo({ src, alt, className = "" }: PhotoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`bg-gradient-to-br from-mr-base to-mr-light ${className}`}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
