import { ProtocolFlowSection } from "@/components/livepeer-ui/protocol-flow-section"
import { videoBuddyPageFixture } from "@/app/mockups/_data/videobuddy-pages"

const protocol = videoBuddyPageFixture("protocol").protocol!

export default function ProtocolFlowSectionDemo() {
  return <ProtocolFlowSection heading={protocol.flowHeading} />
}
