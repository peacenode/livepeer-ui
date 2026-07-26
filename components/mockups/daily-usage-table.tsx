import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"

const dailyUsage = [
  { date: "Jul 23", workflowRuns: "182.4K", compute: "284 GPU min", credits: "24.8" },
  { date: "Jul 22", workflowRuns: "168.1K", compute: "261 GPU min", credits: "22.4" },
  { date: "Jul 21", workflowRuns: "155.7K", compute: "249 GPU min", credits: "21.1" },
  { date: "Jul 20", workflowRuns: "149.2K", compute: "238 GPU min", credits: "19.7" },
]

export function DailyUsageTable() {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-sans text-sm font-medium">Daily usage</h2>
      <Table>
        <TableHeader><TableRow>
          <TableHead>Date</TableHead><TableHead>Workflow runs</TableHead>
          <TableHead>Compute</TableHead><TableHead className="text-right">Credits</TableHead>
        </TableRow></TableHeader>
        <TableBody>{dailyUsage.map((day) => (
          <TableRow key={day.date}>
            <TableCell className="font-medium">{day.date}</TableCell>
            <TableCell className="font-sans text-xs tabular-nums">{day.workflowRuns}</TableCell>
            <TableCell className="font-sans text-xs tabular-nums">{day.compute}</TableCell>
            <TableCell className="text-right font-sans text-xs tabular-nums">{day.credits}</TableCell>
          </TableRow>
        ))}</TableBody>
      </Table>
    </section>
  )
}
