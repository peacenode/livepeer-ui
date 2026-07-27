import fs from "node:fs"
import path from "node:path"

import registry from "@/registry.json"
import registryMeta from "@/lib/registry-meta.json"

const catalogItems = registryMeta.catalog.flatMap((group) => group.items)
const registryItems = new Map(registry.items.map((item) => [item.name, item]))

export interface DocumentedSourceFile {
  path: string
  code: string
  lang: string
}

export interface ComponentDocumentationSource {
  usage: string
  files: DocumentedSourceFile[]
}

function sourceLanguage(filePath: string) {
  const extension = path.extname(filePath).slice(1)

  if (extension === "ts" || extension === "tsx") return "tsx"
  if (extension === "js" || extension === "jsx") return "jsx"
  if (extension === "svg") return "xml"
  return "text"
}

export function getComponentDocumentationSource(
  name: string
): ComponentDocumentationSource | null {
  const item = registryItems.get(name)
  if (!item?.files?.length) return null

  const demoPath = path.join(
    process.cwd(),
    "components",
    "demos",
    `${name}-demo.tsx`
  )

  return {
    usage: fs.readFileSync(demoPath, "utf8"),
    files: item.files.map((file) => ({
      path: file.path,
      code: fs.readFileSync(path.join(process.cwd(), file.path), "utf8"),
      lang: sourceLanguage(file.path),
    })),
  }
}

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
