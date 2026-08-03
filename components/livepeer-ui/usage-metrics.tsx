import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export type UsageMetric = {
  label: string
  value: string
}

export type UsageMetricsProps = {
  metrics: readonly UsageMetric[]
}

export function UsageMetrics({ metrics }: UsageMetricsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {metrics.map((metric) => (
        <Card key={metric.label} variant="metric">
          <CardHeader>
            <CardDescription>{metric.label}</CardDescription>
            <CardTitle className="font-sans text-3xl leading-none font-medium tracking-tight tabular-nums">
              {metric.value}
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
