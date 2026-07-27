import { LivepeerAgentSignInCard } from "@/components/mockups/livepeer-agent-sign-in-card"
import { agentConsoleShellFixture } from "@/components/demos/fixtures/agent-console-pages"

export default function LivepeerAgentSignInCardDemo() {
  return <LivepeerAgentSignInCard content={agentConsoleShellFixture.auth} />
}
