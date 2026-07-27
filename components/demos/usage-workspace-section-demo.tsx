import { UsageWorkspace } from "@/components/mockups/usage-workspace"
import {
  creditBalance,
  dailyUsageRows,
  resourceUsageRows,
  usageContent,
  usageMetrics,
  usagePlans,
} from "@/components/demos/fixtures/usage"

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
