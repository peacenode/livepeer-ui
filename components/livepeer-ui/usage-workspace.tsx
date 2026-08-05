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
}

export function UsageWorkspace(props: UsageWorkspaceProps): JSX.Element {
  const {
    content,
    balance,
    metrics,
    dailyRows,
    resourceRows,
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
        <CreditBalance {...balance} />
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
