// Mock data for the Resources & Scripts page (/resources).
// Fabricated talk tracks, checklists, and guides. Placeholder copy only.

export type ResourceCategory =
  | "Scripts"
  | "Checklists"
  | "Guides"
  | "Templates";

export interface ResourceItem {
  id: string;
  title: string;
  category: ResourceCategory;
  summary: string;
  readMinutes: number;
  tags: string[];
  // Placeholder body shown in the reader drawer.
  body: string[];
}

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  "Scripts",
  "Checklists",
  "Guides",
  "Templates",
];

export const RESOURCES: ResourceItem[] = [
  {
    id: "r1",
    title: "Listing appointment script",
    category: "Scripts",
    summary: "Open strong, uncover motivation, and set up the pricing talk.",
    readMinutes: 6,
    tags: ["Seller", "Appointment"],
    body: [
      "Open by thanking the seller and confirming the agenda for the meeting.",
      "Ask the motivation questions: timeline, reason for the move, and ideal outcome.",
      "Bridge into the pricing conversation using the PMA you prepared.",
      "Close by confirming next steps and the listing agreement.",
    ],
  },
  {
    id: "r2",
    title: "Buyer consultation script",
    category: "Scripts",
    summary: "Qualify needs, financing, and decision timeline up front.",
    readMinutes: 5,
    tags: ["Buyer", "Qualification"],
    body: [
      "Confirm the buyer's must-haves versus nice-to-haves.",
      "Verify financing: pre-approval, budget ceiling, and lender contact.",
      "Set expectations on showings, offers, and the local market pace.",
    ],
  },
  {
    id: "r3",
    title: "Price reduction conversation",
    category: "Scripts",
    summary: "Reframe days on market and guide the seller to a new number.",
    readMinutes: 4,
    tags: ["Seller", "Objection"],
    body: [
      "Lead with the data: showings, feedback, and comparable activity.",
      "Acknowledge the emotional side before presenting the recommended number.",
      "Offer two options and let the seller choose to keep ownership.",
    ],
  },
  {
    id: "r4",
    title: "Listing-to-close checklist",
    category: "Checklists",
    summary: "Every step from signed agreement to recorded sale.",
    readMinutes: 8,
    tags: ["Transaction", "Seller"],
    body: [
      "Pre-listing: photos ordered, staging confirmed, disclosures started.",
      "Live: MLS entered, sign installed, open house scheduled.",
      "Under contract: EMD received, inspections, appraisal, contingencies.",
      "Close: final walkthrough, signing, funding, and recording.",
    ],
  },
  {
    id: "r5",
    title: "New buyer onboarding checklist",
    category: "Checklists",
    summary: "Set every new buyer up the same way, every time.",
    readMinutes: 3,
    tags: ["Buyer", "Onboarding"],
    body: [
      "Add to CRM and set the search saved view.",
      "Confirm pre-approval on file and lender introduction.",
      "Send the buyer guide and schedule the consultation.",
    ],
  },
  {
    id: "r6",
    title: "Open house playbook",
    category: "Guides",
    summary: "Run an open house that actually generates leads.",
    readMinutes: 7,
    tags: ["Marketing", "Lead gen"],
    body: [
      "Promote: signs, social, and a neighbor invite three days out.",
      "Run: sign-in flow, talking points, and a follow-up commitment.",
      "After: same-day follow-up to every visitor in the CRM.",
    ],
  },
  {
    id: "r7",
    title: "Farming a neighborhood",
    category: "Guides",
    summary: "Build a geographic farm that compounds over a year.",
    readMinutes: 9,
    tags: ["Marketing", "Sphere"],
    body: [
      "Pick a farm with the right turnover and low agent saturation.",
      "Commit to a monthly touch: mailer, market update, and door knocks.",
      "Track results quarterly and adjust the message.",
    ],
  },
  {
    id: "r8",
    title: "Just-listed email template",
    category: "Templates",
    summary: "Drop-in announcement for your sphere, agent branded.",
    readMinutes: 2,
    tags: ["Email", "Marketing"],
    body: [
      "Subject line options for just-listed and just-sold.",
      "Body with property highlights and a single call to action.",
      "Footer with agent branding and compliance line.",
    ],
  },
  {
    id: "r9",
    title: "Listing presentation deck",
    category: "Templates",
    summary: "The full pre-listing deck with pricing and marketing plan.",
    readMinutes: 10,
    tags: ["Seller", "Presentation"],
    body: [
      "About you and the Marshall Reddick advantage.",
      "Pricing strategy backed by the PMA.",
      "Marketing plan: photography, syndication, and reach.",
      "Timeline and next steps.",
    ],
  },
];
