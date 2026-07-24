import type { Metadata } from "next"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatCompact, getOrchestrators, shortAddress } from "@/lib/livepeer"

export const metadata: Metadata = {
  title: "Compute",
}

export default async function MockupComputePage() {
  const orchestrators = await getOrchestrators()
  const active = orchestrators.filter((orch) => orch.active)
  const totalStake = orchestrators.reduce((sum, orch) => sum + orch.stakeLpt, 0)
  const totalFees = orchestrators.reduce((sum, orch) => sum + orch.volumeUsd, 0)

  const stats = [
    { label: "Active orchestrators", value: String(active.length) },
    { label: "Total stake", value: `${formatCompact(totalStake)} LPT` },
    { label: "Fees paid", value: `$${formatCompact(totalFees)}` },
  ]

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-medium">Compute</h1>
          <p className="text-sm text-muted-foreground">
            Live orchestrators on the Livepeer network.
          </p>
        </div>
        <Button>Add capacity</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="gap-2">
            <CardHeader>
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="font-mono text-2xl font-medium">
                {stat.value}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-medium">Orchestrators</h2>
        {orchestrators.length === 0 ? (
          <p className="rounded-md border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
            Network data is unavailable right now.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Orchestrator</TableHead>
                <TableHead>Service URI</TableHead>
                <TableHead className="text-right">Stake</TableHead>
                <TableHead className="text-right">Fees earned</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-44">Success rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orchestrators.map((orch) => (
                <TableRow key={orch.address}>
                  <TableCell className="font-mono text-xs">
                    {shortAddress(orch.address)}
                  </TableCell>
                  <TableCell className="max-w-48 truncate text-xs text-muted-foreground">
                    {orch.serviceHost}
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs">
                    {formatCompact(orch.stakeLpt)} LPT
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs">
                    ${formatCompact(orch.volumeUsd)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={orch.active ? "secondary" : "outline"}>
                      {orch.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {orch.successRate === null ? (
                      <span className="text-xs text-muted-foreground">—</span>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Progress
                          value={orch.successRate * 100}
                          className="flex-1"
                        />
                        <span className="w-10 text-right font-mono text-xs text-muted-foreground">
                          {Math.round(orch.successRate * 100)}%
                        </span>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        On-chain registry and performance leaderboard data, cached for 10
        minutes.
      </p>
    </div>
  )
}
