# Agent Page — Analysis, Feedback & Feature Plan

Response to the Master Build Brief. Audience: the Marshall Reddick software team. Scope: Marshall Reddick only.

This document does three things the brief asked for, plus one bonus: it inventories the current (legacy) agent page from the two screenshots, critiques every module, consolidates the new requirements into a spec, lays out the open decisions without picking sides, recommends a 2026 page structure, and maps each requirement to what the **reference build already implements** so the team knows what to clone versus what to design from scratch.

A note on the reference build: the Agent Pages prototype already contains a working public agent page (`/p/[slug]`), a page-builder (`/page-builder`), a production tab (`/production`), a marketing studio and shop, and an editable agent profile (`/settings`). Where a requirement is already prototyped, it is called out as **[built in prototype]** with the file location, so this is a "clone and extend" plan, not a greenfield one.

---

## Part 1 — Inventory of the current (legacy) agent page

### Hero / header (`current-agent-page-hero.png`)

| Element | Data source | Editable vs static | Notes |
| --- | --- | --- | --- |
| Agent name + title ("Cameron Carlson, Realtor / Advisor") | Agent profile | Should be editable | Name bold, title light weight inline |
| DRE license number ("DRE: 02196873") | Agent profile / compliance | Static (system) | Required compliance field |
| Personal quote / tagline ("Intentional, reliable, and rooted in experience...") | Agent profile | Editable | One-to-two line italic-style quote |
| Circular headshot | Agent profile | Editable (upload) | Top-right, overlaps the hero image |
| Full-width background image (luxury home at dusk) | Agent-selected or default | Editable (upload) | Currently one static image, not a carousel |

### Body (`current-agent-page-full.png`, top to bottom)

1. **Home-valuation hero** — "What's my home worth?" over a neighborhood aerial, with a **"Get a Free Home Assessment"** CTA. Pulls nothing; the CTA should create a lead. Static copy.
2. **Reviews** — three aggregate badges: **Zillow** (5 stars, 9 reviews), **Google** (4.2 stars, 133 reviews, "MR Orange County"), **Yelp** (4.5 stars, 198 reviews, "MR Orange County"). Below: four **individual review cards**, each with reviewer name (where shown), transaction type ("Helped me buy home," "Long-term management of a property," "Listed and sold a home"), date, star rating, and quote. A **"See all reviews for Cameron"** link and a **"Provided by Zillow"** attribution badge. Data is review-source feeds; static layout.
3. **Upcoming Events** (teal band) — four event cards. Each: title, type (**ONLINE EVENT** vs **VENDOR EVENT**), date/time + timezone (PDT), format (Online Presentation), speaker names, admission (Free), and an **"X others going"** RSVP count. A **"See all upcoming events"** link. Data is the company events feed.
4. **Education** — a carousel of three content cards. Each: thumbnail, title, author (Cameron Carlson), date, content type (**Videos** vs **Articles**), and duration/read-time. Left/right carousel arrows and a **"View all educational content"** link. Data is agent-authored content.
5. **Get in Touch!** — contact card with phone, email, office address, a LinkedIn/social icon, and the agent headshot. CTA-by-contact; should create a lead.
6. **Cross-sell CTA banner** — "Need help managing your investment properties?" with benefit checkmarks (Great service / Simple pricing / Worry-free), a Zillow rating badge (5 stars, 52 reviews), and a **"Contact Us"** button. Drives the property-management line.
7. **Footer** — Company (Contact Us, About Us, Careers, Shop), **Affiliates → Preferred Vendors**, Support & Legal (FAQ, Software Support, Privacy Policy, Terms & Conditions), Reviews (Zillow, Yelp, Google), Social (YouTube, LinkedIn, Facebook, Instagram, TikTok), plus the corporate/legal/licensing line (KKI Ventures, fictitious business names, license numbers).

What is notably **absent** from the legacy page that modern agent pages carry: an active-listings/featured-listings grid, a personal About section with bio + family photo, a sold/track-record gallery, a photo carousel, service-area coverage, and any President's/Chairman's Club status.

---

## Part 2 — Per-module feedback (Keep / Improve / Modernize / Cut)

### Hero / header — **Modernize**
- **What works:** Strong luxury image, name/title/DRE/quote hierarchy, headshot. Good trust-at-a-glance.
- **Dated/weak:** The headshot overlapping the corner is a 2015-era treatment; the quote is small and low-contrast over a busy image; only a single static background; no primary CTA in the hero.
- **Recommendation:** Full-bleed image with a darkened gradient scrim for legibility, larger headline, a primary CTA in the hero ("Work with me" / "Book a call"), and the headshot integrated into a glass identity card rather than a floating circle. Make the background a **photo carousel** (see §3.6). The reference build's `/p/[slug]` hero already does the gradient-scrim + glass identity-card pattern — clone that and swap in the luxury-home background and the tagline.

