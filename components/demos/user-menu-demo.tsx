import { UserMenu } from "@/components/mockups/user-menu"
import { agentConsoleShellFixture } from "@/components/demos/fixtures/agent-console-pages"
import { agentConsoleUserFixture } from "@/components/mockups/fixtures/agent-console-user"

export default function UserMenuDemo() {
  return (
    <div className="w-64">
      <UserMenu
        content={agentConsoleShellFixture.userMenu}
        user={agentConsoleUserFixture}
      />
    </div>
  )
}
