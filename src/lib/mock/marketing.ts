// Mock data for the Marketing Studio (/marketing).
// Campaign types and copy templates. Captions and emails are fabricated.

import type { Listing } from "@/lib/mock/listings";
import type { AgentProfile } from "@/components/AgentProfileProvider";

export type CampaignId =
  | "just-listed"
  | "open-house"
  | "price-improved"
  | "just-sold";

export interface Campaign {
  id: CampaignId;
  label: string;
  badge: string;
  // Accent gradient used on the graphic overlay.
  accent: string;
}

export const CAMPAIGNS: Campaign[] = [
  { id: "just-listed", label: "Just Listed", badge: "JUST LISTED", accent: "from-mr-base/95 to-mr-dark/80" },
  { id: "open-house", label: "Open House", badge: "OPEN HOUSE", accent: "from-mr-mid/95 to-mr-dark/80" },
  { id: "price-improved", label: "Price Improved", badge: "PRICE IMPROVED", accent: "from-mr-light/90 to-mr-base/85" },
  { id: "just-sold", label: "Just Sold", badge: "JUST SOLD", accent: "from-mr-dark/95 to-mr-base/80" },
];

export function campaignById(id: CampaignId): Campaign {
  return CAMPAIGNS.find((c) => c.id === id) ?? CAMPAIGNS[0];
}

// A ready-to-paste social caption for the chosen listing and campaign.
export function buildCaption(
  campaign: CampaignId,
  listing: Listing,
  agent: AgentProfile
): string {
  const where = listing.city.split(",")[0];
  const specs = `${listing.beds} bed, ${listing.baths} bath, ${listing.sqft} sqft`;
  const tags =
    "#marshallreddick #realestate #orangecountyhomes #" +
    where.replace(/\s+/g, "").toLowerCase();
  const sign = `${agent.name} | ${agent.brokerage} | ${agent.phone}`;

  switch (campaign) {
    case "open-house":
      return `OPEN HOUSE this weekend at ${listing.address} in ${where}. ${specs}, offered at ${listing.price}. Come take a look and bring your questions. ${sign} ${tags} #openhouse`;
    case "price-improved":
      return `PRICE IMPROVED at ${listing.address}, ${where}. ${specs}, now ${listing.price}. A fresh opportunity on a standout home. DM me for a private showing. ${sign} ${tags}`;
    case "just-sold":
      return `JUST SOLD in ${where}. Another happy client and a smooth close at ${listing.address}. Thinking about your next move? Let's talk. ${sign} ${tags} #justsold`;
    case "just-listed":
    default:
      return `JUST LISTED in ${where}. ${listing.address}, ${specs}, offered at ${listing.price}. ${listing.blurb} Message me for a private tour. ${sign} ${tags} #justlisted`;
  }
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: (listing: Listing) => string;
  body: (listing: Listing, agent: AgentProfile) => string[];
}

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: "just-listed",
    name: "Just Listed announcement",
    subject: (l) => `Just listed: ${l.address} at ${l.price}`,
    body: (l, a) => [
      `Hi there,`,
      `I'm excited to share a new listing: ${l.address} in ${l.city}. It is a ${l.beds} bed, ${l.baths} bath home with ${l.sqft} sqft, offered at ${l.price}.`,
      l.blurb,
      `Reply to this email or call me to schedule a private tour before the first open house.`,
      `${a.name}, ${a.brokerage}. ${a.phone}.`,
    ],
  },
  {
    id: "open-house",
    name: "Open house invite",
    subject: (l) => `You're invited: open house at ${l.address}`,
    body: (l, a) => [
      `Hi there,`,
      `Join me this weekend at ${l.address} in ${l.city}. ${l.beds} bed, ${l.baths} bath, ${l.sqft} sqft at ${l.price}.`,
      `Stop by for a walkthrough and a chat about the neighborhood. Light refreshments provided.`,
      `Hope to see you there. ${a.name}, ${a.brokerage}. ${a.phone}.`,
    ],
  },
  {
    id: "market-update",
    name: "Neighborhood market update",
    subject: () => `Your Orange County market update`,
    body: (l, a) => [
      `Hi there,`,
      `Quick update on the local market. Homes like ${l.address} are seeing steady demand, and well-priced listings are moving quickly.`,
      `If you have been curious what your home is worth in today's market, I am happy to put together a no-pressure analysis.`,
      `Always here to help. ${a.name}, ${a.brokerage}. ${a.phone}.`,
    ],
  },
];
