# Livepeer UI design-system cleanup backlog

Baseline: `7edcdff`  
This backlog is ordered by leverage and dependency. Executor plans must not be
finalized for decision-dependent work until the owner checkpoint in
`design-system-decisions.md` is approved.

## Recommended order

| Order | Work item | Finding(s) | Effort | Depends on | Plan status |
|---:|---|---|---|---|---|
| 1 | Repair docs metadata/count drift and expose canonical catalog | Audit #2, #14 | M | — | Ready to plan |
| 3 | Restore console feature artwork | Audit #15 | S | — | Ready to plan |
| 4 | Approve remaining email-output decision | Audit #12 | Owner | Typography and Agent-face approved | Approval checkpoint |
| 5 | Revise and execute `/design.md` Plan 003 | Agent guidance | M | 2, 4 | Blocked pending approval |
| 6 | Add console mobile navigation | Audit #1 | M | shell recipe approval | Ready after register approval |
| 7 | Establish deterministic visual/state fixtures | Audit #8 | M | — | Ready to plan |
| 8 | Add reduced-motion baseline | Audit #7 | M | motion decision approval | Ready after register approval |
| 9 | Remove brand green from affordances | Audit #5 | M | Approved | Ready to plan |
| 10 | Resolve Agent-face registry packaging | Audit #6 | M | licensing/packaging decision | Blocked pending approval |
| 11 | Consolidate console surface configuration | Audit #9 | M | route and shell tests | Later plan |
| 13 | Consolidate long-form semantic foundations | Audit #11 | M | typography decision approval | Later plan |
| 14 | Clarify or implement email-safe output | Audit #12 | M | email status decision | Blocked pending approval |
| 15 | Make social render readiness explicit | Audit #13 | S | — | Ready to plan |

## Dependency graph

```text
docs/catalog drift ────────────────────────────┐
owner design decisions ────────────────────────┼─> revise Plan 003 ─> execute DESIGN.md
                                              │
shell decision ────────────────> console mobile navigation
                               │
approved green policy ─────────> remove green affordances
Agent-face decision ───────────> registry packaging
email status decision ─────────> preview rename OR email-safe renderer
```

## Plans to create after approval

Default recommendation is to produce executor plans for the five highest
leverage workstreams:

1. Repair docs/catalog drift and registry validation guidance.
2. Remove brand green from affordances using neutral semantic tokens.
3. Revise Plan 003 using the approved decision register.
4. Add console mobile navigation and deterministic state/visual-QA fixtures.

Agent-font and email-rendering plans should follow only after their explicit
decisions are settled.

## Verification baseline for every implementation plan

- `npm run typecheck` — exit 0.
- `npm run lint` — exit 0 or document only pre-existing failures outside scope.
- `npm run registry:validate` — required for registry/docs changes.
- `npm run build` — exit 0 before any push.
- Representative browser verification at 390px and 1440px, plus `sm`/`md`
  when navigation or layout changes.
- Dark theme, keyboard focus, reduced motion, and non-happy states when relevant.
- Stage only explicitly scoped files; never use `git add -A`.
