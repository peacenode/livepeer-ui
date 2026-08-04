# Plan 003: Make `/design.md` an executable Livepeer design specification

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan in
> `plans/README.md` unless a reviewer says they maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat 7edcdff..HEAD -- lib/design-md.ts app/design.md/route.ts app/globals.css lib/registry-meta.json README.md components/livepeer-ui/platform-page.tsx components/ui/display-heading.tsx`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none
- **Category**: docs
- **Planned at**: commit `7edcdff`, 2026-08-04

## Why this matters

The current guide is correct about installation, accessibility, and avoiding
decorative UI, but it does not encode enough of the visual system for a
zero-context agent to reproduce the prototypes. It says to use the default
spacing, radii, and hierarchy without naming the values, roles, or surface
recipes. The result is a guide that prevents obvious mistakes but still leaves
page density, typography, layout geometry, accent use, and cross-surface choices
to agent taste.

Research against Refero's DESIGN.md corpus showed the useful pattern: pair a
short visual thesis with concrete color roles, type recipes, spacing and shape,
composition patterns, and explicit do/don't constraints. Do not copy Linear,
Mercury, Stripe, or another reference's aesthetic. Extract that document
structure and populate it only with decisions already evidenced by Livepeer's
theme and prototypes.

## Current state

- `lib/design-md.ts` is the canonical source for `/design.md`; there is no root
  Markdown file. `app/design.md/route.ts` renders it as static Markdown.
- `lib/design-md.ts:66-76` describes foundations qualitatively. In particular,
  line 73 says to use default radii, spacing, and control heights without
  giving an agent the values or role mapping.
- `lib/design-md.ts:84-97` gives sound general composition rules, but it does
  not distinguish console, marketing, docs, or fixed-output surfaces even
  though the repository contains all four.
- `lib/design-md.ts:118-131` emits a complete primitive inventory from
  `lib/registry-meta.json`. Preserve this generated inventory; do not hand-copy
  component names into the template.
- `README.md:28-31` explicitly says `lib/design-md.ts` is the source of truth.
- `app/globals.css` defines the semantic color roles, a 10px base radius,
  Inter/Favorit/Favorit Mono font roles, and light/dark values. The guide should
  name semantic utilities, not duplicate raw theme values that can drift.
- `components/livepeer-ui/platform-page.tsx` is the console hierarchy exemplar:
  a light 32px Inter title, responsive 16/24/40px horizontal gutters,
  `max-w-screen-2xl`, and 40px section gaps.
- `components/ui/display-heading.tsx` is the marketing display exemplar:
  Favorit, light weight, tight tracking/leading, balanced text, and a responsive
  36–64px range.
- `plans/design-system-inventory.md` is useful research evidence but is an
  untracked user artifact. Read it if present; do not modify, delete, stage, or
  make the production guide depend on it.

The route contract that must remain unchanged is:

```ts
// app/design.md/route.ts:4-10
export const dynamic = "force-static"

