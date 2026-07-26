import { Button } from "@/components/ui/button"
import {
  Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card"

export function BillingSummaryCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card className="gap-2 rounded-sm">
        <CardHeader>
          <CardDescription>Current period</CardDescription>
          <CardTitle className="text-2xl font-medium tabular-nums">$2,148.90</CardTitle>
        </CardHeader>
        <CardContent><p className="text-xs text-muted-foreground">July 1 – July 23 · next invoice August 1</p></CardContent>
      </Card>
      <Card className="gap-2 rounded-sm">
        <CardHeader>
          <CardDescription>Payment method</CardDescription>
          <CardTitle className="text-2xl font-medium">Visa ···· 4242</CardTitle>
          <CardAction><Button variant="outline" size="sm">Update</Button></CardAction>
        </CardHeader>
        <CardContent><p className="text-xs text-muted-foreground">Expires 08/2029</p></CardContent>
      </Card>
    </div>
  )
}
