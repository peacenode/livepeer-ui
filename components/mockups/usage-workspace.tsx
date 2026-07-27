"use client"

import type { JSX } from "react"

import {
  CreditBalance,
  type CreditBalanceProps,
} from "@/components/mockups/credit-balance"
import {
  DailyUsageTable,
  type DailyUsageRow,
} from "@/components/mockups/daily-usage-table"
import {
  LivepeerAgentPromoCards,
  type LivepeerAgentPromoPlan,
} from "@/components/mockups/livepeer-agent-promo-cards"
import {
  ResourceUsageTable,
  type ResourceUsageRow,
} from "@/components/mockups/resource-usage-table"
import {
  UsageMetrics,
  type UsageMetric,
} from "@/components/mockups/usage-metrics"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type UsageWorkspaceContent = {
  overviewTabLabel: string
  activityTabLabel: string
  upgradeTitle: string
  upgradeDescription: string
  dailyUsageTitle: string
  dailyUsageEmptyMessage: string
  resourceUsageTitle: string
  resourceUsageEmptyMessage: string
}

export type UsageWorkspaceProps = {
  content: UsageWorkspaceContent
  balance: CreditBalanceProps
  metrics: readonly UsageMetric[]
  dailyRows: readonly DailyUsageRow[]
  resourceRows: readonly ResourceUsageRow[]
  plans: readonly LivepeerAgentPromoPlan[]
  onPlanSelect?: (plan: LivepeerAgentPromoPlan) => void
}

export function UsageWorkspace(): JSX.Element
export function UsageWorkspace(props: UsageWorkspaceProps): JSX.Element
export function UsageWorkspace(props?: UsageWorkspaceProps) {
  const {
    content,
    balance,
    metrics,
    dailyRows,
    resourceRows,
    plans,
    onPlanSelect,
  } = props?.content
    ? props
    : {
        content: {
          overviewTabLabel: "Overview",
          activityTabLabel: "Activity",
          upgradeTitle: "Get more credits",
          upgradeDescription: "",
          dailyUsageTitle: "Daily usage",
          dailyUsageEmptyMessage: "No daily usage recorded yet.",
          resourceUsageTitle: "Usage by resource",
          resourceUsageEmptyMessage: "No resource usage recorded yet.",
        },
        balance: {
          title: "Credit balance",
          planLabel: "",
          balance: "0",
          allowance: "0",
          unitLabel: "credits",
          refreshLabel: "Credits refresh",
          refreshDate: "—",
        },
        metrics: [],
        dailyRows: [],
        resourceRows: [],
        plans: [],
      }

  return (
    <Tabs defaultValue="overview" className="gap-8">
      <TabsList
        variant="line"
        className="w-full justify-start overflow-x-auto border-b px-0 pb-1"
      >
        <TabsTrigger value="overview" className="flex-none">
          {content.overviewTabLabel}
        </TabsTrigger>
        <TabsTrigger value="activity" className="flex-none">
          {content.activityTabLabel}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="flex flex-col gap-10">
          <CreditBalance {...balance} />
          <section>
            <h2 className="font-sans text-2xl font-medium tracking-tight">
              {content.upgradeTitle}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {content.upgradeDescription}
            </p>
            <div className="mt-6">
              <LivepeerAgentPromoCards
                plans={plans}
                onPlanSelect={onPlanSelect}
              />
            </div>
          </section>
        </div>
      </TabsContent>
      <TabsContent value="activity">
        <div className="flex flex-col gap-10">
          <section>
            <UsageMetrics metrics={metrics} />
          </section>
          <DailyUsageTable
            title={content.dailyUsageTitle}
            rows={dailyRows}
            emptyMessage={content.dailyUsageEmptyMessage}
          />
          <ResourceUsageTable
            title={content.resourceUsageTitle}
            rows={resourceRows}
            emptyMessage={content.resourceUsageEmptyMessage}
          />
        </div>
      </TabsContent>
    </Tabs>
  )
}
