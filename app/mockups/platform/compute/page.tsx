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
  getOrchestratorsPage,
} from "@/lib/livepeer"

export const metadata: Metadata = {
  title: "Compute",
}

export default async function MockupComputePage() {
  const [network, orchestratorPage] = await Promise.all([
    getNetworkStats(),
    getOrchestratorsPage(),
  ])

  const stats = [
    {
      label: "Service payouts (USD)",
      value: network ? `$${formatCompact(network.payoutsUsd24h)}` : "—",
      period: "24h",
    },
    {
      label: "Protocol rewards (USD)",
      value: network ? `$${formatCompact(network.rewardsUsd24h)}` : "—",
      period: "24h",
    },
  ]

  return (
    <PlatformPage
      title="Compute"
      action={
        <Button
          size="lg"
          className="px-5 font-medium"
          nativeButton={false}
          render={
            <a
              href="https://docs.livepeer.org/v1/orchestrators/guides/get-started"
              target="_blank"
              rel="noreferrer"
            />
          }
        >
          Run an Orchestrator
          <span aria-hidden="true">↗</span>
        </Button>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {stats.map((stat) => (
          <Card key={stat.label} variant="metric">
            <CardHeader>
              <CardDescription className="flex w-full items-baseline gap-1.5">
                <span>{stat.label}</span>
                {stat.period && (
                  <span className="shrink-0 text-muted-foreground tabular-nums">
                    {stat.period}
                  </span>
                )}
              </CardDescription>
              <CardTitle className="text-3xl leading-none font-medium tracking-tight tabular-nums">
                {stat.value}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      <OrchestratorTable
        orchestrators={orchestratorPage?.orchestrators ?? []}
        initialCursor={orchestratorPage?.nextCursor ?? null}
      />
      <p className="text-xs text-muted-foreground">
        On-chain registry and performance leaderboard data, cached for 10
        minutes.
      </p>
    </PlatformPage>
  )
}
