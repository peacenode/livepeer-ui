import { ComputeWorkspace } from "@/components/livepeer-ui/compute-workspace"
const stats = [
  { label: "Service payouts (USD)", value: "$81.2K", period: "24h" },
  { label: "Protocol rewards (USD)", value: "$46.8K", period: "24h" },
]
const orchestrators = [
  {
    address: "0x2a61d8744C5Ff03b8b57B3A2bC2D91E073341a10",
    name: "video-gateway",
    serviceHost: "gateway.example",
    stakeLpt: 482190,
    feeCutPercent: 12.5,
    active: true,
    successRate: 0.98,
  },
]
export default function ComputeWorkspaceSectionDemo() {
  return (
    <div className="w-full overflow-x-auto">
      <ComputeWorkspace
        stats={stats}
        orchestrators={orchestrators}
        initialCursor={null}
        dataNote="On-chain registry and performance leaderboard data, cached for 10 minutes."
      />
    </div>
  )
}
