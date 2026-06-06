// Editable content for the public client page modules (education, preferred
// vendors, and company events). The agent curates these in the page builder;
// the public page renders them. Persisted to localStorage. Defaults to the
// fabricated sample content.

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
}

const STORAGE_KEY = "mr-page-content";

export function defaultContent(): PageContent {
  return {
    education: EDUCATION_ITEMS.map((e) => ({ ...e })),
    vendors: PREFERRED_VENDORS.map((v) => ({ ...v })),
    events: COMPANY_EVENTS.map((e) => ({ ...e })),
  };
}

export function loadContent(): PageContent {
  const base = defaultContent();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw) as Partial<PageContent>;
    return {
      education: Array.isArray(parsed.education) ? parsed.education : base.education,
      vendors: Array.isArray(parsed.vendors) ? parsed.vendors : base.vendors,
      events: Array.isArray(parsed.events) ? parsed.events : base.events,
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
