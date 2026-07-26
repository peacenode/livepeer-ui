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
          <TabsTrigger value="activity" className="flex-none">
            Activity
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="flex flex-col gap-10">
            <section className="grid gap-4 md:grid-cols-2">
              <div className="flex min-h-64 flex-col justify-between rounded-sm border p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-sans text-sm font-medium">
                      Credit balance
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Credits pay for every workflow run.
                    </p>
                  </div>
                  <Badge variant="outline">Free</Badge>
                </div>
                <div>
                  <p className="text-5xl leading-none font-medium tracking-tight tabular-nums sm:text-6xl">
                    32{" "}
                    <span className="text-xl font-normal tracking-normal text-muted-foreground sm:text-2xl">
                      / 50 credits
                    </span>
                  </p>
                  <Badge variant="secondary" className="mt-4">
                    Credits refresh Aug 01 26
                  </Badge>
                </div>
              </div>
              <Link
                href="/mockups/api-console/organization?tab=billing"
                className="group min-h-64 rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <Card
                  size="sm"
                  className="h-full rounded-sm transition-colors group-hover:bg-accent"
                >
                  <CardHeader className="flex h-full flex-col justify-between">
                    <div className="flex flex-col gap-1.5">
                      <CardDescription>Default payment method</CardDescription>
                      <p className="font-sans text-2xl font-medium tabular-nums">
                        Visa ···· 4242
                      </p>
                      <p className="font-sans text-xs text-muted-foreground tabular-nums">
                        Expires 08/2029
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CardTitle className="font-sans">Billing</CardTitle>
                      <ArrowUpRightIcon
                        className="size-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </section>

            <section>
              <h2 className="font-sans text-2xl font-medium tracking-tight">
                Get more credits
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Upgrade for a larger credit allocation that refreshes every
                month.
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
                <div className="relative flex min-h-64 flex-col rounded-sm border border-emerald-500 p-6">
                  <Badge className="absolute top-0 right-6 -translate-y-1/2 bg-emerald-500 text-white">
                    Recommended
                  </Badge>
                  <p className="text-sm font-medium text-emerald-700">Max</p>
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
                    variant="secondary"
                    nativeButton={false}
                    render={
                      <Link href="/mockups/api-console/organization?tab=billing" />
                    }
                    className="mt-auto h-16 w-full rounded-sm border border-emerald-500 bg-emerald-500 px-4 text-white hover:bg-emerald-500"
                    style={{
                      backgroundImage:
                        "linear-gradient(160deg, color(display-p3 0.04 0.74 0.49) 0%, color(display-p3 0.04 0.74 0.49) 32%, color(display-p3 0.02 0.58 0.36) 100%)",
                    }}
                  >
                    Subscribe to Max
                    <ArrowRightIcon aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </TabsContent>
        <TabsContent value="activity">
          <div className="flex flex-col gap-10">
            <section>
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
