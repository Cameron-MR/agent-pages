# Agent Pages — Project Guide (living document)

Programmer-facing guide to what every part of this app is for and how it works.
This is the source of truth for objectives and architecture. **Keep it updated
every time we add or change a feature** (add a row to the Changelog and update
the relevant section).

Audience: the Marshall Reddick software team. Scope: Marshall Reddick only. All
data and logic are fabricated mocks; nothing persists to a server and no live
integrations exist yet (see "Wire later").

---

## 1. Objective

Agent Pages is a reference UI/UX backbone for two connected surfaces:

1. **Agent command center** (Surface 1): the cockpit an agent works in, with
   resources, listings, pipeline, marketing, production, and tools.
2. **Client-facing page + builder** (Surface 2): the public page an agent
   customizes per audience and shares, plus shareable client deliverables
   (property tours, CMAs, branded PDFs).

It is built to look real and trend-forward so the software team can clone and
reuse it. Faked logic is expected; the value is the UI/UX and the data shapes.

---

## 2. Stack & conventions

- **Next.js 14 (App Router) + TypeScript + Tailwind CSS.** Each route is a
  `page.tsx` under `src/app/`. Components in `src/components/`. Mock data in
  `src/lib/mock/`.
- **Brand tokens** in `tailwind.config.ts`: `mr.base #316878`, `mr.dark
  #1C3C45`, `mr.light #50AAC4`, `mr.mid #3A7B8E`, `mr.pale #8BB8C4`; body
  `#555` on `#FCFCFC`. Headings Raleway, body Open Sans. Aesthetic: Apple
  Liquid Glass over teal.
- **Rules:** no em dashes, no emojis, fabricated sample content only.
- **Persistence:** client state is saved to `localStorage` (no backend). All
  keys are listed in section 5.
- **Images:** `src/components/Photo.tsx` renders remote images (Unsplash) with a
  teal-gradient fallback so a dead URL never breaks layout. Image helpers in
  `src/lib/mock/images.ts`.

---

## 3. App-wide architecture

- **`src/app/layout.tsx`** wraps everything in `Providers`.
- **`src/components/Providers.tsx`** (client) mounts:
  - `AgentProfileProvider` — the editable agent profile (identity + public-page
    content), the single source of truth for personalization.
  - `NavPrefsProvider` — the agent's top-bar order and how many items show
    before the More menu.
  - `CommandPalette` — global Cmd/Ctrl+K quick-jump.
- **`src/components/MainNav.tsx`** — shared sticky nav used by the home page and
  by `PageShell`. Renders primary items + a More dropdown (driven by
  NavPrefs), a search trigger, a notifications bell, the agent chip (links to
  Settings), and a mobile menu.
- **`src/components/PageShell.tsx`** — chrome for every agent-side subpage:
  MainNav, ambient washes, an optional page header, footer, and a shared
  "stub modal" via `pageShellContext`.
- **Personalization flow:** edit profile in `/settings` →
  `AgentProfileProvider` (localStorage) → consumed by the nav chip, dashboard
  hero, the public client page, branded PDFs, marketing assets, tour/CMA agent
  cards. One edit shows identically on desktop and mobile (one responsive
  codebase).

---

## 4. Routes (objective + key behavior)

### Agent command center
- **`/` Dashboard** — daily cockpit. Hero identity + stats; a "Customize
  dashboard" panel (`DashboardCustomizer`) lets the agent show/hide and reorder
  sections (persisted). Sections: Today, Market pulse, Pipeline snapshot, Quick
  launch, hub grid, Announcements.
- **`/pipeline`** — client pipeline board (Request → Sent → Completed →
  Questionnaire → Follow-up). Move cards between stages, filter by side, search,
  detail drawer, Add Client. (Not "PMA"; PMA = Property Management Agreement.)
- **`/listings`** — agent inventory: photo cards, status filters, performance
  stats, detail drawer linking to the per-property site.
- **`/listings/[id]`** — public per-property website: gallery, features, faux
  map, inquiry form.
- **`/marketing`** — Marketing Studio. Pick a listing + campaign; live branded
  social graphics (feed + story), caption, printable flyer, email templates,
  and the MR-standard email signature. CTAs to the Tour Builder and the Shop.
- **`/tour-builder`** — Property Tour Builder. Add homes by MLS ID (mock
  lookup), set showing times/notes, reorder; generate the client tour.
- **`/shop`** — Marketing Shop. Order print/signage/apparel/promo; cart,
  checkout (ship to home/office), saved cards (masked, demo), compliance
  auto-applied, order history.
