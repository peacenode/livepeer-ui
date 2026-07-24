import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BoxIcon,
  CheckIcon,
  ChevronRightIcon,
  CircleDashedIcon,
  CpuIcon,
} from "lucide-react"

import { LivepeerSymbol3D } from "@/components/mockups/livepeer-symbol-3d"
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
    complete: false,
  },
  {
    label: "Create an API key",
    href: "/mockups/platform/api",
    complete: false,
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
      <Card className="py-0">
        <div className="relative grid min-h-64 md:block">
          <div className="relative z-10 flex items-center py-6 md:min-h-64 md:w-[calc(100%-20rem)]">
            <CardContent className="mx-auto w-full max-w-xl">
              <div className="flex flex-col gap-3">
                <CardTitle className="px-2">Get started</CardTitle>
                <ol className="flex max-w-xl flex-col">
                  {getStartedSteps.map((step, index) => (
                    <li key={step.label}>
                      <Link
                        href={step.href}
                        className="group/step flex min-h-14 items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-foreground/[0.06]"
                      >
                        {step.complete ? (
                          <CheckIcon
                            className="size-4 shrink-0"
                            aria-hidden="true"
                          />
                        ) : (
                          <CircleDashedIcon
                            className="size-4 shrink-0 text-muted-foreground"
                            aria-hidden="true"
                          />
                        )}
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
              </div>
            </CardContent>
          </div>
          <LivepeerSymbol3D />
        </div>
      </Card>
      <div className="grid gap-3 sm:grid-cols-2">
        <a
          href="https://docs.livepeer.org/v1/orchestrators/guides/get-started"
          target="_blank"
          rel="noreferrer"
          className="group rounded-4xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <Card className="h-full min-h-56 transition-colors group-hover:bg-accent">
            <CardHeader className="flex h-full flex-col justify-between">
              <CpuIcon
                className="size-6 text-muted-foreground"
                aria-hidden="true"
              />
              <div className="flex items-end justify-between gap-6">
                <div className="flex max-w-sm flex-col gap-2">
                  <CardTitle className="text-xl">Run an Orchestrator</CardTitle>
                  <CardDescription>
                    Provide compute to the network and earn service fees and
                    protocol rewards.
                  </CardDescription>
                </div>
                <ArrowUpRightIcon
                  className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </div>
            </CardHeader>
          </Card>
        </a>
        <Link
          href="/mockups/platform/inference"
          className="group rounded-4xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <Card className="h-full min-h-56 transition-colors group-hover:bg-accent">
            <CardHeader className="flex h-full flex-col justify-between">
              <BoxIcon
                className="size-6 text-muted-foreground"
                aria-hidden="true"
              />
              <div className="flex items-end justify-between gap-6">
                <div className="flex max-w-sm flex-col gap-2">
                  <CardTitle className="text-xl">Create a container</CardTitle>
                  <CardDescription>
                    Package a model or pipeline and deploy it for inference.
                  </CardDescription>
                </div>
                <ArrowRightIcon
                  className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} variant="metric">
            <CardHeader>
              <CardDescription className="flex w-full items-baseline gap-1.5">
                <span>{stat.label}</span>
                <span className="shrink-0 text-muted-foreground tabular-nums">
                  {stat.period}
                </span>
              </CardDescription>
              <div className="flex flex-col gap-1.5">
                <CardTitle className="text-3xl leading-none font-medium tracking-tight tabular-nums">
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
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-muted-foreground">Event</TableHead>
              <TableHead className="text-muted-foreground">Detail</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-right text-muted-foreground">
                Time
              </TableHead>
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
