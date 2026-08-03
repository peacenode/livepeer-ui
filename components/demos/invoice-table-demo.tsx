import {
  demoBillingInvoices,
  demoInvoiceLabels,
} from "@/app/mockups/_data/billing"
import { InvoiceTable } from "@/components/livepeer-ui/invoice-table"

export default function InvoiceTableDemo() {
  return (
    <InvoiceTable invoices={demoBillingInvoices} labels={demoInvoiceLabels} />
  )
}
