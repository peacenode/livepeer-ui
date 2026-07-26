import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"

export type Invoice = { id: string; period: string; amount: string; status: string }

export const billingInvoices: Invoice[] = [
  { id: "INV-2026-006", period: "June 2026", amount: "$1,982.44", status: "Paid" },
  { id: "INV-2026-005", period: "May 2026", amount: "$2,204.10", status: "Paid" },
  { id: "INV-2026-004", period: "April 2026", amount: "$1,730.28", status: "Paid" },
  { id: "INV-2026-003", period: "March 2026", amount: "$1,412.90", status: "Paid" },
  { id: "INV-2026-002", period: "February 2026", amount: "$986.55", status: "Paid" },
]

export function InvoiceTable({ invoices = billingInvoices }: { invoices?: Invoice[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-medium">Invoices</h2>
      <Table>
        <TableHeader><TableRow>
          <TableHead>Invoice</TableHead><TableHead>Period</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead>Status</TableHead><TableHead className="text-right" />
        </TableRow></TableHeader>
        <TableBody>{invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-mono text-xs">{invoice.id}</TableCell>
            <TableCell>{invoice.period}</TableCell>
            <TableCell className="text-right text-xs tabular-nums">{invoice.amount}</TableCell>
            <TableCell><Badge variant="secondary">{invoice.status}</Badge></TableCell>
            <TableCell className="text-right"><Button variant="ghost" size="xs">Download</Button></TableCell>
          </TableRow>
        ))}</TableBody>
      </Table>
    </div>
  )
}
