# CLAUDE.md

Standing instructions for Claude Code working in the Agent Pages repo. Keep this in the repo root.

Read `agent-pages-memory.md` first in any new session for durable project context (people, surfaces, pillars, where things live). Where it conflicts with the brand sheet, the brand sheet wins.

## What this repo is

Agent Pages is a reference UI/UX backbone for Marshall Reddick Real Estate (MR), built for the MR software team to clone and reuse. It is not a production product and will not go live. Looking real and trend-forward matters more than working. Faked logic and broken pieces are fine.

## Stack and rules

- Next.js 14 (App Router) plus Tailwind CSS. Real, readable, modular code.
- Components clearly named, each mapping to a piece of the spec.
- Mock all data and logic. Keep mock data in obvious, easily swapped files (for example `src/lib/mock/`). No real backends, auth, or persistence unless asked.
- Speed over function. Label placeholders where it helps the team read intent.

## Design tokens (authoritative)

- Base `#316878`, dark `#1C3C45`, light teal accent `#50AAC4`, mid teal `#3A7B8E`, pale blue `#8BB8C4`.
- Body text `#555` on `#FCFCFC`. White text on dark surfaces.
- Headings Raleway, body Open Sans.
- Apple Liquid Glass aesthetic over the teal range. Do not use `#0D2228`; it is not an official color.

## Logos

In `public/logos/`. Teal logo on light, white logo on dark. Logotype is always fine alone. Logomark alone needs the logotype elsewhere on the page or the text "Marshall Reddick Real Estate" present.

## Hard rules

- Never invent MR facts, real client data, or real listings. Use clearly fake sample content.
- No em dashes anywhere. No emojis.
- MR scope only. Exclude Crowne Point Equity, Rendara, Kindred Oak.
- Name spellings: Ross Nelson, Bryan Talley (not Brian).
