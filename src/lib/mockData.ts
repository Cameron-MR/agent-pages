// Mock data for the Agent Pages reference UI.
// Everything here is clearly fake, fabricated sample content for demonstration
// only. Do not treat any of this as real Marshall Reddick data, clients, or
// listings. Real-estate-flavored placeholders only.

import type { ReactNode } from "react";

// Lightweight payload used to drive the shared stub modal. Any clickable
// surface (tile, card, stat, chip) hands one of these to the modal so the UI
// feels live without wiring real routes yet.
export interface StubContent {
  title: string;
  // Short eyebrow shown above the title, e.g. the section it came from.
  kind: string;
  detail: string;
  // Optional rich preview rendered above the detail copy. Used by the
  // Marketing Studio to show a larger faux asset. Plain stubs omit it.
  preview?: ReactNode;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Agent {
  name: string;
  title: string;
  initials: string;
}

export interface AgentStat {
  value: string;
  label: string;
  detail: string;
}

// A single clickable tile inside a Resource Hub section. Used by both the
// app-launcher tiles and the tool cards.
export interface HubTile {
  id: string;
  title: string;
  // One short line shown on the tile face.
  blurb: string;
  // Longer placeholder copy shown in the stub modal.
  detail: string;
  // Short glyph/label rendered in the tinted icon block (kept text-only so we
  // never break the build chasing remote images). Swap for an icon later.
  glyph: string;
}

export interface HubSectionData {
  id: string;
  label: string;
  description: string;
  // "apps" renders the SSO-style launcher grid, "tools" renders tool cards.
  layout: "apps" | "tools";
  tiles: HubTile[];
}

export interface PipelineClient {
  id: string;
  name: string;
  // Fake property or context line.
  detail: string;
}

export interface PipelineStage {
  id: string;
  label: string;
  // Short helper describing the pipeline stage.
  hint: string;
  clients: PipelineClient[];
}

// Fake signed-in agent. Not a real person.
export const CURRENT_AGENT: Agent = {
  name: "Jordan Sample",
  title: "Senior Sales Agent",
  initials: "JS",
};

// Top bar navigation. Hrefs are in-page placeholders for now.
export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "#dashboard" },
  { label: "Resources", href: "#resource-hub" },
  { label: "Listings", href: "#resource-hub" },
  { label: "Pipeline", href: "#pipeline" },
  { label: "Page Builder", href: "#resource-hub" },
];

// Cross-page navigation used by PageShell on every subpage. These are real
// routes that resolve to the built-out subpages.
export const SUBNAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/" },
  { label: "Pipeline", href: "/pipeline" },
  { label: "Listings", href: "/listings" },
  { label: "Marketing", href: "/marketing" },
  { label: "Production", href: "/production" },
  { label: "Shop", href: "/shop" },
  { label: "Calculators", href: "/calculators" },
  { label: "CMA", href: "/cma" },
  { label: "Resources", href: "/resources" },
  { label: "Directory", href: "/directory" },
  { label: "Training", href: "/training" },
  { label: "Page Builder", href: "/page-builder" },
  { label: "Settings", href: "/settings" },
];

// How many nav items show inline before the rest collapse into a More menu.
export const PRIMARY_NAV_COUNT = 5;

// Recent activity shown in the notifications bell. All fabricated.
export interface AppNotification {
  id: string;
  title: string;
  detail: string;
  time: string;
  kind: "lead" | "listing" | "transaction" | "system";
}

export const NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1",
    title: "New lead from Zillow",
    detail: "Maria Delgado, buyer pre-approved to $1.2M in Irvine.",
    time: "12 min ago",
    kind: "lead",
  },
  {
    id: "n2",
    title: "Price reduction suggested",
    detail: "44 Ridgeline has 21 days on market with low showing volume.",
    time: "1 hour ago",
    kind: "listing",
  },
  {
    id: "n3",
    title: "Disclosure signed",
    detail: "The Patel Family completed their seller disclosure packet.",
    time: "3 hours ago",
    kind: "transaction",
  },
  {
    id: "n4",
    title: "Inspection contingency due",
    detail: "12 Harbor Cove contingency expires today.",
    time: "Today",
    kind: "transaction",
  },
  {
    id: "n5",
    title: "New 5-star review",
    detail: "A past client left a review on your public page.",
    time: "Yesterday",
    kind: "system",
  },
];

