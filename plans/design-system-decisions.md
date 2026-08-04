# Livepeer UI design decision register

Baseline: `7edcdff`  
Status: partially approved; remaining owner decisions required before migration
plans execute.

Disposition values:

- **Canonical** — default across applicable surfaces.
- **Named exception** — intentional variation with a defined scope.
- **Deprecated** — superseded or accidental behavior to migrate.
- **Needs owner decision** — evidence establishes the conflict but not intent.

## Proposed decisions

| ID | Topic | Disposition | Proposed rule | Evidence / exception |
|---|---|---|---|---|
| DS-001 | UI typography | Canonical | Inter is the default for product UI, navigation, forms, data, body copy, ordinary headings, docs, and planning content. | `app/globals.css:168-174`; `platform-page.tsx:23-30`; Inter docs |
| DS-002 | Brand display typography | Canonical — approved 2026-08-04 | Favorit Pro is the opt-in brand display face for major marketing statements, editorial titles, fixed-output presentation statements, and intentionally branded conversion moments. | Flagship public heroes using Inter are migration candidates; routine product headings remain Inter. |
| DS-003 | Branded conversion typography | Named exception — approved 2026-08-04 | Favorit is allowed in intentionally branded waitlist/access moments, but not ordinary product dialogs. | `waitlist-sign-in-dialog.tsx:42-52` |
| DS-004 | Email headline typography | Canonical — approved 2026-08-04 | Email headlines remain Inter. Do not combine an email-rendering-contract decision with a typography migration. | `welcome-email.tsx:39-45` |
| DS-005 | Technical typography | Canonical | Favorit Mono is limited to code, commands, paths, IDs, timestamps, and short technical/data annotations. Use tabular numerals where alignment matters. | Repeated settings/table/docs use; font docs |
| DS-006 | Agent display face | Named exception — approved 2026-08-04 | Serpentine/`font-agent` is lockup-only and must not become a heading/body role. Registry packaging or a distributable lockup fallback is required. | `app/layout.tsx:47-52`; Agent components and registry payload |
| DS-007 | Neutral UI colors | Canonical | Semantic background, foreground, card, muted, primary, border, input, ring, destructive, sidebar, and chart roles remain the general UI foundation in light/dark themes. | `app/globals.css:215-282` |
| DS-008 | Livepeer green | Canonical — approved 2026-08-04 | Deprecate brand green on interactive affordances, including buttons, links, hover/focus treatments, selected controls, and product actions. General affordances use neutral semantic tokens. | Current green affordances are migration targets, not precedents. |
| DS-009 | Mark colors | Named exception | Literal SVG/gradient colors belong to approved brand marks and are not generic UI tokens. | `components/brand.tsx` |
| DS-010 | Spacing foundation | Canonical | Use Tailwind's 4px foundation; 8/16/24/40px are common recipe steps, not mandatory spacing on every output. | Cross-surface frequency and shell exemplars |
| DS-011 | Console geometry | Named surface recipe | Responsive 16/24/40px gutters, wide content frame, border-led separation, compact `rounded-sm` geometry, and restrained shadow. | `PlatformPage` and console routes |
| DS-012 | Shape geometry | Canonical — approved 2026-08-04 | Use `rounded-sm` for all rectangular components and surfaces. Reserve `rounded-full` only for geometry that must remain circular or track-shaped, including avatars, radios, switches, sliders, and progress tracks. | Owner direction; normalized registry primitives |
| DS-013 | Public geometry | Named surface recipe | Generous vertical rhythm, full-width sections, singular primary actions, and restrained branded visuals. | Livepeer.org and Agent landing sections |
| DS-014 | Elevation | Canonical | Prefer borders and fill changes for static separation; reserve pronounced shadows for modal, floating, or focused overlay layers. | Console panels versus dialogs/sign-in cards |
| DS-015 | Shell ownership | Canonical | Keep console, public/docs, document, email, slide, and social shells separate; document consistent ownership vocabulary for navigation, scroll, viewport, safe areas, and export. | Incompatible shell contracts across source |
| DS-016 | Responsive review | Canonical | Review responsive UI near 390px, meaningful `sm`/`md` transitions, and wide desktop. Fixed outputs preserve exact geometry inside responsive previews. | Visual QA matrix |
| DS-017 | Long-form semantics | Canonical + variants | Share list, link, quote, code, table, and media behavior; retain separate planning-document and editorial-reading typography/rhythm. | `app/globals.css:10-147` |
| DS-018 | State contract | Canonical | Components and sections declare loading, empty, error, unavailable, disabled, and ready behavior where applicable; visual compositions remain surface-specific. | Product workspaces and visual QA gaps |
| DS-019 | Motion baseline | Canonical | Motion must explain state or brand story and provide a reduced-motion fallback. Remove decorative transforms/continuous animation for users requesting reduction. | Shared primitives and branded motion implementations |
| DS-020 | Branded motion | Named exception | Canvas, SVG, and CSS motion remain separate implementations under one contract for theme palette, viewport density, static fallback, and capture readiness. | Cube stream, delta stream, Venn animation |
| DS-021 | Fixed output | Named exception | Slides and social assets own explicit dimensions, aspect ratio, safe areas, and deterministic export behavior. Do not apply responsive web-shell rules internally. | Slide layouts and social renderers |
| DS-022 | Email artifact | Needs owner decision | Classify `WelcomeEmail` as browser preview only unless a separate email-client-safe renderer is added. | Current Next/Tailwind/shadcn dependencies |
| DS-023 | Component abstraction | Canonical | Prefer the highest current registry level that fits: primitive → component → section. Generate the canonical catalog in `/design.md` from current registry metadata. | Registry metadata and demos. |
| DS-024 | Evidence precedence | Canonical | User requirements → approved decision register and repository tokens → registry metadata/demos → guide prose → external references. External references inform structure, not Livepeer aesthetics. | Audit workflow and Refero guidance |
| DS-025 | Semantic type scale | Canonical — approved 2026-08-04 | Ship code-backed roles for UI caption (12/16), UI body (14/20), reading body (16/28), product page title (32/0.98), and the repeated 36/48/60/fluid display family. Each role owns size, leading, weight, and tracking; font family remains an explicit role choice. | Repeated current production combinations in product shells, public heroes, menus, docs, and technical content; `app/globals.css` |

