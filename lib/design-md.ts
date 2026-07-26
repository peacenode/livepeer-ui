import registryMeta from "@/lib/registry-meta.json"

type RegistryComponent = (typeof registryMeta.components)[number]

function componentInventory(components: RegistryComponent[]) {
  return components
    .map((component) => `- \`${component.name}\` — ${component.description}`)
    .join("\n")
}

export function createDesignMarkdown(baseUrl: string) {
  const registryUrl = `${baseUrl}/r/{name}.json`
  const components = componentInventory(registryMeta.components)

  return `---
name: livepeer-ui-design-guidelines
description: "Build interfaces with the Livepeer UI registry, its theme, brand assets, and custom shadcn components. Use for Livepeer product surfaces, tools, documentation, dashboards, and prototypes that should feel native to this design system."
---

# Build with Livepeer UI

Use this registry as the source of truth for interface foundations and components. Preserve the host application's framework and structure, then install and compose Livepeer UI rather than recreating its primitives.

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

- Use the registry's neutral color system and semantic tokens. Do not introduce a second token layer for the same roles.
- Use Inter for interface text. Favorit Pro is the display and heading face where the licensed font files are available. Use Favorit Mono only for code, commands, paths, raw tokens, timestamps, and short identifiers.
- Use the default registry radii, borders, spacing, and control heights. Do not globally restyle installed primitives to create a separate visual system.
- Use Lucide icons only. Icons clarify actions or state; they are not decoration.
- Support light and dark themes through the supplied semantic variables. Do not hard-code colors that break either theme.
- Use the \`brand\` registry item for the Livepeer symbol, wordmark, and lockup. Use \`favicon\` and \`og\` for their specific application assets.

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

The current registry exposes ${registryMeta.components.length} UI components:

${components}

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
5. Run the production build and verify the affected flows at mobile and desktop sizes.

Do not edit \`registry.json\`, \`public/r/*.json\`, or this route's component inventory by hand. They are derived outputs.

## Final check

Before shipping, confirm:

- The interface uses registry components wherever an appropriate primitive exists.
- The primary task and action are clear without explanatory decoration.
- Typography, spacing, radii, icons, and colors stay within the supplied system.
- Mobile, keyboard, loading, empty, error, and dark-theme behavior remain usable.
- No duplicate component library or parallel token system was introduced.
`
}
