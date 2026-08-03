import { UsageWorkspace } from "@/components/livepeer-ui/usage-workspace"
import {
  creditBalance,
  dailyUsageRows,
  resourceUsageRows,
  usageContent,
  usageMetrics,
  usagePlans,
} from "@/app/mockups/_data/usage"

export default function UsageWorkspaceSectionDemo() {
  return (
    <UsageWorkspace
      content={usageContent}
      balance={creditBalance}
      metrics={usageMetrics}
      dailyRows={dailyUsageRows}
      resourceRows={resourceUsageRows}
      plans={usagePlans}
    />
  )
}
