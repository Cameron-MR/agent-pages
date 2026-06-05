// Mock data for the public client-facing page (/p/[slug]).
// Fabricated agent profile, listings, and testimonials. Not real.

export interface PublicListing {
  id: string;
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  status: string;
  // Tailwind gradient classes used as a stand-in for a photo so the build
  // never depends on a remote image.
  swatch: string;
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
  headline: "Your trusted guide to Orange County real estate.",
  bio: "Jordan helps buyers and sellers across Orange County move with confidence. Backed by the Marshall Reddick platform, every client gets sharp pricing, full-service marketing, and a smooth path to close. This is fabricated sample content for a reference design.",
  stats: [
    { value: "120+", label: "Families helped" },
    { value: "4.9", label: "Average rating" },
    { value: "14", label: "Days on market avg" },
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
    swatch: "from-mr-base to-mr-dark",
  },
  {
    id: "l2",
    address: "221 Bayview Ter, Costa Mesa",
    price: "$1,150,000",
    beds: 3,
    baths: 2,
    sqft: "1,920",
    status: "Active",
    swatch: "from-mr-light to-mr-base",
  },
  {
    id: "l3",
    address: "44 Ridgeline, Mission Viejo",
    price: "$865,000",
    beds: 4,
    baths: 3,
    sqft: "2,240",
    status: "Active",
    swatch: "from-mr-mid to-mr-dark",
  },
  {
    id: "l4",
    address: "7 Canyon Vista, Laguna Niguel",
    price: "$1,540,000",
    beds: 5,
    baths: 4,
    sqft: "3,100",
    status: "Pending",
    swatch: "from-mr-pale to-mr-light",
  },
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
