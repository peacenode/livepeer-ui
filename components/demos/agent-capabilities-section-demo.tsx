import { AgentCapabilitiesSection } from "@/components/mockups/agent-capabilities-section"

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
  return <AgentCapabilitiesSection capabilities={capabilities} />
}
