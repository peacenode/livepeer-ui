import { UsageMetrics } from "@/components/livepeer-ui/usage-metrics"
import { usageMetrics } from "@/app/mockups/_data/usage"

export default function UsageMetricsDemo() {
  return (
    <div className="w-full">
      <UsageMetrics metrics={usageMetrics} />
    </div>
  )
}
