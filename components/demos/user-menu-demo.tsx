import { UserMenu } from "@/components/livepeer-ui/user-menu"
import { agentConsoleShellFixture } from "@/app/mockups/_data/agent-console-pages"
import { agentConsoleUserFixture } from "@/app/mockups/_data/agent-console-user"

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
