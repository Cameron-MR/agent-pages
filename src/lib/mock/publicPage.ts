// Mock data for the public client-facing page (/p/[slug]).
// Fabricated agent profile, listings, sales, and testimonials. Not real.

import { propertyPhoto, headshot, familyPhoto } from "@/lib/mock/images";

export interface PublicListing {
  id: string;
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  status: string;
  photo: string;
}

export interface RecentSale {
  id: string;
  address: string;
  price: string;
  side: "Represented buyer" | "Represented seller";
  soldAgo: string;
  photo: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  context: string;
}

export const PUBLIC_AGENT = {
  name: "Jordan Sample",
  title: "Realtor / Advisor",
  brokerage: "Marshall Reddick Real Estate",
  market: "Orange County, CA",
  phone: "(949) 555-0142",
  email: "jordan.sample@example.com",
  license: "DRE# 02000000",
  photo: headshot(0, 400),
  familyPhoto: familyPhoto(0, 900),
  tagline:
    "Intentional, reliable, and rooted in experience. I help clients navigate real estate with clarity, commitment, and care.",
  headline: "Your trusted guide to Orange County real estate.",
  bio: "Jordan helps buyers and sellers across Orange County move with confidence. Backed by the Marshall Reddick platform, every client gets sharp pricing, full-service marketing, and a smooth path to close. This is fabricated sample content for a reference design.",
  personalBio:
    "I was born and raised in Orange County, and I still can't imagine living anywhere else. When I'm not helping clients find their next home, you'll find me at the beach with my wife and two kids, coaching weekend soccer, or hunting down the best taco spot in town. Real estate is personal for me. I treat every client like a neighbor, because most of them become one. This is fabricated sample content for a reference design.",
  specialties: [
    "Buyer's Agent",
    "Listing Agent",
    "Luxury",
    "Investment Properties",
    "Relocation",
  ],
  stats: [
    { value: "120+", label: "Families helped" },
    { value: "4.9", label: "Average rating" },
    { value: "14", label: "Days on market avg" },
    { value: "$2M", label: "Average price" },
  ],
};

export const PUBLIC_LISTINGS: PublicListing[] = [
  {
    id: "l1",
    address: "18 Sea Pine, Newport Beach",
    price: "$3,495,000",
    beds: 4,
    baths: 5,
    sqft: "3,850",
    status: "Coming Soon",
    photo: propertyPhoto(0, 800),
  },
  {
    id: "l2",
    address: "221 Bayview Ter, Costa Mesa",
    price: "$1,150,000",
    beds: 3,
    baths: 2,
    sqft: "1,920",
    status: "Active",
    photo: propertyPhoto(1, 800),
  },
  {
    id: "l3",
    address: "44 Ridgeline, Mission Viejo",
    price: "$865,000",
    beds: 4,
    baths: 3,
    sqft: "2,240",
    status: "Active",
    photo: propertyPhoto(2, 800),
  },
  {
    id: "l4",
    address: "7 Canyon Vista, Laguna Niguel",
    price: "$1,540,000",
    beds: 5,
    baths: 4,
    sqft: "3,100",
    status: "Pending",
    photo: propertyPhoto(3, 800),
  },
];

export const RECENT_SALES: RecentSale[] = [
  {
    id: "s1",
    address: "12 Harbor Cove, Huntington Beach",
    price: "$1,295,000",
    side: "Represented seller",
    soldAgo: "Sold 1 month ago",
    photo: propertyPhoto(4, 800),
  },
  {
    id: "s2",
    address: "44 Ridgeline, Mission Viejo",
    price: "$865,000",
    side: "Represented buyer",
    soldAgo: "Sold 3 weeks ago",
    photo: propertyPhoto(5, 800),
  },
  {
    id: "s3",
    address: "530 Kings Rd, Newport Beach",
    price: "$7,200,000",
    side: "Represented seller",
    soldAgo: "Sold 2 months ago",
    photo: propertyPhoto(6, 800),
  },
  {
    id: "s4",
    address: "4712 Yorba Ln, Yorba Linda",
    price: "$1,569,000",
    side: "Represented buyer",
    soldAgo: "Sold 2 months ago",
    photo: propertyPhoto(7, 800),
  },
];

export const SERVICE_AREAS: string[] = [
  "Newport Beach",
  "Irvine",
  "Costa Mesa",
  "Huntington Beach",
  "Laguna Niguel",
  "Mission Viejo",
  "Tustin",
  "Orange",
];

export const PUBLIC_TESTIMONIALS: Testimonial[] = [
  {
    id: "v1",
    quote:
      "Jordan made selling our home feel easy. The marketing was sharp and we closed above asking.",
    name: "The Sample Family",
    context: "Sold in Newport Beach",
  },
  {
    id: "v2",
    quote:
      "As first-time buyers we had a lot of questions. Jordan walked us through every step.",
    name: "Placeholder Buyer",
    context: "Bought in Irvine",
  },
  {
    id: "v3",
    quote:
      "Responsive, honest, and always two steps ahead. We would work together again.",
    name: "Fictional Client",
    context: "Sold in Costa Mesa",
  },
];

// ---------------------------------------------------------------------------
// New client-page modules (mirroring the modern MR agent page). All fabricated.
// ---------------------------------------------------------------------------

// Aggregate review badges from multiple sources. Source-agnostic by design.
export interface ReviewSource {
  source: string;
  rating: string;
  count: number;
}

