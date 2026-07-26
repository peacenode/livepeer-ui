import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react"

import { PlatformPage } from "@/components/mockups/platform-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
    <PlatformPage title="Usage">
      <Tabs defaultValue="overview" className="gap-8">
        <TabsList
          variant="line"
          className="w-full justify-start overflow-x-auto border-b px-0 pb-1"
        >
          <TabsTrigger value="overview" className="flex-none">
            Overview
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex-none">
            Resources
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="flex flex-col gap-10">
            <section className="border-y py-6 sm:py-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-sm font-medium">Credit balance</h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Credits pay for every workflow run.
                  </p>
                </div>
                <Link
                  href="/mockups/api-console/organization?tab=billing"
                  className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  Manage billing
                  <ArrowUpRightIcon className="size-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-10 flex items-start justify-between gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Free plan allowance
                  </p>
                  <p className="mt-3 text-5xl leading-none font-medium tracking-tight tabular-nums sm:text-6xl">
                    50{" "}
                    <span className="text-xl font-normal tracking-normal text-muted-foreground sm:text-2xl">
                      credits
                    </span>
                  </p>
                  <p className="mt-4 text-sm text-muted-foreground tabular-nums">
                    32/50 credits remaining
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Credits refresh Aug 01 26
                  </p>
                </div>
                <Badge variant="outline">Free</Badge>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-medium tracking-tight">
                Get more credits
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Start with 250 free credits. Upgrade for a larger allocation
                that refreshes every month.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="flex min-h-64 flex-col rounded-sm border p-6">
                  <p className="text-sm font-medium text-muted-foreground">
                    Pro
                  </p>
                  <p className="mt-5 text-4xl font-medium tracking-tight tabular-nums">
                    500{" "}
                    <span className="text-lg font-normal text-muted-foreground">
                      credits/mo
                    </span>
                  </p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    For regular creative sessions and production workflows.
                  </p>
                  <Button
                    variant="outline"
                    size="lg"
                    nativeButton={false}
                    render={
                      <Link href="/mockups/api-console/organization?tab=billing" />
                    }
                    className="mt-auto h-16 w-full rounded-sm px-4"
                  >
                    Subscribe to Pro
                    <ArrowRightIcon aria-hidden="true" />
                  </Button>
                </div>
                <div className="flex min-h-64 flex-col rounded-sm border border-foreground p-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      Max
                    </p>
                    <Badge>Recommended</Badge>
                  </div>
                  <p className="mt-5 text-4xl font-medium tracking-tight tabular-nums">
                    1,750{" "}
                    <span className="text-lg font-normal text-muted-foreground">
                      credits/mo
                    </span>
                  </p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    For teams that generate and iterate throughout the week.
                  </p>
                  <Button
                    size="lg"
                    nativeButton={false}
                    render={
                      <Link href="/mockups/api-console/organization?tab=billing" />
                    }
                    className="mt-auto h-16 w-full rounded-sm px-4"
                  >
                    Subscribe to Max
                    <ArrowRightIcon aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-sm font-medium">Activity</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <Card variant="metric">
                  <CardHeader>
                    <CardDescription>Workflow runs</CardDescription>
                    <CardTitle className="font-sans text-3xl leading-none font-medium tracking-tight tabular-nums">
                      1.2M
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card variant="metric">
                  <CardHeader>
                    <CardDescription>Compute time</CardDescription>
                    <CardTitle className="font-sans text-3xl leading-none font-medium tracking-tight tabular-nums">
                      2,431 GPU min
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>
            </section>
            <div className="flex flex-col gap-3">
              <h2 className="text-sm font-medium">Daily usage</h2>
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
            </div>
          </div>
        </TabsContent>
        <TabsContent value="resources">
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
        </TabsContent>
      </Tabs>
    </PlatformPage>
  )
}
