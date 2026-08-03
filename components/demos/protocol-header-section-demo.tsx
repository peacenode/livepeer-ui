import { ProtocolHeaderSection } from "@/components/livepeer-ui/protocol-header-section"
import { videoBuddyPageFixture } from "@/components/demos/fixtures/videobuddy-pages"

const content = videoBuddyPageFixture("protocol")
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
