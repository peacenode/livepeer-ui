import { Badge } from "@/components/ui/badge"

export function CreditBalance() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <h2 className="font-sans text-sm font-medium">Credit balance</h2>
          <Badge variant="outline">Free</Badge>
        </div>
        <div>
          <p className="text-5xl leading-none font-medium tracking-tight tabular-nums sm:text-6xl">
            32{" "}
            <span className="text-xl font-normal tracking-normal text-muted-foreground sm:text-2xl">
              / 50 credits
            </span>
          </p>
          <div className="mt-8 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Credits refresh</span>
            <Badge variant="secondary" className="rounded-sm">Aug 1, 2026</Badge>
          </div>
        </div>
      </div>
    </section>
  )
}
