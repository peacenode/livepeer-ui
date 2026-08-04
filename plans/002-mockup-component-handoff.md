# Mockup component handoff

## Scope

This inventory covers the two current public mockup namespaces:

1. **Livepeer Agent** — `/mockups/livepeer-agent`
2. **Livepeer.org** — `/mockups/livepeer-org`

The source directories still use the older internal names
`app/mockups/platform` and `app/mockups/playbooks`. `next.config.ts` rewrites
the current public routes to those backing implementations. In this document, **route** always means the
canonical public URL; **source** means the current backing filesystem path.

The waitlist experiment is not included. It is a separate single-page concept and
does not share the information architecture of these two products.

The goal is to make every handoff unit land at one of three levels:

- **Primitive** — generic UI behavior or styling with no product language.
- **Component** — reusable product UI with a focused responsibility.
- **Page section** — a complete, independently renderable page zone that owns its
  layout and composes primitives/components, but does not own the page shell.

Pages should become assembly files. A page may fetch/prepare data and compose
sections, but should not contain the implementation of cards, tables, forms,
dialogs, galleries, or hero zones.

## Boundary rules

Use these rules when extracting or reviewing a handoff:

| Level | May know product language? | May own data mutation? | May own page-width/layout? | Example |
| --- | --- | --- | --- | --- |
| Primitive | No | No | No | `Button`, `Tabs`, `InputGroup` |
| Component | Yes | Local interaction only | No | `ProjectPicker`, `MediaCard`, `ApiKeyMenu` |
| Page section | Yes | Through callbacks/hooks | Yes, inside its zone | `GenerationHistorySection` |
| Page/shell | Yes | Data loading and orchestration | Yes | `PlatformShell`, route `page.tsx` |

A section is handoff-ready when it:

- exports a named component;
- has a single typed props object;
- receives records and callbacks instead of importing mock data;
- includes loading, empty, and error affordances where applicable;
- owns its responsive layout at `sm` and `md`;
- does not know its route pathname unless navigation is its purpose;
- can render in isolation with fixture data;
- lists the primitives and product components it depends on.

## Target filesystem

```text
components/
  ui/                         # shadcn primitives only
  brand/                      # Livepeer marks and product lockups
  shared/                     # cross-product composites
    data-table/
    empty-state/
    media/
    metric/
    page-header/
  livepeer-agent/
    components/
    sections/
    shell/
  livepeer-org/
    components/
    sections/
    shell/
  client/
    components/
    sections/
    shell/
```

Do not place product composites back in `components/ui`. Do not use a generic
`components/common` folder. A component belongs in `shared` only after two
products use the same API, not merely because two implementations look similar.

## Shared primitive inventory

Existing primitives in `components/ui` used across the mockups:

- Actions: `Button`, `ToggleGroup`
- Forms: `Input`, `Textarea`, `Label`, `Checkbox`, `Switch`, `Select`,
  `InputGroup`
- Navigation: `Tabs`, `DropdownMenu`, `Sheet`, `Breadcrumb`
- Feedback: `Alert`, `Badge`, `Progress`, `Spinner`
- Overlays: `Dialog`, `AlertDialog`, `ContextMenu`
- Data/display: `Card`, `Table`, `Avatar`, `Attachment`

Potential shared composites, to extract only with stable APIs:

| Composite | Suggested contract | Current evidence |
| --- | --- | --- |
| `PageHeader` | `title`, `description?`, `actions?`, `backHref?` | Repeated in all three products |
| `MetricCard` | `label`, `value`, `detail?`, `progress?` | Platform compute, usage, billing |
| `ResponsiveDataTable` | semantic table plus mobile overflow policy | Platform API, logs, billing, members |
| `MediaThumbnail` | `src`, `alt`, `duration?`, `onOpen?`, overlay slot | Client create, footage, projects |
| `MediaLightbox` | media preview plus metadata/actions aside | Client create, characters, projects |
| `MediaUploadDropzone` | file policy, selected files, drop callbacks | Client storyboards, characters, projects |
| `EmptyState` | `icon`, `title`, `description?`, `action?` | Client collections and Livepeer Agent tables |

## Mockup 1: Livepeer Agent

Public route: `/mockups/livepeer-agent`

Backing source: `app/mockups/platform`

### Shell zones

Current sources:

- `app/mockups/platform/layout.tsx`
- `components/livepeer-ui/platform-auth-gate.tsx`
- `components/livepeer-ui/platform-sidebar.tsx`
- `components/livepeer-ui/platform-mobile-nav.tsx`
- `components/livepeer-ui/project-menu.tsx`
- `components/livepeer-ui/user-menu.tsx`
- `components/livepeer-ui/platform-page.tsx`

Target organization:

