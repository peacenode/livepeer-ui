// Generates registry.json from components/ui + lib/registry-meta.json,
// then `npx shadcn build` turns it into public/r/*.json.
import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const meta = JSON.parse(
  fs.readFileSync(path.join(root, "lib/registry-meta.json"), "utf8"),
)
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"

const IGNORED_DEPS = new Set(["react", "react-dom"])

function parseImports(source) {
  const specifiers = [...source.matchAll(/from\s+"([^"]+)"/g)].map((m) => m[1])
  const dependencies = new Set()
  const registryDependencies = new Set()
  for (const spec of specifiers) {
    if (spec.startsWith("@/components/ui/")) {
      registryDependencies.add(
        `${baseUrl}/r/${spec.replace("@/components/ui/", "")}.json`,
      )
    } else if (spec.startsWith(".") || spec.startsWith("@/")) {
      continue
    } else {
      const pkg = spec.startsWith("@")
        ? spec.split("/").slice(0, 2).join("/")
        : spec.split("/")[0]
      if (!IGNORED_DEPS.has(pkg)) dependencies.add(pkg)
    }
  }
  return {
    dependencies: [...dependencies].sort(),
    registryDependencies: [...registryDependencies].sort(),
  }
}

function extractCssVars(css, selector) {
  const block = css.match(new RegExp(`${selector}\\s*{([^}]+)}`))
  if (!block) return {}
  const vars = {}
  for (const m of block[1].matchAll(/--([\w-]+):\s*([^;]+);/g)) {
    vars[m[1]] = m[2].trim()
  }
  return vars
}

const css = fs.readFileSync(path.join(root, "app/globals.css"), "utf8")

const items = [
  {
    name: "theme",
    type: "registry:theme",
    title: "Livepeer UI Theme",
    description:
      "Neutral theme for the luma style. Default radius, subtle menu accent.",
    cssVars: {
      light: extractCssVars(css, ":root"),
      dark: extractCssVars(css, "\\.dark"),
    },
  },
  {
    name: "brand",
    type: "registry:component",
    title: "Brand",
    description:
      "Livepeer brand marks — symbol, wordmark, and lockup as theme-aware React components.",
    files: [{ path: "components/brand.tsx", type: "registry:component" }],
  },
  {
    name: "favicon",
    type: "registry:item",
    title: "Favicon",
    description:
      "Theme-aware SVG favicon — the Livepeer symbol, black in light tabs and white in dark tabs.",
    files: [
      { path: "app/icon.svg", type: "registry:file", target: "app/icon.svg" },
    ],
  },
  {
    name: "og",
    type: "registry:item",
    title: "Open Graph",
    description:
      "Open Graph embed route — the Livepeer lockup centered on black, 1200 × 630.",
    files: [
      {
        path: "app/opengraph-image.tsx",
        type: "registry:file",
        target: "app/opengraph-image.tsx",
      },
    ],
  },
]

for (const component of meta.components) {
  const file = `components/ui/${component.name}.tsx`
  const source = fs.readFileSync(path.join(root, file), "utf8")
  const { dependencies, registryDependencies } = parseImports(source)
  items.push({
    name: component.name,
    type: "registry:ui",
    title: component.title,
    description: component.description,
    ...(dependencies.length ? { dependencies } : {}),
    ...(registryDependencies.length ? { registryDependencies } : {}),
    files: [{ path: file, type: "registry:ui" }],
  })
}

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: meta.name,
  homepage: baseUrl,
  items,
}

fs.writeFileSync(
  path.join(root, "registry.json"),
  JSON.stringify(registry, null, 2) + "\n",
)
console.log(`registry.json written with ${items.length} items (base: ${baseUrl})`)
