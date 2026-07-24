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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const metadata: Metadata = {
  title: "API",
}

const keys = [
  {
    name: "production-server",
    token: "lp_sk_····9f2a",
    scope: "Full access",
    created: "Jul 23, 2026",
    lastUsed: "2 min ago",
  },
  {
    name: "staging",
    token: "lp_sk_····c481",
    scope: "Full access",
    created: "Jun 4, 2026",
    lastUsed: "1 hour ago",
  },
  {
    name: "analytics-readonly",
    token: "lp_sk_····07de",
    scope: "Read only",
    created: "Mar 18, 2026",
    lastUsed: "3 days ago",
  },
  {
    name: "local-dev",
    token: "lp_sk_····b3a9",
    scope: "Read only",
    created: "Jan 9, 2026",
    lastUsed: "Never",
  },
]

export default function MockupApiPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-medium">API</h1>
        <Button>Create key</Button>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-medium">Keys</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Token</TableHead>
              <TableHead>Scope</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Last used</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {keys.map((key) => (
              <TableRow key={key.name}>
                <TableCell className="font-medium">{key.name}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {key.token}
                </TableCell>
                <TableCell>
                  <Badge variant={key.scope === "Full access" ? "secondary" : "outline"}>
                    {key.scope}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {key.created}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {key.lastUsed}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Card className="gap-2">
        <CardHeader>
          <CardTitle className="text-sm">Quick start</CardTitle>
          <CardDescription>
            Authenticate with a bearer token on every request.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-md bg-muted px-4 py-3 font-mono text-xs leading-relaxed">
            {`curl https://api.livepeer.org/v1/inference \\
  -H "Authorization: Bearer $LIVEPEER_API_KEY" \\
  -d '{ "pipeline": "text-to-image", "prompt": "..." }'`}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