### Home-valuation hero — **Keep + Improve**
- **What works:** A home-valuation capture is the single highest-intent lead magnet on an agent page. Keep it prominent.
- **Dated/weak:** It floats as a translucent box on an aerial with weak contrast; the CTA does not visibly connect to anything.
- **Recommendation:** Keep the address field inline (capture intent in one field), wire the CTA to **create a CRM lead** (§3.10), and place it high on the page. The page-builder already exposes a "Home valuation" module toggle in the prototype (`/page-builder`).

### Reviews — **Modernize (highest priority)**
- **What works:** Multiple aggregate sources and real quotes are excellent trust signals; transaction-type labels are great context.
- **Dated/weak:** Limited to Zillow/Google/Yelp; the feed reads as a long single column; "Provided by Zillow" implies single-source attribution that conflicts with the multi-source goal; star glyphs and spacing look dated.
- **Recommendation:** A **source-agnostic** badge row (Zillow, Realtor.com, Redfin, Yelp, Google, plus an aggregator) feeding **one unified, filterable review feed** with a source chip on each card. Drop a single-source attribution in favor of "Reviews aggregated from your connected sources." See §3.7.

### Upcoming Events — **Keep + Improve**
- **What works:** Real, valuable company programming; RSVP counts add social proof.
- **Dated/weak:** Dense four-up grid, timezone formatting ("12:00 AM PDT" looks like a data bug), small tap targets on mobile.
- **Recommendation:** Keep as an agent-toggleable module fed by the company events feed (§3.2). Fix time formatting, make cards larger and swipeable on mobile, and badge event type clearly.

### Education — **Keep + Improve**
- **What works:** Positions the agent as an educator; mixed video/article formats are good.
- **Dated/weak:** Carousel arrows only (no swipe), thumbnails inconsistent, no clear curation control.
- **Recommendation:** Device-aware carousel (swipe on mobile, arrows on web, §3.6) and an agent curation picker (§3.9).

### Get in Touch! — **Keep + Improve**
- **What works:** All contact methods in one card; headshot reinforces identity.
- **Dated/weak:** Plain, low emphasis for the most important conversion block; form-less (icons only).
- **Recommendation:** Promote to a real contact form that **creates a CRM lead** (§3.10), keep tap-to-call/email, and add the preferred-vendors and service badges nearby. The reference `/p/[slug]` contact form already exists; wire it to the hub.

### Cross-sell CTA banner — **Keep**
- **What works:** Surfaces the property-management line; benefit bullets + rating badge are persuasive.
- **Recommendation:** Keep; generalize it into a reusable "additional services" promo (§3.4) so lending can use the same pattern.

### Footer — **Keep + Improve**
- **What works:** Complete company/legal/social coverage; required licensing line.
- **Recommendation:** Keep structure; modernize spacing and bring "Preferred Vendors" up onto the page as a module (§3.8) while leaving the footer link in place.

### Modernization summary (where it reads "dated and old")
Tight, boxy translucent panels over busy photos; small low-contrast type; single-column density; carousel-arrow-only interactions; and inconsistent imagery. A 2026 page reads as: full-bleed imagery with gradient scrims, generous whitespace, glass cards, larger type, swipeable carousels on mobile, and one clear primary CTA per section. The reference build already establishes this language (Apple-liquid-glass over the MR teal range).

---

## Part 3 — Consolidated feature plan

### A. Page-builder & dashboard features

**A1. President's Club / Chairman's Club progress meter — [partially built]**
- **How it works:** A horizontal progress meter on the **Production tab** showing YTD production against two tier thresholds (President's Club, then Chairman's Club), with the current value, the gap to the next tier, and a projected pace.
- **Inputs:** YTD production (volume or GCI — confirm which metric defines the tiers), President's Club threshold, Chairman's Club threshold. **These thresholds are MR-specific facts not in hand — needs the real numbers before go-live.**
- **Where it lives:** Top of `/production`, above the existing goal rings.
- **Prototype status:** `/production` exists with goal rings and a volume chart; the club meter is a small addition on top.
- **Edge cases:** Agent below tier 1 (show distance to President's), between tiers (show distance to Chairman's), above both (show "Chairman's Club achieved"). Define whether tiers reset annually.

**A2. Company Events module (toggle) — [built in prototype]**
- **Recommendation:** This should **drive the same Upcoming Events module**, not a second one. One module, fed by the company events feed, with an on/off toggle in the page-builder. A second parallel module would fragment the data and confuse agents.
- **Prototype status:** `/page-builder` already has module toggles; add "Company events" as one of them bound to the existing events module.

**A3. Hide sales history toggle — VERIFY FIRST**
- **Believed to already exist** on the live platform. **Do not rebuild.** Confirm the toggle exists and that "off" hides past transactions on the public page. If confirmed, just expose it as a page-builder module toggle. The reference page-builder is the right home for the control; spec only the gap.

