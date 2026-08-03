import { PlatformSidebar } from "@/components/livepeer-ui/platform-sidebar"
import { agentConsoleShellFixture } from "@/app/mockups/_data/agent-console-pages"
import { agentConsoleUserFixture } from "@/app/mockups/_data/agent-console-user"

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
