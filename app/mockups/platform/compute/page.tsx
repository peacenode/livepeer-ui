import type { Metadata } from "next"

import { OrchestratorTable } from "@/components/mockups/orchestrator-table"
import { PlatformPage } from "@/components/mockups/platform-page"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  formatCompact,
  getNetworkStats,
  getOrchestrators,
} from "@/lib/livepeer"

export const metadata: Metadata = {
  title: "Compute",
}

export default async function MockupComputePage() {
  const [network, orchestrators] = await Promise.all([
    getNetworkStats(),
    getOrchestrators(),
  ])

  const stats = [
    {
      label: "Active orchestrators",
      value: network ? String(network.activeOrchestrators) : "—",
    },
    {
      label: "Total stake",
      value: network ? `${formatCompact(network.totalStakeLpt)} LPT` : "—",
    },
    {
      label: "Payouts (24h)",
      value: network ? `$${formatCompact(network.payoutsUsd24h)}` : "—",
    },
    {
      label: "Gateways",
      value: network ? String(network.gatewaysKnown) : "—",
    },
  ]

  return (
    <PlatformPage title="Compute" action={<Button>Add capacity</Button>}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} variant="metric">
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
        <h2 className="text-sm font-medium">Orchestrators by stake</h2>
        <OrchestratorTable orchestrators={orchestrators} />
      </div>
      <p className="text-xs text-muted-foreground">
        On-chain registry and performance leaderboard data, cached for 10
        minutes.
      </p>
    </PlatformPage>
  )
}
