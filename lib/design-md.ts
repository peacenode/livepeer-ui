import registryMeta from "@/lib/registry-meta.json"

type RegistryComponent = (typeof registryMeta.components)[number]

function componentInventory(components: RegistryComponent[]) {
  return components
    .map((component) => `- \`${component.name}\` — ${component.description}`)
    .join("\n")
}

function catalogInventory() {
  return registryMeta.catalog
    .map(
      (group) => `### ${group.title}\n\n${group.items
        .map(
          (item) =>
            `- \`${item.name}\` (${item.level}) — ${item.description}`
        )
        .join("\n")}`
    )
    .join("\n\n")
}

export function createDesignMarkdown(baseUrl: string) {
  const registryUrl = `${baseUrl}/r/{name}.json`
  const components = componentInventory(registryMeta.components)
  const catalog = catalogInventory()
  const catalogCount = registryMeta.catalog.reduce(
    (total, group) => total + group.items.length,
    0
  )
  const itemCount = registryMeta.components.length + catalogCount

  return `---
name: livepeer-ui-design-guidelines
description: "Build interfaces with the Livepeer UI registry, its theme, brand assets, and custom shadcn components. Use for Livepeer product surfaces, tools, documentation, dashboards, and prototypes that should feel native to this design system."
---

# Build with Livepeer UI

Use this registry as the source of truth for interface foundations and components. Preserve the host application's framework and structure, then install and compose Livepeer UI rather than recreating its primitives.

## Design thesis

Livepeer UI uses neutral canvases, precise borders, restrained typography, and compact product controls. Public surfaces introduce more breathing room and deliberate display type. Brand color and motion are sparing, non-interactive expressions—not affordance systems. Establish hierarchy through content, type, spacing, and alignment before adding visual treatment.

## Priorities

When requirements compete, protect them in this order:

1. Preserve the user's task, supplied content, data, and functional constraints.
2. Use the registry theme and components instead of parallel styles or substitute component libraries.
3. Make the primary job and next action immediately clear.
4. Preserve accessibility, responsive behavior, and semantic HTML.
5. Refine hierarchy and density without adding decoration.

## Connect the registry

Add the registry namespace to the consuming project's \`components.json\`:

