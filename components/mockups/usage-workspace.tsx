import { CreditBalance } from "@/components/mockups/credit-balance"
import { DailyUsageTable } from "@/components/mockups/daily-usage-table"
import { LivepeerAgentPromoCards } from "@/components/mockups/livepeer-agent-promo-cards"
import { ResourceUsageTable } from "@/components/mockups/resource-usage-table"
import { UsageMetrics } from "@/components/mockups/usage-metrics"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function UsageWorkspace() {
  return (
    <Tabs defaultValue="overview" className="gap-8">
      <TabsList variant="line" className="w-full justify-start overflow-x-auto border-b px-0 pb-1">
        <TabsTrigger value="overview" className="flex-none">Overview</TabsTrigger>
        <TabsTrigger value="activity" className="flex-none">Activity</TabsTrigger>
      </TabsList>
      <TabsContent value="overview"><div className="flex flex-col gap-10">
        <CreditBalance />
        <section>
          <h2 className="font-sans text-2xl font-medium tracking-tight">Get more credits</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Upgrade for a larger credit allocation that refreshes every month.
          </p>
          <div className="mt-6"><LivepeerAgentPromoCards /></div>
        </section>
      </div></TabsContent>
      <TabsContent value="activity"><div className="flex flex-col gap-10">
        <section><UsageMetrics /></section>
        <DailyUsageTable />
        <ResourceUsageTable />
      </div></TabsContent>
    </Tabs>
  )
}
