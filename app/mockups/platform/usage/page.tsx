import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { PlatformPage } from "@/components/mockups/platform-page"
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
    inference: "182.4K",
    compute: "284 GPU min",
    cost: "$91.20",
  },
  {
    date: "Jul 22",
    inference: "168.1K",
    compute: "261 GPU min",
    cost: "$84.05",
  },
  {
    date: "Jul 21",
    inference: "155.7K",
    compute: "249 GPU min",
    cost: "$79.63",
  },
  {
    date: "Jul 20",
    inference: "149.2K",
    compute: "238 GPU min",
    cost: "$75.18",
  },
]

const resourceUsage = [
  {
    resource: "ai-runner",
    type: "Inference",
    usage: "612.8K requests",
    cost: "$821.40",
  },
  {
    resource: "comfystream",
    type: "Inference",
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
          <div className="flex flex-col gap-8">
            <div className="grid gap-3 sm:grid-cols-3">
              <Card variant="metric">
                <CardHeader>
                  <CardDescription>Project spend</CardDescription>
                  <CardTitle className="text-3xl leading-none font-normal tracking-tight tabular-nums">
                    $1,898.25
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card variant="metric">
                <CardHeader>
                  <CardDescription>Inference requests</CardDescription>
                  <CardTitle className="text-3xl leading-none font-normal tracking-tight tabular-nums">
                    1.2M
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card variant="metric">
                <CardHeader>
                  <CardDescription>Compute time</CardDescription>
                  <CardTitle className="text-3xl leading-none font-normal tracking-tight tabular-nums">
                    2,431 GPU min
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_18rem] md:items-stretch">
              <div className="flex flex-col justify-center gap-3">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="font-medium">Monthly project budget</span>
                  <span className="text-muted-foreground tabular-nums">
                    $1,898.25 / $3,000
                  </span>
                </div>
                <Progress value={63} />
                <p className="text-xs text-muted-foreground">
                  Alerts are sent at 75%, 90%, and 100% of the project budget.
                </p>
              </div>
              <Link
                href="/mockups/platform/organization?tab=billing"
                className="group rounded-4xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <Card
                  size="sm"
                  className="h-full transition-colors group-hover:bg-accent"
                >
                  <CardHeader className="h-full grid-cols-[1fr_auto]">
                    <div className="flex flex-col justify-between gap-3">
                      <CardTitle>Billing</CardTitle>
                      <CardDescription>
                        Payment methods and invoices
                      </CardDescription>
                    </div>
                    <ArrowUpRightIcon
                      className="size-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </CardHeader>
                </Card>
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-sm font-medium">Daily usage</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Inference</TableHead>
                    <TableHead>Compute</TableHead>
                    <TableHead className="text-right">Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dailyUsage.map((day) => (
                    <TableRow key={day.date}>
                      <TableCell className="font-medium">{day.date}</TableCell>
                      <TableCell className="text-xs tabular-nums">
                        {day.inference}
                      </TableCell>
                      <TableCell className="text-xs tabular-nums">
                        {day.compute}
                      </TableCell>
                      <TableCell className="text-right text-xs tabular-nums">
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
                  <TableCell className="text-xs tabular-nums">
                    {resource.usage}
                  </TableCell>
                  <TableCell className="text-right text-xs tabular-nums">
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
