import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { PlatformPage } from "@/components/mockups/platform-page"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
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
    cost: "$91.20",
  },
  {
    date: "Jul 22",
    workflowRuns: "168.1K",
    compute: "261 GPU min",
    cost: "$84.05",
  },
  {
    date: "Jul 21",
    workflowRuns: "155.7K",
    compute: "249 GPU min",
    cost: "$79.63",
  },
  {
    date: "Jul 20",
    workflowRuns: "149.2K",
    compute: "238 GPU min",
    cost: "$75.18",
  },
]

const resourceUsage = [
  {
    resource: "text-to-image",
    type: "Workflow",
    usage: "612.8K requests",
    cost: "$821.40",
  },
  {
    resource: "live-video-to-video",
    type: "Workflow",
    usage: "396.1K requests",
    cost: "$604.75",
  },
  {
    resource: "us-east",
    type: "Compute",
    usage: "1,188 GPU min",
    cost: "$472.10",
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
                  <h2 className="text-sm font-medium">Billing and usage</h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    July 1–23, 2026
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

              <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">
                      Available credits
                    </p>
                    <Badge variant="outline">Credit</Badge>
                  </div>
                  <p className="mt-2 text-3xl font-medium tracking-tight tabular-nums">
                    $500.00
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Applied before card charges
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Current period
                  </p>
                  <p className="mt-2 text-3xl font-medium tracking-tight tabular-nums">
                    $1,898.25
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    63% of project budget
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Next invoice</p>
                  <p className="mt-2 text-3xl font-medium tracking-tight tabular-nums">
                    Aug 1
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Pay as you go
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Payment method
                  </p>
                  <p className="mt-2 text-3xl font-medium tracking-tight tabular-nums">
                    ···· 4242
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Visa · expires 08/2029
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t pt-6">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="font-medium">Monthly project budget</span>
                  <span className="text-muted-foreground tabular-nums">
                    $1,898.25 / $3,000
                  </span>
                </div>
                <Progress value={63} className="mt-3" />
                <p className="mt-2 text-xs text-muted-foreground">
                  $1,101.75 remaining. Alerts are sent at 75%, 90%, and 100%.
                </p>
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
                    <TableHead className="text-right">Cost</TableHead>
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
                        {day.cost}
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
                <TableHead className="text-right">Cost</TableHead>
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
                    {resource.cost}
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
