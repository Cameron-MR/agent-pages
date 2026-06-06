// Mock data + helpers for the Property Tour Builder (/tour-builder) and the
// client-facing tour page (/tour/[slug]).
//
// Property details are meant to come from the MLS by listing ID. The MLS API is
// not connected yet, so lookupMls() returns fabricated sample data. When the
// real API is available, replace the body of lookupMls() with the live call;
// the rest of the app already consumes this shape.

import { propertyPhoto } from "@/lib/mock/images";

export interface MlsRecord {
  address: string;
  city: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  type: string;
  photo: string;
  lat: number;
  lng: number;
}

export interface TourStop extends MlsRecord {
  // Local id for list management.
  id: string;
  // The MLS listing ID this stop was pulled from.
  mlsId: string;
  showingTime: string;
  notes: string;
}

export interface Tour {
  headline: string;
  client: string;
  city: string;
  coverPhoto: string;
  stops: TourStop[];
}

// A small fabricated "MLS" keyed by listing ID. Orange County residential.
const MLS_DB: Record<string, MlsRecord> = {
  OC1001: {
    address: "18 Sea Pine",
    city: "Newport Beach, CA",
    price: "$3,495,000",
    beds: 4,
    baths: 5,
    sqft: "3,850",
    type: "Single Family",
    photo: propertyPhoto(0, 1000),
    lat: 33.61,
    lng: -117.9,
  },
  OC1002: {
    address: "221 Bayview Ter",
    city: "Costa Mesa, CA",
    price: "$1,150,000",
    beds: 3,
    baths: 2,
    sqft: "1,920",
    type: "Single Family",
    photo: propertyPhoto(1, 1000),
    lat: 33.66,
    lng: -117.92,
  },
  OC1003: {
    address: "44 Ridgeline",
    city: "Mission Viejo, CA",
    price: "$865,000",
    beds: 4,
    baths: 3,
    sqft: "2,240",
    type: "Single Family",
    photo: propertyPhoto(2, 1000),
    lat: 33.6,
    lng: -117.67,
  },
  OC1004: {
    address: "7 Canyon Vista",
    city: "Laguna Niguel, CA",
    price: "$1,540,000",
    beds: 5,
    baths: 4,
    sqft: "3,100",
    type: "Single Family",
    photo: propertyPhoto(3, 1000),
    lat: 33.53,
    lng: -117.7,
  },
  OC1005: {
    address: "530 Kings Rd",
    city: "Newport Beach, CA",
    price: "$7,200,000",
    beds: 5,
    baths: 7,
    sqft: "6,436",
    type: "Single Family",
    photo: propertyPhoto(5, 1000),
    lat: 33.62,
    lng: -117.93,
  },
  OC1006: {
    address: "12 Harbor Cove",
    city: "Huntington Beach, CA",
    price: "$1,295,000",
    beds: 3,
    baths: 3,
    sqft: "2,050",
    type: "Single Family",
    photo: propertyPhoto(4, 1000),
    lat: 33.66,
    lng: -118.0,
  },
};

const SAMPLE_STREETS = [
  "Coast Vista Dr",
  "Marigold Ave",
  "Cliff Haven Way",
  "Eastbluff Dr",
  "Tustin Ave",
  "Vista Roma",
];
const SAMPLE_CITIES = [
  "Newport Beach, CA",
  "Irvine, CA",
  "Tustin, CA",
  "Costa Mesa, CA",
  "Orange, CA",
];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

// Look up a property by MLS listing ID. Returns null for empty input.
// TODO: replace with the live MLS API call. Keep the returned shape (MlsRecord).
export function lookupMls(rawId: string): MlsRecord | null {
  const id = rawId.trim().toUpperCase();
  if (!id) return null;
  if (MLS_DB[id]) return MLS_DB[id];

  // Unknown ID: deterministically fabricate a plausible record so the demo
  // works for any ID the agent types.
  const h = hash(id);
  const num = 100 + (h % 8900);
  const street = SAMPLE_STREETS[h % SAMPLE_STREETS.length];
  const city = SAMPLE_CITIES[(h >> 3) % SAMPLE_CITIES.length];
  const price = 650000 + (h % 26) * 75000;
  const beds = 3 + (h % 3);
  const baths = 2 + (h % 3);
  const sqft = 1600 + (h % 24) * 90;
  return {
    address: `${num} ${street}`,
    city,
    price: `$${price.toLocaleString()}`,
    beds,
    baths,
    sqft: sqft.toLocaleString(),
    type: "Single Family",
    photo: propertyPhoto(h % 12, 1000),
    lat: 33.55 + ((h % 100) / 1000),
    lng: -117.95 + (((h >> 4) % 100) / 1000),
  };
}

// Suggested IDs surfaced in the builder so the demo is one click to try.
export const SAMPLE_MLS_IDS = Object.keys(MLS_DB);

export const DEFAULT_TOUR: Tour = {
  headline: "Your Newport Beach home tour",
  client: "The Sample Family",
  city: "Orange County, CA",
  coverPhoto: propertyPhoto(0, 1400),
  stops: ["OC1002", "OC1003", "OC1004", "OC1001"].map((mlsId, i) => {
    const rec = MLS_DB[mlsId];
    return {
      ...rec,
      id: `s${i + 1}`,
      mlsId,
      showingTime: ["10:00 AM", "11:00 AM", "12:30 PM", "2:00 PM"][i] ?? "",
      notes: "",
    };
  }),
};

const STORAGE_KEY = "mr-tour-draft";

export function loadTour(): Tour {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_TOUR;
    const parsed = JSON.parse(raw) as Tour;
    if (!parsed || !Array.isArray(parsed.stops)) return DEFAULT_TOUR;
    return parsed;
  } catch {
    return DEFAULT_TOUR;
  }
}

export function saveTour(tour: Tour) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tour));
  } catch {
    // ignore
  }
}

// ---------------------------------------------------------------------------
// Deep links. These use real, keyless endpoints so the demo works without API
// keys. For production, a Google Maps Embed API key gives a richer map.
// ---------------------------------------------------------------------------

function fullAddress(s: { address: string; city: string }): string {
  return `${s.address}, ${s.city}`;
}

// Real Zillow address search page for a property.
export function zillowUrl(s: { address: string; city: string }): string {
  const slug = `${s.address} ${s.city}`
    .replace(/,/g, "")
    .trim()
    .replace(/\s+/g, "-");
  return `https://www.zillow.com/homes/${encodeURIComponent(slug)}_rb/`;
}

// Apple Maps navigation to the property (opens Maps on Apple devices).
export function appleMapsUrl(s: { address: string; city: string }): string {
  return `https://maps.apple.com/?daddr=${encodeURIComponent(fullAddress(s))}&dirflg=d`;
}

// A keyless Google Maps embed. With multiple stops it draws the driving route
// through every stop; with one stop it centers on it.
export function googleMapsEmbed(stops: { address: string; city: string }[]): string {
  if (stops.length === 0) {
    return "https://maps.google.com/maps?q=Orange%20County%20CA&z=10&output=embed";
  }
  if (stops.length === 1) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(fullAddress(stops[0]))}&z=13&output=embed`;
  }
  const saddr = encodeURIComponent(fullAddress(stops[0]));
  const daddr = stops
    .slice(1)
    .map((s, i) => (i === 0 ? "" : "+to:") + encodeURIComponent(fullAddress(s)))
    .join("");
  return `https://maps.google.com/maps?saddr=${saddr}&daddr=${daddr}&output=embed`;
}