**A4. Additional agent services display (property management, lending) — VERIFY + extend**
- **Believed to partially exist.** Spec the gap: a module that flags an agent as full-service by surfacing the extra lines they offer (property management, private lending), each with a short blurb and a CTA that creates a lead routed to that line.
- **Prototype status:** The cross-sell banner pattern (`/p/[slug]`) and the brand tagline ("Real Estate | Property Management | Private Lending") already exist; generalize the banner into a reusable services module.

### B. Agent page content & personalization

**B5. Editable About section + photo — [built in prototype]**
- **How it works:** Agent edits About bio text and replaces the photo from the page-builder; changes persist and render on the public page.
- **Prototype status:** The public page has a personal About section with a family/lifestyle photo, bio, and specialty chips (`/p/[slug]`), and the agent profile is editable at `/settings` (name, title, contact, DRE, office address, photo) and flows everywhere. **Gap to close:** move the About bio + photo fields into the page-builder editor specifically (today they live in profile/mock data).

**B6. Photo carousel — [spec, partially built]**
- **How it works:** Agent uploads an ordered set of photos (family, lifestyle, listings). **Swipe on mobile, click-through arrows on web** — device-aware is a hard requirement.
- **Where it lives:** Hero background and/or a dedicated gallery module.
- **Prototype status:** The public page renders galleries and the listings detail page has a photo gallery; the device-aware swipe/click behavior is the piece to build (one component, reused by Education and the hero).

**B7. Multi-source reviews — [spec]**
- **How it works:** A **source-agnostic** ingestion layer normalizes reviews from **Zillow, Realtor.com, Redfin, Yelp, Google**, plus an aggregator, into one schema (source, rating, count, reviewer, transaction type, date, quote, link). The page shows an aggregate badge per connected source and one unified feed with a source chip and a source filter.
- **"Billholder.com" flag:** Almost certainly the garbled name of a reputation/review aggregator — **BirdEye** is the most likely match. **Confirm before building.** Design the source list as config so adding/removing a source is a data change, not a code change.
- **Edge cases:** A source with zero reviews (hide its badge), conflicting reviewer identity across sources (de-dupe by source+date+text), and attribution/ToS requirements per source (Zillow in particular requires its attribution when showing Zillow content).

**B8. Preferred Vendors on the agent page (NEW) — [spec]**
- **How it works:** A module surfacing the agent's recommended **title, escrow, lender, and insurance** providers, each with name, logo, one line, and contact.
- **Assignment:** Recommend **company-level defaults with agent-level overrides** — MR sets approved/compliant vendors as the default, the agent may override within the approved set. This keeps compliance while allowing personalization.
- **Prototype status:** The Directory (`/directory`) already models TC/lender/escrow/vendor contacts; reuse that data shape for the public module. The legacy footer link stays.

**B9. Education curation — [spec]**
- **How it works:** Agent selects/curates which educational items (from a company + personal library) appear, and in what order, from the page-builder. Each item carries type (video/article), duration, and date.
- **Prototype status:** Education carousel exists on the legacy page; the curation picker is the new piece, living in the page-builder alongside the other module controls.

### C. Conversion & CRM

**C10. CTA → CRM lead creation — [spec, hard requirement]**
- **How it works:** Every CTA/form (home valuation, Get in Touch, property-management banner, vendor inquiries) posts to a single generic lead endpoint that creates a lead with source attribution (which page, which module, which agent). Feasibility is confirmed (done before in HubSpot and another CRM).
- **Design generically:** A `createLead({ agentId, source, module, contact, payload })` interface behind an adapter, so the CRM behind it can change without touching the page. **Stay tool-agnostic** (see §4).
- **Prototype status:** All CTAs/forms exist and currently show mock success states; they are the wiring points for the adapter.

**C11. One central lead hub — [architecture constraint]**
- **Guiding principle:** all leads, all sources, into one hub. Every adapter writes to the hub first; the CRM is a downstream consumer, not the source of truth. Design the hub as the system of record so swapping CRMs never loses lead history.

---

## Part 4 — Open decisions (flagged, not decided)

**D1. Listing drips / tour notifications — build vs. integrate.**
The MLS already notifies agents when a contact clicks a listing or visits a drip page.
- **Integrate (pipe MLS signals into the hub):** Faster, less to maintain, preserves the MLS's existing detection. Risk: dependent on MLS data access/terms, and signal fidelity is whatever the MLS provides.
- **Rebuild ourselves:** Full control, consistent with "everything on our website," uniform signal schema in the hub. Risk: significant build, must re-create tracking the MLS already does, ongoing maintenance.
- **Governing principle holds either way:** the signal must land in the one hub. **No decision made — needs a call.**

