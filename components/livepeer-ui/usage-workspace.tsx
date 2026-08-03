"use client"

import type { JSX } from "react"

import {
  CreditBalance,
  type CreditBalanceProps,
} from "@/components/livepeer-ui/credit-balance"
import {
  DailyUsageTable,
  type DailyUsageRow,
} from "@/components/livepeer-ui/daily-usage-table"
import {
  LivepeerAgentPromoCards,
  type LivepeerAgentPromoPlan,
} from "@/components/livepeer-ui/livepeer-agent-promo-cards"
import {
  ResourceUsageTable,
  type ResourceUsageRow,
} from "@/components/livepeer-ui/resource-usage-table"
import {
  UsageMetrics,
  type UsageMetric,
} from "@/components/livepeer-ui/usage-metrics"
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

export function UsageWorkspace(props: UsageWorkspaceProps): JSX.Element {
  const {
    content,
    balance,
    metrics,
    dailyRows,
    resourceRows,
    plans,
    onPlanSelect,
  } = props

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
            <h2 className="text-2xl font-medium tracking-tight">
              {content.upgradeTitle}
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
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
