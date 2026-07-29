"use client"

import { useMemo, useState } from "react"
import { SearchIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { PlaybookCard } from "@/components/mockups/playbook-card"

import type { SourcePlaybook } from "./daydream-source"

export function SourceCatalog({
  hrefBase,
  playbooks,
  searchPlaceholder = "Search playbooks",
  emptyMessage = "No playbooks match your search.",
}: {
  hrefBase?: string
  playbooks: SourcePlaybook[]
  searchPlaceholder?: string
  emptyMessage?: string
}) {
  const [query, setQuery] = useState("")
  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return playbooks
    return playbooks.filter((playbook) =>
      [
        playbook.title,
        playbook.summary,
        playbook.tags.join(" "),
        playbook.deliverables.join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    )
  }, [playbooks, query])

  return (
    <>
      <div className="relative mx-auto w-full sm:max-w-sm">
        <SearchIcon
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={searchPlaceholder}
          className="rounded-sm pl-9"
        />
      </div>

      <div className="mt-8 grid gap-x-4 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((playbook) => (
          <PlaybookCard
            key={playbook.slug}
            hrefBase={hrefBase}
            playbook={playbook}
          />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-16 text-center text-sm text-muted-foreground">
          {emptyMessage}
        </p>
      )}
    </>
  )
}
