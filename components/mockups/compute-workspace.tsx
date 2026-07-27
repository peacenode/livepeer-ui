import { ComputeMetrics, type ComputeMetric } from "@/components/mockups/compute-metrics"
import { OrchestratorTable } from "@/components/mockups/orchestrator-table"
import type { Orchestrator } from "@/lib/livepeer"

export function ComputeWorkspace({
  stats, orchestrators, initialCursor,
}: {
  stats: ComputeMetric[]
  orchestrators: Orchestrator[]
  initialCursor: string | null
}) {
  return (
    <>
      <ComputeMetrics stats={stats} />
      <OrchestratorTable orchestrators={orchestrators} initialCursor={initialCursor} />
      <p className="text-xs text-muted-foreground">
        On-chain registry and performance leaderboard data, cached for 10 minutes.
      </p>
    </>
  )
}
