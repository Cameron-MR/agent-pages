# Prompt: Build the Marshall Reddick Agent Pages experience in Claude Design

Paste everything below the line into Claude Design. Attach the codebase first (the `src` folder and `tailwind.config.ts`) so the design is grounded in the real components and brand tokens.

---

Design a complete, modern, high-fidelity web app called **Agent Pages** for **Marshall Reddick Real Estate** (a California real estate brokerage, property management, and private lending company). This is the agent-facing command center plus the client-facing page each agent publishes. Use the attached codebase and design system as the source of truth for components and tokens. Everything is a polished 2026 product, not a wireframe.

## Brand and design language

- Colors: base/primary teal `#316878`, dark navy-teal `#1C3C45`, light teal accent `#50AAC4`, mid teal `#3A7B8E`, soft pale blue `#8BB8C4`. Body text `#555555` on light background `#FCFCFC`. White text on dark surfaces. Do not use `#0D2228`.
- Type: **Raleway** for headings, **Open Sans** for body.
- Aesthetic: **Apple Liquid Glass** over the teal range. Frosted translucency, soft depth, rounded corners (2xl/3xl), subtle shadows, ambient blurred teal washes behind content. Trending, clean, premium, never generic or dated.
- Hard rules: no em dashes anywhere in UI copy, no emojis, use clearly fabricated sample content only (no real client data or real listings), Marshall Reddick scope only.

## Global chrome (every agent-facing page)

- Sticky frosted top nav: MR teal logotype on the left, primary nav items inline, then a **More** dropdown that holds the overflow items. Items in order: Dashboard, Pipeline, Listings, Marketing, Production, Shop, Calculators, CMA, Resources, Directory, Training, Page Builder, Settings. The agent controls how many show inline before More (default 5).
- Right side of nav: a **command palette** trigger labeled "Search ⌘K", a **notifications bell** with a count and a dropdown of recent activity (new lead, price-drop suggestion, disclosure signed, contingency due, new review), and an **agent chip** (initials avatar + name) linking to Settings. A mobile hamburger menu collapses the nav on small screens.
- A global **command palette** (Cmd/Ctrl+K) overlay: search field, keyboard-navigable list of every page and quick action, Enter to jump.
- Footer: "Agent Pages reference UI for Marshall Reddick Real Estate. All content shown is fabricated sample data."

## Screens

### 1. Dashboard (agent command center, home)
A daily cockpit. Glass hero identity card: agent headshot, name, title, market, phone, DRE, and four headline stats (GCI YTD vs goal, closings MTD, under contract, active listings). A **Customize dashboard** button opens a panel to show/hide and reorder the sections below; the choice persists. Sections: **Today** (appointments, tasks, deadlines, hot leads in four glass columns), **Market pulse** (median price, days on market, months of inventory, sale-to-list), **Pipeline snapshot** (client cards across pipeline stages), **Quick launch** (SSO-style app tiles: CRM, MLS, transaction mgmt, e-sign, marketing suite), **Everywhere else** (hub grid linking to every subpage), and **Announcements**.

### 2. Pipeline
A client pipeline board across stages: Request, Sent, Completed, Questionnaire, Follow-up (a CMA / market-analysis flow, not property management). Client cards show name, property, buyer/seller, value. Cards move between stages with arrows, click opens a detail drawer (contact, value, source, last touch, next step, log-a-touch). Filter by Buyer/Seller, search, running deal count and potential volume, and an "Add Client" button.

### 3. Listings
Agent inventory as photo cards with status badges (Active, Coming Soon, Pending, Sold), price, beds/baths/sqft, and performance metrics (views, saves, showings). Status filter tabs, a stat strip, and a detail drawer with a photo gallery and an "Open listing page" link.

### 4. Per-property page (public single-listing site)
A shareable single-listing website: photo gallery with thumbnails, status, price, specs, an "About this home" description, a features grid, a stylized location map, and an agent contact card with an inquiry form.

