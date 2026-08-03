import {
  demoBillingInvoices,
  demoInvoiceLabels,
} from "@/components/demos/fixtures/billing"
import { InvoiceTable } from "@/components/livepeer-ui/invoice-table"

export default function InvoiceTableDemo() {
  return (
    <InvoiceTable invoices={demoBillingInvoices} labels={demoInvoiceLabels} />
  )
}
