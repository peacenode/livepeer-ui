# Livepeer UI cross-surface inventory

Baseline: `7edcdff`

## Purpose

Inventory reusable design capabilities across all current output contexts, not
only the two application experiences. This is an evidence map for the decision
register, not a final component roadmap.

## Current surface types

| Surface | Current examples | System needs |
|---|---|---|
| Public site and marketing | Livepeer.org pages, Agent landing, playbooks, ecosystem, waitlist | Brand hierarchy, editorial layout, discovery, conversion, global chrome |
| Console product UI | Home, usage, billing, API keys/logs, settings, organization, compute | Shells, page hierarchy, forms, data views, state feedback |
| Tool product UI | Agent, projects, footage, characters, storyboards, protocol | Dense workspaces, mobile navigation, media actions, empty states |
| Internal planning and content | Marketing planner, rollout flow, markdown documents, playbook briefs | Document hierarchy, process storytelling, review status, structured content |
| Presentations | 16:9 and 9:16 slide layouts | Fixed-canvas grid, brand rails, display type, sequencing |
| Social and campaign assets | Avatars, banners, profile previews, stock images, Open Graph | Fixed-output formats, safe areas, brand marks, export verification |
| Email | Welcome email | Email-safe typography, brand header, content hierarchy, singular CTA |
| Branded motion | Cube stream, Agent delta stream, Foundation Venn, 3D symbol | Motion roles, timing, reduced motion, responsive density, deterministic capture |

## Foundation candidates

These have the broadest reach and should be reviewed before individual pattern
APIs.

| Candidate | Current evidence | Transfer value | Initial classification |
|---|---|---|---|
| Brand marks and lockups | `components/brand.tsx`, social icons, favicon, OG | Same identity across site, product, decks, social, email, motion | Foundation |
| Type roles | Inter, Favorit Pro, Favorit Mono, Agent face; slide and page scales | Hierarchy across responsive UI and fixed canvases | Foundation, needs semantic roles |
| Color roles | Neutral UI tokens, Emerald accents, chart variables, canvas palette | Theme-safe product UI plus recognizable branded media | Foundation, needs reconciliation |
| Layout geometry | Product gutters, max widths, document measures, slide safe areas | Consistent hierarchy without forcing identical layouts | Foundation plus surface recipes |
| Motion behavior | MotionConfig, canvas loops, reduced-motion checks, capture-ready state | Consistent interaction motion and reusable branded animation | Foundation plus motion patterns |
| Content voice and hierarchy | Page headings, summaries, labels, CTA language, metadata | Consistent handoff across product, marketing, decks, and content | Content foundation |
| Asset framing | Aspect ratios, image hotspots, cover behavior, preview/export formats | Reusable imagery across cards, flows, slides, and social | Media foundation |

## Shell and frame candidates

| Candidate | Current implementation | Reusable job | Initial classification |
|---|---|---|---|
| Public site shell | Livepeer.org header, menu, footer, page layouts | Global navigation and public-site orientation | Shared shell |
| Console shell | `PrivateBetaConsoleShell`, `PlatformSidebar`, `PlatformPage` | Persistent navigation, scroll ownership, page header and content | Shared shell, contract review needed |
| Docs/planning shell | `RegistryShell` used by docs and marketing | Navigation around reference and planning content | Shared internal shell |
| Document frame | `MarkdownDocument`, blog article layouts | Readable long-form content with title, summary, date, and prose | Pattern or shared frame |
| Presentation frame | `SlideLayouts`, top/bottom rails, fixed safe areas | Branded fixed-canvas communication | Output-specific shell |
| Email frame | `WelcomeEmail` | Brand-safe transactional or lifecycle content | Output-specific shell |

## Current typography hierarchies

The repo already contains several coherent hierarchy families, but most are
encoded as local Tailwind strings rather than named roles. A direct inventory of
single-line class declarations finds at least 17 distinct `h1` recipes and 26
distinct `h2` recipes across routes and Livepeer UI components. Some variation
is appropriate across surfaces; the missing layer is a deliberate mapping from
those implementations to shared semantic roles.

| Surface family | Current hierarchy | Representative evidence | Main gap |
|---|---|---|---|
| Registry and internal docs | Page title: `text-3xl font-semibold`; section: `text-xl font-semibold`; body: mostly `text-sm`; metadata: `text-xs` | `app/docs/page.tsx`, `app/docs/brand/page.tsx` | Consistent locally, but not exposed as reusable roles |
| Console pages | Page title: fixed 32px, light; feature section: 24px medium; table/subsection titles: 14–18px medium; body: 14px | `components/livepeer-ui/platform-page.tsx`, `components/livepeer-ui/usage-workspace.tsx`, table components | Section importance is represented by several unrelated sizes |
| Public site and branded landing pages | Hero/display: commonly 36px on small screens and 48–60px or fluid 40–64px on larger screens; major section display: 36–60px; body: 14–16px | `components/ui/display-heading.tsx`, `components/livepeer-ui/livepeer-org-landing-sections.tsx`, `components/livepeer-ui/agent-landing-page.tsx` | Multiple hero recipes and continuous viewport scaling reduce consistency |
| Editorial and playbooks | Article/catalog title: roughly 30–48px, often light; metadata: 14px; prose uses a constrained reading measure | Blog and playbook detail routes | Title scales differ by template without a named editorial role |
| Dialogs and focused tasks | Dialog title: commonly 24px medium, sometimes stepping to 30px; supporting copy: 14px | API-key dialogs and ecosystem submission dialog | Branded waitlist dialogs use a separate display treatment without a stated exception |
| Metrics and data summaries | Metric: 24–60px medium with Inter tabular numerals; label: 12–14px | `CreditBalance`, `ComputeMetrics`, billing summaries | Metric prominence changes per component without size tiers or guidance |

