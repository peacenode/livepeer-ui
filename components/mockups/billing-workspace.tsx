import type { BillingPageSummaryProps } from "@/components/mockups/billing-page-summary"
import { BillingPageSummary } from "@/components/mockups/billing-page-summary"
import type {
  InvoiceRecord,
  InvoiceTableLabels,
  InvoiceTableProps,
} from "@/components/mockups/invoice-table"
import { InvoiceTable } from "@/components/mockups/invoice-table"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type BillingWorkspaceEditorialContent = {
  heading: string
  description: string
  ctas: readonly {
    label: string
    href: string
  }[]
}

export type BillingWorkspaceProps = {
  content: BillingWorkspaceEditorialContent
  headingLevel?: "h1" | "h2"
  period: BillingPageSummaryProps["period"]
  paymentMethod: BillingPageSummaryProps["paymentMethod"]
  invoices: readonly InvoiceRecord[]
  invoiceLabels: InvoiceTableLabels
  managePaymentLabel: string
  managePaymentHref?: string
  onManagePayment?: BillingPageSummaryProps["onManagePayment"]
  getInvoiceDownloadHref?: InvoiceTableProps["getDownloadHref"]
  onDownloadInvoice?: InvoiceTableProps["onDownloadInvoice"]
}

export function BillingWorkspace({
  content,
  headingLevel: Heading = "h2",
  period,
  paymentMethod,
  invoices,
  invoiceLabels,
  managePaymentLabel,
  managePaymentHref,
  onManagePayment,
  getInvoiceDownloadHref,
  onDownloadInvoice,
}: BillingWorkspaceProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <Heading className="text-2xl font-semibold text-balance">
            {content.heading}
          </Heading>
          <p className="mt-2 text-sm text-balance text-muted-foreground">
            {content.description}
          </p>
        </div>
        {content.ctas.length ? (
          <div className="flex flex-wrap gap-2">
            {content.ctas.map((cta) => (
              <a
                key={`${cta.label}-${cta.href}`}
                className={cn(buttonVariants({ variant: "outline" }))}
                href={cta.href}
              >
                {cta.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
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
    </div>
  )
}