// Fabricated headline metrics for the profile header.
export const AGENT_STATS: AgentStat[] = [
  {
    value: "12",
    label: "Active Listings",
    detail:
      "A placeholder count of listings this agent currently represents. The real tile would open a filterable list of active properties with status and days on market.",
  },
  {
    value: "27",
    label: "Clients",
    detail:
      "A placeholder count of buyers and sellers in the book of business. The real tile would link through to the full client roster and recent activity.",
  },
  {
    value: "4.9",
    label: "Avg Rating",
    detail:
      "A placeholder average review score from past closings. The real tile would surface recent testimonials and a prompt to request new reviews.",
  },
];

// Resource Hub sections. This is the centerpiece of the cockpit.
export const HUB_SECTIONS: HubSectionData[] = [
  {
    id: "software-launcher",
    label: "Software Launcher",
    description: "One-click sign-on into the tools you use every day.",
    layout: "apps",
    tiles: [
      {
        id: "crm",
        title: "Follow Up Boss",
        blurb: "CRM and lead follow-up",
        glyph: "CRM",
        detail:
          "Placeholder single sign-on into the CRM. The live tile would drop the agent straight into their lead inbox and follow-up queue, no second login.",
      },
      {
        id: "mls",
        title: "MLS",
        blurb: "Search and listing entry",
        glyph: "MLS",
        detail:
          "Placeholder launch into the multiple listing service. The live tile would open MLS search and new-listing entry with the agent already authenticated.",
      },
      {
        id: "transaction-mgmt",
        title: "Transaction Mgmt",
        blurb: "Files, deadlines, compliance",
        glyph: "TXN",
        detail:
          "Placeholder launch into transaction management. The live tile would show open files, upcoming deadlines, and compliance checklists for each deal.",
      },
      {
        id: "e-sign",
        title: "E-Sign",
        blurb: "Send and track signatures",
        glyph: "SIG",
        detail:
          "Placeholder launch into the e-signature tool. The live tile would let the agent send disclosure packets and track signing status in real time.",
      },
      {
        id: "marketing-suite",
        title: "Marketing Suite",
        blurb: "Campaigns and templates",
        glyph: "MKT",
        detail:
          "Placeholder launch into the marketing suite. The live tile would open branded campaign templates, scheduled sends, and performance snapshots.",
      },
    ],
  },
  {
    id: "build-market",
    label: "Build & Market",
    description: "Spin up property marketing without leaving the cockpit.",
    layout: "tools",
    tiles: [
      {
        id: "tour-route",
        title: "Property Tour Route Builder",
        blurb: "Plan an efficient showing loop",
        glyph: "RT",
        detail:
          "Placeholder for the tour route builder. The live tool would order a day of showings into an efficient driving loop and share it with the client.",
      },
      {
        id: "brochure",
        title: "Brochure Builder",
        blurb: "Branded property one-sheets",
        glyph: "BR",
        detail:
          "Placeholder for the brochure builder. The live tool would generate a branded property brochure from listing details and photos in a few clicks.",
      },
      {
        id: "property-site",
        title: "Per-Property Website Builder",
        blurb: "A single-listing site in minutes",
        glyph: "WEB",
        detail:
          "Placeholder for the per-property website builder. The live tool would publish a dedicated single-listing site with gallery, map, and inquiry form.",
      },
      {
        id: "email-builder",
        title: "Marketing Email Builder",
        blurb: "Just-listed and open-house blasts",
        glyph: "EM",
        detail:
          "Placeholder for the marketing email builder. The live tool would assemble just-listed and open-house emails from templates and send to a sphere list.",
      },
      {
        id: "signage",
        title: "Signage & Collateral",
        blurb: "Yard signs, riders, flyers",
        glyph: "SGN",
        detail:
          "Placeholder for signage and collateral. The live tool would order branded yard signs, riders, and printed flyers with the agent's details prefilled.",
      },
    ],
  },
  {
    id: "resources-scripts",
    label: "Resources & Scripts",
    description: "Talk tracks and checklists for every conversation.",
    layout: "tools",
    tiles: [
      {
        id: "seller-questions",
        title: "Seller Questions",
        blurb: "Discovery for listing appointments",
        glyph: "SQ",
        detail:
          "Placeholder for the seller question set. The live resource would offer a guided discovery script for listing appointments and motivation questions.",
      },
      {
        id: "buyer-questions",
        title: "Buyer Questions",
        blurb: "Needs and qualification prompts",
        glyph: "BQ",
        detail:
          "Placeholder for the buyer question set. The live resource would walk through needs, must-haves, and financing qualification prompts.",
      },
      {
        id: "listing-presentation",
        title: "Listing Presentation",
        blurb: "The full pre-listing deck",
        glyph: "LP",
        detail:
          "Placeholder for the listing presentation. The live resource would open the branded pre-listing deck with pricing strategy and marketing plan slides.",
      },
      {
        id: "checklists",
        title: "Checklists",
        blurb: "Listing to close, step by step",
        glyph: "CK",
        detail:
          "Placeholder for the checklist library. The live resource would provide listing-to-close checklists the agent can assign and track per transaction.",
      },
      {
        id: "scripts",
        title: "Scripts",
        blurb: "Calls, objections, follow-up",
        glyph: "SC",
        detail:
          "Placeholder for the script library. The live resource would offer call, objection-handling, and follow-up scripts grouped by scenario.",
      },
    ],
  },
  {
    id: "brand-merch",
    label: "Brand & Merch",
    description: "Stay on brand and stock up on the essentials.",
    layout: "tools",
    tiles: [
      {
        id: "marketing-guides",
        title: "Marketing Guides",
        blurb: "Playbooks and best practices",
        glyph: "MG",
        detail:
          "Placeholder for the marketing guides. The live resource would collect playbooks and best-practice guides for farming, social, and open houses.",
      },
      {
        id: "brand-styles",
        title: "Brand Styles",
        blurb: "Logos, colors, type",
        glyph: "BS",
        detail:
          "Placeholder for brand styles. The live resource would show the approved logo files, color palette, and type rules with quick download links.",
      },
      {
        id: "shop-merch",
        title: "Shop Merch",
        blurb: "Apparel and giveaways",
        glyph: "SH",
        detail:
          "Placeholder for the merch shop. The live resource would let the agent order branded apparel and client giveaways from an approved catalog.",
      },
      {
        id: "create-signage",
        title: "Create Signage",
        blurb: "Order branded sign packages",
        glyph: "CS",
        detail:
          "Placeholder for signage ordering. The live resource would let the agent configure and order branded sign packages for a new listing.",
      },
    ],
  },
  {
    id: "training",
    label: "Training Quick Links",
    description: "Jump back into onboarding and skill-building.",
    layout: "tools",
    tiles: [
      {
        id: "new-agent-onboarding",
        title: "New Agent Onboarding",
        blurb: "Your first 30 days",
        glyph: "ON",
        detail:
          "Placeholder for onboarding. The live link would open the first-30-days path with welcome modules, systems setup, and a starter checklist.",
      },
      {
        id: "lead-conversion",
        title: "Lead Conversion",
        blurb: "Speed-to-lead and nurture",
        glyph: "LC",
        detail:
          "Placeholder for the lead conversion course. The live link would open lessons on speed-to-lead, nurture cadences, and appointment setting.",
      },
      {
        id: "listing-mastery",
        title: "Listing Mastery",
        blurb: "Win and market listings",
        glyph: "LM",
        detail:
          "Placeholder for listing mastery. The live link would open training on winning listing appointments and building a marketing plan that sells.",
      },
      {
        id: "tech-stack",
        title: "Tech Stack Basics",
        blurb: "Get fluent in the tools",
        glyph: "TS",
        detail:
          "Placeholder for tech stack basics. The live link would open short how-to videos for the CRM, MLS, and the rest of the cockpit.",
      },
    ],
  },
];

