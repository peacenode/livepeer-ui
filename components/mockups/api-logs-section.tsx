import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function ApiLogsSection({
  searchPlaceholder,
  errorsOnlyLabel,
  emptyMessage,
}: {
  searchPlaceholder: string
  errorsOnlyLabel: string
  emptyMessage: string
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          aria-label={searchPlaceholder}
          placeholder={searchPlaceholder}
          className="max-w-sm rounded-sm"
        />
        <div className="flex items-center gap-2">
          <Switch id="api-log-errors" />
          <Label htmlFor="api-log-errors">{errorsOnlyLabel}</Label>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Method</TableHead>
            <TableHead>Endpoint</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>API key</TableHead>
            <TableHead>Error</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={7}
              className="h-32 text-center text-muted-foreground"
            >
              {emptyMessage}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
