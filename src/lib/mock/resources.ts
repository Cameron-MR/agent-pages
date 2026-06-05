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
  {
    id: "r10",
    title: "Seller net sheet",
    category: "Templates",
    summary: "Estimate seller proceeds after commissions, fees, and payoff.",
    readMinutes: 4,
    tags: ["Seller", "Calculator"],
    body: [
      "Enter sale price, loan payoff, and closing costs.",
      "Auto-calculates estimated net proceeds to the seller.",
      "Branded PDF the agent can hand to a seller at the table.",
    ],
  },
  {
    id: "r11",
    title: "Buyer affordability worksheet",
    category: "Templates",
    summary: "Translate a monthly budget into a target price range.",
    readMinutes: 3,
    tags: ["Buyer", "Calculator"],
    body: [
      "Inputs: income, debts, down payment, and rate.",
      "Outputs an estimated price range and monthly payment.",
      "Sets realistic expectations before the first showing.",
    ],
  },
  {
    id: "r12",
    title: "Expired listing script",
    category: "Scripts",
    summary: "Win the relisting after another agent let it expire.",
    readMinutes: 5,
    tags: ["Seller", "Prospecting"],
    body: [
      "Acknowledge the frustration of a listing that did not sell.",
      "Diagnose what went wrong: price, marketing, or condition.",
      "Present a clear plan that is different this time.",
    ],
  },
  {
    id: "r13",
    title: "FSBO conversion script",
    category: "Scripts",
    summary: "Turn a for-sale-by-owner into a signed listing.",
    readMinutes: 5,
    tags: ["Seller", "Prospecting"],
    body: [
      "Lead with value, not a hard pitch.",
      "Offer to bring a qualified buyer and a market analysis.",
      "Show the net difference an agent typically delivers.",
    ],
  },
  {
    id: "r14",
    title: "Sphere database plan",
    category: "Guides",
    summary: "Build and work a database that feeds your business.",
    readMinutes: 6,
    tags: ["Sphere", "Lead gen"],
    body: [
      "Import and tag your contacts by relationship and source.",
      "Set a touch cadence: calls, notes, and value-adds.",
      "Track referrals so you know what is working.",
    ],
  },
  {
    id: "r15",
    title: "90-day social content calendar",
    category: "Guides",
    summary: "Never wonder what to post again for a full quarter.",
    readMinutes: 4,
    tags: ["Marketing", "Social"],
    body: [
      "Themes by day: market Monday, tip Tuesday, win Wednesday.",
      "Mix of listings, education, and personal brand posts.",
      "Caption starters and hashtag sets included.",
    ],
  },
  {
    id: "r16",
    title: "Transaction timeline at a glance",
    category: "Checklists",
    summary: "Set client expectations from offer to keys.",
    readMinutes: 3,
    tags: ["Transaction", "Buyer"],
    body: [
      "Day 0 to 3: acceptance, EMD, and open escrow.",
      "Day 4 to 17: inspections, appraisal, and contingencies.",
      "Day 18 to 30: loan approval, walkthrough, and signing.",
    ],
  },
  {
    id: "r17",
    title: "Fair housing quick reference",
    category: "Guides",
    summary: "The protected classes and language to avoid.",
    readMinutes: 5,
    tags: ["Compliance", "Required"],
    body: [
      "Review federal and California protected classes.",
      "Describe the property, never the buyer or neighborhood.",
      "Steering, redlining, and advertising pitfalls to avoid.",
    ],
  },
  {
    id: "r18",
    title: "Open house sign-in and follow-up kit",
    category: "Templates",
    summary: "Capture every visitor and follow up the same day.",
    readMinutes: 3,
    tags: ["Marketing", "Lead gen"],
    body: [
      "Digital sign-in that drops leads straight into the CRM.",
      "Same-day thank-you text and email templates.",
      "Neighbor invite and just-listed door hanger.",
    ],
  },
];