// Pipeline snapshot organized by client pipeline stages (market analysis
// request through follow-up). All clients and properties are invented.
export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "request",
    label: "Request",
    hint: "Market analysis requested",
    clients: [
      { id: "c1", name: "Avery Placeholder", detail: "Maple Grove condo" },
      { id: "c2", name: "Devon Example", detail: "Lakeside townhome" },
    ],
  },
  {
    id: "sent",
    label: "Sent",
    hint: "Analysis delivered, awaiting reply",
    clients: [
      { id: "c3", name: "Riley Sample", detail: "Oak Street ranch" },
      { id: "c4", name: "Casey Fictional", detail: "Downtown loft" },
      { id: "c5", name: "Morgan Placeholder", detail: "Hillcrest colonial" },
    ],
  },
  {
    id: "completed",
    label: "Completed",
    hint: "Analysis reviewed together",
    clients: [
      { id: "c6", name: "Jamie Notreal", detail: "Cedar Court split-level" },
    ],
  },
  {
    id: "questionnaire",
    label: "Questionnaire",
    hint: "Needs survey in progress",
    clients: [
      { id: "c7", name: "Quinn Example", detail: "Riverbend bungalow" },
      { id: "c8", name: "Skyler Sample", detail: "Parkview duplex" },
    ],
  },
  {
    id: "follow-up",
    label: "Follow-up",
    hint: "Scheduled check-in",
    clients: [
      { id: "c9", name: "Reese Placeholder", detail: "Sunset Ave cottage" },
      { id: "c10", name: "Harper Fictional", detail: "Birchwood estate" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Command center data. All fabricated, Orange County focus. Names, numbers,
// addresses, and contacts are invented for this reference build only.
// ---------------------------------------------------------------------------

export const agent = {
  name: "Jordan Sample",
  title: "Real Estate Agent, Marshall Reddick Real Estate",
  market: "Orange County, CA",
  phone: "(949) 555-0142",
  email: "jordan.sample@example.com",
  photo:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
  license: "DRE# 02000000",
};

export interface HeroStat {
  label: string;
  value: string;
  sub: string;
}

export const heroStats: HeroStat[] = [
  { label: "GCI year to date", value: "$214,800", sub: "Goal $350,000" },
  { label: "Closings MTD", value: "3", sub: "$2.41M volume" },
  { label: "Under contract", value: "5", sub: "$4.92M volume" },
  { label: "Active listings", value: "4", sub: "Avg 12 days on market" },
];

export interface TodayAppointment {
  time: string;
  label: string;
  detail: string;
}

export interface TodayTask {
  label: string;
  priority: "high" | "med";
}

export interface TodayDeadline {
  label: string;
  detail: string;
  due: string;
}

export interface TodayLead {
  name: string;
  note: string;
  source: string;
}

export const todayItems: {
  appointments: TodayAppointment[];
  tasks: TodayTask[];
  deadlines: TodayDeadline[];
  hotLeads: TodayLead[];
} = {
  appointments: [
    { time: "9:30 AM", label: "Listing presentation", detail: "18 Sea Pine, Newport Beach" },
    { time: "12:00 PM", label: "Buyer showing", detail: "3 properties, Irvine" },
    { time: "4:00 PM", label: "Open house prep", detail: "221 Bayview Ter, Costa Mesa" },
  ],
  tasks: [
    { label: "Send CMA to the Patels", priority: "high" },
    { label: "Order listing photos for Tustin condo", priority: "med" },
    { label: "Call 6 follow-up leads in Follow Up Boss", priority: "high" },
  ],
  deadlines: [
    { label: "Inspection contingency", detail: "12 Harbor Cove, Huntington Beach", due: "Today" },
    { label: "EMD wire confirmation", detail: "44 Ridgeline, Mission Viejo", due: "Tomorrow" },
    { label: "Appraisal ordered", detail: "7 Canyon Vista, Laguna Niguel", due: "Thu" },
  ],
  hotLeads: [
    { name: "Maria Delgado", note: "Buyer, pre-approved $1.2M, Irvine", source: "Zillow" },
    { name: "The Patel Family", note: "Seller, Tustin, wants CMA", source: "Referral" },
    { name: "Kevin Wu", note: "Buyer, cash, Newport Coast", source: "Open house" },
  ],
};

export interface MarketStat {
  label: string;
  value: string;
  trend: string;
}

export const marketPulse: { region: string; stats: MarketStat[] } = {
  region: "Orange County",
  stats: [
    { label: "Median sale price", value: "$1.32M", trend: "+4.1% YoY" },
    { label: "Median days on market", value: "21", trend: "-3 days MoM" },
    { label: "Months of inventory", value: "2.4", trend: "Seller market" },
    { label: "Sale to list", value: "99.6%", trend: "+0.4% MoM" },
  ],
};

export interface Announcement {
  title: string;
  detail: string;
  tag: string;
}

export const announcements: Announcement[] = [
  { title: "Q3 agent summit", detail: "Irvine HQ, registration open through Friday.", tag: "Event" },
  { title: "New listing kit template live", detail: "Available in the Marketing Suite.", tag: "Tools" },
  { title: "Bryan Talley closes top-10 office deal", detail: "Newport Beach, congrats.", tag: "Wins" },
];

export interface AppLauncher {
  name: string;
  desc: string;
  category: string;
}

export const appLaunchers: AppLauncher[] = [
  { name: "Follow Up Boss", desc: "Personal lead follow up and nurture", category: "CRM" },
  { name: "SuiteCRM", desc: "Internal company data and records", category: "CRM" },
  { name: "MLS (CRMLS)", desc: "Search, comps, listing input", category: "Listings" },
  { name: "Transaction Management", desc: "Manage active transactions", category: "Transactions" },
  { name: "DigiSign", desc: "E-sign for under contract documents", category: "Signing" },
  { name: "DocuSign", desc: "E-sign for disclosures and agreements", category: "Signing" },
  { name: "Marketing Suite", desc: "Branded collateral and campaigns", category: "Marketing" },
];

export interface HubEntry {
  name: string;
  desc: string;
  href: string;
}

export const hubEntries: HubEntry[] = [
  { name: "Pipeline", desc: "Your deals from request to close", href: "/pipeline" },
  { name: "Listings", desc: "Your active listings and status", href: "/listings" },
  { name: "Marketing Studio", desc: "Build branded client-ready material", href: "/marketing" },
  { name: "Tour Builder", desc: "Build a branded property tour to share", href: "/tour-builder" },
  { name: "Marketing Shop", desc: "Order mailers, signs, cards, and swag", href: "/shop" },
  { name: "Production", desc: "Commissions, goals, leaderboard", href: "/production" },
  { name: "Calculators", desc: "Net sheet, affordability, commission", href: "/calculators" },
  { name: "CMA Builder", desc: "Comps and a suggested price range", href: "/cma" },
  { name: "Resources & Scripts", desc: "Docs, guides, dialogue", href: "/resources" },
  { name: "Directory", desc: "Who to call: TC, broker, vendors", href: "/directory" },
  { name: "Training", desc: "Onboarding ramp and courses", href: "/training" },
];

// ---------------------------------------------------------------------------
// Marketing Studio data. Fabricated Orange County sample listing and the
// asset types the studio can generate from it.
// ---------------------------------------------------------------------------

export interface SampleProperty {
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  lotSqft: number;
  yearBuilt: number;
  type: string;
  status: string;
  description: string;
  features: string[];
  photo: string;
  gallery: string[];
}

export const sampleProperty: SampleProperty = {
  address: "18 Sea Pine, Newport Beach, CA 92660",
  price: "$3,495,000",
  beds: 4,
  baths: 4.5,
  sqft: 3850,
  lotSqft: 8200,
  yearBuilt: 2019,
  type: "Single Family",
  status: "Coming Soon",
  description:
    "Coastal contemporary with white-water views, walls of glass, and an entertainer's backyard minutes from the harbor.",
  features: [
    "Chef's kitchen",
    "Primary suite with ocean view",
    "Pool and spa",
    "3-car garage",
    "Smart home",
    "Walk to beach",
  ],
  photo:
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  ],
};

export interface MarketingOutput {
  id: string;
  name: string;
  desc: string;
  cta: string;
}

export const marketingOutputs: MarketingOutput[] = [
  { id: "site", name: "Property Website", desc: "A single-listing site, mobile first, with gallery, map, and lead capture.", cta: "Open site preview" },
  { id: "brochure", name: "Print Brochure", desc: "Branded one-sheet, print ready PDF with photos and features.", cta: "Open brochure" },
  { id: "social", name: "Social Pack", desc: "Just-listed graphics sized for Instagram, Facebook, and Stories.", cta: "Open social pack" },
  { id: "email", name: "Email Blast", desc: "Just-listed announcement to your sphere, agent branded.", cta: "Open email" },
];

export interface MarketingTool {
  name: string;
  desc: string;
  abbr: string;
}

export const marketingTools: MarketingTool[] = [
  { name: "Property Tour Route Builder", desc: "Plan an efficient showing loop across listings.", abbr: "RT" },
  { name: "Brochure Builder", desc: "Branded property one-sheets.", abbr: "BR" },
  { name: "Per-Property Website Builder", desc: "A single-listing site in minutes.", abbr: "WEB" },
  { name: "Marketing Email Builder", desc: "Just-listed and open-house blasts.", abbr: "EM" },
  { name: "Signage and Collateral", desc: "Yard signs, riders, flyers.", abbr: "SGN" },
];
