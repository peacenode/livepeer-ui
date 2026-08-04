# Plan 004: Remove Livepeer brand color from interactive affordances

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving on. Stop
> on any condition listed below; do not expand the migration to non-interactive
> brand expression.
>
> **Drift check (run first)**:
> `git diff --stat 7edcdff..HEAD -- app components app/globals.css`
> If an in-scope affordance changed, compare it with the current-state evidence
> before proceeding and stop if its intended role is no longer clear.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: MED
- **Depends on**: none
- **Category**: migration
- **Planned at**: commit `7edcdff`, 2026-08-04

## Why this matters

The owner has deprecated Livepeer brand green on interactive affordances. It is
currently repeated on primary buttons, link hovers, selected plans, and product
actions, causing the brand hue to double as an interaction semantic. General
affordances should use the registry's neutral semantic variants; green remains
valid for approved marks, diagrams, branded motion, and other non-interactive
brand expression.

## Current state

Representative migration targets:

- Public CTAs repeat `border-emerald-500 bg-emerald-500 text-white` plus a P3
  green gradient in `components/livepeer-ui/livepeer-org-landing-sections.tsx`
  and `components/livepeer-ui/agent-landing-page.tsx`.
- Form and dialog actions repeat the green treatment in
  `waitlist-signup-form.tsx`, `waitlist-sign-in-dialog.tsx`,
  `api-key-actions.tsx`, and the ecosystem submission dialog.
- `livepeer-org-footer.tsx` and `app/mockups/platform/page.tsx` use emerald as a
  hover affordance.
- `livepeer-agent-promo-cards.tsx` uses emerald border, badge, text, and CTA to
  indicate a featured/selected plan; interaction treatment must become neutral
  while preserving understandable selection through border, weight, label,
  and structure.

Approved non-targets include brand SVG gradients, token diagrams, decorative
auth gradients, canvas/motion palettes, and non-interactive campaign artwork.

## Commands you will need

| Purpose | Command | Expected |
|---|---|---|
| Find candidates | `rg -n "emerald-|color\(display-p3" app components -g '*.tsx'` | every match classified |
| Typecheck | `npm run typecheck` | exit 0 |
| Lint | `npm run lint` | exit 0 or only documented pre-existing failures |
| Validate registry | `npm run registry:validate` | exit 0 |
| Build | `npm run build` | exit 0 |

## Scope

**In scope**:

- Interactive green buttons, links, hover/focus states, selected controls,
  featured-plan affordances, and product actions under `app/` and `components/`.
- Registry metadata descriptions that explicitly promise an emerald action.
- A focused validation rule or script assertion if needed to prevent future
  brand-green affordances.

**Out of scope**:

- `components/brand.tsx` and approved SVG/lockup gradients.
- Non-interactive diagrams, canvas art, branded motion, social artwork, and
  decorative access-page backgrounds.
- Defining a success/warning/error palette beyond existing semantic tokens.
- Any redesign of component structure, content, typography, or page layout.

## Git workflow

- Branch: `codex/remove-brand-color-affordances`.
- Commit as one reviewable migration, for example
  `refactor: remove brand color from affordances`.
- Do not push, open a PR, or deploy without explicit instruction.
- Stage only files changed for this migration; never use `git add -A`.

## Steps

### Step 1: Classify every green occurrence

Run the candidate search and record each match as:

1. interactive affordance — migrate;
2. non-interactive brand expression — preserve;
3. semantic status/data — do not silently treat as brand; stop and report for a
   follow-up decision if no existing neutral/status token fits;

The classification must specifically include public CTA buttons, waitlist
actions, ecosystem submission, API-key creation, email-preview CTA, footer and
research-link hover colors, and featured promo-card actions.

**Verify**: the search output has an explicit classification for every match;
no candidate is migrated based only on color name.

### Step 2: Replace affordances with existing neutral semantics

- Prefer the existing `Button` default, secondary, outline, ghost, or link
  variants instead of new color classes.
- Remove inline P3 green gradients from interactive elements.
- Use `text-foreground`, `text-muted-foreground`, `bg-primary`, `bg-secondary`,
  `border-border`, and standard hover/focus behavior supplied by the primitive.
- Preserve one obvious primary action through variant, order, size, and content;
  do not replace green with another chromatic accent.
- For featured/selected plans, retain a text label and structural distinction so
  state is not conveyed by color alone.

**Verify**: `npm run typecheck` exits 0.

### Step 3: Update registry-facing descriptions and guardrails

Remove descriptions such as “emerald ... action” from canonical registry
metadata when the component has migrated. Add a focused validation check that
flags new interactive classes combining `emerald-*` with button/link/hover/focus
usage, while allowing an explicit path or comment-based exception list for
approved non-interactive brand files.

Do not edit generated `registry.json` or `public/r/*.json` by hand. Regenerate
them through the existing workflow only if metadata or published component
source changed.

**Verify**: `npm run registry:validate` exits 0 after required generated outputs
are refreshed through `npm run registry:build`.

### Step 4: Perform visual and interaction verification

Check representative public landing, waitlist, ecosystem dialog, console API
key action, promo-card, and email-preview surfaces at 390px and 1440px. Confirm:

- primary actions remain obvious;
- hover, keyboard focus, disabled, and destructive states remain distinct;
- no replacement chromatic accent was introduced;
- non-interactive green marks/motion remain unchanged;
- light and dark themes retain adequate contrast.

Save new screenshots to a fresh timestamped artifact folder.

**Verify**: `npm run lint && npm run build` exit 0 and the candidate search shows
no unapproved green affordance.

## Test plan

- Extend the registry validation script with positive fixtures for neutral
  affordances and allowed non-interactive brand expressions.
- Add negative fixtures for an emerald button, emerald link hover, and emerald
  selected control.
- Run keyboard checks for every migrated button/link family.
- Compare representative screenshots against the existing visual-QA artifacts.

## Done criteria

- [ ] Every green occurrence is classified.
- [ ] No canonical interactive affordance uses Livepeer brand green.
- [ ] Approved marks, diagrams, motion, and decorative brand expression are not
      visually altered.
- [ ] Featured/selected state remains understandable without color.
- [ ] Registry descriptions and generated outputs match the migration.
- [ ] Typecheck, lint, registry validation, and production build pass.
- [ ] Mobile/desktop plus light/dark screenshots are saved in a new artifact
      folder.

## STOP conditions

Stop and report if:

- A green use communicates success, availability, or data state and no existing
  semantic replacement is defined.
- Removing green makes primary-action or selected-state hierarchy ambiguous
  without changing layout/content outside scope.
- Registry regeneration changes unrelated items.
- Any verification fails twice after an in-scope correction.

## Maintenance notes

Reviewers should reject future chromatic affordances unless the decision
register is explicitly revised. This policy governs interaction color, not the
continued use of Livepeer green in approved brand expression.
