// Editable content for the public client page modules (education, preferred
// vendors, company events, and lifestyle photos). Events and education
// auto-sync from company feeds (mock CRM / education library, marked TODO in
// publicPage.ts); the agent layers personal additions and edits in the page
// builder. Persisted to localStorage.

import { propertyPhoto } from "@/lib/mock/images";
import {
  EDUCATION_ITEMS,
  PREFERRED_VENDORS,
  COMPANY_EVENTS,
  type EducationItem,
  type PreferredVendor,
  type CompanyEvent,
} from "@/lib/mock/publicPage";

export interface PageContent {
  education: EducationItem[];
  vendors: PreferredVendor[];
  events: CompanyEvent[];
  // Lifestyle / about photos shown in the public-page carousel.
  photos: string[];
}

const STORAGE_KEY = "mr-page-content";

// Default carousel photos (the agent can add/remove in the builder).
export const DEFAULT_PHOTOS: string[] = [
  propertyPhoto(9, 900),
  propertyPhoto(10, 900),
  propertyPhoto(11, 900),
];

// A small library of approved photos the agent can add with one click.
export const PHOTO_LIBRARY: string[] = Array.from({ length: 12 }, (_, i) =>
  propertyPhoto(i, 900)
);

export function defaultContent(): PageContent {
  return {
    education: EDUCATION_ITEMS.map((e) => ({ ...e })),
    vendors: PREFERRED_VENDORS.map((v) => ({ ...v })),
    events: COMPANY_EVENTS.map((e) => ({ ...e })),
    photos: [...DEFAULT_PHOTOS],
  };
}

// Merge saved content with the auto-synced feeds: CRM events and Library
// education always reflect the current feed (so new company events appear
// automatically); agent-added items ("Mine") and vendor edits persist.
export function loadContent(): PageContent {
  const base = defaultContent();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw) as Partial<PageContent>;

    const savedEvents = Array.isArray(parsed.events) ? parsed.events : [];
    const myEvents = savedEvents.filter((e) => e.source === "Mine");
    const events = [...base.events, ...myEvents];

    const savedEd = Array.isArray(parsed.education) ? parsed.education : [];
    const myEd = savedEd.filter((e) => e.source === "Mine");
    // Preserve pin state on synced items.
    const education = [
      ...base.education.map((e) => {
        const saved = savedEd.find((s) => s.id === e.id);
        return saved ? { ...e, pinned: saved.pinned } : e;
      }),
      ...myEd,
    ];

    // Vendors: saved edits win when the shape is current (has url).
    const savedVendors = Array.isArray(parsed.vendors) ? parsed.vendors : [];
    const vendors =
      savedVendors.length && savedVendors.every((v) => "url" in v)
        ? savedVendors
        : base.vendors;

    return {
      education,
      vendors,
      events,
      photos: Array.isArray(parsed.photos) ? parsed.photos : base.photos,
    };
  } catch {
    return base;
  }
}

export function saveContent(content: PageContent) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch {
    // ignore
  }
}

// Education items with pinned content first (public-page display order).
export function orderedEducation(items: EducationItem[]): EducationItem[] {
  return [...items].sort((a, b) => Number(b.pinned ?? false) - Number(a.pinned ?? false));
}
