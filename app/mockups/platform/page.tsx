import type { Metadata } from "next"
import Link from "next/link"
import { BoxIcon, CheckIcon, ChevronRightIcon } from "lucide-react"

import { PlatformPage } from "@/components/mockups/platform-page"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
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

export const metadata: Metadata = {
  title: "Home",
}

const stats = [
  {
    label: "Inference requests",
    value: "1.2M",
    period: "7d",
    context: "+12.4%",
  },
  {
    label: "Compute hours",
    value: "8,431",
    period: "7d",
    context: "+3.1%",
  },
  {
    label: "Active pipelines",
    value: "14",
    period: "7d",
    context: "+2",
  },
  {
    label: "Spend this month",
    value: "$2,148.90",
    period: "MTD",
    context: "$71.63/day",
  },
]

const getStartedSteps = [
  {
    label: "Add credits",
    href: "/mockups/platform/billing",
    complete: true,
  },
  {
    label: "Create an API key",
    href: "/mockups/platform/api",
    complete: true,
  },
  {
    label: "Test containers",
    href: "/mockups/platform/inference",
    complete: false,
  },
]

const activity = [
  {
    event: "Pipeline deployed",
    detail: "live-video-to-video",
    status: "Complete",
    time: "12 min ago",
  },
  {
    event: "API key created",
    detail: "production-server",
    status: "Complete",
    time: "2 hours ago",
  },
  {
    event: "Compute scaled",
    detail: "us-west · 4 → 8 GPUs",
    status: "Complete",
    time: "5 hours ago",
  },
  {
    event: "Invoice paid",
    detail: "June 2026 · $1,982.44",
    status: "Complete",
    time: "Yesterday",
  },
  {
    event: "Pipeline updated",
    detail: "text-to-image · model swap",
    status: "Rolled back",
    time: "2 days ago",
  },
]

export default function MockupHomePage() {
  return (
    <PlatformPage title="Home">
      <Card>
        <CardHeader>
          <CardTitle>Get started</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="flex max-w-xl flex-col">
            {getStartedSteps.map((step, index) => (
              <li key={step.label}>
                <Link
                  href={step.href}
                  className="group/step flex min-h-14 items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-background/60"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-background">
                    {step.complete ? (
                      <CheckIcon className="size-4" aria-hidden="true" />
                    ) : (
                      <BoxIcon className="size-4" aria-hidden="true" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1 font-medium">
                    {index + 1}. {step.label}
                  </span>
                  <ChevronRightIcon
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-hover/step:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} variant="metric" className="aspect-square">
            <CardHeader className="flex-1 justify-between">
              <CardDescription className="flex w-full items-baseline gap-1.5">
                <span>{stat.label}</span>
                <span className="shrink-0 text-muted-foreground tabular-nums">
                  {stat.period}
                </span>
              </CardDescription>
              <div className="flex flex-col gap-1.5">
                <CardTitle className="text-3xl leading-none font-medium tabular-nums">
                  {stat.value}
                </CardTitle>
                <p className="text-sm text-muted-foreground tabular-nums">
                  {stat.context}
                </p>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-medium">Recent activity</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Detail</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activity.map((item) => (
              <TableRow key={`${item.event}-${item.time}`}>
                <TableCell className="font-medium">{item.event}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {item.detail}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.status === "Complete" ? "secondary" : "destructive"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {item.time}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </PlatformPage>
  )
}
