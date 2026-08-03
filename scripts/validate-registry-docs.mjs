import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const readJson = (file) =>
  JSON.parse(fs.readFileSync(path.join(root, file), "utf8"))
const meta = readJson("lib/registry-meta.json")
const registry = readJson("registry.json")
const metadataItems = [
  ...meta.components.map((item) => ({ ...item, kind: "primitive" })),
  ...meta.catalog.flatMap((group) =>
    group.items.map((item) => ({ ...item, kind: "catalog" }))
  ),
]
const metadataByName = new Map(metadataItems.map((item) => [item.name, item]))
const registryByName = new Map(registry.items.map((item) => [item.name, item]))
const errors = []

function requireRelationship(condition, message) {
  if (!condition) errors.push(message)
}

requireRelationship(
  metadataByName.size === metadataItems.length,
  "metadata item names must be unique"
)
requireRelationship(
  registryByName.size === registry.items.length,
  "registry item names must be unique"
)

for (const item of metadataItems) {
  const demoPath = `components/demos/${item.name}-demo.tsx`
  const registryItem = registryByName.get(item.name)

  requireRelationship(
    fs.existsSync(path.join(root, demoPath)),
    `${item.name}: missing demo ${demoPath}`
  )
  requireRelationship(
    registryItem,
    `${item.name}: missing matching registry item`
  )

  if (!registryItem) continue

  requireRelationship(
    registryItem.files?.length,
    `${item.name}: registry item has no installable files`
  )

  for (const file of registryItem.files ?? []) {
    requireRelationship(
      fs.existsSync(path.join(root, file.path)),
      `${item.name}: registry file does not exist: ${file.path}`
    )
  }

  if (item.kind === "primitive") {
    requireRelationship(
      registryItem.files?.[0]?.path === `components/ui/${item.name}.tsx`,
      `${item.name}: primitive registry file relationship is missing`
    )
  } else {
    for (const file of item.files ?? []) {
      requireRelationship(
        registryItem.files?.some((candidate) => candidate.path === file),
        `${item.name}: metadata file is absent from registry item: ${file}`
      )
    }

    for (const dependency of item.uses ?? []) {
      const dependencyMetadata = metadataByName.get(dependency)
      requireRelationship(
        dependencyMetadata,
        `${item.name}: unknown metadata dependency: ${dependency}`
      )
      if (!dependencyMetadata) continue

      const hasRegistryDependency = registryItem.registryDependencies?.some(
        (url) => new URL(url).pathname === `/r/${dependency}.json`
      )
      const hasBundledDependency =
        dependencyMetadata.files?.length > 0 &&
        registryItem.files?.some(
          (candidate) => candidate.path === dependencyMetadata.files[0]
        )
      requireRelationship(
        hasRegistryDependency || hasBundledDependency,
        `${item.name}: registry dependency is missing: ${dependency}`
      )
    }
  }
}

if (errors.length) {
  console.error(
    `Registry documentation validation failed:\n${errors.join("\n")}`
  )
  process.exitCode = 1
} else {
  console.log(
    `Validated ${metadataItems.length} documented registry items, demos, files, and dependencies.`
  )
}
