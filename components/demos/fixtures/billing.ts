import type {
  BillingPaymentMethod,
  BillingPeriodSummary,
} from "@/components/mockups/billing-page-summary"
import type {
  InvoiceRecord,
  InvoiceTableLabels,
} from "@/components/mockups/invoice-table"

export const demoBillingPeriod: BillingPeriodSummary = {
  label: "Current period",
  amount: "$2,148.90",
  description: "July 1 – July 23 · next invoice August 1",
}

export const demoPaymentMethod: BillingPaymentMethod = {
  label: "Payment method",
  name: "Visa ···· 4242",
  description: "Expires 08/2029",
}

export const demoInvoiceLabels: InvoiceTableLabels = {
  title: "Invoices",
  invoice: "Invoice",
  period: "Period",
  amount: "Amount",
  status: "Status",
  download: "Download",
  emptyTitle: "No invoices yet",
  emptyDescription:
    "Invoices will appear here after your first billing period.",
}

export const demoBillingInvoices: readonly InvoiceRecord[] = [
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
