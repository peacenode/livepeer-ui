import { ProtocolFlowSection } from "@/components/mockups/protocol-flow-section"
import { videoBuddyPageFixture } from "@/components/demos/fixtures/videobuddy-pages"

const protocol = videoBuddyPageFixture("protocol").protocol!

export default function ProtocolFlowSectionDemo() {
  return <ProtocolFlowSection heading={protocol.flowHeading} />
}
