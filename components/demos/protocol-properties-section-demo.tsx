import { ProtocolPropertiesSection } from "@/components/livepeer-ui/protocol-properties-section"
import { videoBuddyPageFixture } from "@/components/demos/fixtures/videobuddy-pages"

const protocol = videoBuddyPageFixture("protocol").protocol!

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