```text
components/livepeer-agent/shell/
  livepeer-agent-shell.tsx
  livepeer-agent-auth-gate.tsx
  livepeer-agent-sidebar.tsx
  livepeer-agent-mobile-nav.tsx
components/livepeer-agent/components/
  project-switcher.tsx
  user-menu.tsx
  livepeer-agent-page-header.tsx
components/livepeer-agent/sections/
  livepeer-agent-page-frame.tsx
```

`LivepeerAgentShell` owns the fixed desktop sidebar, mobile header, content
viewport, and max-width. `LivepeerAgentPageFrame` owns the page header and optional panel
variant. Route sections render inside that frame.

### Home

Public route: `/mockups/livepeer-agent`

Current source: `app/mockups/platform/page.tsx`

| Zone | Handoff section | Child components | Primitives |
| --- | --- | --- | --- |
| Page frame | `LivepeerAgentHomePage` assembly | `LivepeerAgentPageFrame` | — |
| Onboarding | `LivepeerAgentOnboardingSection` | onboarding steps, compatibility row | `Card`, `Button` |
| Product entry points | `ProductEntryGridSection` | `ProductEntryCard` | `Card`, `Button` |
| Quick links | `DeveloperLinksSection` | `DeveloperLink` | `Button`/link |

The existing `LivepeerAgentOnboardingSection` should remain a section only if it continues
to own the full-width onboarding zone. Otherwise split it into
`OnboardingProgress` and `OnboardingStep`.

### Compute

Public route: `/mockups/livepeer-agent/compute`

Current source: `app/mockups/platform/compute/page.tsx`

| Zone | Handoff section | Child components | Primitives |
| --- | --- | --- | --- |
| Header/action | `ComputeHeaderSection` | external docs action | `Button` |
| Network summary | `ComputeMetricsSection` | `MetricCard` | `Card` |
| Orchestrators | `OrchestratorTableSection` | address cell, status cell | `Table`, `Badge` |

Current reusable implementation: `components/livepeer-ui/orchestrator-table.tsx`.
Move it under `components/livepeer-agent/sections` and pass rows, loading state,
error, and refresh callback as props.

### Inference container detail

Public route: `/mockups/livepeer-agent/inference/[container]`

Current source: `app/mockups/platform/inference/[container]/page.tsx`

| Zone | Handoff section | Child components | Primitives |
| --- | --- | --- | --- |
| Container identity | `ContainerHeaderSection` | back action, repository action, license badge | `Button`, `Badge` |
| Container metrics | `ContainerMetricsSection` | `MetricCard` | `Card` |
| Images | `ContainerImagesSection` | image tag row | `Table` |
| Endpoints | `ContainerEndpointsSection` | endpoint token | `Badge` |
| Local run | `ContainerRunCommandSection` | command display/copy action | `Card`, `Button` |

The page keeps `generateStaticParams`, `generateMetadata`, lookup, and
`notFound`. Everything after data resolution becomes section composition.

### API keys

Public route: `/mockups/livepeer-agent/api`

Current source: `app/mockups/platform/api/page.tsx`

| Zone | Handoff section | Child components | Primitives |
| --- | --- | --- | --- |
| Header/create action | `ApiKeysHeaderSection` | `CreateApiKeyDialog` | `Dialog`, `Button`, `Input` |
| Search | part of `ApiKeysTableSection` | search field | `Input` |
| Keys table | `ApiKeysTableSection` | status badge, key value, row actions | `Table`, `Badge`, `DropdownMenu` |
| Delete confirmation | `DeleteApiKeyDialog` | — | `AlertDialog` |

Rename `ApiKeyActions` to the action it performs; avoid “actions” components
whose ownership is unclear.

### API logs

Public route: `/mockups/livepeer-agent/api-logs`

Current source: `app/mockups/platform/api-logs/page.tsx`

| Zone | Handoff section | Child components | Primitives |
| --- | --- | --- | --- |
| Header actions | `ApiLogsHeaderSection` | refresh, clear | `Button` |
| Filters | `ApiLogFilters` | endpoint query, errors-only toggle | `Input`, `Switch`, `Label` |
| Log results | `ApiLogTableSection` | method/status/error cells | `Table`, `Badge` |

### Usage

Public route: `/mockups/livepeer-agent/usage`

Current source: `app/mockups/platform/usage/page.tsx`

| Zone | Handoff section | Child components | Primitives |
| --- | --- | --- | --- |
| View switcher | `UsageViewTabs` | overview/activity triggers | `Tabs` |
| Plan summary | `UsagePlanSection` | plan card, allowance rows | `Card`, `Badge`, `Progress` |
| Credit options | `UsageCreditsSection` | purchase option | `Card`, `Button`, `Badge` |
| Activity summary | `UsageActivityMetricsSection` | `MetricCard` | `Card` |
| Daily activity | `DailyUsageTableSection` | usage row | `Table` |
| Resource activity | `ResourceUsageTableSection` | usage row | `Table` |

