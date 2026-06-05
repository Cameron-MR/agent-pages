// Mock data for the Agent Pages reference UI.
// Everything here is clearly fake, fabricated sample content for demonstration
// only. Do not treat any of this as real Marshall Reddick data, clients, or
// listings. Real-estate-flavored placeholders only.

// Lightweight payload used to drive the shared stub modal. Any clickable
// surface (tile, card, stat, chip) hands one of these to the modal so the UI
// feels live without wiring real routes yet.
export interface StubContent {
  title: string;
  // Short eyebrow shown above the title, e.g. the section it came from.
  kind: string;
  detail: string;
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
  // Short helper describing the PMA stage.
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

// Pipeline snapshot organized by PMA (Property Market Analysis) stages.
// All clients and properties are invented.
export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "request",
    label: "Request",
    hint: "PMA requested by the client",
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
    hint: "PMA reviewed together",
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
