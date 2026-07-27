import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type DailyUsageRow = {
  id: string
  date: string
  workflowRuns: string
  compute: string
  credits: string
}

export type DailyUsageTableProps = {
  title: string
  rows: readonly DailyUsageRow[]
  emptyMessage: string
}

export function DailyUsageTable({
  title,
  rows,
  emptyMessage,
}: DailyUsageTableProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-sans text-sm font-medium">{title}</h2>
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
            rows.map((day) => (
              <TableRow key={day.id}>
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
            ))
          )}
        </TableBody>
      </Table>
    </section>
  )
}
