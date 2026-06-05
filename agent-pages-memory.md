# Agent Pages — Project Memory

Durable context for the Agent Pages project. Read this first in any new session, then defer to the project brain, brand sheet, and logo files for full detail. Where this conflicts with the brain, the brand sheet wins.

## What this is

Agent Pages is a one stop shop web experience for agents at Marshall Reddick Real Estate (MR). Two connected surfaces: an agent-facing command center (every resource and tool in one place) and a client-facing page the agent customizes and shares. This is a reference UI/UX backbone for the MR software team, not a production product. It will not go live. Looking real and trend-forward matters more than working. Faked logic and broken pieces are fine and expected.

## People

- Cameron Carlson. California Sales Manager, MR. Project lead and product direction. Wants bias to action, a clear recommendation with reasoning over a hedged menu, concise and direct, no fluff, no sugar-coating, no disclaimers.
- Ross Nelson. Co-builder. Keep all communication to him short and no fluff.
- Audience: the MR software team. They use this as the reference spec and may clone the code directly.

## Build approach

- Real Next.js 14 (App Router) plus Tailwind CSS. Real, readable, modular code the team can clone, run, and reuse. Components clearly named, each mapping to a piece of the spec.
- Mock all data and logic. Hardcoded sample listings, fake client records, buttons that look live but need not persist. Keep mock data in obvious, easily swapped files.
- Speed over function. No real backends, auth, or persistence unless asked. Label placeholders where it helps the team read intent.

## Design tokens (authoritative, from the MR brand sheet)

- Base color `#316878`. The primary brand color.
- Dark `#1C3C45`. Dark backgrounds and depth.
- Light teal accent `#50AAC4`.
- Mid teal `#3A7B8E`.
- Soft pale blue `#8BB8C4`. Light surfaces and tints.
- Body text `#555` on light background `#FCFCFC`. White text on dark surfaces.
- Headings Raleway. Body Open Sans.
- Aesthetic: Apple Liquid Glass. Frosted translucency tinted with the teal range, depth, soft edges. Trending, clean, high-end, fast. Never generic or dated.

Correction note: the project brain originally listed `#50AAC4` as primary and `#0D2228` as navy. The brand sheet supersedes that. `#50AAC4` is an accent, not the base, and `#0D2228` is not an official MR color. Always use `#316878` as base and `#1C3C45` as dark.

## Logos

Four SVGs live in `public/logos/`: `colored-logo.svg` (teal wordmark, wide), `white-logo.svg` (white wordmark, wide), `colored-logo-mark.svg` (teal house mark, near square), `white-logo-mark.svg` (white house mark).

- Teal logo on light backgrounds, white logo on dark backgrounds.
- Logotype (full wordmark) is always fine alone.
- Logomark (house symbol) alone only if the logotype appears elsewhere on the same page, or at minimum is paired with the text "Marshall Reddick Real Estate."
- Full descriptor: REAL ESTATE | PROPERTY MANAGEMENT | PRIVATE LENDING.

## Four agent-side pillars (Surface 1)

1. Resource hub. Docs, links, training, scripts, guides.
2. Listings and marketing tools. Listing prep, collateral, comps, property assets.
3. Client management and pipeline. Mirrors the PMA flow: request, sent, completed, questionnaire, follow-up.
4. Client-facing page builder. Where the agent customizes the public page.

## Client-facing page (Surface 2)

Customizable public page the agent shares. Must flex across buyers, sellers, landlords, and the general public. Agent chooses layout, content, and which modules appear per audience. One agent, many configurations.

## Scope

Marshall Reddick only. Exclude anything from Crowne Point Equity, Rendara, and Kindred Oak.

## Conventions

- Never invent MR facts, real client data, or real listings. Use clearly fake sample content. If something is unknown, say so.
- No em dashes anywhere, in UI copy or in chat. No emojis.
- Own and correct mistakes directly.

## Name spellings to preserve

- Ross Nelson
- Bryan Talley (not Brian)

## Where it lives

- Local source: `~/Projects/agent-pages`.
- GitHub repo `agent-pages`, Ross added as collaborator.
- Vercel auto-deploys from GitHub, one preview URL per push.
- VS Code with Claude Code in the integrated terminal. Live Share for pairing.