export function GET() {
  return new Response(createDesignMarkdown(siteConfig.baseUrl), {
    headers: {
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Content-Type": "text/markdown; charset=utf-8",
    },
```

## Commands you will need

| Purpose | Command | Expected on success |
| --- | --- | --- |
| Typecheck | `npm run typecheck` | exit 0, no errors |
| Lint | `npm run lint` | exit 0, no errors introduced by in-scope files |
| Build | `npm run build` | exit 0; Next.js production build completes |
| Serve | `npm run start` | server starts on port 3000 after the build |
| Route check | `curl -fsS http://localhost:3000/design.md` | exit 0; Markdown response body |

## Scope

**In scope** (the only production file to modify):

- `lib/design-md.ts`
- `plans/README.md` only for status updates

**Read-only evidence**:

- `app/design.md/route.ts`
- `app/globals.css`
- `lib/registry-meta.json`
- `README.md`
- `components/livepeer-ui/platform-page.tsx`
- `components/ui/display-heading.tsx`
- representative files under `app/mockups/` and `components/livepeer-ui/`

**Out of scope**:

- Do not create a root `DESIGN.md` or `design.md`; that would create a second
  source of truth beside the generated route.
- Do not edit `app/globals.css`, components, prototypes, registry metadata,
  `registry.json`, or `public/r/*.json` to make the prose easier to write.
- Do not add Refero colors, fonts, radii, or product-specific ornamental
  language to Livepeer UI.
- Do not modify or stage `plans/design-system-inventory.md` or
  `plans/artifacts/`; they are pre-existing user work.
- Do not push, open a PR, or deploy.

## Git workflow

- If a branch is needed, use `codex/docs-design-md`.
- Make one local commit for the guide update after all checks pass. Follow the
  repository's conventional style, for example `docs: make design guide
  executable`.
- Stage only `lib/design-md.ts` and the plan status update. Never use
  `git add -A`.

## Steps

### Step 1: Add a short Livepeer design thesis and surface modes

In `createDesignMarkdown`, add a concise thesis immediately after the opening
paragraph. It must describe the shared visual character without mood-board
prose: neutral canvases, precise borders, restrained typography, compact
product controls, generous marketing space, and sparing brand/motion accents.

Add a "choose the surface mode first" section under composition with these
four modes and their ownership:

- Console: persistent sidebar, page header, responsive gutters, stacked data
  sections; dense and neutral.
- Public/marketing: full-width sections, large breathing room, display type,
  singular CTA; editorial and brand-led.
- Docs/planning: navigation shell and readable content measure; scannable.
- Fixed output: explicit aspect ratio and safe areas for slides, social, email,
  or exports.

State that foundations cross modes but shells and density do not.

**Verify**:
`npm run typecheck` → exit 0 with no TypeScript errors.

### Step 2: Encode token roles without duplicating theme values

Expand Foundations with compact subsections for color, typography, spacing,
and shape.

Color must map the existing semantic roles to jobs:
`background/foreground`, `card`, `muted`, `primary`, `secondary/accent`,
`border/input/ring`, `destructive`, and `chart-1` through `chart-5`. Tell agents
to use semantic Tailwind utilities so light/dark themes remain intact.

Document Livepeer green as a narrow brand exception: use `emerald-500` only
where an established prototype uses it for brand-led primary action, selected
state, link, or focused highlight. State that brand green must not silently
mean success and must not become a parallel token layer.

Typography must include copyable starting recipes grounded in existing code:

- Product page title:
  `font-sans text-[2rem] leading-[0.98] font-light tracking-[-0.025em] text-balance`.
- Marketing display:
  `font-display text-4xl leading-[0.98] font-light tracking-[-0.045em] text-balance sm:text-[clamp(2.5rem,4.5vw,4rem)]`.
- UI body: normally `text-sm`; use muted foreground only for supporting text.
- Reading body: `text-base leading-7` with a constrained measure.
- Technical content: `font-mono`, normally `text-xs` or `text-sm`.
- Numeric data: tabular numerals when columns or values must align.

Spacing and shape must name the observed system: 4px base rhythm; common gaps
of 8/16/24/40px; product gutters of 16px, 24px at `sm`, and up to 40px in wide
console layouts; `max-w-screen-2xl` for broad product pages; `rounded-sm` for
all rectangular components and surfaces; and borders/fill before shadows.
Reserve `rounded-full` for geometry that must remain circular or track-shaped,
such as avatars, radios, switches, sliders, and progress tracks.

**Verify**:
`npm run typecheck` → exit 0 with no TypeScript errors.

### Step 3: Add prototype-backed composition recipes and explicit exclusions

Add concise recipes for console page, dense workspace, catalog, data view,
marketing hero, and document surfaces. Each recipe must state ordering,
hierarchy, density, and action count rather than prescribe a screenshot.

Add an Avoid section that explicitly rejects:

- decorative dashboard-card grids;
- badges, icons, or eyebrows on every heading;
- unestablished glass, glow, gradient, or large-shadow treatments;
- multiple competing accents or primary actions;
- Favorit display inside routine product UI;
- monospace prose, uppercase tracking as decoration, emoji, or non-Lucide UI
  icons;
- hard-coded theme colors and arbitrary one-off radii/spacing;
- desktop layouts that only shrink rather than recompose.

Preserve all existing accessibility, registry installation, derived-output,
and component-inventory guidance.

**Verify**:
`npm run lint` → exit 0, or only pre-existing errors outside
`lib/design-md.ts` are reported and recorded for review.

### Step 4: Make the guide operational for another agent

Add an agent workflow before the final checklist:

1. Identify the user's job and choose one surface mode.
2. Inspect the nearest existing mockup, shell, section, or demo.
3. Install the theme and only required registry items.
4. Establish real content and states before visual polish.
5. Compose with semantic tokens and existing roles; invent a pattern only when
   the registry and prototypes do not cover the job.
6. Verify supported themes plus a 390px mobile viewport, `sm`, `md`, and wide
   desktop as applicable.

Add a conflict rule: preserve a supplied reference's product intent and
content, then translate its treatment into Livepeer tokens and components;
never copy another product's signature.

**Verify**:
`npm run typecheck && npm run lint` → both exit 0, subject only to a separately
recorded pre-existing lint baseline.

### Step 5: Validate the generated artifact, not only the TypeScript template

Run `npm run build`, then `npm run start`. In a second shell, save no files and
run these read-only checks:

```bash
curl -fsS http://localhost:3000/design.md | rg -n \
  "^## (Design thesis|Foundations|Composition|Responsive behavior|Accessibility|Available components|Agent workflow|Avoid|Final check)$"

curl -fsS http://localhost:3000/design.md | rg -n \
  "@livepeer-ui/theme|font-display|emerald-500|max-w-screen-2xl|390px"

curl -fsSI http://localhost:3000/design.md | rg -i \
  "content-type: text/markdown; charset=utf-8"
```

Expected: all commands exit 0; every required section/term appears; the route
still serves Markdown with the correct content type. Manually inspect the
first 250 lines once to confirm the rendered tables and fenced code are valid
Markdown and template interpolation has not leaked into the output.

**Verify**:
`npm run build` → exit 0; all three route checks above exit 0.

## Test plan

This is a generated documentation route with no existing unit-test harness.
Do not introduce a test framework for this plan. The production build plus
HTTP assertions are the characterization test.

Cover these cases:

- The route returns Markdown with the existing content type.
- Registry URLs still interpolate the configured base URL.
- The generated primitive count/list still comes from `registryMeta`.
- All new required sections render.
- Light/dark guidance uses semantic roles rather than copied raw values.
- The guide distinguishes surface modes and includes narrow/mobile review.

## Done criteria

- [ ] Only `lib/design-md.ts` and the plan status row are modified.
- [ ] No root `DESIGN.md` or second source of truth was added.
- [ ] The rendered guide contains a thesis, token roles, typography recipes,
      spacing/shape rules, five surface modes, composition recipes, agent
      workflow, and explicit Avoid rules.
- [ ] Existing registry setup, component inventory, accessibility, responsive,
      maintenance, and final-check guidance remains present.
- [ ] `npm run typecheck` exits 0.
- [ ] `npm run lint` exits 0 or documented output proves every failure is
      pre-existing and outside the in-scope file.
- [ ] `npm run build` exits 0.
- [ ] `/design.md` returns `text/markdown; charset=utf-8` and all required
      `rg` assertions pass.
- [ ] `git status --short` shows no newly modified files outside scope and does
      not disturb the pre-existing untracked inventory/artifact paths.

## STOP conditions

Stop and report back instead of improvising if:

- `lib/design-md.ts` is no longer the sole canonical source for `/design.md`.
- The token roles or radius in `app/globals.css` changed from the current-state
  evidence, or a named typography recipe no longer exists in the exemplar.
- Satisfying the plan requires changing theme tokens, component styling,
  registry metadata, route behavior, or any prototype.
- The component inventory can no longer be generated from `registryMeta`.
- The production build or route assertions fail twice after correcting an
  in-scope Markdown/template error.
- An external reference conflicts with the actual repository; repository
  evidence wins, and the conflict must be reported.

## Maintenance notes

- Review `lib/design-md.ts` whenever `app/globals.css` changes font roles,
  semantic tokens, or radius; prose values should never drift from code.
- New registry components remain self-maintaining through `registryMeta`; do
  not add them manually to narrative sections.
- When a new output family becomes first-class, add a surface-mode recipe only
  after a real prototype establishes its shell, density, and hierarchy.
- Reviewer focus: ensure concrete rules are evidence-backed and do not turn
  one prototype's exception into a universal foundation.