export const REVIEW_SOURCES: ReviewSource[] = [
  { source: "Zillow", rating: "5.0", count: 9 },
  { source: "Google", rating: "4.2", count: 133 },
  { source: "Yelp", rating: "4.5", count: 198 },
  { source: "Realtor.com", rating: "4.8", count: 21 },
  { source: "Redfin", rating: "4.9", count: 14 },
];

export interface ClientReview {
  id: string;
  name: string;
  transaction: string;
  date: string;
  stars: number;
  quote: string;
  source: string;
}

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: "r1",
    name: "Jesse R.",
    transaction: "Helped me buy a home",
    date: "Dec 20, 2025",
    stars: 5,
    quote:
      "A great agent and advisor. Sourced multiple new-construction options for me out of state and connected me with a lender who handled every transaction. Excellent communication throughout.",
    source: "Zillow",
  },
  {
    id: "r2",
    name: "Anonymous",
    transaction: "Long-term management of a property",
    date: "Dec 27, 2025",
    stars: 5,
    quote:
      "I am a difficult client, and they still exceeded every expectation. They identified issues I had not even thought about and solved them. 100% satisfaction.",
    source: "Google",
  },
  {
    id: "r3",
    name: "Russell D.",
    transaction: "Listed and sold a home",
    date: "Jul 16, 2025",
    stars: 5,
    quote:
      "Sold our condo and it was a great transaction start to finish. We had an offer the first week and the process was smooth and professional the whole way through.",
    source: "Yelp",
  },
  {
    id: "r4",
    name: "Anonymous",
    transaction: "Listed and sold a home",
    date: "May 8, 2025",
    stars: 5,
    quote:
      "Fantastic to work with. We closed in just 7 days and they kept everything on track from start to finish. Extremely communicative and on top of every detail.",
    source: "Realtor.com",
  },
];

export interface CompanyEvent {
  id: string;
  title: string;
  type: "Online Event" | "Vendor Event";
  date: string;
  time: string;
  format: string;
  speakers: string;
  going: number;
}

export const COMPANY_EVENTS: CompanyEvent[] = [
  {
    id: "e1",
    title: "Borrowing Hard Money Made Simple with Marshall Reddick",
    type: "Online Event",
    date: "Tue, Jun 9, 2026",
    time: "5:00 PM PDT",
    format: "Online Presentation",
    speakers: "Stephanie Miller",
    going: 43,
  },
  {
    id: "e2",
    title: "How Investors Are Using Retirement Accounts in Real Estate Today",
    type: "Online Event",
    date: "Thu, Jun 18, 2026",
    time: "5:00 PM PDT",
    format: "Online Presentation",
    speakers: "Brett Synicky, Michael Johnson",
    going: 31,
  },
  {
    id: "e3",
    title: "Why Nashville and Middle Tennessee Are Seeing Major Growth",
    type: "Vendor Event",
    date: "Thu, Jun 18, 2026",
    time: "6:00 PM PDT",
    format: "Online Presentation",
    speakers: "Clayton Hines, Reed Hazard",
    going: 5,
  },
  {
    id: "e4",
    title: "How to Buy Investment Property in 2026",
    type: "Online Event",
    date: "Tue, Jul 28, 2026",
    time: "5:00 PM PDT",
    format: "Online Presentation",
    speakers: "Tyler Daigler, Reed Hazard",
    going: 18,
  },
];

export interface EducationItem {
  id: string;
  title: string;
  type: "Video" | "Article";
  date: string;
  length: string;
  photo: string;
}

export const EDUCATION_ITEMS: EducationItem[] = [
  {
    id: "ed1",
    title: "Building Wealth: A Comparative Look at Modern Investments",
    type: "Video",
    date: "Dec 16, 2025",
    length: "61 min",
    photo: propertyPhoto(6, 600),
  },
  {
    id: "ed2",
    title: "How the Market Is Performing: Short-Term vs Long-Term Rentals",
    type: "Video",
    date: "Aug 15, 2025",
    length: "33 min",
    photo: propertyPhoto(7, 600),
  },
  {
    id: "ed3",
    title: "Self-Manage or Hire a Pro? What Every Landlord Needs to Know",
    type: "Article",
    date: "Jun 11, 2025",
    length: "4 min read",
    photo: propertyPhoto(8, 600),
  },
];

export interface PreferredVendor {
  id: string;
  type: string;
  name: string;
  blurb: string;
}

export const PREFERRED_VENDORS: PreferredVendor[] = [
  { id: "vn1", type: "Lender", name: "Sample Mortgage Group", blurb: "Pre-approvals and fast closes for your buyers." },
  { id: "vn2", type: "Title", name: "Sample Title Co", blurb: "Clear title and smooth signings, every time." },
  { id: "vn3", type: "Escrow", name: "Sample Escrow Services", blurb: "Neutral handling of funds and documents to close." },
  { id: "vn4", type: "Insurance", name: "Sample Insurance Agency", blurb: "Homeowner and landlord coverage quotes in a day." },
];

export interface AgentService {
  id: string;
  name: string;
  blurb: string;
  cta: string;
}

export const AGENT_SERVICES: AgentService[] = [
  {
    id: "sv1",
    name: "Property Management",
    blurb: "Full-service management for your rental: leasing, maintenance, and owner reporting.",
    cta: "Get a management quote",
  },
  {
    id: "sv2",
    name: "Private Lending",
    blurb: "Hard-money and investment financing through the Marshall Reddick fund.",
    cta: "Explore lending",
  },
];
