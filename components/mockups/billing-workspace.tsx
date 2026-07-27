import type { BillingPageSummaryProps } from "@/components/mockups/billing-page-summary"
import { BillingPageSummary } from "@/components/mockups/billing-page-summary"
import type {
  InvoiceRecord,
  InvoiceTableLabels,
  InvoiceTableProps,
} from "@/components/mockups/invoice-table"
import { InvoiceTable } from "@/components/mockups/invoice-table"

const emptyPeriod = {
  label: "Current period",
  amount: "—",
  description: "No billing usage is available.",
}

const emptyPaymentMethod = {
  label: "Payment method",
  name: "Not configured",
  description: "Add a payment method to pay future invoices.",
}

const defaultInvoiceLabels: InvoiceTableLabels = {
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

export type BillingWorkspaceProps = {
  period?: BillingPageSummaryProps["period"]
  paymentMethod?: BillingPageSummaryProps["paymentMethod"]
  invoices?: readonly InvoiceRecord[]
  invoiceLabels?: InvoiceTableLabels
  managePaymentLabel?: string
  managePaymentHref?: string
  onManagePayment?: BillingPageSummaryProps["onManagePayment"]
  getInvoiceDownloadHref?: InvoiceTableProps["getDownloadHref"]
  onDownloadInvoice?: InvoiceTableProps["onDownloadInvoice"]
}

export function BillingWorkspace({
  period = emptyPeriod,
  paymentMethod = emptyPaymentMethod,
  invoices = [],
  invoiceLabels = defaultInvoiceLabels,
  managePaymentLabel,
  managePaymentHref,
  onManagePayment,
  getInvoiceDownloadHref,
  onDownloadInvoice,
}: BillingWorkspaceProps) {
  return (
    <>
      <BillingPageSummary
        period={period}
        paymentMethod={paymentMethod}
        managePaymentLabel={managePaymentLabel}
        managePaymentHref={managePaymentHref}
        onManagePayment={onManagePayment}
      />
      <InvoiceTable
        invoices={invoices}
        labels={invoiceLabels}
        getDownloadHref={getInvoiceDownloadHref}
        onDownloadInvoice={onDownloadInvoice}
      />
    </>
  )
}
