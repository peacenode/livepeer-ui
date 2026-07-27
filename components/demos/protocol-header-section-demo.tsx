import { ProtocolHeaderSection } from "@/components/mockups/protocol-header-section"
import { plannerPageFixture } from "@/components/demos/fixtures/planner-pages"

const content = plannerPageFixture("protocol")
const protocol = content.protocol!

export default function ProtocolHeaderSectionDemo() {
  return (
    <ProtocolHeaderSection
      eyebrow={protocol.eyebrow}
      heading={content.heading!}
      description={content.description!}
    />
  )
}
