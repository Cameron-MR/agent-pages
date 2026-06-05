// Mock data for the Listings page (/listings).
// Fabricated Orange County listings with stand-in photos. Not real listings.

import { propertyPhoto, INTERIOR_PHOTO_IDS, unsplash } from "@/lib/mock/images";

export type ListingStatus =
  | "Active"
  | "Coming Soon"
  | "Pending"
  | "Sold";

export interface Listing {
  id: string;
  address: string;
  city: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  status: ListingStatus;
  daysOnMarket: number;
  views: number;
  saves: number;
  showings: number;
  photo: string;
  gallery: string[];
  blurb: string;
}

const gallery = (start: number): string[] => [
  propertyPhoto(start, 800),
  propertyPhoto(start + 1, 800),
  unsplash(INTERIOR_PHOTO_IDS[start % INTERIOR_PHOTO_IDS.length], 800),
  unsplash(INTERIOR_PHOTO_IDS[(start + 1) % INTERIOR_PHOTO_IDS.length], 800),
];

export const LISTINGS: Listing[] = [
  {
    id: "L1",
    address: "18 Sea Pine",
    city: "Newport Beach, CA",
    price: "$3,495,000",
    beds: 4,
    baths: 5,
    sqft: "3,850",
    status: "Coming Soon",
    daysOnMarket: 0,
    views: 0,
    saves: 0,
    showings: 0,
    photo: propertyPhoto(0, 1200),
    gallery: gallery(0),
    blurb:
      "Coastal contemporary with white-water views, walls of glass, and an entertainer's backyard minutes from the harbor.",
  },
  {
    id: "L2",
    address: "221 Bayview Ter",
    city: "Costa Mesa, CA",
    price: "$1,150,000",
    beds: 3,
    baths: 2,
    sqft: "1,920",
    status: "Active",
    daysOnMarket: 9,
    views: 1840,
    saves: 96,
    showings: 14,
    photo: propertyPhoto(1, 1200),
    gallery: gallery(1),
    blurb:
      "Updated single-level with an open kitchen, large lot, and room to add an ADU.",
  },
  {
    id: "L3",
    address: "44 Ridgeline",
    city: "Mission Viejo, CA",
    price: "$865,000",
    beds: 4,
    baths: 3,
    sqft: "2,240",
    status: "Active",
    daysOnMarket: 21,
    views: 2410,
    saves: 132,
    showings: 22,
    photo: propertyPhoto(2, 1200),
    gallery: gallery(2),
    blurb:
      "Turnkey two-story in a top school district with a private yard and three-car garage.",
  },
  {
    id: "L4",
    address: "7 Canyon Vista",
    city: "Laguna Niguel, CA",
    price: "$1,540,000",
    beds: 5,
    baths: 4,
    sqft: "3,100",
    status: "Pending",
    daysOnMarket: 12,
    views: 3120,
    saves: 211,
    showings: 31,
    photo: propertyPhoto(3, 1200),
    gallery: gallery(3),
    blurb:
      "Spacious view home with a remodeled chef's kitchen and resort-style backyard.",
  },
  {
    id: "L5",
    address: "12 Harbor Cove",
    city: "Huntington Beach, CA",
    price: "$1,295,000",
    beds: 3,
    baths: 3,
    sqft: "2,050",
    status: "Sold",
    daysOnMarket: 18,
    views: 4050,
    saves: 264,
    showings: 27,
    photo: propertyPhoto(4, 1200),
    gallery: gallery(4),
    blurb:
      "Sold over asking. Bright coastal home walkable to the beach and downtown.",
  },
  {
    id: "L6",
    address: "530 Kings Rd",
    city: "Newport Beach, CA",
    price: "$7,200,000",
    beds: 5,
    baths: 7,
    sqft: "6,436",
    status: "Active",
    daysOnMarket: 34,
    views: 5210,
    saves: 389,
    showings: 19,
    photo: propertyPhoto(5, 1200),
    gallery: gallery(5),
    blurb:
      "Architectural estate with panoramic bay views, elevator, and infinity pool.",
  },
];
