import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type ResourceUsageRow = {
  id: string
  resource: string
  type: string
  usage: string
  credits: string
}

export type ResourceUsageTableProps = {
  title: string
  rows: readonly ResourceUsageRow[]
  emptyMessage: string
}

export function ResourceUsageTable({
  title,
  rows,
  emptyMessage,
}: ResourceUsageTableProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-sans text-sm font-medium">{title}</h2>
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
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="h-24 text-center text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            rows.map((resource) => (
              <TableRow key={resource.id}>
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
            ))
          )}
        </TableBody>
      </Table>
    </section>
  )
}
