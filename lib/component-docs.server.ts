import registryMeta from "@/lib/registry-meta.json"

const catalogItems = registryMeta.catalog.flatMap((group) => group.items)

export function getDocumentedDependencies(name: string) {
  const item = catalogItems.find((candidate) => candidate.name === name)
  if (!item) return []

  return item.uses
    .map((dependency) => {
      const primitive = registryMeta.components.find(
        (candidate) => candidate.name === dependency
      )
      const component = catalogItems.find(
        (candidate) => candidate.name === dependency
      )
      const doc = primitive ?? component
      return doc ? { name: doc.name, title: doc.title } : null
    })
    .filter((dependency): dependency is { name: string; title: string } =>
      Boolean(dependency)
    )
    .sort((a, b) => a.title.localeCompare(b.title))
}
