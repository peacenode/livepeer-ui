import { Badge } from "@/components/ui/badge"

export type CreditBalanceProps = {
  title: string
  planLabel: string
  balance: string
  allowance: string
  unitLabel: string
  refreshLabel: string
  refreshDate: string
}

export function CreditBalance({
  title,
  planLabel,
  balance,
  allowance,
  unitLabel,
  refreshLabel,
  refreshDate,
}: CreditBalanceProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <h2 className="font-sans text-sm font-medium">{title}</h2>
          <Badge variant="outline">{planLabel}</Badge>
        </div>
        <div>
          <p className="text-5xl leading-none font-medium tracking-tight tabular-nums sm:text-6xl">
            {balance}{" "}
            <span className="text-xl font-normal tracking-normal text-muted-foreground sm:text-2xl">
              / {allowance} {unitLabel}
            </span>
          </p>
          <div className="mt-8 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {refreshLabel}
            </span>
            <Badge variant="secondary" className="rounded-sm">
              {refreshDate}
            </Badge>
          </div>
        </div>
      </div>
    </section>
  )
}