### Billing

Public route: `/mockups/livepeer-agent/billing`

Current source: `app/mockups/platform/billing/page.tsx`

| Zone | Handoff section | Child components | Primitives |
| --- | --- | --- | --- |
| Billing summary | `BillingSummarySection` | period metric, payment method | `Card`, `Button` |
| Invoice history | `InvoiceHistorySection` | invoice row/download | `Table`, `Badge`, `Button` |

### Project settings

Public route: `/mockups/livepeer-agent/settings`

Current source: `app/mockups/platform/settings/page.tsx`

| Zone | Handoff section | Child components | Primitives |
| --- | --- | --- | --- |
| Settings navigation | `ProjectSettingsTabs` | — | `Tabs` |
| General | `ProjectGeneralFormSection` | identity fields, region field, key policy | form primitives |
| Members | `ProjectMembersSection` | invite action, access table | `Button`, `Table` |

### Organization settings

Public route: `/mockups/livepeer-agent/organization`

Current source: `app/mockups/platform/organization/page.tsx`

| Zone | Handoff section | Child components | Primitives |
| --- | --- | --- | --- |
| Settings navigation | `OrganizationSettingsTabs` | — | `Tabs` |
| General | `OrganizationGeneralFormSection` | identity fields | form primitives |
| Members | `OrganizationMembersSection` | member avatar/role row | `Avatar`, `Badge`, `Table` |
| Billing summary | `OrganizationBillingSummarySection` | period and balance metrics | `Card`, `Button` |
| Payment methods | `PaymentMethodsSection` | method row | `Table`, `Badge` |
| Invoice history | shared `InvoiceHistorySection` | invoice row | `Table`, `Badge`, `Button` |

### Account

Public route: `/mockups/livepeer-agent/account`

Current source: `app/mockups/platform/account/page.tsx`

| Zone | Handoff section | Child components | Primitives |
| --- | --- | --- | --- |
| Profile | `AccountProfileFormSection` | avatar upload, profile fields | `Avatar`, form primitives |
| Session actions | `AccountSessionActionsSection` | save, sign out | `Button` |

## Mockup 2: Livepeer.org

Public route: `/mockups/livepeer-org`

Backing source: `app/mockups/playbooks`

### Shell zones

Current sources:

- `app/mockups/playbooks/layout.tsx`
- `app/mockups/playbooks/landing-menu.tsx`
- `components/site-footer.tsx`

Target organization:

```text
components/livepeer-org/shell/
  marketing-shell.tsx
  marketing-header.tsx
  marketing-mobile-menu.tsx
  marketing-footer.tsx
components/livepeer-org/components/
  agent-compatibility.tsx
  livepeer-agent-lockup.tsx
  playbook-card.tsx
  reliability-rating.tsx
components/livepeer-org/sections/
  ...
```

`LandingMenu` currently contains both desktop navigation and mobile sheet
behavior. Split it into `MarketingNav` and `MarketingMobileMenu`, with a shared
navigation data model.

### Landing page

Public route: `/mockups/livepeer-org`

Current source: `app/mockups/playbooks/playbooks-workspace.tsx`

| Zone | Handoff section | Child components | Primitives |
| --- | --- | --- | --- |
| Network hero | `NetworkHeroSection` | animated cube field, primary/secondary CTAs | `Button` |
| Agent feature | `AgentFeatureSection` | season mark, agent lockup, compatibility row | `Button` |
| Orchestrator CTA | `OrchestratorCtaSection` | inverted cube field, CTA | `Button` |

The current `PlaybooksWorkspace` should disappear after extraction; the page can
render these three sections directly. `LivepeerCubeStream` remains a product
visual component, not a primitive.

### Playbook library

Public routes:

- `/mockups/livepeer-org/library`
- `/mockups/livepeer-org/library/[slug]`

Current sources:

- `app/mockups/playbooks/library/page.tsx`
- `app/mockups/playbooks/source-catalog.tsx`
- `app/mockups/playbooks/library/[slug]/page.tsx`

| Zone | Handoff section | Child components | Primitives |
| --- | --- | --- | --- |
| Library intro | `PlaybookLibraryHeaderSection` | title/description | — |
| Search/catalog | `PlaybookCatalogSection` | `PlaybookSearch`, `PlaybookCard` | `Input` |
| Detail identity | `PlaybookDetailHeaderSection` | breadcrumb, tags, reliability rating | `Breadcrumb`, `Badge` |
| Brief | `PlaybookBriefSection` | summary, inputs, deliverables | `Card`, `Badge` |
| Run configuration | `PlaybookRunFormSection` | `PlaybookBriefForm` | form primitives |
| Install footer | `InstallAgentFooterSection` | compatibility row, motion visual | `Button` |

