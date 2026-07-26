import type { Metadata } from "next"

import { LivepeerAgentBillingCards } from "@/components/mockups/livepeer-agent-billing-cards"
import { LivepeerAgentPromoCards } from "@/components/mockups/livepeer-agent-promo-cards"
import { PlatformPage } from "@/components/mockups/platform-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Usage",
}

const dailyUsage = [
  {
    date: "Jul 23",
    workflowRuns: "182.4K",
    compute: "284 GPU min",
    credits: "24.8",
  },
  {
    date: "Jul 22",
    workflowRuns: "168.1K",
    compute: "261 GPU min",
    credits: "22.4",
  },
  {
    date: "Jul 21",
    workflowRuns: "155.7K",
    compute: "249 GPU min",
    credits: "21.1",
  },
  {
    date: "Jul 20",
    workflowRuns: "149.2K",
    compute: "238 GPU min",
    credits: "19.7",
  },
]

const resourceUsage = [
  {
    resource: "text-to-image",
    type: "Workflow",
    usage: "612.8K requests",
    credits: "86.4",
  },
  {
    resource: "live-video-to-video",
    type: "Workflow",
    usage: "396.1K requests",
    credits: "64.8",
  },
  {
    resource: "us-east",
    type: "Compute",
    usage: "1,188 GPU min",
    credits: "48.8",
  },
]

export default function MockupUsagePage() {
  return (
    <PlatformPage title="Usage" variant="plain">
      <Tabs defaultValue="overview" className="gap-8">
        <TabsList
          variant="line"
          className="w-full justify-start overflow-x-auto border-b px-0 pb-1"
        >
          <TabsTrigger value="overview" className="flex-none">
            Overview
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex-none">
            Activity
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="flex flex-col gap-10">
            <section className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-2">
                  <h2 className="font-sans text-sm font-medium">
                    Credit balance
                  </h2>
                  <Badge variant="outline">Free</Badge>
                </div>
                <div>
                  <p className="text-5xl leading-none font-medium tracking-tight tabular-nums sm:text-6xl">
                    32{" "}
                    <span className="text-xl font-normal tracking-normal text-muted-foreground sm:text-2xl">
                      / 50 credits
                    </span>
                  </p>
                  <div className="mt-8 flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Credits refresh
                    </span>
                    <Badge variant="secondary" className="rounded-sm">
                      Aug 1, 2026
                    </Badge>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-sans text-2xl font-medium tracking-tight">
                Get more credits
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Upgrade for a larger credit allocation that refreshes every
                month.
              </p>
              <div className="mt-6">
                <LivepeerAgentPromoCards />
              </div>
            </section>
          </div>
        </TabsContent>
        <TabsContent value="activity">
          <div className="flex flex-col gap-10">
            <section>
              <LivepeerAgentBillingCards />
            </section>
            <section className="flex flex-col gap-3">
              <h2 className="font-sans text-sm font-medium">Daily usage</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Workflow runs</TableHead>
                    <TableHead>Compute</TableHead>
                    <TableHead className="text-right">Credits</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dailyUsage.map((day) => (
                    <TableRow key={day.date}>
                      <TableCell className="font-medium">{day.date}</TableCell>
                      <TableCell className="font-sans text-xs tabular-nums">
                        {day.workflowRuns}
                      </TableCell>
                      <TableCell className="font-sans text-xs tabular-nums">
                        {day.compute}
                      </TableCell>
                      <TableCell className="text-right font-sans text-xs tabular-nums">
                        {day.credits}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>
            <section className="flex flex-col gap-3">
              <h2 className="font-sans text-sm font-medium">
                Usage by resource
              </h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resource</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead className="text-right">Credits</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resourceUsage.map((resource) => (
                    <TableRow key={resource.resource}>
                      <TableCell className="font-mono text-xs font-medium">
                        {resource.resource}
                      </TableCell>
                      <TableCell>{resource.type}</TableCell>
                      <TableCell className="font-sans text-xs tabular-nums">
                        {resource.usage}
                      </TableCell>
                      <TableCell className="text-right font-sans text-xs tabular-nums">
                        {resource.credits}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>
          </div>
        </TabsContent>
      </Tabs>
    </PlatformPage>
  )
}
