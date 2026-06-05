// Mock data for the Directory page (/directory).
// Fabricated internal contacts and vendors. Not real people or businesses.

export type ContactGroup =
  | "Transaction"
  | "Leadership"
  | "Lending"
  | "Vendors"
  | "Marketing";

export interface Contact {
  id: string;
  name: string;
  role: string;
  group: ContactGroup;
  phone: string;
  email: string;
  initials: string;
  blurb: string;
}

export const CONTACT_GROUPS: ContactGroup[] = [
  "Transaction",
  "Leadership",
  "Lending",
  "Marketing",
  "Vendors",
];

export const CONTACTS: Contact[] = [
  {
    id: "p1",
    name: "Bryan Talley",
    role: "Managing Broker",
    group: "Leadership",
    phone: "(949) 555-0110",
    email: "bryan.talley@example.com",
    initials: "BT",
    blurb: "Broker of record. Escalations, compliance sign-off, and mentorship.",
  },
  {
    id: "p2",
    name: "Ross Nelson",
    role: "Operations Lead",
    group: "Leadership",
    phone: "(949) 555-0111",
    email: "ross.nelson@example.com",
    initials: "RN",
    blurb: "Systems, tooling, and process. Point person for the agent platform.",
  },
  {
    id: "p3",
    name: "Sample TC One",
    role: "Transaction Coordinator",
    group: "Transaction",
    phone: "(949) 555-0120",
    email: "tc.one@example.com",
    initials: "TC",
    blurb: "Opens files, manages deadlines, and shepherds deals to close.",
  },
  {
    id: "p4",
    name: "Sample TC Two",
    role: "Transaction Coordinator",
    group: "Transaction",
    phone: "(949) 555-0121",
    email: "tc.two@example.com",
    initials: "TC",
    blurb: "Backup coordinator for high-volume weeks and overflow.",
  },
  {
    id: "p5",
    name: "Sample Lender",
    role: "Senior Loan Officer",
    group: "Lending",
    phone: "(949) 555-0130",
    email: "lender@example.com",
    initials: "SL",
    blurb: "Pre-approvals, rate quotes, and fast closes for your buyers.",
  },
  {
    id: "p6",
    name: "Sample Escrow Co",
    role: "Escrow Officer",
    group: "Lending",
    phone: "(949) 555-0131",
    email: "escrow@example.com",
    initials: "SE",
    blurb: "Neutral third party handling funds and documents to close.",
  },
  {
    id: "p7",
    name: "Sample Photo Studio",
    role: "Listing Photography",
    group: "Vendors",
    phone: "(949) 555-0140",
    email: "photos@example.com",
    initials: "PS",
    blurb: "HDR photo, twilight, drone, and 3D tours. 24-hour turnaround.",
  },
  {
    id: "p8",
    name: "Sample Stager",
    role: "Home Staging",
    group: "Vendors",
    phone: "(949) 555-0141",
    email: "staging@example.com",
    initials: "ST",
    blurb: "Occupied and vacant staging packages for listings.",
  },
  {
    id: "p9",
    name: "Sample Inspector",
    role: "Home Inspection",
    group: "Vendors",
    phone: "(949) 555-0142",
    email: "inspect@example.com",
    initials: "IN",
    blurb: "General, roof, and sewer inspections with same-week scheduling.",
  },
  {
    id: "p10",
    name: "Sample Sign Co",
    role: "Signage & Print",
    group: "Marketing",
    phone: "(949) 555-0150",
    email: "signs@example.com",
    initials: "SC",
    blurb: "Yard signs, riders, flyers, and branded collateral on demand.",
  },
  {
    id: "p11",
    name: "Marketing Desk",
    role: "Agent Marketing Support",
    group: "Marketing",
    phone: "(949) 555-0151",
    email: "marketing@example.com",
    initials: "MD",
    blurb: "Help with campaigns, branded templates, and social assets.",
  },
];
