"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRightIcon, SearchIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
      <div className="relative w-full sm:max-w-sm">
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

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {visible.map((playbook) => (
          <Link
            key={playbook.slug}
            href={`/mockups/playbooks/library/${playbook.slug}`}
            className="group rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <Card className="h-full overflow-hidden rounded-sm py-0 transition-colors group-hover:bg-accent">
              {playbook.image && (
                <div
                  className="aspect-[16/9] bg-muted bg-cover bg-center"
                  style={{ backgroundImage: `url("${playbook.image}")` }}
                  aria-hidden="true"
                />
              )}
              <div className="flex flex-1 flex-col py-6">
                <CardHeader>
                  <div className="flex flex-wrap gap-1.5">
                    {playbook.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="rounded-sm"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="mt-3 text-xl leading-snug">
                    {playbook.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="mt-3 flex flex-1 flex-col">
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {playbook.summary}
                  </p>
                  <div className="mt-6 flex items-end justify-between gap-4">
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      {playbook.stats.slice(0, 2).map((stat) => (
                        <span key={`${stat.value}-${stat.label}`}>
                          <strong className="font-medium text-foreground">
                            {stat.value}
                          </strong>{" "}
                          {stat.label}
                        </span>
                      ))}
                    </div>
                    <ArrowRightIcon
                      className="size-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </div>
                </CardContent>
              </div>
            </Card>
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
