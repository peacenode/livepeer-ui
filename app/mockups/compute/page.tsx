import type { Metadata } from "next"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
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

export const metadata: Metadata = {
  title: "Compute",
}

const stats = [
  { label: "GPUs online", value: "24 / 26" },
  { label: "Fleet utilization", value: "68%" },
  { label: "Regions", value: "5" },
]

const nodes = [
  {
    id: "node-8f2a41",
    gpu: "H100 80GB",
    region: "us-west",
    status: "Online",
    utilization: 82,
  },
  {
    id: "node-c19e03",
    gpu: "H100 80GB",
    region: "us-west",
    status: "Online",
    utilization: 74,
  },
  {
    id: "node-77b2d8",
    gpu: "A100 80GB",
    region: "us-east",
    status: "Online",
    utilization: 61,
  },
  {
    id: "node-3d90fc",
    gpu: "A100 40GB",
    region: "eu-central",
    status: "Online",
    utilization: 55,
  },
  {
    id: "node-b64e17",
    gpu: "RTX 4090",
    region: "eu-central",
    status: "Draining",
    utilization: 12,
  },
  {
    id: "node-04aa92",
    gpu: "RTX 4090",
    region: "ap-southeast",
    status: "Offline",
    utilization: 0,
  },
]

function statusVariant(status: string) {
  if (status === "Online") return "secondary" as const
  if (status === "Draining") return "outline" as const
  return "destructive" as const
}

export default function MockupComputePage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-medium">Compute</h1>
          <p className="text-sm text-muted-foreground">
            GPU capacity across your fleet.
          </p>
        </div>
        <Button>Add capacity</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="gap-2">
            <CardHeader>
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="font-mono text-2xl font-medium">
                {stat.value}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-medium">Nodes</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Node</TableHead>
              <TableHead>GPU</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-48">Utilization</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {nodes.map((node) => (
              <TableRow key={node.id}>
                <TableCell className="font-mono text-xs">{node.id}</TableCell>
                <TableCell>{node.gpu}</TableCell>
                <TableCell className="text-muted-foreground">
                  {node.region}
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant(node.status)}>{node.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Progress value={node.utilization} className="flex-1" />
                    <span className="w-8 text-right font-mono text-xs text-muted-foreground">
                      {node.utilization}%
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
