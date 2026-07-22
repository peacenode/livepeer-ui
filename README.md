# livepeer/ui

A shadcn component registry and docs site built on the shadcn preset
`bIkeynI` — vega style, neutral base color, lucide icons, Inter, radius none,
subtle menu accent. Typeset in Favorit Pro and Favorit Mono.

- **Registry** — 31 UI components + brand marks + the theme, served as
  registry items from `public/r/*.json`.
- **Docs site** — ui.shadcn-style docs: sidebar, per-component pages with a
  live preview, install command, and full example source. Foundations pages
  cover the brand marks and typography.

## Development

```bash
npm run dev        # dev server on :3000
npm run build      # production build
npm run start      # serve production build
```

## Registry

`registry.json` is generated — do not edit by hand. The source of truth is
`lib/registry-meta.json` (names, titles, descriptions) plus the component
sources in `components/ui/`. Dependencies and cross-component references are
derived from imports.

```bash
npm run registry:build   # regenerate registry.json + public/r/*.json
```

Registry item URLs (including cross-item `registryDependencies`) are baked
with `NEXT_PUBLIC_BASE_URL` (default `http://localhost:3000`). Before
deploying, rebuild with the production URL:

```bash
NEXT_PUBLIC_BASE_URL=https://your-domain npm run registry:build
```

### Consuming the registry

```bash
npx shadcn@latest add http://localhost:3000/r/button.json
```

Or add a namespace to your project's `components.json`:

```json
{
  "registries": {
    "@livepeer-ui": "http://localhost:3000/r/{name}.json"
  }
}
```

```bash
npx shadcn@latest add @livepeer-ui/button
```

## Brand

Brand marks live in `components/brand.tsx` (theme-aware, `currentColor`) and
`public/brand/` (original white SVGs, favicon, OG embed). The favicon is
`app/icon.svg` (theme-aware via `prefers-color-scheme`). Typefaces are
self-hosted in `assets/fonts/`: Favorit Pro (`--font-sans`, weights
300/400/450/500/700) and Favorit Mono (`--font-mono`, weights 400/500/700).
Favorit is a commercial Dinamo typeface licensed by Livepeer — the woff2
files mirror the ones livepeer.org ships; don't redistribute them outside
Livepeer work.

## Adding a component to the registry

1. `npx shadcn add <name>` (installs into `components/ui/`)
2. Add an entry to `lib/registry-meta.json`
3. Write a demo at `components/demos/<name>-demo.tsx` and register it in
   `components/demos/index.ts`
4. `npm run registry:build`
