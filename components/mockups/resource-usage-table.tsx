import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"

const resourceUsage = [
  { resource: "text-to-image", type: "Workflow", usage: "612.8K requests", credits: "86.4" },
  { resource: "live-video-to-video", type: "Workflow", usage: "396.1K requests", credits: "64.8" },
  { resource: "us-east", type: "Compute", usage: "1,188 GPU min", credits: "48.8" },
]

export function ResourceUsageTable() {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-sans text-sm font-medium">Usage by resource</h2>
      <Table>
        <TableHeader><TableRow>
          <TableHead>Resource</TableHead><TableHead>Type</TableHead>
          <TableHead>Usage</TableHead><TableHead className="text-right">Credits</TableHead>
        </TableRow></TableHeader>
        <TableBody>{resourceUsage.map((resource) => (
          <TableRow key={resource.resource}>
            <TableCell className="font-mono text-xs font-medium">{resource.resource}</TableCell>
            <TableCell>{resource.type}</TableCell>
            <TableCell className="font-sans text-xs tabular-nums">{resource.usage}</TableCell>
            <TableCell className="text-right font-sans text-xs tabular-nums">{resource.credits}</TableCell>
          </TableRow>
        ))}</TableBody>
      </Table>
    </section>
  )
}
