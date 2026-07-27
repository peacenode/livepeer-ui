import type { Metadata } from "next"

import {
  creditBalance,
  dailyUsageRows,
  resourceUsageRows,
  usageMetrics,
  usagePlans,
} from "@/components/demos/fixtures/usage"
import { UsageWorkspace } from "@/components/mockups/usage-workspace"
import { PlatformPage } from "@/components/mockups/platform-page"
import { notFound } from "next/navigation"
import { getAgentConsoleEditorialPage } from "@/sanity/lib/registry-content"

export const metadata: Metadata = { title: "Usage" }

export default async function MockupUsagePage() {
  const editorial = await getAgentConsoleEditorialPage("usage")
  if (!editorial?.usageContent) notFound()

  return (
    <PlatformPage
      title={editorial.heading}
      description={editorial.description}
      variant="plain"
    >
      <UsageWorkspace
        content={editorial.usageContent}
        balance={creditBalance}
        metrics={usageMetrics}
        dailyRows={dailyUsageRows}
        resourceRows={resourceUsageRows}
        plans={usagePlans}
      />
    </PlatformPage>
  )
}
