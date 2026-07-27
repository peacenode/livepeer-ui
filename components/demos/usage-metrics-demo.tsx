import { UsageMetrics } from "@/components/mockups/usage-metrics"
import { usageMetrics } from "@/components/demos/fixtures/usage"

export default function UsageMetricsDemo() {
  return (
    <div className="w-full">
      <UsageMetrics metrics={usageMetrics} />
    </div>
  )
}
