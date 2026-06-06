// Mock data + helpers for the Open House toolkit (/open-house).
//
// The kiosk sign-in captures visitor leads to localStorage so the demo feels
// real across refreshes. In production these would post to the central lead
// hub / CRM adapter (see PROJECT-GUIDE "Wire later").

export interface OpenHouseLead {
  id: string;
  listingId: string;
  listingAddress: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  hasAgent: "Yes" | "No" | "";
  note: string;
  signedInAt: string;
}

export const LEAD_SOURCES = [
  "Drove by",
  "Zillow",
  "Realtor.com",
  "Social media",
  "Neighbor",
  "Friend or family",
] as const;

const LEADS_KEY = "mr-openhouse-leads";

export function loadLeads(): OpenHouseLead[] {
  try {
    const raw = window.localStorage.getItem(LEADS_KEY);
    const parsed = raw ? (JSON.parse(raw) as OpenHouseLead[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveLead(lead: OpenHouseLead): OpenHouseLead[] {
  const next = [lead, ...loadLeads()];
  try {
    window.localStorage.setItem(LEADS_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
  return next;
}

export function deleteLead(id: string): OpenHouseLead[] {
  const next = loadLeads().filter((l) => l.id !== id);
  try {
    window.localStorage.setItem(LEADS_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
  return next;
}

// CSV export of captured leads (real download, no backend).
export function leadsToCsv(leads: OpenHouseLead[]): string {
  const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
  const header = [
    "Signed in",
    "Name",
    "Phone",
    "Email",
    "Source",
    "Working with an agent",
    "Note",
    "Listing",
  ].join(",");
  const rows = leads.map((l) =>
    [
      l.signedInAt,
      l.name,
      l.phone,
      l.email,
      l.source,
      l.hasAgent,
      l.note,
      l.listingAddress,
    ]
      .map(esc)
      .join(",")
  );
  return [header, ...rows].join("\r\n");
}

export function downloadLeadsCsv(leads: OpenHouseLead[]) {
  const blob = new Blob([leadsToCsv(leads)], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "open-house-leads.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// A few starter leads so the agent view never looks empty on first visit.
export const SAMPLE_LEADS: OpenHouseLead[] = [
  {
    id: "ohl1",
    listingId: "L1",
    listingAddress: "18 Sea Pine, Newport Beach",
    name: "Dana Visitor",
    phone: "(949) 555-0190",
    email: "dana.visitor@example.com",
    source: "Zillow",
    hasAgent: "No",
    note: "Loved the kitchen, asked about schools.",
    signedInAt: "Sat 11:20 AM",
  },
  {
    id: "ohl2",
    listingId: "L1",
    listingAddress: "18 Sea Pine, Newport Beach",
    name: "Marcus Example",
    phone: "(714) 555-0144",
    email: "marcus.example@example.com",
    source: "Drove by",
    hasAgent: "Yes",
    note: "",
    signedInAt: "Sat 11:45 AM",
  },
];
