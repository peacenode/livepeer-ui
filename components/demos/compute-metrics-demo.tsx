import { ComputeMetrics } from "@/components/livepeer-ui/compute-metrics"
const stats = [
  { label: "Service payouts (USD)", value: "$81.2K", period: "24h" },
  { label: "Protocol rewards (USD)", value: "$46.8K", period: "24h" },
]
export default function ComputeMetricsDemo() { return <ComputeMetrics stats={stats} /> }
