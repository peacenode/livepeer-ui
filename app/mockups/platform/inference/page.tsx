import type { Metadata } from "next"

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

export const metadata: Metadata = {
  title: "Inference",
}

const stats = [
  { label: "Requests (24h)", value: "412K" },
  { label: "p50 latency", value: "184ms" },
  { label: "Error rate", value: "0.08%" },
]

const pipelines = [
  {
    name: "live-video-to-video",
    model: "streamdiffusion/sd-turbo",
    type: "Realtime",
    requests: "182K",
    latency: "96ms",
    status: "Running",
  },
  {
    name: "text-to-image",
    model: "black-forest-labs/flux.1-schnell",
    type: "Batch",
    requests: "121K",
    latency: "412ms",
    status: "Running",
  },
  {
    name: "upscale",
    model: "stabilityai/stable-diffusion-x4",
    type: "Batch",
    requests: "64K",
    latency: "388ms",
    status: "Running",
  },
  {
    name: "audio-to-text",
    model: "openai/whisper-large-v3",
    type: "Batch",
    requests: "45K",
    latency: "224ms",
    status: "Paused",
  },
  {
    name: "segment-anything",
    model: "facebook/sam2-hiera-large",
    type: "Batch",
    requests: "0",
    latency: "—",
    status: "Stopped",
  },
]

function statusVariant(status: string) {
  if (status === "Running") return "secondary" as const
  if (status === "Paused") return "outline" as const
  return "destructive" as const
}

export default function MockupInferencePage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-medium">Inference</h1>
          <p className="text-sm text-muted-foreground">
            Pipelines running on the network.
          </p>
        </div>
        <Button>New pipeline</Button>
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
        <h2 className="text-sm font-medium">Pipelines</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pipeline</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Requests (24h)</TableHead>
              <TableHead className="text-right">p50</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pipelines.map((pipeline) => (
              <TableRow key={pipeline.name}>
                <TableCell className="font-medium">{pipeline.name}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {pipeline.model}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {pipeline.type}
                </TableCell>
                <TableCell className="text-right font-mono text-xs">
                  {pipeline.requests}
                </TableCell>
                <TableCell className="text-right font-mono text-xs">
                  {pipeline.latency}
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant(pipeline.status)}>
                    {pipeline.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
