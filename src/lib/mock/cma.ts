// Data + helpers for the CMA builder (/cma), the live client CMA page
// (/cma/[slug]), and the branded CMA report.
//
// Subject and comparable properties are meant to come from the MLS by listing
// ID. The MLS API is not connected yet, so lookupCma() returns fabricated
// sample data. When the API is ready, replace the body of lookupCma(); the rest
// of the app consumes the CmaRecord shape unchanged.

import { propertyPhoto } from "@/lib/mock/images";

export type CompStatus =
  | "Coming Soon"
  | "Active"
  | "Pending"
  | "Sold"
  | "Expired";

export interface CmaRecord {
  id: string;
  mlsId: string;
  address: string;
  city: string;
  beds: number;
  baths: number;
  sqft: number;
  year: number;
  lotSqft: number;
  status: CompStatus;
  listPrice: number;
  // Null until/unless closed.
  soldPrice: number | null;
  dom: number; // days on market
  photo: string;
  lat: number;
  lng: number;
}

export interface Cma {
  client: string;
  subject: CmaRecord;
  comps: CmaRecord[];
}

// The effective price used in analysis: sold price when closed, else list.
export function effectivePrice(r: CmaRecord): number {
  return r.soldPrice ?? r.listPrice;
}

export function pricePerSqft(r: CmaRecord): number {
  return r.sqft > 0 ? effectivePrice(r) / r.sqft : 0;
}

const STATUSES: CompStatus[] = [
  "Coming Soon",
  "Active",
  "Pending",
  "Sold",
  "Sold",
  "Sold",
  "Expired",
];

// Small fabricated MLS keyed by listing ID. Orange County residential.
const CMA_DB: Record<string, CmaRecord> = {
  OC2001: rec("OC2001", "24 Edgewater", "Irvine, CA 92614", 4, 3, 2452, 1986, 5000, "Active", 1875000, null, 12, 0, 33.68, -117.81),
  OC2002: rec("OC2002", "7 Daybreak", "Irvine, CA 92614", 4, 3, 2547, 1979, 5150, "Sold", 2200000, 2200000, 7, 0, 33.69, -117.82),
  OC2003: rec("OC2003", "31 Woodleaf", "Irvine, CA 92614", 4, 3, 2380, 1984, 4800, "Sold", 1799000, 1798888, 9, 0, 33.67, -117.8),
  OC2004: rec("OC2004", "16 Canopy", "Irvine, CA 92614", 5, 3, 2680, 1981, 5400, "Pending", 2149900, null, 6, 0, 33.7, -117.83),
  OC2005: rec("OC2005", "9 Stillwater", "Irvine, CA 92614", 3, 2, 2110, 1985, 4500, "Sold", 1586000, 1586000, 24, 0, 33.66, -117.79),
  OC2006: rec("OC2006", "42 Sunlight", "Irvine, CA 92614", 4, 3, 2300, 1983, 4900, "Active", 1450000, null, 37, 0, 33.71, -117.84),
  OC2007: rec("OC2007", "3 Morningside", "Irvine, CA 92614", 4, 2, 2050, 1980, 4600, "Coming Soon", 1599000, null, 0, 0, 33.65, -117.78),
  OC2008: rec("OC2008", "55 Larkspur", "Irvine, CA 92614", 3, 2, 1980, 1982, 4400, "Sold", 1360000, 1360000, 31, 0, 33.64, -117.77),
};

