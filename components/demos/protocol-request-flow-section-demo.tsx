import { ProtocolRequestFlowSection } from "@/components/livepeer-ui/protocol-request-flow-section"
import { videoBuddyPageFixture } from "@/components/demos/fixtures/videobuddy-pages"

const protocol = videoBuddyPageFixture("protocol").protocol!

export default function ProtocolRequestFlowSectionDemo() {
  return (
    <ProtocolRequestFlowSection
      heading={protocol.requestHeading}
      steps={protocol.requestSteps}
    />
  )
}
