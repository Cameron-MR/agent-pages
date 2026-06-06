// Mock config for the Client Page Builder (/page-builder) and the public page
// it produces (/p/[slug]). Defines audiences, the module registry, render
// order, per-audience defaults, and localStorage persistence so the builder
// actually drives what the public page shows. Fabricated configuration only.

export type Audience = "Buyer" | "Seller" | "Landlord" | "Public";

export type ModuleId =
  | "hero"
  | "valuation"
  | "featured"
  | "about"
  | "recentSales"
  | "reviews"
  | "services"
  | "vendors"
  | "events"
  | "education"
  | "calculators"
  | "contact";

export interface BuilderModule {
  id: ModuleId;
  name: string;
  description: string;
  // Which audiences this module is on by default.
  defaultOn: Audience[];
}

export const AUDIENCES: Audience[] = ["Buyer", "Seller", "Landlord", "Public"];

// Registry in the order modules render on the public page.
export const BUILDER_MODULES: BuilderModule[] = [
  {
    id: "hero",
    name: "Welcome hero",
    description: "Agent photo, name, title, DRE, and tagline over a feature image.",
    defaultOn: ["Buyer", "Seller", "Landlord", "Public"],
  },
  {
    id: "valuation",
    name: "Home valuation",
    description: "What's my home worth lead capture.",
    defaultOn: ["Seller", "Public"],
  },
  {
    id: "featured",
    name: "Featured listings",
    description: "A curated set of current properties.",
    defaultOn: ["Buyer", "Public"],
  },
  {
    id: "about",
    name: "About the agent",
    description: "Personal bio, photo, and specialties.",
    defaultOn: ["Buyer", "Seller", "Landlord", "Public"],
  },
  {
    id: "recentSales",
    name: "Recently sold",
    description: "Track record gallery of closed sales.",
    defaultOn: ["Seller", "Public"],
  },
  {
    id: "reviews",
    name: "Reviews",
    description: "Multi-source aggregate badges and a unified review feed.",
    defaultOn: ["Buyer", "Seller", "Landlord", "Public"],
  },
  {
    id: "services",
    name: "Additional services",
    description: "Property management and private lending.",
    defaultOn: ["Landlord", "Public"],
  },
  {
    id: "vendors",
    name: "Preferred vendors",
    description: "Recommended lender, title, escrow, and insurance.",
    defaultOn: ["Buyer", "Seller", "Public"],
  },
  {
    id: "events",
    name: "Upcoming events",
    description: "Company events and webinars feed.",
    defaultOn: ["Buyer", "Seller", "Landlord", "Public"],
  },
  {
    id: "education",
    name: "Education",
    description: "Curated videos and articles from the agent.",
    defaultOn: ["Buyer", "Seller", "Landlord", "Public"],
  },
  {
    id: "calculators",
    name: "Calculators",
    description: "Client-facing affordability and net-sheet calculators.",
    defaultOn: ["Buyer", "Seller", "Public"],
  },
  {
    id: "contact",
    name: "Contact form",
    description: "Lead capture that routes into the CRM.",
    defaultOn: ["Buyer", "Seller", "Landlord", "Public"],
  },
];

export const MODULE_ORDER: ModuleId[] = BUILDER_MODULES.map((m) => m.id);

export const AUDIENCE_HEADLINES: Record<Audience, string> = {
  Buyer: "Find the right home, with an agent who knows the market.",
  Seller: "Sell for more, with a marketing plan that actually works.",
  Landlord: "Own without the headaches. Full-service property management.",
  Public: "Your trusted guide to Orange County real estate.",
};

// Per-audience enabled module sets. Shared by the builder (which edits them)
// and the public page (which renders from them).
export type PageConfig = Record<Audience, ModuleId[]>;

const STORAGE_KEY = "mr-client-page-config";

export function defaultConfig(): PageConfig {
  const cfg = {} as PageConfig;
  AUDIENCES.forEach((aud) => {
    cfg[aud] = BUILDER_MODULES.filter((m) => m.defaultOn.includes(aud)).map(
      (m) => m.id
    );
  });
  return cfg;
}

// Keep an enabled list valid and in render order.
function repair(ids: ModuleId[]): ModuleId[] {
  const known = new Set(MODULE_ORDER);
  return MODULE_ORDER.filter((id) => ids.includes(id) && known.has(id));
}

export function loadConfig(): PageConfig {
  const base = defaultConfig();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw) as Partial<PageConfig>;
    AUDIENCES.forEach((aud) => {
      if (Array.isArray(parsed[aud])) {
        base[aud] = repair(parsed[aud] as ModuleId[]);
      }
    });
    return base;
  } catch {
    return base;
  }
}

export function saveConfig(cfg: PageConfig) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  } catch {
    // ignore
  }
}
