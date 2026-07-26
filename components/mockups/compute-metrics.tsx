import {
  Card, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card"

export type ComputeMetric = { label: string; value: string; period?: string }

export function ComputeMetrics({ stats }: { stats: ComputeMetric[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:w-fit sm:grid-cols-[repeat(2,14rem)]">
      {stats.map((stat) => (
        <Card key={stat.label} variant="metric">
          <CardHeader>
            <CardDescription className="flex w-full items-baseline gap-1.5">
              <span>{stat.label}</span>
              {stat.period && (
                <span className="shrink-0 font-sans text-muted-foreground tabular-nums">
                  {stat.period}
                </span>
              )}
            </CardDescription>
            <CardTitle className="font-sans text-3xl leading-none font-medium tracking-tight tabular-nums">
              {stat.value}
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
