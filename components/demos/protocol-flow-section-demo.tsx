import { ProtocolFlowSection } from "@/components/mockups/protocol-flow-section"
import { plannerPageFixture } from "@/components/demos/fixtures/planner-pages"

const protocol = plannerPageFixture("protocol").protocol!

export default function ProtocolFlowSectionDemo() {
  return <ProtocolFlowSection heading={protocol.flowHeading} />
}
