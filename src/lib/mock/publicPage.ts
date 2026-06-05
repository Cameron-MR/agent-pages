// Mock data for the public client-facing page (/p/[slug]).
// Fabricated agent profile, listings, sales, and testimonials. Not real.

import { propertyPhoto, headshot } from "@/lib/mock/images";

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
  title: "Real Estate Agent",
  brokerage: "Marshall Reddick Real Estate",
  market: "Orange County, CA",
  phone: "(949) 555-0142",
  email: "jordan.sample@example.com",
  license: "DRE# 02000000",
  photo: headshot(0, 400),
  headline: "Your trusted guide to Orange County real estate.",
  bio: "Jordan helps buyers and sellers across Orange County move with confidence. Backed by the Marshall Reddick platform, every client gets sharp pricing, full-service marketing, and a smooth path to close. This is fabricated sample content for a reference design.",
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
