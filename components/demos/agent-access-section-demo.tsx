import { AgentAccessSection } from "@/components/livepeer-ui/agent-access-section"
import { livepeerOrgAgentFixture } from "@/app/mockups/_data/livepeer-org"

export default function AgentAccessSectionDemo() {
  return <AgentAccessSection content={livepeerOrgAgentFixture.access} />
}
