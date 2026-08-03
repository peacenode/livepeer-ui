import { LivepeerAgentSignInCard } from "@/components/livepeer-ui/livepeer-agent-sign-in-card"
import { agentConsoleShellFixture } from "@/app/mockups/_data/agent-console-pages"

export default function LivepeerAgentSignInCardDemo() {
  return <LivepeerAgentSignInCard content={agentConsoleShellFixture.auth} />
}
