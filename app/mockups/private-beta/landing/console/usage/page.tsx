import type { Metadata } from "next"

import {
  creditBalance,
  dailyUsageRows,
  resourceUsageRows,
  usageMetrics,
} from "@/app/mockups/_data/usage"
import { PlatformPage } from "@/components/livepeer-ui/platform-page"
import { UsageWorkspace } from "@/components/livepeer-ui/usage-workspace"
import {
  getAgentConsolePage,
  type UsagePageContent,
} from "@/sanity/lib/agent-console-pages"

export const metadata: Metadata = { title: "Usage" }

export default async function PrivateBetaUsagePage() {
  const editorial = await getAgentConsolePage<UsagePageContent>("usage")
  if (!editorial?.usage) {
    throw new Error(
      "Required Sanity document agentConsolePage-usage is missing or incomplete."
    )
  }

  return (
    <PlatformPage
      title={editorial.heading}
      description="Keep your balance funded and review project activity."
      variant="plain"
    >
      <UsageWorkspace
        content={editorial.usage}
        balance={creditBalance}
        metrics={usageMetrics}
        dailyRows={dailyUsageRows}
        resourceRows={resourceUsageRows}
      />
    </PlatformPage>
  )
}
