import { AgentCapabilitiesSection } from "@/components/livepeer-ui/agent-capabilities-section"
import { livepeerOrgAgentFixture } from "@/app/mockups/_data/livepeer-org"

const capabilities = [
  "Image generation",
  "Video generation",
  "Audio generation",
  "Image editing",
  "Video editing",
  "3D",
  "Rendering",
]

export default function AgentCapabilitiesSectionDemo() {
  return (
    <AgentCapabilitiesSection
      capabilities={capabilities}
      content={livepeerOrgAgentFixture.capabilities}
    />
  )
}