- **`/open-house`** — Open House toolkit: pick a listing, launch a
  full-screen visitor sign-in kiosk (hand the agent's iPad to visitors);
  captured leads list per property with text/email follow-up and CSV export.
- **`/presentation`** — Listing Presentation builder: pick a listing and a
  "prepared for" name; the branded document renders on screen (cover, agent,
  MR advantage, marketing plan, pricing strategy, steps) and prints as-is
  (its `#print-area` is visible, unlike the hidden print sheets).
- **`/production`** — performance: President's/Chairman's Club meter, goal
  rings, monthly volume chart, commission ledger, office leaderboard.
- **`/calculators`** — seller net sheet, funds to close, buyer affordability,
  commission split; each prints a branded PDF (`BrandedPrintSheet`).
- **`/cma`** — CMA Builder. Set a subject + comps by MLS ID; live suggested
  range and market summary; preview the client report or print the branded
  report (`CmaPrint`).
- **`/resources`** — searchable scripts/checklists/guides/templates library.
- **`/directory`** — contacts by role with call/email.
- **`/training`** — course catalog with progress.
- **`/page-builder`** — Client Page Builder. Per-audience module toggles
  (persisted) that drive the public page, a live phone preview, and a content
  editor for Education and Preferred Vendors.
- **`/settings`** — edit the agent profile (identity, office phone/address,
  photo) and public-page content (headline, tagline, bio, specialties, About
  photo), plus the Top bar customizer.

### Client-facing / shareable
- **`/p/[slug]`** — the public client page. Renders the modules the agent
  enabled for the Public audience in the page builder, in order: hero (with
  tagline + DRE), home valuation, featured listings, About + lifestyle
  carousel, recently sold, multi-source reviews, additional services, preferred
  vendors, upcoming events, education, contact.
- **`/tour/[slug]`** — client tour page: hero + stats, Google Maps route, swipe
  Compare cards, All homes list, agent card; each home links to Zillow and
  Apple Maps. The "Text this tour to a client" share button is agent-only:
  the builder opens the page with `?view=agent` to reveal it, and the bare
  client link never shows it.
- **`/cma/[slug]`** — client CMA page: subject hero with suggested price range,
  market summary, comparable cards (Zillow + Apple Maps), Google map of subject
  + comps, agent card, share link.

---

## 5. State & localStorage keys

| Key | Owner | Purpose |
| --- | --- | --- |
| `mr-agent-profile` | AgentProfileProvider | Agent identity + public-page content |
| `mr-nav-prefs` | NavPrefsProvider | Top-bar order + primary count |
| `mr-dashboard-config` | DashboardCustomizer | Dashboard section order/visibility |
| `mr-client-page-config` | pageBuilder | Per-audience enabled modules (builder → public page) |
| `mr-page-content` | pageContent | Curated education items + preferred vendors |
| `mr-shop-cards` | shop | Saved payment methods (masked last-4 only, demo) |
| `mr-tour-draft` | tour | The tour the builder produced (read by `/tour/[slug]`) |
| `mr-cma-draft` | cma | The CMA the builder produced (read by `/cma/[slug]`) |
| `mr-tours` | tour | Named saved tours (load/save-as/delete in the builder) |
| `mr-cmas` | cma | Named saved CMAs (load/save-as/delete in the builder) |
| `mr-resource-favs` | resources | Favorited resource IDs (Favorites filter) |
| `mr-notifs-read` | MainNav | "Mark all read" flag for the notifications bell |
| `mr-training-progress` | training | Completed-lesson counts per course |
| `mr-today-done` | TodayPanel | Checked-off Today task labels |
| `mr-openhouse-leads` | openHouse | Kiosk sign-in leads (per device, demo) |
| `mr-production-goals` | production | Custom goal targets for the rings |
| `mr-scheduled-posts` | MarketingStudio | Queued social posts (demo) |

Pattern: a `load*()` returns defaults when storage is empty/invalid and repairs
shape; a `save*()` writes JSON; builder pages write, client pages read on mount.

---

## 6. Mock data files (`src/lib/mock/`)

- `mockData.ts` — agent, nav items (`SUBNAV_ITEMS`, `PRIMARY_NAV_COUNT`), hub
  entries, dashboard stats, notifications, pipeline snapshot, marketing samples.
- `images.ts` — Unsplash photo IDs + helpers (`propertyPhoto`, `headshot`,
  `familyPhoto`, `unsplash`).
- `pipeline.ts`, `listings.ts`, `production.ts`, `resources.ts`, `directory.ts`,
  `training.ts` — per-page sample data.
- `pageBuilder.ts` — audiences, module registry + order, per-audience defaults,
  and the client-page config load/save.
- `pageContent.ts` — editable education + vendors store.
- `publicPage.ts` — public-page sample arrays + types (listings, recent sales,
  reviews, events, education, vendors, services, review sources).
- `marketing.ts` — campaigns, caption builder, email templates, signature data.
- `shop.ts` — product catalog, compliance items, saved cards, sample orders.
- `tour.ts` — tour types, **`lookupMls(id)` (mock MLS, TODO real API)**, default
  tour, load/save, and deep-link helpers (`zillowUrl`, `appleMapsUrl`,
  `googleMapsEmbed`).
- `cma.ts` — CMA types, **`lookupCma(id)` (mock MLS, TODO real API)**, default
  CMA, analysis helpers (`summaryByStatus`, `suggestedRange`, `pricePerSqft`,
  `effectivePrice`), load/save.

---

## 7. Branded print system

- Print CSS lives in `globals.css`: the element with `id="print-area"` (class
  `print-sheet`, hidden on screen) becomes the only visible content when
  printing, with `print-color-adjust: exact` so teal bands render, and
  `@page` margins set.
- `BrandedPrintSheet` (calculators) and `cma/CmaPrint` (CMA) and
  `marketing/FlyerPrint` (flyer) share one visual template: teal header band
  with white logo, agent block, bold result/summary, clean tables, Equal
  Housing footer. Only one print-area is mounted per page.

---

## 8. Wire later (built to plug in, not yet connected)

- **MLS API.** `lookupMls()` (tour) and `lookupCma()` (cma) return fabricated
  records by listing ID. Replace their bodies with the live MLS call; keep the
  returned shapes (`MlsRecord` / `CmaRecord`). Everything downstream is ready.
- **Maps.** Tour and CMA pages use a keyless Google Maps embed. A Maps Embed
  API key would give a richer map; the embed URL builder is `googleMapsEmbed`.
- **CRM / lead hub.** Every CTA/form currently shows a mock success. The planned
  step is a single `createLead({agentId, source, module, contact, payload})`
  adapter that writes to one central hub (CRM tool-agnostic). Not built yet by
  request.
- **Payments.** Shop checkout and saved cards are mock; no real processing.
- **Reviews.** `REVIEW_SOURCES` is source-agnostic; real ingestion (Zillow,
  Realtor.com, Redfin, Yelp, Google, aggregator) plugs into the same shape.

---

## 9. Changelog

Newest first. Add an entry each working session.

- **Content control, real partners, BuyAbility, playbooks, guided courses.**
  - Page builder gained a Photos manager: add lifestyle carousel photos from
    an approved library or by URL, remove with one click; the public About
    carousel renders them (`PageContent.photos`).
  - Preferred vendors are the real MR partners (Reed Hazard / CMG Home
    Loans, Andrew Walsh / WFG National Title, Rubi Lopez / WFG National
    Escrow, Steve Page / Snug Harbor Insurance) with phone, email, and
    Visit website links; fully editable in the builder.
  - Events auto-sync from a mock CRM feed and education from the agent's
    library (both marked TODO for live integration); agent-added items
    ("Mine") layer on top and persist. Events link out to details;
    education links to the full video/article.
  - New `BuyAbility` calculator (Zillow BuyAbility style): location, credit
    tier, income, down payment, monthly debt → target price with gauge,
    target payment, lender ceiling, and loan details. Lives in /calculators
    ("Can I buy a home?") and on the public page, where it ends in a
    pre-qualification CTA to the agent's preferred lender.
  - Resources "Playbooks": 8 real MR checklists/guides (buyer's agent,
    buyer, open house, listing agent, qualifying a buyer, seller,
    submitting an offer, price reduction) as live branded documents at
    `/resources/[docId]` with persistent interactive checkboxes, progress,
    and a print-to-PDF sheet (`resourceDocs.ts`).
  - Training reorganized into categories (New Agent, Sales, Listing,
    Leasing, Marketing, CRM, How To) and gained two guided interactive
    courses at `/training/[courseId]` (`courses.ts`): the Webinar Speaker
    Playbook and the Reddick Property Rating property classes course
    (from the MR ebook), with module sidebar, checkpoint quizzes with
    instant feedback, a live property class classifier widget, takeaways,
    per-device progress (`mr-course-*`), and a completion screen.
- **Mobile tab bar + post scheduling.**
  - App-style bottom tab bar on phones (`MobileTabBar.tsx`, mounted in
    Providers): Home, Pipeline, Listings, Marketing, CMA. Hidden at md+, on
    print, and on client-facing pages (/p, /tour, live /cma). PageShell and
    the home page add bottom padding on mobile so content clears it.
  - Marketing Studio "Schedule this post": channel chips
    (Instagram/Facebook/LinkedIn) + datetime, queued to `mr-scheduled-posts`
    with a removable Queued posts list. The queue entry is the payload shape
    for a future publishing API.
  - Listing drawer Quick actions: one-tap status change and inline list
    price edit (updates the card and drawer; would sync to the MLS live).
- **Open House toolkit + editable goals.**
  - New `/open-house`: pick a listing, launch a full-screen client-facing
    kiosk sign-in (name, phone/email, source chips, agent question, note).
    Each sign-in saves a lead (`mr-openhouse-leads`), the agent view lists
    leads per property with one-tap text follow-up, email, delete, and a
    real CSV export (`src/lib/mock/openHouse.ts`). Wired into the Marketing
    header CTAs and the command palette. Live version posts to the lead hub.
  - Printable branded open house welcome sign with a working QR code
    (`marketing/OpenHouseSign.tsx`, keyless api.qrserver.com; swap for a
    self-hosted generator in production) pointing to the agent's public page.
  - Production goal targets are editable (Edit goals) and persist
    (`mr-production-goals`); rings recalculate against the custom target.
- **Agent-only tour share button.** The client tour page hides "Text this
  tour to a client" from clients. The Tour Builder opens the page with
  `?view=agent`, the only view that shows it.
- **Overnight interaction pass (every click does something).**
  - Saved tours and saved CMAs: name, save, reload, and delete multiple
    analyses per agent (`mr-tours`, `mr-cmas`).
  - Marketing Studio social graphics download as real PNGs
    (`src/lib/socialCanvas.ts`, canvas render at 1080x1080 / 1080x1920).
  - New `/presentation` Listing Presentation: an on-screen branded document
    (cover, agent, MR advantage, marketing plan, pricing strategy, steps)
    printable as-is; linked from Marketing.
  - Resources: favorites (star + Favorites filter) and a working "copy all"
    in the reader drawer.
  - Pipeline: "Log touch" updates last-touch on the card and drawer; drawer
    gained an expandable mock client record.
  - Listings: "New listing" adds inventory by MLS ID through `lookupMls`.
  - Tour page: sticky bar opens a full Google Maps directions route through
    every stop (`googleDirectionsUrl`).
  - Notifications: items navigate by kind, badge clears with Mark all read.
  - Dashboard: Market pulse stats expand into talking points with a mini
    trend bar; Company announcements expand with a deep link by tag.
  - CMA report adds a comp photo gallery; calculators take an optional
    "Prepared for" client name that prints on the branded PDF.
  - Training: working faux course player; "Complete lesson" advances saved
    progress (`mr-training-progress`).
  - Today tasks check off and persist (`mr-today-done`); hero stats deep-link
    to Production/Pipeline/Listings; Pipeline Snapshot links to /pipeline.
  - Shop: Reorder clones a past order into a new Processing order.
  - Client CMA page sticky bar adds a one-tap "Talk pricing" text-the-agent
    action.
  - "Save contact" vCard download (`src/lib/vcard.ts`, real .vcf) on the
    public page, tour page, and CMA page agent cards.
- **CMA overhaul + this guide.** CMA now MLS-ID driven with rich comp records,
  live suggested range + market summary; new live client CMA page
  (`/cma/[slug]`) and a redesigned multi-section branded CMA report
  (`CmaPrint`). Created this living guide.
- **Production club meter; tour upgrades; carousel; editable content.**
  President's/Chairman's Club meter (26u/$14M, 45u/$24M). Tour page got a real
  Google Maps route, Zillow + Apple Maps per home, and share. Device-aware
  `Carousel` added to the public page. Education + vendors editable in the page
  builder.
- **Property Tour Builder.** `/tour-builder` + `/tour/[slug]`, mock MLS lookup.
- **Editable content + redesigned PDFs.** Headline/tagline/bio/specialties/About
  photo editable; all branded PDFs unified into one premium template.
- **Builder-driven public page.** Page builder config drives `/p/[slug]`; added
  valuation, multi-source reviews, events, education, vendors, services modules.
- **Marketing Shop.** `/shop` ordering catalog with cart/checkout/compliance.
- **Marketing Studio, top-bar customization, command palette, notifications,
  per-property pages, calculators, CMA v1, Settings, dashboard customization.**
- **Initial build.** Dashboard, pipeline, listings, production, resources,
  directory, training, page builder, public page.
