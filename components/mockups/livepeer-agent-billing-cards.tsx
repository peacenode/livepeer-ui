import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function LivepeerAgentBillingCards() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Card variant="metric">
        <CardHeader>
          <CardDescription>Workflow runs</CardDescription>
          <CardTitle className="font-sans text-3xl leading-none font-medium tracking-tight tabular-nums">
            1.2M
          </CardTitle>
        </CardHeader>
      </Card>
      <Card variant="metric">
        <CardHeader>
          <CardDescription>Compute time</CardDescription>
          <CardTitle className="font-sans text-3xl leading-none font-medium tracking-tight tabular-nums">
            2,431 GPU min
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
