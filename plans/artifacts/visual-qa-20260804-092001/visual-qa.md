# Cross-surface visual QA

Captured 2026-08-04 from the local Next.js development server. Browser state was checked at 390 × 844 and 1440 × 1000; console, public-marketing, and docs layouts also received a 768 × 900 breakpoint pass. The settled viewport captures (500 ms after DOM readiness) are the authoritative visual evidence. Earlier full-page files are retained as diagnostic artifacts because fixed-height, observed, and animated surfaces did not capture reliably before layout settled.

## Route and viewport matrix

| Family | Route | Mobile | Desktop | Result |
| --- | --- | --- | --- | --- |
| Console product | `/mockups/platform` | 390 × 844 | 1440 × 1000 | Auth gate rendered cleanly; product content blocked |
| Public marketing | `/mockups/agent-landing-page` | 390 × 844 | 1440 × 1000 | Hero hierarchy and CTA remained clear |
| Editorial/playbooks | `/mockups/playbooks` | 390 × 844 | 1440 × 1000 | Mobile actions stacked; desktop actions stayed compact |
| Docs | `/docs` | 390 × 844 | 1440 × 1000 | Sidebar collapsed on mobile; code scrolled within its container |
| Planning | `/marketing/planner` | 390 × 844 | 1440 × 1000 | Access screen rendered; planner itself blocked by password |
| Slides/fixed output | `/docs/slides` | 390 × 844 | 1440 × 1000 | Canvases scaled for preview and preserved aspect ratios |
| Social asset | `/social-assets/avatars/400` | 390 × 844 | 1440 × 1000 | Exact 400 × 400 output; intentional 10 px mobile overflow |
| Email preview | `/mockups/welcome-email` | 390 × 844 | 1440 × 1000 | Fixed email column remained readable and centered |
| Branded motion | `/mockups/waitlist` | 390 × 844 | 1440 × 1000 | Animated field, lockup, form, and CTA remained visible |

Additional 768 × 900 captures cover console, public marketing, and docs. Light-mode evidence is present in the first pass; settled captures exercise dark mode. The docs theme control changed the root theme and retained readable hierarchy, borders, muted text, syntax color, and focusable controls.

## Accepted findings

### [VISUAL-QA-01] Add a documented audit path through gated prototypes

- **Evidence**: `app/mockups/platform/layout.tsx:39` wraps every console route in `PlatformAuthGate`; `components/livepeer-ui/platform-auth-gate.tsx:36` initializes unauthenticated and only restores access from session storage. Both settled `/mockups/platform` captures therefore show the sign-in dialog instead of the console surface.
- **Evidence**: `app/planner-access/page.tsx:73` requires the configured password before rendering planner content. Both settled `/marketing/planner` captures stop at the access screen.
- **Impact**: A zero-context visual audit cannot inspect the console or planning information architecture, density, navigation states, tables, or responsive recomposition without discovering private runtime state or credentials. Those two surface families remain only partially visually verified.
- **Effort**: S
- **Risk**: LOW — keep production access behavior unchanged and expose only a documented local fixture/session setup.
- **Confidence**: HIGH
- **Fix sketch**: Document a non-secret local visual-QA setup that seeds the existing console session-storage key and provides a fixture-only planner preview. Keep the real gates as the default routes and prevent the preview mechanism from being enabled in production.

### [VISUAL-QA-02] Define deterministic routes for non-happy UI states

- **Evidence**: Settled `/mockups/agent-landing-page`, `/mockups/playbooks`, `/docs`, `/docs/slides`, `/mockups/welcome-email`, and `/mockups/waitlist` captures all render populated success fixtures; the captured matrix contains no direct empty, loading, error, or destructive-confirmation state.
- **Impact**: The system can look coherent in representative screenshots while missing spacing, hierarchy, copy, focus, and responsive failures in the states that most often stress reusable components. Future agents cannot reproduce state-level visual checks from a route matrix alone.
- **Effort**: M
- **Risk**: LOW — add fixture/demo coverage without changing default product behavior.
- **Confidence**: HIGH
- **Fix sketch**: Add stable docs/demo fixtures for empty, loading, error, success, and destructive states of the console tables and forms. Reference those routes or state controls in the visual-QA matrix and design guidance.

### [VISUAL-QA-03] Restore the console home feature artwork

- **Evidence**: `/mockups/platform` emitted repeated 404 responses for `/generated/20260725-101313-console-home-cards/orchestrator.png` and `/generated/20260726-2326-console-home-playbooks/playbooks.png` during both viewport passes. `app/mockups/platform/page.tsx:58-64` renders the Sanity-provided `feature.imageSrc` values as the two responsive home-card images.
- **Impact**: After authentication, the console home page shows broken or empty media in its two highest-prominence feature links, weakening hierarchy and making the source-backed visual audit incomplete.
- **Effort**: S
- **Risk**: LOW — limited to restoring assets or correcting the two persisted references.
- **Confidence**: HIGH
- **Fix sketch**: Restore the referenced generated files or migrate the two Sanity values to durable existing asset URLs. Add a route check that fails on local image 404 responses before accepting visual QA.

## Verified exceptions and rejected findings

- **Fixed social canvas is not a responsive defect.** `/social-assets/avatars/400` is 400 px wide at a 390 px viewport because `components/marketing/social-avatar.tsx:7-11` deliberately emits an exact-size export canvas. Classify this as a fixed-output exception, not a migration target.
- **Email column width is intentional.** `components/livepeer-ui/welcome-email.tsx:22` caps the artifact at 500 px; the desktop margin is the preview environment around the email, not wasted product layout.
- **Slide scaling is intentional.** `components/docs/slide-layouts.tsx:193-198` changes preview grids by breakpoint while the internal SVG canvas retains output geometry.
- **No global horizontal overflow was found** in settled responsive surfaces other than the intentional 400 px social export. Docs code remains locally scrollable by `components/docs/code-block.tsx:28`.
- **No high-confidence hierarchy, gutter, action-prominence, or dark-theme defect was accepted** from the ungated settled routes. Initial clipped/blank full-page captures were rejected after settled viewport recapture showed correct layout.

## Areas not visually audited

- Authenticated console pages behind the session gate.
- Planner content behind password access.
- Empty, loading, error, invalid, destructive, and completion states without stable fixtures.
- Interaction sequences beyond theme switching and passive animation settling.
- Every individual docs component and all 49 application routes; this was representative coverage by surface family.

## Artifacts

- Authoritative screenshots: `*--mobile-settled-viewport-390x844.png` and `*--desktop-settled-viewport-1440x1000.png`
- Breakpoint screenshots: `*--tablet-768x900.png` plus settled viewport verification files
- Dark-theme screenshot: `docs--desktop-dark-viewport-1440x1000.png`
- Responsive metrics: `settled-metrics.json`
