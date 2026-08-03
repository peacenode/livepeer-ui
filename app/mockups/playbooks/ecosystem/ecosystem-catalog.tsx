"use client"

import { useMemo, useState } from "react"

import {
  EcosystemCard,
  type EcosystemApp,
} from "@/components/livepeer-ui/ecosystem-card"
import { FilterSearch } from "@/components/livepeer-ui/filter-search"

export function EcosystemCatalog({
  apps,
  searchPlaceholder,
  emptyMessage,
}: {
  apps: EcosystemApp[]
  searchPlaceholder: string
  emptyMessage: string
}) {
  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(apps.flatMap((app) => app.tags))).sort(),
    ],
    [apps]
  )
  const [category, setCategory] = useState("All")
  const [query, setQuery] = useState("")

  const visibleApps = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return apps.filter((app) => {
      const matchesCategory = category === "All" || app.tags.includes(category)
      const matchesQuery =
        !normalizedQuery ||
        [app.name, app.domain, app.description, ...app.tags]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery)

      return matchesCategory && matchesQuery
    })
  }, [apps, category, query])

  return (
    <>
      <FilterSearch
        categories={categories}
        category={category}
        onCategoryChange={setCategory}
        query={query}
        onQueryChange={setQuery}
        placeholder={searchPlaceholder}
        searchLabel="Search ecosystem apps"
        categoriesLabel="Ecosystem categories"
        categoryGridClassName="grid-cols-2 sm:grid-cols-3"
      />

      {visibleApps.length > 0 ? (
        <div className="mt-16 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {visibleApps.map((app) => (
            <EcosystemCard key={app.name} app={app} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-sm text-muted-foreground">{emptyMessage}</p>
      )}
    </>
  )
}
