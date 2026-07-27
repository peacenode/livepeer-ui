import type { Metadata } from "next"

import { ComputeWorkspace } from "@/components/mockups/compute-workspace"
import { PlatformPage } from "@/components/mockups/platform-page"
import { Button } from "@/components/ui/button"
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
          className="h-16 rounded-sm px-5 font-medium"
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
      <ComputeWorkspace
        stats={stats}
        orchestrators={orchestratorPage?.orchestrators ?? []}
        initialCursor={orchestratorPage?.nextCursor ?? null}
      />
    </PlatformPage>
  )
}
