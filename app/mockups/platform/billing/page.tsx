import type { Metadata } from "next"

import { PlatformPage } from "@/components/mockups/platform-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
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
  title: "Billing",
}

const invoices = [
  {
    id: "INV-2026-006",
    period: "June 2026",
    amount: "$1,982.44",
    status: "Paid",
  },
  {
    id: "INV-2026-005",
    period: "May 2026",
    amount: "$2,204.10",
    status: "Paid",
  },
  {
    id: "INV-2026-004",
    period: "April 2026",
    amount: "$1,730.28",
    status: "Paid",
  },
  {
    id: "INV-2026-003",
    period: "March 2026",
    amount: "$1,412.90",
    status: "Paid",
  },
  {
    id: "INV-2026-002",
    period: "February 2026",
    amount: "$986.55",
    status: "Paid",
  },
]

export default function MockupBillingPage() {
  return (
    <PlatformPage title="Billing">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="gap-2">
          <CardHeader>
            <CardDescription>Current period</CardDescription>
            <CardTitle className="font-mono text-2xl font-medium">
              $2,148.90
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              July 1 – July 23 · next invoice August 1
            </p>
          </CardContent>
        </Card>
        <Card className="gap-2">
          <CardHeader>
            <CardDescription>Payment method</CardDescription>
            <CardTitle className="text-2xl font-medium">
              Visa ···· 4242
            </CardTitle>
            <CardAction>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Expires 08/2029</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-medium">Invoices</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Period</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-mono text-xs">
                  {invoice.id}
                </TableCell>
                <TableCell>{invoice.period}</TableCell>
                <TableCell className="text-right font-mono text-xs">
                  {invoice.amount}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{invoice.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="xs">
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </PlatformPage>
  )
}
