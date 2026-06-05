"use client";

import Photo from "@/components/Photo";
import Logo from "@/components/Logo";
import { useAgentProfile } from "@/components/AgentProfileProvider";
import { campaignById, type CampaignId } from "@/lib/mock/marketing";
import type { Listing } from "@/lib/mock/listings";

// A polished, branded social graphic for a listing and campaign, personalized
// to the agent profile. Renders square (feed) or story (9:16). The property
// photo fills the frame with a teal gradient overlay, campaign badge, price and
// specs, and an agent footer. Looks like a real just-listed post.
export default function SocialGraphic({
  listing,
  campaign,
  format,
}: {
  listing: Listing;
  campaign: CampaignId;
  format: "square" | "story";
}) {
  const { profile, initials } = useAgentProfile();
  const c = campaignById(campaign);
  const story = format === "story";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/60 shadow-lg ${
        story ? "aspect-[9/16]" : "aspect-square"
      }`}
    >
      <Photo
        src={listing.photo}
        alt={listing.address}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Campaign-tinted gradient for legibility */}
      <div
        aria-hidden
        className={`absolute inset-0 bg-gradient-to-t ${c.accent}`}
        style={{ opacity: 0.82 }}
      />

      <div className="absolute inset-0 flex flex-col justify-between p-4 text-white sm:p-5">
        {/* Top: badge + logo */}
        <div className="flex items-start justify-between">
          <span className="rounded-md bg-white px-2.5 py-1 font-heading text-xs font-bold uppercase tracking-wider text-mr-base shadow">
            {c.badge}
          </span>
          <Logo theme="dark" variant="logomark" width={story ? 40 : 34} />
        </div>

        {/* Bottom: price, address, specs, agent */}
        <div>
          <p
            className={`font-heading font-bold drop-shadow ${
              story ? "text-4xl" : "text-3xl"
            }`}
          >
            {listing.price}
          </p>
          <p className="mt-1 text-sm font-medium text-white/95 drop-shadow">
            {listing.address}
          </p>
          <p className="text-xs text-white/85">{listing.city}</p>
          <p className="mt-1 text-xs font-medium text-white/90">
            {listing.beds} bd · {listing.baths} ba · {listing.sqft} sqft
          </p>

          <div className="mt-4 flex items-center gap-2 border-t border-white/25 pt-3">
            <Photo
              src={profile.photo}
              alt={profile.name}
              className="h-9 w-9 flex-none rounded-full object-cover object-[center_20%] ring-2 ring-white/40"
            />
            <div className="min-w-0 leading-tight">
              <p className="truncate text-xs font-bold">{profile.name}</p>
              <p className="truncate text-[0.7rem] text-white/85">
                {profile.phone}
              </p>
            </div>
            <span className="ml-auto hidden text-[0.65rem] text-white/80 sm:block">
              {profile.license}
            </span>
            <span className="sr-only">{initials}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
