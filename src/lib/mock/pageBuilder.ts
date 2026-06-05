// Mock data for the Client Page Builder (/page-builder).
// Defines the audiences an agent can target and the modules they can toggle
// onto the public page. Fabricated configuration only.

export type Audience = "Buyer" | "Seller" | "Landlord" | "Public";

export interface BuilderModule {
  id: string;
  name: string;
  description: string;
  // Which audiences this module is on by default.
  defaultOn: Audience[];
}

export const AUDIENCES: Audience[] = ["Buyer", "Seller", "Landlord", "Public"];

export const BUILDER_MODULES: BuilderModule[] = [
  {
    id: "hero",
    name: "Welcome hero",
    description: "Agent photo, name, and a tailored headline.",
    defaultOn: ["Buyer", "Seller", "Landlord", "Public"],
  },
  {
    id: "featured",
    name: "Featured listings",
    description: "A curated set of properties for this audience.",
    defaultOn: ["Buyer", "Public"],
  },
  {
    id: "valuation",
    name: "Home valuation",
    description: "What is my home worth lead capture for sellers.",
    defaultOn: ["Seller"],
  },
  {
    id: "search",
    name: "Property search",
    description: "Live search box wired to the buyer's saved view.",
    defaultOn: ["Buyer"],
  },
  {
    id: "rental",
    name: "Rental management",
    description: "Property management pitch and owner intake for landlords.",
    defaultOn: ["Landlord"],
  },
  {
    id: "about",
    name: "About the agent",
    description: "Bio, credentials, and the Marshall Reddick advantage.",
    defaultOn: ["Buyer", "Seller", "Landlord", "Public"],
  },
  {
    id: "testimonials",
    name: "Testimonials",
    description: "Recent reviews from past clients.",
    defaultOn: ["Buyer", "Seller", "Public"],
  },
  {
    id: "resources",
    name: "Guides and resources",
    description: "Downloadable buyer and seller guides.",
    defaultOn: ["Buyer", "Seller"],
  },
  {
    id: "contact",
    name: "Contact form",
    description: "Lead capture that routes into the CRM.",
    defaultOn: ["Buyer", "Seller", "Landlord", "Public"],
  },
];

export const AUDIENCE_HEADLINES: Record<Audience, string> = {
  Buyer: "Find the right home, with an agent who knows the market.",
  Seller: "Sell for more, with a marketing plan that actually works.",
  Landlord: "Own without the headaches. Full-service property management.",
  Public: "Your trusted guide to Orange County real estate.",
};
