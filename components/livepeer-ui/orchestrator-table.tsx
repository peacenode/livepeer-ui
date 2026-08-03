"use client"

import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  formatCompact,
  shortAddress,
  type Orchestrator,
  type OrchestratorPage,
} from "@/lib/livepeer"

type OrchestratorTableProps = {
  orchestrators: Orchestrator[]
  initialCursor: string | null
}

function LiteralAddress({ value }: { value: string }) {
  if (!value.startsWith("0x")) return value

  return (
    <>
      <span>{value[0]}</span>
      <span>{value.slice(1)}</span>
    </>
  )
}

export function OrchestratorTable({
  orchestrators,
  initialCursor,
}: OrchestratorTableProps) {
  const [rows, setRows] = React.useState(orchestrators)
  const [nextCursor, setNextCursor] = React.useState(initialCursor)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(false)
  const sentinelRef = React.useRef<HTMLDivElement>(null)
  const cursorInFlight = React.useRef<string | null>(null)

  const loadMore = React.useCallback(async () => {
    if (!nextCursor || loading || cursorInFlight.current === nextCursor) return

    cursorInFlight.current = nextCursor
    setLoading(true)
    setError(false)

    try {
      const response = await fetch(
        `/api/orchestrators?cursor=${encodeURIComponent(nextCursor)}`
      )
      if (!response.ok) throw new Error("Unable to load orchestrators.")

      const page: OrchestratorPage = await response.json()
      setRows((current) => {
        const knownAddresses = new Set(current.map((item) => item.address))
        return [
          ...current,
          ...page.orchestrators.filter(
            (item) => !knownAddresses.has(item.address)
          ),
        ]
      })
      setNextCursor(page.nextCursor)
    } catch {
      setError(true)
    } finally {
      cursorInFlight.current = null
      setLoading(false)
    }
  }, [loading, nextCursor])

  React.useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !nextCursor || error) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void loadMore()
      },
      { rootMargin: "400px 0px" }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [error, loadMore, nextCursor])

  if (rows.length === 0) {
    return (
      <p className="rounded-md border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
        Network data is unavailable right now.
      </p>
    )
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-muted-foreground">
              Orchestrator
            </TableHead>
            <TableHead className="text-muted-foreground">Address</TableHead>
            <TableHead className="text-right text-muted-foreground">
              Total stake
            </TableHead>
            <TableHead className="text-right text-muted-foreground">
              Fee cut
            </TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
            <TableHead className="w-44 text-muted-foreground">
              Avg. success rate
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((orchestrator) => (
            <TableRow key={orchestrator.address}>
              <TableCell className="font-identifier max-w-44 truncate font-medium">
                <LiteralAddress value={orchestrator.name} />
              </TableCell>
              <TableCell className="font-identifier font-mono text-xs text-muted-foreground">
                <LiteralAddress value={shortAddress(orchestrator.address)} />
              </TableCell>
              <TableCell className="text-right text-xs tabular-nums">
                {formatCompact(orchestrator.stakeLpt)} LPT
              </TableCell>
              <TableCell className="text-right text-xs tabular-nums">
                {orchestrator.feeCutPercent}%
              </TableCell>
              <TableCell>
                <Badge variant={orchestrator.active ? "secondary" : "outline"}>
                  {orchestrator.active ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>
                {orchestrator.successRate === null ? (
                  <span className="text-xs text-muted-foreground">—</span>
                ) : (
                  <div className="flex items-center gap-3">
                    <Progress
                      value={orchestrator.successRate * 100}
                      className="flex-1"
                    />
                    <span className="w-10 text-right text-xs text-muted-foreground tabular-nums">
                      {Math.round(orchestrator.successRate * 100)}%
                    </span>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div
        ref={sentinelRef}
        className="flex min-h-12 items-center justify-between gap-4 pt-2"
      >
        <p className="text-xs text-muted-foreground" aria-live="polite">
          {loading
            ? `Loading after ${rows.length} orchestrators…`
            : nextCursor
              ? `${rows.length} orchestrators loaded`
              : `End of registry · ${rows.length} orchestrators`}
        </p>
        {error && (
          <Button variant="outline" size="sm" onClick={() => void loadMore()}>
            Try again
          </Button>
        )}
      </div>
    </>
  )
}
