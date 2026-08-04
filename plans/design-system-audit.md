# Livepeer UI cross-surface design-system audit

Baseline: `7edcdff`  
Audit date: 2026-08-04  
Method: two read-only three-agent waves, followed by root-agent evidence vetting.

## Executive conclusion

Livepeer UI does not need one universal visual treatment. It already contains a
coherent shared foundation and several legitimate surface recipes:

- Inter-led, compact product UI;
- spacious public and editorial compositions;
- readable planning and documentation surfaces;
- fixed presentation, social, and email outputs;
- governed branded motion.

The main problem is not poor visual quality. The system's decisions are encoded
in individual components instead of named semantic roles. That makes deliberate
differences look like drift and forces agents to reconstruct intent from source.

Favorit usage is not broadly wrong. Evidence supports Favorit Pro as a brand
display face across editorial titles and presentation statements, with Inter as
the routine product/UI face. The current documentation's phrase “marketing
display copy” is too narrow, while several flagship marketing heroes currently
inherit Inter and therefore require an owner decision before migration.

## Prioritized findings

| # | Finding | Category | Impact | Effort | Risk | Confidence | Primary evidence |
|---:|---|---|---|---|---|---|---|
| 1 | Add console mobile navigation | Responsive/access | Console navigation disappears below `md` | M | MED | HIGH | `components/livepeer-ui/platform-sidebar.tsx:35-39`, `app/mockups/platform/layout.tsx:43-54` |
| 2 | Expose the canonical installable catalog in `/design.md` | Agent guidance | Guide lists primitives but omits documented components and sections | S docs / M metadata cleanup | MED | HIGH | `lib/design-md.ts:118-131`, `lib/docs.ts:25-39` |
| 4 | Resolve semantic typography roles | Foundation/docs | Agents cannot distinguish Inter defaults from valid Favorit exceptions | S decision / M migration | MED | HIGH | `app/globals.css:168-174`, `components/ui/display-heading.tsx:15-20`, `platform-page.tsx:23-30` |
| 5 | Remove brand green from affordances | Foundation/migration | Buttons, links, hover states, selected controls, and product actions currently use a brand color that is now reserved for non-interactive expression | M | MED | HIGH | `livepeer-org-landing-sections.tsx:28-41`, `api-key-actions.tsx:75-85`, `livepeer-org-footer.tsx:31,66` |
| 6 | Repair Agent display-face registry packaging | Registry correctness | Installed Agent blocks rely on an undefined `font-agent` role | M | MED | HIGH | `app/layout.tsx:47-52`, `livepeer-agent-hero.tsx:36-40`, `public/r/livepeer-agent-hero.json` |
| 7 | Establish a reduced-motion baseline | Accessibility | Shared dialogs, skeletons, and media hover transforms do not consistently honor preference | M | LOW | HIGH | `components/ui/dialog.tsx:26-56`, `components/ui/skeleton.tsx:3-8`, `livepeer-org-menu.tsx:17-36` |
| 8 | Define state contracts and deterministic state fixtures | System/testability | Loading, error, unavailable, destructive, and completion states are not consistently modelled or visually auditable | M | MED | HIGH | `api-logs-section.tsx:35-56`, `usage-workspace.tsx:27-45`, visual QA matrix |
| 9 | Consolidate console route-family configuration | Architecture | Copies, re-exports, and URL rewrites obscure ownership between platform and private-beta consoles | M | MED | HIGH | `app/mockups/platform/page.tsx`, `app/mockups/private-beta/landing/console/page.tsx`, both shell implementations |
| 11 | Separate shared prose semantics from density recipes | Architecture | Planner and editorial prose duplicate semantics while differing in undocumented rhythm | M | MED | HIGH | `app/globals.css:10-147`, `components/marketing/markdown-document.tsx:16-49` |
| 12 | Clarify browser email preview versus deliverable email | Output contract | Registry item appears sendable but relies on Next, Tailwind, SVG, and browser layout | M | MED | HIGH | `components/livepeer-ui/welcome-email.tsx:1-76`, `app/mockups/welcome-email/page.tsx:11-17` |
| 13 | Make social-asset render readiness explicit | Output correctness | Optional artwork is force-asserted at the render boundary | S | LOW | HIGH | `lib/social-assets.ts:1-16`, `social-banner.tsx:5-20`, `social-avatar.tsx:5-20` |
| 14 | Repair documentation drift and validation workflow | Docs/DX | README disagrees on preset and count; maintenance steps omit registry validation | S | LOW | HIGH | `README.md:3-8`, `lib/docs.ts:5-9`, `package.json`, `lib/design-md.ts:133-143` |
| 15 | Restore console feature artwork | Visual correctness | Two highest-prominence console feature images return 404 | S | LOW | HIGH | visual QA logs; `app/mockups/platform/page.tsx:58-64` |

## Canonical evidence by surface

### Foundations

