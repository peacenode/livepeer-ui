import registryMeta from "@/lib/registry-meta.json"

export const canonicalBaseUrl = "https://livepeer.peaceno.de"

export const siteConfig = {
  name: "Livepeer UI",
  description:
    "A shadcn component registry built on the luma style. Neutral palette, Favorit.",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? canonicalBaseUrl,
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

export const componentGroups: ComponentGroup[] = registryMeta.catalog.map(
  (group) => ({
    title: group.title,
    items: group.items as ComponentDoc[],
  })
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
