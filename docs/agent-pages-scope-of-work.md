# Agent Pages — Scope of Work

| | |
|---|---|
| Status | v1, for team review |
| Owner | Cameron Carlson, California Sales Manager |
| Co-builder | Ross Nelson |
| Audience | Marshall Reddick Real Estate software team |
| Repo | github.com/Cameron-MR/agent-pages |
| Updated | 2026-06-05 |

## How to read this

This is the reference for one thing: a UI/UX prototype of Agent Pages. It is not a product spec for a live system. The prototype shows the team what we want built and gives them code to clone. Where this document and the MR brand style sheet disagree, the brand sheet wins.

Sections 1 to 4 define the product. Sections 5 to 8 define how it is built and what "done" means. Section 9 answers the questions the team is likely to raise. Section 10 lists the decisions still open.

## 1. What Agent Pages is

A one stop shop web experience for MR agents. Two connected surfaces:

- **Surface 1, the command center.** Every resource and tool an agent needs, in one place. Organized around four pillars.
- **Surface 2, the client-facing page.** A public page the agent configures and shares, built in Surface 1 and rendered at `/p/[slug]`.

## 2. The four pillars (Surface 1)

1. **Resource hub.** Docs, links, training, scripts, guides.
2. **Listings and marketing.** Listing prep, collateral, comps, property assets.
3. **Client management and pipeline.** Mirrors the PMA flow: request, sent, completed, questionnaire, follow-up.
4. **Page builder.** Where the agent configures Surface 2.

## 3. The client-facing page (Surface 2)

One agent, many configurations. The page must flex across buyers, sellers, landlords, and the general public. The agent chooses layout, content, and which modules appear per audience.

## 4. Scope

**In.** Every screen below, with mocked data and faked logic, on brand, on a desktop browser:

| Route | Pillar | What it shows |
|---|---|---|
| `/` | Command center | Customizable dashboard, quick launch, market pulse, today panel, pipeline snapshot, announcements |
| `/resources` | 1 | Resource hub |
| `/training` | 1 | Training library |
| `/directory` | 1 | Staff and vendor directory |
| `/listings`, `/listings/[id]` | 2 | Listings index and detail |
| `/marketing` | 2 | Marketing studio: collateral, social graphic, flyer, asset previews |
| `/cma` | 2 | Comparative market analysis |
| `/calculators` | 2 | Deal and finance calculators |
| `/production` | 2 | Production and performance |
| `/shop` | 2 | Branded merchandise |
| `/pipeline` | 3 | Client pipeline across the PMA stages |
| `/page-builder` | 4 | Configure the client-facing page |
| `/p/[slug]` | Surface 2 | The public page render |
| `/settings` | — | Agent and app settings |

**Out.** Real backends, auth, databases, persistence. Live integrations to any MR system. Real client data, real listings, or any real MR fact. Anything from Crowne Point Equity, Rendara, or Kindred Oak. Production hardening, accessibility audits, analytics, SEO, internationalization.

## 5. Architecture

- **Framework.** Next.js 14.2.35, App Router. React 18, TypeScript 5.
- **Styling.** Tailwind CSS 3.4. Brand tokens live in `tailwind.config.ts` under the `mr` color scale and the `heading` / `body` font families.
- **State.** Client-side React context only. `AgentProfileProvider` holds the mock agent, `NavPrefsProvider` holds nav choices, and a global `CommandPalette` (Cmd/Ctrl+K) mounts once in `Providers`. No server state, no database.
- **Import alias.** `@/` maps to `src/`.

Repository map:

```
src/app/            One folder per route, each with page.tsx
src/components/      Named UI components, one per piece of the spec
src/components/marketing/   Marketing studio parts
src/lib/mock/        All sample data, one file per surface
public/logos/        Four brand SVGs
```

## 6. Working with mock data

All sample content lives in `src/lib/mock/`, one file per area (`pipeline.ts`, `listings.ts`, `publicPage.ts`, and so on). Each file exports typed interfaces alongside its data, so the types double as a first-draft data contract for whoever wires this to a real source later. To make a screen real, swap the export in one file. No component reaches outside `src/lib/mock` for data. Buttons may look live without persisting; that is expected.

## 7. Design system

- **Colors.** Base `#316878`, dark `#1C3C45`, light teal accent `#50AAC4`, mid teal `#3A7B8E`, pale blue `#8BB8C4`. Body text `#555` on `#FCFCFC`. White text on dark surfaces. Use the `mr.*` Tailwind tokens, not raw hex.
- **Type.** Raleway for headings, Open Sans for body, loaded via `next/font`.
- **Aesthetic.** Apple Liquid Glass over the teal range: frosted translucency, depth, soft edges. Clean and current, never generic.
- **Logos.** In `public/logos/`. Teal on light, white on dark. The full wordmark stands alone anywhere. The house mark alone is allowed only when the wordmark appears elsewhere on the page, or the text "Marshall Reddick Real Estate" is present.

## 8. Definition of done

A screen is done when it looks real and on brand on a desktop browser, maps to a pillar or surface in Section 4, runs locally, deploys to the Vercel preview without errors, and uses only clearly fake content. The prototype is done when every Section 4 screen meets that bar and the two surfaces connect through the page builder.

## 9. Team questions, answered

**Is this production code? Will it go live?** No. It is a reference prototype to align on UI and UX. Treat it as a pattern library and a clickable spec, not a foundation to ship.

**How do I run it?** `npm install`, then `npm run dev`, then open `localhost:3000`. Push to `main` and Vercel publishes a preview URL.

**Is the logic real?** No. Data is mocked and logic is faked on purpose. Broken or stubbed pieces are fine. Speed and fidelity of look matter more than function.

**Where is the data and how do I make it real?** In `src/lib/mock/`. Each file is typed and isolated. Replace one file's export with a real fetch and the screen follows. The interfaces are the starting point for the real data contract.

**How is state and persistence handled?** React context for the session, nothing server side, no database. Do not assume anything persists across reloads unless a component explicitly says so.

**Is there auth or are there roles?** No. There is a single mocked agent profile. Multi-user, permissions, and SSO are out of scope for the prototype.

**What do the two surfaces have to do with each other?** The agent builds Surface 2 in `/page-builder`. The result renders at `/p/[slug]`. That link is the seam to keep intact.

**What is the device and browser target?** Desktop browser first. Responsive and mobile polish are not guaranteed in the prototype.

**Can I reuse components directly?** Yes. Components are named to the spec and kept modular so the team can lift them. The brand tokens and font setup are meant to be copied as is.

**What is the brand source of truth?** The MR brand style sheet, then `agent-pages-memory.md`. The Tailwind theme already encodes the palette and fonts.

**Who decides scope and priority?** Cameron owns product direction. Open decisions are in Section 10.

## 10. Open decisions

- Build sequence across the four pillars. Recommendation: finish the command center shell and resource hub first since they frame every other screen, then the pipeline because it carries the most daily agent value, then listings and marketing, then the page builder and public page last because they depend on the agent profile and content modules being settled.
- Which client-facing audience to demo first: buyer, seller, landlord, or public.
- Which screens the software team most wants to see early, so we can sequence to that.
