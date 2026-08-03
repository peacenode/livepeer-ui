import type { CreditBalanceProps } from "@/components/livepeer-ui/credit-balance"
import type { DailyUsageRow } from "@/components/livepeer-ui/daily-usage-table"
import type { LivepeerAgentPromoPlan } from "@/components/livepeer-ui/livepeer-agent-promo-cards"
import type { ResourceUsageRow } from "@/components/livepeer-ui/resource-usage-table"
import type { UsageMetric } from "@/components/livepeer-ui/usage-metrics"
import type { UsageWorkspaceContent } from "@/components/livepeer-ui/usage-workspace"

export const usageContent: UsageWorkspaceContent = {
  overviewTabLabel: "Overview",
  activityTabLabel: "Activity",
  upgradeTitle: "Get more credits",
  upgradeDescription:
    "Upgrade for a larger credit allocation that refreshes every month.",
  dailyUsageTitle: "Daily usage",
  dailyUsageEmptyMessage: "No daily usage recorded yet.",
  resourceUsageTitle: "Usage by resource",
  resourceUsageEmptyMessage: "No resource usage recorded yet.",
}

export const creditBalance: CreditBalanceProps = {
  title: "Credit balance",
  planLabel: "Free",
  balance: "32",
  allowance: "50",
  unitLabel: "credits",
  refreshLabel: "Credits refresh",
  refreshDate: "Aug 1, 2026",
}

export const usageMetrics: readonly UsageMetric[] = [
  { label: "Workflow runs", value: "1.2M" },
  { label: "Compute time", value: "2,431 GPU min" },
]

export const dailyUsageRows: readonly DailyUsageRow[] = [
  {
    id: "2026-07-23",
    date: "Jul 23",
    workflowRuns: "182.4K",
    compute: "284 GPU min",
    credits: "24.8",
  },
  {
    id: "2026-07-22",
    date: "Jul 22",
    workflowRuns: "168.1K",
    compute: "261 GPU min",
    credits: "22.4",
  },
  {
    id: "2026-07-21",
    date: "Jul 21",
    workflowRuns: "155.7K",
    compute: "249 GPU min",
    credits: "21.1",
  },
  {
    id: "2026-07-20",
    date: "Jul 20",
    workflowRuns: "149.2K",
    compute: "238 GPU min",
    credits: "19.7",
  },
]

export const resourceUsageRows: readonly ResourceUsageRow[] = [
  {
    id: "text-to-image",
    resource: "text-to-image",
    type: "Workflow",
    usage: "612.8K requests",
    credits: "86.4",
  },
  {
    id: "live-video-to-video",
    resource: "live-video-to-video",
    type: "Workflow",
    usage: "396.1K requests",
    credits: "64.8",
  },
  {
    id: "us-east",
    resource: "us-east",
    type: "Compute",
    usage: "1,188 GPU min",
    credits: "48.8",
  },
]

export const usagePlans: readonly LivepeerAgentPromoPlan[] = [
  {
    id: "pro",
    name: "Pro",
    price: "$4.99",
    credits: "500",
    creditsLabel: "credits/mo",
    description: "For regular creative sessions and production workflows.",
    ctaLabel: "Subscribe to Pro",
    href: "/mockups/livepeer-agent/organization?tab=billing",
  },
  {
    id: "max",
    name: "Max",
    price: "$13.99",
    credits: "1,750",
    creditsLabel: "credits/mo",
    description: "For teams that generate and iterate throughout the week.",
    ctaLabel: "Subscribe to Max",
    href: "/mockups/livepeer-agent/organization?tab=billing",
    recommendedLabel: "Recommended",
  },
]
