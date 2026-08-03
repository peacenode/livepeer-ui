import type { Metadata } from "next"

import {
  creditBalance,
  dailyUsageRows,
  resourceUsageRows,
  usageMetrics,
  usagePlans,
} from "@/components/demos/fixtures/usage"
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

  const releaseCyclePlans = usagePlans.map((plan) => ({
    ...plan,
    href: "/mockups/private-beta/landing/console/billing",
  }))

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
        plans={releaseCyclePlans}
      />
    </PlatformPage>
  )
}
