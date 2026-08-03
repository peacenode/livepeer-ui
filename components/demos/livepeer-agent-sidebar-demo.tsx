import { PlatformSidebar } from "@/components/mockups/platform-sidebar"
import { agentConsoleShellFixture } from "@/components/demos/fixtures/agent-console-pages"
import { agentConsoleUserFixture } from "@/components/demos/fixtures/agent-console-user"

export default function LivepeerAgentSidebarDemo() {
  return (
    <div className="h-[520px] w-64 overflow-hidden border">
      <PlatformSidebar
        className="flex"
        homeAriaLabel={agentConsoleShellFixture.homeAriaLabel}
        navigation={agentConsoleShellFixture.navigation}
        userMenuContent={agentConsoleShellFixture.userMenu}
        user={agentConsoleUserFixture}
      />
    </div>
  )
}