- `app/globals.css:168-237` establishes Inter, Favorit Pro, Favorit Mono,
  Agent-face, semantic neutral colors, and a 0.625rem radius scale.
- Inter is consistently used for routine product UI, ordinary headings, forms,
  and data. Favorit Mono is consistently used for code and identifiers.
- Favorit Pro is deliberately used for editorial titles, shared display
  headings, slides, and some branded conversion moments. Its role is broader
  than the current “marketing-only” wording.
- Lucide is the only interface icon system found.
- Livepeer green is visually coherent but semantically unresolved: brand
  action, positive state, link hover, diagrams, and mark gradients are separate
  jobs and must not be collapsed into one meaning.

### Console product UI

- `PlatformPage` is the strongest frame precedent: responsive 16/24/40px
  gutters, `max-w-screen-2xl`, a light 32px Inter title, and 40px content gaps.
- Compact `rounded-sm` geometry and border-led separation recur throughout the
  console.
- The desktop sidebar is usable but incomplete as a canonical shell because it
  disappears on mobile without a replacement.
- Page actions vary between 40px and 64px heights; this needs a named hierarchy
  rather than a global button-size migration.

### Public, editorial, docs, and planning

- Public surfaces use large breathing room, light/tight statements, singular
  actions, imagery, and branded motion.
- Flagship public heroes currently use the display recipe without selecting
  `font-display`; this conflicts with written Favorit guidance.
- Editorial titles explicitly use Favorit and a wider reading rhythm.
- Planning documents intentionally use denser Inter-led hierarchy.
- Planner and editorial prose should share semantic behavior, not identical
  type scale and rhythm.

### Fixed output, email, and motion

- Slides and social assets correctly retain exact aspect ratios, safe areas,
  and output geometry in responsive previews.
- A 400px social canvas overflowing a 390px browser viewport is intentional,
  not a responsive defect.
- The current welcome-email component is a browser preview. It is not evidence
  of email-client-safe markup.
- Branded motion implementations should remain distinct, while sharing rules
  for reduced motion, theme palette, responsive density, and capture readiness.

## Visual QA matrix

The representative matrix is documented in
`plans/artifacts/visual-qa-20260804-092001/visual-qa.md` with 50 screenshots and
settled viewport metrics.

| Family | Route | Mobile | Desktop | Additional coverage | Result |
|---|---|---:|---:|---|---|
| Console | `/mockups/platform` | 390×844 | 1440×1000 | 768×900 | Gate verified; product content blocked |
| Public marketing | `/mockups/agent-landing-page` | 390×844 | 1440×1000 | 768×900 | Clear hierarchy and CTA |
| Editorial/playbooks | `/mockups/playbooks` | 390×844 | 1440×1000 | — | Actions recompose correctly |
| Docs | `/docs` | 390×844 | 1440×1000 | 768×900, dark | Responsive nav and local code scrolling |
| Planning | `/marketing/planner` | 390×844 | 1440×1000 | — | Gate verified; content blocked |
| Slides | `/docs/slides` | 390×844 | 1440×1000 | — | Output geometry preserved |
| Social | `/social-assets/avatars/400` | 390×844 | 1440×1000 | — | Intentional fixed 400px canvas |
| Email preview | `/mockups/welcome-email` | 390×844 | 1440×1000 | — | Intentional 500px preview column |
| Branded motion | `/mockups/waitlist` | 390×844 | 1440×1000 | settled frames | Lockup, form, and animation visible |

No additional high-confidence global hierarchy, gutter, CTA-prominence,
dark-theme, or horizontal-overflow defect was found on accessible settled
routes.

## Areas not audited

- Authenticated console content behind the session gate.
- Planner content behind password access.
- Every individual route; coverage was representative by surface family.
- Non-happy states without deterministic fixtures.
- Full keyboard interaction sequences and screen-reader testing.
- Email-client rendering, production export pipelines, and licensing review for
  redistribution of the Agent display face.
- Backend correctness, security, dependency health, and unrelated engineering
  concerns.

## Considered and rejected

- **One universal shell** — rejected because console, public, email,
  and fixed-output surfaces own incompatible navigation, scrolling, and safe
  areas.
- **Favorit is marketing-only** — rejected as incomplete; editorial and slides
  provide strong counter-evidence.
- **Favorit should replace every large Inter heading** — rejected; product UI
  and several current public compositions intentionally use Inter-like metrics.
- **Brand green on affordances** — deprecated by owner decision. General
  interactive states must use neutral semantic tokens; non-interactive marks,
  diagrams, and branded motion may retain approved green treatments.
- **One universal empty-state component** — rejected; unify state semantics and
  accessibility, not table/workspace/catalog composition.
- **One prose density** — rejected; planner and editorial reading rhythms serve
  different jobs.
- **Responsive fixed-output canvases** — rejected; exact dimensions and safe
  areas are the product for slides and social exports.
