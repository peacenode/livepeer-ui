import {
  ComputeMetrics,
  type ComputeMetric,
} from "@/components/mockups/compute-metrics"
import { OrchestratorTable } from "@/components/mockups/orchestrator-table"
import type { Orchestrator } from "@/lib/livepeer"

export function ComputeWorkspace({
  stats,
  orchestrators,
  initialCursor,
  dataNote,
}: {
  stats: ComputeMetric[]
  orchestrators: Orchestrator[]
  initialCursor: string | null
  dataNote: string
}) {
  return (
    <>
      <ComputeMetrics stats={stats} />
      <OrchestratorTable
        orchestrators={orchestrators}
        initialCursor={initialCursor}
      />
      <p className="text-xs text-muted-foreground">{dataNote}</p>
    </>
  )
}