`SourceCatalog` mixes filtering behavior and card rendering. Keep filtering in
`PlaybookCatalogSection`; extract a presentational `PlaybookCard`.

### Agent install

Public route: `/mockups/livepeer-org/agent`

Current source: `app/mockups/playbooks/install/page.tsx`

| Zone | Handoff section | Child components | Primitives |
| --- | --- | --- | --- |
| Install hero | `AgentInstallHeroSection` | Livepeer Agent stream, lockup, compatibility | `Button` |
| Install steps | `AgentInstallStepsSection` | numbered step, command block | `Card`, `Button` |
| Requirements | `AgentRequirementsSection` | requirement row | `Badge` |

### Ecosystem

Public route: `/mockups/livepeer-org/ecosystem`

Current sources:

- `app/mockups/playbooks/ecosystem/page.tsx`
- `app/mockups/playbooks/ecosystem/ecosystem-catalog.tsx`
- `app/mockups/playbooks/ecosystem/submit-ecosystem-dialog.tsx`

| Zone | Handoff section | Child components | Primitives |
| --- | --- | --- | --- |
| Intro/actions | `EcosystemHeaderSection` | submit action | `Button`, `Dialog` |
| Filters | `EcosystemFilters` | query, category toggles | `Input`, `ToggleGroup` |
| Directory | `EcosystemCatalogSection` | `EcosystemCard` | `Badge`, `Card` |
| Submission | `SubmitEcosystemDialog` | submission form | form primitives, `Dialog` |

### Earn

Public route: `/mockups/livepeer-org/compute`

Current source: `app/mockups/playbooks/compute/page.tsx`

| Zone | Handoff section | Child components | Primitives |
| --- | --- | --- | --- |
| Orchestrator hero | `EarnHeroSection` | value proposition, CTA | `Button` |
| Earnings model | `EarningsModelSection` | earning mechanism cards | `Card` |
| Requirements | `OrchestratorRequirementsSection` | requirement rows | `Table`/list |
| Start CTA | `EarnStartSection` | final action | `Button` |

## Handoff package format

Every extracted section should ship as one reviewable unit:

```text
components/<product>/sections/<section-name>/
  <section-name>.tsx
  <section-name>.types.ts       # only when types are shared externally
  <section-name>.fixtures.ts    # mockup/demo data, never imported by production page
  <section-name>.test.tsx       # interaction and state tests
  index.ts                      # narrow public export
```

The handoff note for each section must include:

1. **Purpose** — one sentence naming the user task.
2. **Inputs** — prop names, data ownership, and nullable states.
3. **Outputs** — callbacks/events and payload types.
4. **States** — default, loading, empty, error, disabled, selected.
5. **Responsive behavior** — explicit mobile/tablet/desktop changes.
6. **Dependencies** — primitives and product components.
7. **Acceptance checks** — keyboard, focus, overflow, long text, reduced motion.

## Extraction order

Each step is a separate local commit and must leave the production build
passing.

1. **Create product folders and move existing named components without changing
   behavior.** Fix imports only. Do not introduce barrel exports across entire
   products.
2. **Extract shells.** Livepeer Agent shell, Livepeer.org marketing shell, and
   Client desktop and mobile navigation become stable boundaries.
3. **Extract high-reuse composites.** `PageHeader`, `MetricCard`,
   `MediaThumbnail`, `MediaUploadDropzone`, `MediaLightbox`,
   `CreateProjectDialog`.
4. **Split Client workspaces.** Start with Create, then Projects, then
   Storyboards/Characters. Move state into page hooks and pass typed records and
   callbacks to sections.
5. **Split Livepeer Agent routes.** Compute/API/usage first because their tables
   and metrics establish the reusable contracts; settings and account follow.
6. **Split Livepeer.org routes.** Landing page first, then catalog/detail,
   ecosystem, install, and earn.
7. **Add isolated section fixtures/tests.** Verify every section at narrow mobile
   width, `sm`, and `md`, with long labels and empty data.
8. **Make routes assembly-only.** Final route files should contain metadata,
   data loading, redirects/not-found handling, and section composition.

## Definition of done

The reorganization is complete when:

- no route file implements a card, table row, dialog, form, gallery, or hero;
- no product workspace exceeds roughly 250 lines without a documented reason;
- all three shells use one navigation model per product;
- mock data lives outside component implementations;
- all section callbacks have typed payloads;
- shared components have at least two real consumers;
- desktop, `sm`, and `md` layouts have been run and visually checked;
- keyboard navigation and dialog focus have been verified;
- `npm run build` passes;
- each extraction is a focused local commit with only touched files staged.