\`\`\`json
{
  "registries": {
    "@livepeer-ui": "${registryUrl}"
  }
}
\`\`\`

Install the theme before composing a new Livepeer surface:

\`\`\`bash
npx shadcn@latest add @livepeer-ui/theme
\`\`\`

Install only the components the interface needs:

\`\`\`bash
npx shadcn@latest add @livepeer-ui/button @livepeer-ui/input @livepeer-ui/dialog
\`\`\`

For direct installation without a namespace:

\`\`\`bash
npx shadcn@latest add ${baseUrl}/r/button.json
\`\`\`

Registry dependencies are declared by each item and are installed by the shadcn CLI. Do not copy component source by hand or replace a registry dependency with a lookalike.

## Foundations

### Color roles

- Use semantic Tailwind utilities so light and dark themes remain intact. \`background\`/\`foreground\` define the canvas and default text; \`card\` groups a genuinely self-contained object; \`muted\` supports subdued regions and supporting text.
- \`primary\` is the default action treatment. \`secondary\` and \`accent\` provide lower-emphasis actions and state changes. \`border\`, \`input\`, and \`ring\` define separation, controls, and visible focus. \`destructive\` is reserved for destructive actions and errors.
- Use \`chart-1\` through \`chart-5\` for ordered data-series distinction, never as an alternative action palette.
- Livepeer green is not an affordance color. Do not use it for buttons, links, hover or focus treatments, selected controls, success, or product actions. It is limited to non-interactive brand expression in approved marks, diagrams, artwork, and branded motion.
- Do not introduce a second token layer or hard-coded theme colors for roles already covered by the theme.

### Typography roles

- Inter (\`font-sans\`) is the default for product UI, navigation, forms, data, docs, planning content, ordinary headings, body copy, and email. A heading element does not imply a display face.
- Favorit Pro (\`font-display\`) is opt-in brand display type for major marketing statements, editorial titles, presentation statements, and intentionally branded conversion moments. Never use it for routine product UI.
- Favorit Mono (\`font-mono\`) is limited to code, commands, paths, IDs, timestamps, and short technical annotations, normally at \`text-xs\` or \`text-sm\`. Use tabular numerals where aligned values matter. Never set explanatory prose in monospace.
- The Agent display face is lockup-only. Do not use \`font-agent\` for headings, controls, or body copy.

The semantic type scale below is implemented in the registry theme. Each \`text-*\` utility carries its font size, line height, weight, and letter spacing; add the appropriate font-family utility separately.

| Role | Utility | Size | Line height | Weight | Tracking | Use |
|---|---|---:|---:|---:|---:|---|
| UI caption | \`text-ui-caption\` | 12px | 16px | 500 | normal | Compact labels, table annotations, timestamps, and technical metadata |
| UI body | \`text-ui-body\` | 14px | 20px | 400 | normal | Controls, navigation, tables, forms, and routine product copy |
| Reading body | \`text-reading-body\` | 16px | 28px | 400 | normal | Docs, editorial prose, and explanatory content inside a constrained measure |
| Product page title | \`text-page-title\` | 32px | 0.98 | 300 | -0.025em | Primary title in product and console shells; pair with \`font-sans text-balance\` |
| Display small | \`text-display-sm\` | 36px | 0.98 | 300 | -0.045em | Mobile public headings and smaller branded statements |
| Display medium | \`text-display-md\` | 48px | 0.98 | 300 | -0.045em | Medium public section statements and compact desktop heroes |
| Display large | \`text-display-lg\` | 60px | 0.98 | 300 | -0.045em | Large desktop public heroes and mobile-menu navigation |
| Display fluid | \`text-display-fluid\` | clamp(40px, 4.5vw, 64px) | 0.98 | 300 | -0.045em | Wide public or editorial statements that should grow continuously |

Use responsive roles rather than arbitrary interpolation: \`text-display-sm sm:text-display-md\` for a 36→48px statement, \`text-display-sm sm:text-display-lg\` for a 36→60px hero, and \`font-display text-display-sm sm:text-display-fluid\` for Favorit-led marketing display. These roles encode values already repeated in current Livepeer surfaces; do not add a semantic token for a one-off diagram label or fixed-output size.

### Spacing and shape

- Work from Tailwind's 4px spacing rhythm. Common recipe steps are 8px, 16px, 24px, and 40px; choose them by relationship rather than applying one gap everywhere.
- Product page gutters start at 16px, grow to 24px at \`sm\`, and may reach 40px in wide console layouts. Use \`max-w-screen-2xl\` for broad product pages.
- Use \`rounded-sm\` for all rectangular components and surfaces, including controls, menus, cards, alerts, tabs, and dialogs. Reserve \`rounded-full\` for geometry that must remain circular or track-shaped, such as avatars, radio controls, switches, sliders, and progress tracks.
- Prefer borders and fill changes for static separation. Reserve pronounced shadows for modal, floating, or focused overlay layers.
- Use Lucide icons only. Icons clarify action or state; they are not decoration.

Install brand assets when the surface represents Livepeer:

\`\`\`bash
npx shadcn@latest add @livepeer-ui/brand
\`\`\`

## Composition

Start with the user's job, not a generic page category. The first viewport should make the purpose, current state, and primary action obvious.

- Establish hierarchy with type, spacing, and alignment before adding surfaces.
- Keep pages on one continuous canvas unless a boundary communicates a real group, state, or interaction.
- Use cards for self-contained objects, not as the default wrapper for every section.
- Give repeated peers consistent structure and visual weight. Do not force unequal content into identical cards.
- Keep labels concrete and sentence case. Avoid decorative eyebrows, invented categories, marketing filler, and redundant section introductions.
- Prefer a compact table for exact comparison, prose for one conclusion, and charts only when a relationship becomes faster to understand visually.
- Keep forms direct: visible labels, useful placeholders, nearby validation, and one obvious submit action.
- Use badges for compact status or categorization, not ordinary metadata or decoration.
- Use dialogs for focused decisions and sheets for supporting tasks that should preserve page context.
- Default to stillness. Add motion only to explain state change, preserve continuity, or confirm an action.

### Choose the surface mode first

- **Console:** persistent sidebar, page header, responsive 16/24/40px gutters, and stacked data sections. Keep density compact and treatment neutral.
- **Public/marketing:** full-width sections, generous vertical breathing room, intentional display type, and one primary call to action. Let editorial hierarchy and approved brand expression lead.
- **Docs/planning:** a stable navigation shell, readable content measure, and scannable headings, lists, code, tables, and links.
- **Fixed output:** an explicit aspect ratio and safe areas for slides, social assets, email, or exports. Preserve exact internal geometry inside any responsive preview.

Foundations cross surface modes; shells and density do not. Do not force one mode's navigation, spacing, or composition into another.

### Composition recipes

- **Console page:** shell → page title and supporting description → one primary action when needed → stacked data or settings sections. Keep repeated controls compact and align numeric data.
- **Catalog:** concrete title and description → search/filter controls → consistent result peers → useful empty state. Let one item own one destination; avoid competing actions on every result.
- **Data view:** orient with a concise summary, place controls next to the data they affect, then present the table or chart with loading, empty, error, unavailable, and ready states.
- **Marketing hero:** clear product statement → concise support → one primary CTA → restrained proof or branded visual. Avoid a cluster of equal-weight actions.
- **Document surface:** stable navigation → readable title and introduction → semantic sections in a constrained measure → tables, code, and media only where they clarify the content.
- **Fixed output:** establish dimensions and safe areas first, then place title, content, brand mark, and any capture/export requirements. Do not treat an export as a responsive web page.

## Responsive behavior

- Design mobile behavior with the desktop composition, not after it.
- Preserve padding and gaps at every breakpoint. Avoid layouts that touch viewport edges.
- Stack related controls when horizontal space makes labels, targets, or values cramped.
- Keep touch targets comfortable and primary actions easy to reach.
- Let tables scroll within a labelled region when they cannot reflow without losing meaning.
- Prevent character-level wrapping in labels, buttons, navigation, and identifiers.
- Use balanced wrapping for large headings and readable line lengths for prose.

## Accessibility

- Use semantic elements and preserve the accessibility behavior supplied by registry components.
- Every input has a visible label. Every icon-only control has an accessible name.
- Keep keyboard focus visible and interaction order logical.
- Do not communicate status or validation through color alone.
- Provide useful empty, loading, error, and disabled states.
- Respect reduced-motion preferences.

## Available components

The current registry exposes ${itemCount} documented items: ${registryMeta.components.length} shadcn-compatible primitives and ${catalogCount} composite components or sections.

### Primitives

${components}

## Composite catalog

Prefer the highest current registry level that fits the job: primitive → component → section. Install composites instead of rebuilding their internal relationships.

${catalog}

Additional registry items:

- \`theme\` — Livepeer UI semantic colors, typography roles, and base styles.
- \`brand\` — Theme-aware Livepeer symbol, wordmark, and lockup components.
- \`favicon\` — Theme-aware application favicon.
- \`og\` — Livepeer Open Graph image route.

Browse component documentation and examples at ${baseUrl}/docs.

## Working in the registry

When adding or changing a component in this repository:

1. Keep the component reusable and consistent with existing shadcn-quality APIs.
2. Update \`lib/registry-meta.json\` when the component name, title, or description changes.
3. Add or update its demo in \`components/demos/\`.
4. Run \`npm run registry:build\` before release so \`registry.json\` and \`public/r/*.json\` match the source.
5. Run \`npm run registry:validate\` and resolve metadata, demo, file, dependency, and color-policy failures.
6. Run the production build and verify affected flows at 390px, meaningful \`sm\`/\`md\` transitions, and wide desktop.

Do not edit \`registry.json\`, \`public/r/*.json\`, or this route's component inventory by hand. They are derived outputs.

## Agent workflow

1. Identify the user's job and choose one surface mode.
2. Inspect the nearest existing mockup, shell, section, or demo.
3. Install the theme and only the registry items required for the job.
4. Establish real content and loading, empty, error, unavailable, disabled, and ready states before visual polish.
5. Compose with semantic tokens and existing roles. Invent a pattern only when the registry and current examples do not cover the job.
6. Verify supported themes plus a 390px mobile viewport, meaningful \`sm\` and \`md\` transitions, and wide desktop as applicable.

When a supplied reference conflicts with this system, preserve its product intent, content, and functional constraints, then translate the treatment into Livepeer tokens and components. Never copy another product's signature styling.

## Avoid

- Decorative dashboard-card grids or cards used as the default section wrapper.
- Badges, icons, or eyebrows on every heading.
- Unestablished glass, glow, gradient, or large-shadow treatments.
- Multiple competing accents or primary actions.
- Brand green on any interactive affordance or as a generic success color.
- Favorit display inside routine product UI; the Agent face outside its lockup.
- Monospace prose, uppercase tracking as decoration, emoji, or non-Lucide UI icons.
- Hard-coded theme colors and arbitrary one-off radii or spacing.
- Desktop layouts that only shrink instead of recomposing at smaller widths.

## Final check

Before shipping, confirm:

- The interface uses registry components wherever an appropriate primitive exists.
- The primary task and action are clear without explanatory decoration.
- Typography, spacing, radii, icons, and colors stay within the supplied system.
- Brand green appears only in approved non-interactive expression.
- Mobile, keyboard, loading, empty, error, and dark-theme behavior remain usable.
- No duplicate component library or parallel token system was introduced.
- Registry contributors ran \`npm run registry:validate\` after metadata or component changes.
`
}
