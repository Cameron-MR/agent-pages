// Editable content for the public client page modules (education + preferred
// vendors). The agent curates these in the page builder; the public page renders
// them. Persisted to localStorage. Defaults to the fabricated sample content.

import {
  EDUCATION_ITEMS,
  PREFERRED_VENDORS,
  type EducationItem,
  type PreferredVendor,
} from "@/lib/mock/publicPage";

export interface PageContent {
  education: EducationItem[];
  vendors: PreferredVendor[];
}

const STORAGE_KEY = "mr-page-content";

export function defaultContent(): PageContent {
  return {
    education: EDUCATION_ITEMS.map((e) => ({ ...e })),
    vendors: PREFERRED_VENDORS.map((v) => ({ ...v })),
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