**D2. CRM choice (Follow Up Boss vs. other).**
There was tension: one party did not want Follow Up Boss in scope; the other is not committing to any CRM until the **member analysis**. **Stay tool-agnostic.** Reference "the CRM" generically; do not assume Follow Up Boss, HubSpot, or any specific tool. Revisit after the member analysis.

**D3. "Billholder.com" / aggregator identity.** Likely **BirdEye**. Confirm the exact vendor before wiring a review source.

**D4. Tier metric for the club meter.** Is President's/Chairman's Club measured by closed volume, GCI, or units? Confirm, and provide the actual thresholds.

**D5. Company Events: one module or two.** Recommendation is one module driven by a toggle; confirm there is no need for a separate agent-authored events list distinct from company events.

---

## Part 5 — Recommended 2026 agent-page structure (module order)

1. **Hero** — full-bleed photo carousel with gradient scrim, glass identity card (headshot, name, title, DRE, tagline), and a primary CTA.
2. **Home valuation** — single-field address capture → CRM lead.
3. **Featured / active listings** — photo grid (with the hide-sales-history toggle governing the sold view).
4. **About** — editable bio + family/lifestyle photo + specialties.
5. **Track record / recently sold** — gallery, governed by the hide-sales-history toggle.
6. **Reviews** — multi-source badge row + unified, filterable feed.
7. **Additional services** — property management + lending promos.
8. **Preferred vendors** — title, escrow, lender, insurance.
9. **Upcoming events** — company events module (toggle).
10. **Education** — curated, device-aware carousel.
11. **Get in touch** — contact form → CRM lead, with tap-to-call/email.
12. **Cross-sell banner** — investment/property-management CTA.
13. **Footer** — company/affiliates/legal/social + licensing line.

Every module is page-builder-toggleable, audience-aware (buyer/seller/landlord/public), and device-aware where it matters. This order leads with the highest-intent capture (valuation) and front-loads trust (listings, about, reviews) before the asks.

---

## Part 6 — Verify before building (do not rebuild what exists)

- **Hide-sales-history toggle (A3):** believed to exist on the live platform — confirm and reuse.
- **Additional-services display (A4):** believed to partially exist — confirm and spec only the gap.
- **Editable About + profile (B5):** exists in the reference build (`/settings` + `/p/[slug]`) — extend into the page-builder rather than rebuild.
- **Company events module (A2):** exists as a module concept — bind a toggle to it rather than add a second module.

---

## Part 7 — Risks, gaps, and missing requirements

- **Compliance per review source.** Zillow and others have attribution/display terms. A source-agnostic system must encode per-source display rules, not just data.
- **Lead-source attribution integrity.** "One hub" only delivers value if every lead carries clean source/module/agent attribution; define the attribution schema before wiring CTAs.
- **MLS data rights.** The listing-drip integrate-vs-build decision hinges on what the MLS contractually allows piping into an external hub.
- **Vendor compliance (RESPA).** Preferred-vendor display and any value exchange must respect RESPA and state rules; company-level approval of the vendor set mitigates this.
- **DRE / Equal Housing on every surface.** License numbers and the Equal Housing logo must render on the public page and on all generated/printed marketing — already auto-applied in the reference Marketing Shop and calculator/flyer printouts.
- **Accessibility & performance.** Full-bleed imagery and carousels must stay accessible (alt text, keyboard nav) and fast (image sizing); call this out as acceptance criteria.
- **Missing-but-implied requirement:** a clear **agent dashboard entry point** (the brief says the dashboard lives on the website, reached by hyperlink). Confirm where that link lives for the agent and that it is gated to the agent's own data.

---

## Appendix — Requirement-to-prototype map

| Requirement | Status in reference build | Location |
| --- | --- | --- |
| Hero (modernized) | Built (needs luxury bg + tagline swap) | `src/app/p/[slug]/page.tsx` |
| Home valuation CTA | Built (mock) | page-builder module + public page |
| Multi-source reviews | Single-source mock; needs source-agnostic layer | `src/lib/mock/publicPage.ts` |
| Upcoming events / company events toggle | Module-toggle pattern built | `src/app/page-builder/page.tsx` |
| Education carousel curation | Legacy only; curation to build | n/a |
| Editable About + photo | Built (profile-driven) | `src/app/settings/page.tsx`, `/p/[slug]` |
| Photo carousel (device-aware) | Galleries built; swipe/click to build | listings + public page |
| Preferred vendors module | Data shape exists in Directory | `src/lib/mock/directory.ts` |
| President's/Chairman's Club meter | Production tab built; meter to add | `src/app/production/page.tsx` |
| Additional services display | Cross-sell banner pattern built | `/p/[slug]` |
| CTA → CRM lead / one hub | Mock success states; adapter to build | all forms |

_All content and data in the reference build are fabricated samples. No real Marshall Reddick client data or live integrations are present._