### Fluid display sizing currently in use

Viewport-fluid text appears in the shared `DisplayHeading`, the Livepeer.org
network hero, the compute hero, the waitlist confirmation, and an Agent access
section. Several other branded headings use explicit breakpoint jumps such as
`text-4xl sm:text-6xl`. DS-015 establishes the desired direction: retain only
necessary small-to-large breakpoint steps and use a fixed size across ordinary
large-screen widths.

## Pattern candidates

| Pattern | Current examples | Where it can transfer | Initial recommendation |
|---|---|---|---|
| Search and filter discovery | Blog index, ecosystem catalog, playbook catalog | Marketing catalogs, content libraries, product media | Shared behavior component plus pattern guidance |
| Catalog composition | Ecosystem cards, playbook cards, media libraries, stock images | Product, marketing, content | Pattern with selectable card/grid implementations |
| Copy and install action | Copy button, install command, Agent hero/footer | Product onboarding, marketing, docs, decks with companion links | Shared interaction and content pattern |
| Page header and action | `PlatformPage`, workspace headers, document headers | Console, tools, planning content | Shared hierarchy pattern; component by shell |
| Metrics and summaries | Usage metrics, compute metrics, credit balance, billing summary | Product dashboards, reports, decks | Data hierarchy pattern with output-specific rendering |
| Tabular data | Usage, resources, invoices, API keys/logs, orchestrators | Product UI, reports, content exports | Data-view pattern before one universal component |
| Status and metadata | Badges used for state, category, filters, plan, date | Product, content, planning, decks | Semantic roles before additional components |
| Empty and unavailable states | Client empty state, table empty rows, invoice empty block | Product tools and catalogs | Shared state contract plus small reusable composition |
| Settings and forms | Account, project, organization, API key dialogs | Console and future admin surfaces | Pattern plus stable field/section compositions |
| Structured storytelling | Protocol flow, request flow, rollout flow, feature sections | Marketing, decks, product education, content | Cross-surface narrative pattern family |
| Media object actions | Clip cards, media context menu, project picker | Product tools, content libraries, campaign asset management | Shared product behavior components |
| Conversion and access | Waitlist, signup, auth gate, install CTA, promo plans | Marketing and product onboarding | Pattern family; avoid one universal conversion component |

## Branded motion and visual-language candidates

These should not automatically become generic UI components. Their reusable
value may be a controlled visual-language toolkit with deterministic outputs.

| Candidate | Existing capability | Potential surfaces |
|---|---|---|
| Cube stream | Responsive canvas field, inverted mode, banner/card/default variants, deterministic capture controls | Heroes, section backgrounds, decks, product launch animations, social video |
| Agent delta stream | Branded particle fan with theme and reduced-motion support | Agent storytelling, launch content, presentation interstitials |
| Foundation Venn | Semantic relationship animation with reduced-motion fallback | Foundation page, protocol education, decks, explainers |
| Livepeer 3D symbol | Theme-aware 3D brand object and lighting | Marketing, product moments, motion exports |
| Slide rails | Logo, context, date, section, page number, fixed safe areas | Decks, vertical social slides, recorded presentations |

## Initial inventory takeaways

1. The strongest shared layer is not limited to product components. Brand,
   typography, layout geometry, content hierarchy, motion behavior, and asset
   framing already connect all surface types.
2. Shells should remain output-aware. Console, tool, public site, document,
   presentation, and email frames share foundations but solve different layout
   constraints.
3. Search/filter, copy/install, status, empty states, and structured storytelling
   are the clearest cross-surface pattern candidates.
4. Data tables and settings are strong product-system candidates; their deck or
   marketing equivalents should reuse semantic hierarchy and formatting rather
   than the same interactive component.
5. Branded motion deserves explicit standards for timing, density, reduced
   motion, theming, and capture. It should not be treated as incidental page
   decoration.

## Questions this inventory should resolve

- Which output types are first-class members of Livepeer UI?
- Which foundations must remain identical across responsive and fixed canvases?
- Which patterns share semantics but need separate implementations per output?
- Which current artifacts require a temporary Draft or Deprecated label?
- Which patterns need code-level enforcement versus documentation and examples?
