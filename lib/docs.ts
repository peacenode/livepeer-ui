import registryMeta from "@/lib/registry-meta.json"

export const siteConfig = {
  name: "Livepeer UI",
  description:
    "A shadcn component registry built on the luma style. Neutral palette, Favorit.",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",
}

export interface ComponentDoc {
  name: string
  title: string
  description: string
  level?: "primitive" | "component" | "section"
  previewPath?: string
}

export interface ComponentGroup {
  title: string
  items: ComponentDoc[]
}

export const primitives: ComponentDoc[] = registryMeta.components.map(
  (component) => ({ ...component, level: "primitive" as const })
)

export const componentGroups: ComponentGroup[] = registryMeta.catalog.flatMap(
  (group) => {
    const components = group.items.filter((item) => item.level === "component")
    const sections = group.items.filter((item) => item.level === "section")

    return [
      ...(components.length
        ? [
            {
              title: `${group.title} Components`,
              items: components as ComponentDoc[],
            },
          ]
        : []),
      ...(sections.length
        ? [
            {
              title: `${group.title} Page Sections`,
              items: sections as ComponentDoc[],
            },
          ]
        : []),
    ]
  }
)

export const components: ComponentDoc[] = [
  ...primitives,
  ...componentGroups.flatMap((group) => group.items),
]

export function getComponentDoc(name: string) {
  return components.find((component) => component.name === name)
}

export function registryItemUrl(name: string) {
  return `${siteConfig.baseUrl}/r/${name}.json`
}
