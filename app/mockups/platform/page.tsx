import type { Metadata } from "next"

import { PlatformPage } from "@/components/mockups/platform-page"
import { Badge } from "@/components/ui/badge"
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

export const metadata: Metadata = {
  title: "Home",
}

const stats = [
  {
    label: "Inference requests",
    value: "1.2M",
    change: "+12.4% from last week",
  },
  { label: "Compute hours", value: "8,431", change: "+3.1% from last week" },
  { label: "Active pipelines", value: "14", change: "2 deployed this week" },
  {
    label: "Spend this month",
    value: "$2,148.90",
    change: "$71.63 per day avg",
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} variant="metric">
            <CardHeader>
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-2xl font-medium tabular-nums">
                {stat.value}
              </CardTitle>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
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
