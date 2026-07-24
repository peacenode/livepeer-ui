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
}

export const components: ComponentDoc[] = registryMeta.components

export function getComponentDoc(name: string) {
  return components.find((component) => component.name === name)
}

export function registryItemUrl(name: string) {
  return `${siteConfig.baseUrl}/r/${name}.json`
}
