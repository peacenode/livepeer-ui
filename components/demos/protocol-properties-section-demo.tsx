import { ProtocolPropertiesSection } from "@/components/mockups/protocol-properties-section"
import { plannerPageFixture } from "@/components/demos/fixtures/planner-pages"

const protocol = plannerPageFixture("protocol").protocol!

export default function ProtocolPropertiesSectionDemo() {
  return (
    <ProtocolPropertiesSection
      agentHeading={protocol.agentPropertyHeading}
      agentDescription={protocol.agentPropertyDescription}
      paymentHeading={protocol.paymentPropertyHeading}
      paymentDescription={protocol.paymentPropertyDescription}
    />
  )
}
