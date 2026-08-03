import { PlatformAuthGate } from "@/components/livepeer-ui/platform-auth-gate"
import { agentConsoleShellFixture } from "@/components/demos/fixtures/agent-console-pages"

export default function LivepeerAgentAuthGateDemo() {
  return (
    <div className="relative h-[560px] w-full overflow-hidden border">
      <PlatformAuthGate content={agentConsoleShellFixture.auth} contained>
        <div className="h-full bg-muted/30" />
      </PlatformAuthGate>
    </div>
  )
}
