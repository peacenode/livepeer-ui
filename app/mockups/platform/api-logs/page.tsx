import type { Metadata } from "next"
import { RefreshCwIcon, Trash2Icon } from "lucide-react"

import { PlatformPage } from "@/components/mockups/platform-page"
import { Button } from "@/components/ui/button"
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

export const metadata: Metadata = {
  title: "API Logs",
}

export default function MockupApiLogsPage() {
  return (
    <PlatformPage
      title="API Logs"
      description="View your 100 most recent API requests and errors."
      action={
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="lg"
            className="h-16 rounded-sm px-4"
          >
            <RefreshCwIcon aria-hidden="true" />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-16 rounded-sm px-4"
            disabled
          >
            <Trash2Icon aria-hidden="true" />
            Clear logs
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input
            aria-label="Search API logs"
            placeholder="Search logs…"
            className="max-w-sm rounded-sm"
          />
          <div className="flex items-center gap-2">
            <Switch id="api-log-errors" />
            <Label htmlFor="api-log-errors">Errors only</Label>
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
                No API logs yet. Make an API request to see it here.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </PlatformPage>
  )
}
