"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon, SearchIcon } from "lucide-react"

import {
  EcosystemCard,
  type EcosystemApp,
} from "@/components/livepeer-ui/ecosystem-card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
export function EcosystemCatalog({
  apps,
  searchPlaceholder,
  emptyMessage,
}: {
  apps: EcosystemApp[]
  searchPlaceholder: string
  emptyMessage: string
}) {
  const categories = [
    "All",
    ...Array.from(new Set(apps.flatMap((app) => app.tags))).sort(),
  ]
  const [category, setCategory] = React.useState("All")
  const [query, setQuery] = React.useState("")

  const visibleApps = React.useMemo(() => {
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={category === "All" ? "default" : "outline"}
            onClick={() => setCategory("All")}
            className="rounded-sm"
          >
            All
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" className="rounded-sm">
                  {category === "All" ? "Categories" : category}
                  <ChevronDownIcon aria-hidden="true" />
                </Button>
              }
            />
            <DropdownMenuContent align="start" className="w-48 rounded-sm">
              {categories.slice(1).map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => setCategory(item)}
                  className="rounded-sm"
                >
                  {item}
                  {category === item && (
                    <CheckIcon className="ml-auto" aria-hidden="true" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <label className="relative block w-full sm:w-72">
          <SearchIcon
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <span className="sr-only">Search ecosystem apps</span>
          <Input
            value={query}
            onInput={(event) => setQuery(event.currentTarget.value)}
            placeholder={searchPlaceholder}
            className="h-10 rounded-sm border-border bg-background pl-9"
          />
        </label>
      </div>

      {visibleApps.length > 0 ? (
        <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
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
