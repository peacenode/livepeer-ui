"use client"

import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

export type InvoiceRecord = {
  id: string
  period: string
  amount: string
  status: string
  downloadHref?: string
}

export type InvoiceTableLabels = {
  title: string
  invoice: string
  period: string
  amount: string
  status: string
  download: string
  emptyTitle: string
  emptyDescription: string
}

export type InvoiceTableProps = {
  invoices: readonly InvoiceRecord[]
  labels: InvoiceTableLabels
  getDownloadHref?: (invoice: InvoiceRecord) => string | undefined
  onDownloadInvoice?: (invoice: InvoiceRecord) => void
}

export function InvoiceTable({
  invoices,
  labels,
  getDownloadHref,
  onDownloadInvoice,
}: InvoiceTableProps) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-medium">{labels.title}</h2>
      {invoices.length ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{labels.invoice}</TableHead>
              <TableHead>{labels.period}</TableHead>
              <TableHead className="text-right">{labels.amount}</TableHead>
              <TableHead>{labels.status}</TableHead>
              <TableHead className="text-right" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => {
              const downloadHref =
                getDownloadHref?.(invoice) ?? invoice.downloadHref
              const downloadAction = downloadHref ? (
                <a
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "xs" })
                  )}
                  href={downloadHref}
                >
                  {labels.download}
                </a>
              ) : (
                <Button
                  variant="ghost"
                  size="xs"
                  disabled={!onDownloadInvoice}
                  onClick={() => onDownloadInvoice?.(invoice)}
                >
                  {labels.download}
                </Button>
              )

              return (
                <TableRow key={invoice.id}>
                  <TableCell className="font-mono text-xs">
                    {invoice.id}
                  </TableCell>
                  <TableCell>{invoice.period}</TableCell>
                  <TableCell className="text-right text-xs tabular-nums">
                    {invoice.amount}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{invoice.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{downloadAction}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      ) : (
        <div className="flex min-h-40 flex-col items-center justify-center border-y px-4 text-center">
          <p className="text-sm font-medium">{labels.emptyTitle}</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            {labels.emptyDescription}
          </p>
        </div>
      )}
    </div>
  )
}
