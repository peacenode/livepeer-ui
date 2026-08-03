import type { Metadata } from "next"

import { ComputeWorkspace } from "@/components/livepeer-ui/compute-workspace"
import { PlatformPage } from "@/components/livepeer-ui/platform-page"
import { Button } from "@/components/ui/button"
import {
  formatCompact,
  getNetworkStats,
  getOrchestratorsPage,
} from "@/lib/livepeer"
import {
  getAgentConsolePage,
  type ComputePageContent,
} from "@/sanity/lib/agent-console-pages"

export const metadata: Metadata = {
  title: "Compute",
}

export default async function MockupComputePage() {
  const [editorial, network, orchestratorPage] = await Promise.all([
    getAgentConsolePage<ComputePageContent>("compute"),
    getNetworkStats(),
    getOrchestratorsPage(),
  ])
  if (!editorial?.compute) {
    throw new Error(
      "Required Sanity document agentConsolePage-compute is missing or incomplete."
    )
  }

  const stats = [
    {
      label: editorial.compute.servicePayoutsLabel,
      value: network ? `$${formatCompact(network.payoutsUsd24h)}` : "—",
      period: editorial.compute.periodLabel,
    },
    {
      label: editorial.compute.protocolRewardsLabel,
      value: network ? `$${formatCompact(network.rewardsUsd24h)}` : "—",
      period: editorial.compute.periodLabel,
    },
  ]

  return (
    <PlatformPage
      title={editorial.heading}
      description={editorial.description}
      action={
        <Button
          size="lg"
          className="h-16 rounded-sm px-5 font-medium"
          nativeButton={false}
          render={
            <a
              href={editorial.compute.actionHref}
              target="_blank"
              rel="noreferrer"
            />
          }
        >
          {editorial.compute.actionLabel}
          <span aria-hidden="true">↗</span>
        </Button>
      }
    >
      <ComputeWorkspace
        stats={stats}
        orchestrators={orchestratorPage?.orchestrators ?? []}
        initialCursor={orchestratorPage?.nextCursor ?? null}
        dataNote={editorial.compute.dataNote}
      />
    </PlatformPage>
  )
}