## Owner approval checkpoint

The following choices materially affect existing visuals and must be approved
before Plan 003 or related migrations are finalized:

1. **Email status** — recommend renaming the current item as a browser preview
   unless production email markup is explicitly in scope.

Approved decisions:

- Brand green is deprecated on affordances. It remains available for
  non-interactive brand expression such as approved marks, diagrams, and
  branded motion. Success/status colors, if needed, must be semantic and must
  not inherit authority from the Livepeer brand hue.
- Favorit is approved as opt-in brand display across marketing, editorial,
  slides, and intentionally branded conversion moments. Inter remains the
  product/UI and email face. The Agent face is lockup-only.
- `rounded-sm` is the canonical radius for all rectangular components and
  surfaces. True circles and track-shaped controls retain `rounded-full`.
- The semantic typography scale is implemented as Tailwind `--text-*` theme
  tokens using values already repeated in current Livepeer surfaces. One-off
  diagram labels and fixed-output sizes do not become shared tokens.

## Explicit deprecations

- Hover-only affordance reveals without a keyboard-focus equivalent.
- Unguarded decorative or spatial motion when reduced motion is requested.
- Treating raw emerald utilities as interchangeable brand, status, and success
  semantics.
- All brand-green interactive affordances, including green CTA buttons, link
  hovers, selected controls, and product actions.
- Documentation claims that the registry contains 31 components or that
  `/design.md` exposes the full installable catalog today.
