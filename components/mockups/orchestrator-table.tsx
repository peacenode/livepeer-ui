"use client"

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
import { useProgressiveList } from "@/hooks/use-progressive-list"
import { formatCompact, shortAddress, type Orchestrator } from "@/lib/livepeer"

type OrchestratorTableProps = {
  orchestrators: Orchestrator[]
  pageSize?: number
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
  pageSize = 20,
}: OrchestratorTableProps) {
  const {
    visibleItems,
    visibleCount,
    totalCount,
    hasMore,
    loadMore,
    sentinelRef,
  } = useProgressiveList({ items: orchestrators, pageSize })

  if (totalCount === 0) {
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
          {visibleItems.map((orchestrator) => (
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
          Showing {visibleCount} of {totalCount}
        </p>
        {hasMore && (
          <Button variant="outline" size="sm" onClick={loadMore}>
            Load {Math.min(pageSize, totalCount - visibleCount)} more
          </Button>
        )}
      </div>
    </>
  )
}