function rec(
  mlsId: string,
  address: string,
  city: string,
  beds: number,
  baths: number,
  sqft: number,
  year: number,
  lotSqft: number,
  status: CompStatus,
  listPrice: number,
  soldPrice: number | null,
  dom: number,
  photoIdx: number,
  lat: number,
  lng: number
): CmaRecord {
  return {
    id: mlsId,
    mlsId,
    address,
    city,
    beds,
    baths,
    sqft,
    year,
    lotSqft,
    status,
    listPrice,
    soldPrice,
    dom,
    photo: propertyPhoto(photoIdx, 1000),
    lat,
    lng,
  };
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

const STREETS = ["Edgewater", "Daybreak", "Woodleaf", "Canopy", "Stillwater", "Sunlight", "Morningside", "Larkspur"];

// Look up a property/comp by MLS listing ID. Empty input returns null.
// TODO: replace with the live MLS API. Keep the CmaRecord shape.
export function lookupCma(rawId: string): CmaRecord | null {
  const id = rawId.trim().toUpperCase();
  if (!id) return null;
  if (CMA_DB[id]) return { ...CMA_DB[id], id, mlsId: id };

  const h = hash(id);
  const status = STATUSES[h % STATUSES.length];
  const sqft = 1900 + (h % 20) * 45;
  const listPrice = 1300000 + (h % 24) * 45000;
  const closed = status === "Sold" || status === "Expired";
  const soldPrice = status === "Sold" ? listPrice - (h % 5) * 9000 : null;
  return {
    id,
    mlsId: id,
    address: `${100 + (h % 80)} ${STREETS[h % STREETS.length]}`,
    city: "Irvine, CA 92614",
    beds: 3 + (h % 3),
    baths: 2 + (h % 2),
    sqft,
    year: 1978 + (h % 12),
    lotSqft: 4400 + (h % 12) * 80,
    status,
    listPrice,
    soldPrice,
    dom: closed ? 5 + (h % 40) : h % 45,
    photo: propertyPhoto(h % 12, 1000),
    lat: 33.64 + ((h % 80) / 1000),
    lng: -117.78 - (((h >> 4) % 70) / 1000),
  };
}

export const SAMPLE_CMA_IDS = Object.keys(CMA_DB);

export const DEFAULT_CMA: Cma = {
  client: "Bradford Chamberlin",
  subject: { ...CMA_DB.OC2001 },
  comps: ["OC2002", "OC2004", "OC2005", "OC2003", "OC2006", "OC2007", "OC2008"].map(
    (id) => ({ ...CMA_DB[id] })
  ),
};

// ---- analysis -------------------------------------------------------------

export interface StatusSummary {
  status: CompStatus;
  total: number;
  avgPrice: number;
  avgPpsf: number;
  median: number;
  low: number;
  high: number;
  avgDom: number;
}

const STATUS_ORDER: CompStatus[] = [
  "Coming Soon",
  "Active",
  "Pending",
  "Sold",
  "Expired",
];

function median(nums: number[]): number {
  if (nums.length === 0) return 0;
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

export function summaryByStatus(comps: CmaRecord[]): StatusSummary[] {
  return STATUS_ORDER.map((status) => {
    const group = comps.filter((c) => c.status === status);
    const prices = group.map(effectivePrice);
    const ppsf = group.map(pricePerSqft);
    return {
      status,
      total: group.length,
      avgPrice: prices.length ? prices.reduce((a, b) => a + b, 0) / prices.length : 0,
      avgPpsf: ppsf.length ? ppsf.reduce((a, b) => a + b, 0) / ppsf.length : 0,
      median: median(prices),
      low: prices.length ? Math.min(...prices) : 0,
      high: prices.length ? Math.max(...prices) : 0,
      avgDom: group.length
        ? Math.round(group.reduce((a, b) => a + b.dom, 0) / group.length)
        : 0,
    };
  }).filter((s) => s.total > 0);
}

export interface SuggestedRange {
  low: number;
  mid: number;
  high: number;
  avgPpsf: number;
  basis: number; // number of comps used
}

// Suggested value from the price-per-sqft of the comps applied to the subject.
export function suggestedRange(
  comps: CmaRecord[],
  subjectSqft: number
): SuggestedRange {
  const used = comps.filter((c) => c.status === "Sold" || c.status === "Pending");
  const pool = used.length ? used : comps;
  const ppsf = pool.map(pricePerSqft).filter((n) => n > 0);
  if (ppsf.length === 0 || subjectSqft <= 0) {
    return { low: 0, mid: 0, high: 0, avgPpsf: 0, basis: 0 };
  }
  const avg = ppsf.reduce((a, b) => a + b, 0) / ppsf.length;
  const lo = Math.min(...ppsf);
  const hi = Math.max(...ppsf);
  const round = (n: number) => Math.round(n / 5000) * 5000;
  return {
    low: round(lo * subjectSqft),
    mid: round(avg * subjectSqft),
    high: round(hi * subjectSqft),
    avgPpsf: avg,
    basis: pool.length,
  };
}

export const money = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

const STORAGE_KEY = "mr-cma-draft";

export function loadCma(): Cma {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CMA;
    const parsed = JSON.parse(raw) as Cma;
    if (!parsed || !parsed.subject || !Array.isArray(parsed.comps)) {
      return DEFAULT_CMA;
    }
    return parsed;
  } catch {
    return DEFAULT_CMA;
  }
}

export function saveCma(cma: Cma) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cma));
  } catch {
    // ignore
  }
}

// ---------------------------------------------------------------------------
// Saved analyses: agents keep multiple named CMAs (one per client/home) and
// switch between them. The active draft is what the live page renders.
// ---------------------------------------------------------------------------

export interface SavedCma {
  id: string;
  name: string;
  savedAt: string;
  cma: Cma;
}

const SAVED_KEY = "mr-cmas";

export function loadSavedCmas(): SavedCma[] {
  try {
    const raw = window.localStorage.getItem(SAVED_KEY);
    const parsed = raw ? (JSON.parse(raw) as SavedCma[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCmaAs(name: string, cma: Cma): SavedCma[] {
  const list = loadSavedCmas().filter((c) => c.name !== name);
  const next = [
    {
      id: "c" + Date.now(),
      name,
      savedAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      }),
      cma,
    },
    ...list,
  ];
  try {
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
  return next;
}

export function deleteSavedCma(id: string): SavedCma[] {
  const next = loadSavedCmas().filter((c) => c.id !== id);
  try {
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
  return next;
}
