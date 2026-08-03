import type { Metadata } from "next"

import {
  creditBalance,
  dailyUsageRows,
  resourceUsageRows,
  usageMetrics,
  usagePlans,
} from "@/app/mockups/_data/usage"
import { UsageWorkspace } from "@/components/livepeer-ui/usage-workspace"
import { PlatformPage } from "@/components/livepeer-ui/platform-page"
import {
  getAgentConsolePage,
  type UsagePageContent,
} from "@/sanity/lib/agent-console-pages"

export const metadata: Metadata = { title: "Usage" }

export default async function MockupUsagePage() {
  const editorial = await getAgentConsolePage<UsagePageContent>("usage")
  if (!editorial?.usage) {
    throw new Error(
      "Required Sanity document agentConsolePage-usage is missing or incomplete."
    )
  }

  return (
    <PlatformPage
      title={editorial.heading}
      description={editorial.description}
      variant="plain"
    >
      <UsageWorkspace
        content={editorial.usage}
        balance={creditBalance}
        metrics={usageMetrics}
        dailyRows={dailyUsageRows}
        resourceRows={resourceUsageRows}
        plans={usagePlans}
      />
    </PlatformPage>
  )
}
