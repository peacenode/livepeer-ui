import type { Metadata } from "next"

import {
  creditBalance,
  dailyUsageRows,
  resourceUsageRows,
  usageContent,
  usageMetrics,
  usagePlans,
} from "@/components/demos/fixtures/usage"
import { UsageWorkspace } from "@/components/mockups/usage-workspace"
import { PlatformPage } from "@/components/mockups/platform-page"

export const metadata: Metadata = { title: "Usage" }

export default function MockupUsagePage() {
  return (
    <PlatformPage title="Usage" variant="plain">
      <UsageWorkspace
        content={usageContent}
        balance={creditBalance}
        metrics={usageMetrics}
        dailyRows={dailyUsageRows}
        resourceRows={resourceUsageRows}
        plans={usagePlans}
      />
    </PlatformPage>
  )
}
