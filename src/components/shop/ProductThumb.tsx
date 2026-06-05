"use client";

import Logo from "@/components/Logo";
import Photo from "@/components/Photo";
import { useAgentProfile } from "@/components/AgentProfileProvider";
import { propertyPhoto } from "@/lib/mock/images";
import type { ProductKind } from "@/lib/mock/shop";

// Branded, on-brand product mockups rendered with CSS so the catalog looks
// polished without depending on stock product photos. Personalized to the
// agent where it reads as real (cards, signs).
export default function ProductThumb({ kind }: { kind: ProductKind }) {
  const { profile, initials } = useAgentProfile();

  if (kind === "postcard" || kind === "flyer") {
    return (
      <div className="relative h-full w-full overflow-hidden bg-white">
        <Photo
          src={propertyPhoto(kind === "flyer" ? 2 : 1, 800)}
          alt="Sample property"
          className="h-[62%] w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded bg-white/90 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-mr-base">
          {kind === "flyer" ? "For Sale" : "Just Listed"}
        </span>
        <div className="flex items-center justify-between px-3 py-2">
          <div>
            <p className="font-heading text-sm font-bold text-mr-base">
              $1,150,000
            </p>
            <p className="text-[0.6rem] text-body">221 Bayview Ter</p>
          </div>
          <Logo theme="light" variant="logomark" width={26} />
        </div>
      </div>
    );
  }

  if (kind === "doorhanger") {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-mr-pale/30 to-mr-light/20">
        <div className="relative flex h-[88%] w-24 flex-col items-center rounded-xl border border-mr-base/15 bg-gradient-to-b from-mr-base to-mr-dark p-3 text-white shadow-md">
          <span className="mt-1 h-5 w-5 rounded-full border-2 border-white/60" />
          <span className="mt-3 text-center font-heading text-[0.6rem] font-bold uppercase leading-tight">
            Open House
          </span>
          <span className="mt-auto">
            <Logo theme="dark" variant="logomark" width={26} />
          </span>
        </div>
      </div>
    );
  }

  if (kind === "card") {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-mr-pale/25 to-mr-light/15 p-4">
        <div className="w-full max-w-[15rem] rounded-lg bg-gradient-to-br from-mr-base to-mr-dark p-4 text-white shadow-lg">
          <Logo theme="dark" variant="logotype" width={120} />
          <p className="mt-3 font-heading text-sm font-bold">{profile.name}</p>
          <p className="text-[0.65rem] text-white/85">{profile.title}</p>
          <p className="mt-1 text-[0.65rem] text-mr-pale">{profile.phone}</p>
          <p className="text-[0.6rem] text-white/70">{profile.license}</p>
        </div>
      </div>
    );
  }

  if (kind === "apparel") {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-mr-base to-mr-dark">
        <div className="relative flex h-24 w-28 items-center justify-center rounded-t-[2.5rem] bg-mr-dark/40 ring-1 ring-white/15">
          {/* collar */}
          <span className="absolute -top-1 h-5 w-10 rounded-b-2xl bg-mr-dark/70" />
          <Logo theme="dark" variant="logomark" width={34} />
        </div>
      </div>
    );
  }

  if (kind === "sign") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-gradient-to-br from-mr-pale/30 to-mr-light/20">
        <div className="w-40 rounded-md border-2 border-mr-base bg-white px-3 py-2 text-center shadow">
          <p className="font-heading text-[0.7rem] font-bold uppercase tracking-wide text-mr-base">
            For Sale
          </p>
          <Logo theme="light" variant="logotype" width={96} className="mx-auto my-1" />
          <p className="text-[0.55rem] text-body">{profile.phone}</p>
        </div>
        <div className="flex gap-10">
          <span className="h-6 w-1.5 rounded-b bg-mr-base/60" />
          <span className="h-6 w-1.5 rounded-b bg-mr-base/60" />
        </div>
      </div>
    );
  }

  // promo and everything else
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-mr-base to-mr-dark text-white">
      <Logo theme="dark" variant="logomark" width={40} />
      <span className="rounded-full bg-white/15 px-3 py-1 text-[0.6rem] font-semibold">
        {initials} · Marshall Reddick
      </span>
    </div>
  );
}
