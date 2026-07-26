import { CircleCheckIcon } from "lucide-react"

import { DeleteApiKeyDialog } from "@/components/mockups/delete-api-key-dialog"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const keys = [
  { name: "production-server", apiKey: "lp_sk_9f2a••••••••••••••••", status: "Active", createdAt: "Jul 23, 2026", lastUsed: "2 min ago" },
  { name: "staging", apiKey: "lp_sk_c481••••••••••••••••", status: "Active", createdAt: "Jun 4, 2026", lastUsed: "1 hour ago" },
  { name: "analytics-readonly", apiKey: "lp_sk_07de••••••••••••••••", status: "Active", createdAt: "Mar 18, 2026", lastUsed: "3 days ago" },
  { name: "local-dev", apiKey: "lp_sk_b3a9••••••••••••••••", status: "Active", createdAt: "Jan 9, 2026", lastUsed: "Never" },
]

export function ApiKeysSection() {
  return (
    <div className="flex flex-col gap-4">
      <Input aria-label="Filter API keys by name" placeholder="Filter by name…" className="max-w-sm rounded-sm" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead><TableHead>API key</TableHead><TableHead>Status</TableHead>
            <TableHead>Created at</TableHead><TableHead>Last used</TableHead>
            <TableHead className="w-12"><span className="sr-only">Actions</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {keys.map((key) => (
            <TableRow key={key.name}>
              <TableCell className="font-medium">{key.name}</TableCell>
              <TableCell><code className="rounded-sm bg-muted px-2 py-1.5 font-mono text-xs text-muted-foreground">{key.apiKey}</code></TableCell>
              <TableCell>
                <Badge variant="outline" className="gap-0 px-0.5">
                  <CircleCheckIcon className="size-3 text-emerald-500" aria-hidden="true" />
                  <span className="px-1">{key.status}</span>
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{key.createdAt}</TableCell>
              <TableCell className="text-muted-foreground">{key.lastUsed}</TableCell>
              <TableCell><DeleteApiKeyDialog name={key.name} createdAt={key.createdAt} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="text-sm text-muted-foreground">Page 1 · Showing {keys.length} of {keys.length}</p>
    </div>
  )
}