### 5. Marketing Studio
The wow. Pick any listing and a campaign (Just Listed, Open House, Price Improved, Just Sold) and every asset updates live, personalized to the agent: branded **social graphics** in feed (1:1) and story (9:16) with the property photo, price, specs, headshot, and contact; an auto-written **caption** with hashtags and a copy button; a printable **branded property flyer**; **email templates** (just listed, open house, market update) with copy; and a **branded email signature** matching the MR standard (name, title, company, "Real Estate | Property Management | Private Lending", recent-webinar links, Call/Text and Office lines, email, DRE, office address, marshallreddick.com, social links, and the "Be Aware of Wire Fraud" notice). A prominent "Order printed materials" button links to the Shop.

### 6. Marketing Shop
An ordering catalog with branded, on-brand product mockups across: Direct Mail (just listed/sold/farming postcards), Flyers, Door Hangers, Business Cards, Signage (yard signs, A-frames, riders), Apparel and Swag, and Promo. Each product has a price, unit, and description. A cart drawer with quantities, a checkout that ships to the agent's office or home address and uses a saved card, and an order-success state with order history. A **Payment methods** section to save cards (masked, demo only). A compliance banner and checkout checklist showing the system auto-applies MR branding and logo, the agent's contact info, the California DRE number on all print, the Equal Housing Opportunity logo, and the brokerage license and address.

### 7. Production
Performance: circular **goal rings** (GCI, closed volume, units vs targets), a monthly **closed-volume bar chart**, a filterable **commission ledger** (paid/pending), and an **office leaderboard** with the agent's row highlighted. Add a President's Club / Chairman's Club **progress meter** (a thermometer showing YTD production against two tier thresholds; use placeholder thresholds).

### 8. Calculators
Four calculators with live math and a **Print / Save PDF** that outputs a Marshall Reddick branded, agent-personalized one-pager: Seller net sheet, Funds to close (how much cash to buy), Buyer affordability (budget to price range), and Commission split.

### 9. CMA Builder
Subject property plus selectable comparable sales; a live **suggested price range** computed from the included comps; a branded printable CMA report.

### 10. Resources and Scripts
A searchable, filterable library (Scripts, Checklists, Guides, Templates) with category tabs and a reader drawer. Include practical realtor items: listing/buyer scripts, expired and FSBO scripts, net sheet, affordability worksheet, fair housing reference, open house kit, transaction timeline.

### 11. Directory
Contact cards grouped by role (Transaction, Leadership, Lending, Marketing, Vendors) with working call and email actions and search.

### 12. Training
Course catalog with progress rings, a track filter, an overall-progress banner, and Continue/Start/Review actions that open a lesson preview.

### 13. Page Builder (client-facing page editor)
Pick an audience (Buyer, Seller, Landlord, Public), toggle modules on/off, and watch a **live phone preview** that looks like the real public page (photo hero with headshot and "Work with me", real featured-listing cards with photos and prices, an about row, reviews). Each audience keeps its own module set. A Publish action and a share link.

### 14. Public client page (the shared agent page)
A modern, full-bleed client-facing page: a luxury-home hero with a gradient scrim, a glass identity card (headshot, name, title, DRE, tagline quote), and a primary CTA; a "What's my home worth?" valuation capture; featured listings with photos; a "Recently sold" track-record gallery; a personal **About** section with a family/lifestyle photo, warm bio, and specialty chips; a service-area section with a map; multi-source **reviews** (badges for Zillow, Realtor.com, Redfin, Yelp, Google feeding one unified feed with a source chip per review); and a contact form. Every CTA reads as creating a lead.

### 15. Settings
Edit the agent profile (name, title, brokerage, market, call/text phone, office phone, email, DRE, office address, photo) with a live business-card preview. The profile personalizes the nav, dashboard hero, public page, and all branded printouts. A **Top bar** section reorders the nav and sets how many items show before More.

## Cross-cutting behavior

- Personalization: one editable agent profile drives the nav chip, dashboard hero, public page, marketing assets, branded PDFs, and email signature.
- Customization: the agent can reorder/show-hide dashboard sections and reorder the top-bar nav; preferences persist.
- Compliance: MR branding, the agent's DRE, the Equal Housing logo, and brokerage details auto-apply to all printed and ordered materials.
- All data and logic are fabricated mocks. Buttons and forms can look live without persisting. Keep it fast, modern, and on-brand.

Deliver high-fidelity, interactive screens for each of the above, consistent with the attached components and Marshall Reddick brand tokens.
