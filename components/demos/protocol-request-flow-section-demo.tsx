import { ProtocolRequestFlowSection } from "@/components/mockups/protocol-request-flow-section"
import { plannerPageFixture } from "@/components/demos/fixtures/planner-pages"

const protocol = plannerPageFixture("protocol").protocol!

export default function ProtocolRequestFlowSectionDemo() {
  return (
    <ProtocolRequestFlowSection
      heading={protocol.requestHeading}
      steps={protocol.requestSteps}
    />
  )
}
