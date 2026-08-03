import { AgentAccessSection } from "@/components/livepeer-ui/agent-access-section"
import { livepeerOrgAgentFixture } from "@/components/demos/fixtures/livepeer-org"

export default function AgentAccessSectionDemo() {
  return <AgentAccessSection content={livepeerOrgAgentFixture.access} />
}
