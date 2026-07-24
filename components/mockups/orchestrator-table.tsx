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
            <TableHead>Orchestrator</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="text-right">Stake</TableHead>
            <TableHead className="text-right">Fee cut</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-44">Success rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleItems.map((orchestrator) => (
            <TableRow key={orchestrator.address}>
              <TableCell className="font-identifier max-w-44 truncate font-medium">
                {orchestrator.name}
              </TableCell>
              <TableCell className="font-identifier font-mono text-xs text-muted-foreground">
                {shortAddress(orchestrator.address)}
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
