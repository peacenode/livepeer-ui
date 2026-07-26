import { OrchestratorTable } from "@/components/mockups/orchestrator-table"

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
  {
    address: "0x8B76e62Bb455B827D5bBa2C7cA43bC08755a41E2",
    name: "open-render",
    serviceHost: "render.example",
    stakeLpt: 214830,
    feeCutPercent: 18,
    active: true,
    successRate: 0.94,
  },
]

export default function OrchestratorTableSectionDemo() {
  return (
    <div className="w-full overflow-x-auto">
      <OrchestratorTable orchestrators={orchestrators} initialCursor={null} />
    </div>
  )
}
