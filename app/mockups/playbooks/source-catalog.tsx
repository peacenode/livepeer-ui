"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { SearchIcon } from "lucide-react"

import { Input } from "@/components/ui/input"

import type { SourcePlaybook } from "./daydream-source"

export function SourceCatalog({ playbooks }: { playbooks: SourcePlaybook[] }) {
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
          placeholder="Search playbooks"
          className="rounded-sm pl-9"
        />
      </div>

      <div className="mt-8 grid gap-x-4 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((playbook) => (
          <Link
            key={playbook.slug}
            href={`/mockups/playbooks/library/${playbook.slug}`}
            className="group block rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <article>
              <div
                className="aspect-square overflow-hidden rounded-sm bg-muted bg-cover bg-center"
                style={
                  playbook.image
                    ? { backgroundImage: `url("${playbook.image}")` }
                    : undefined
                }
                aria-hidden="true"
              />
              <div className="mt-4 flex max-w-sm flex-col gap-1.5">
                <h2 className="line-clamp-2 font-heading text-xl font-normal">
                  {playbook.title}
                </h2>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-16 text-center text-sm text-muted-foreground">
          No playbooks match “{query}”.
        </p>
      )}
    </>
  )
}
