import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function LivepeerAgentPromoCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="flex min-h-64 flex-col rounded-sm border p-6">
        <p className="text-sm font-medium text-muted-foreground">Pro</p>
        <p className="mt-5 text-4xl font-medium tracking-tight tabular-nums">
          500{" "}
          <span className="text-lg font-normal text-muted-foreground">
            credits/mo
          </span>
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          For regular creative sessions and production workflows.
        </p>
        <Button
          variant="outline"
          size="lg"
          nativeButton={false}
          render={
            <Link href="/mockups/livepeer-agent/organization?tab=billing" />
          }
          className="mt-auto h-16 w-full rounded-sm px-4"
        >
          Subscribe to Pro
          <ArrowRightIcon aria-hidden="true" />
        </Button>
      </div>
      <div className="relative flex min-h-64 flex-col rounded-sm border border-emerald-500 p-6">
        <Badge className="absolute top-0 right-6 -translate-y-1/2 bg-emerald-500 text-white">
          Recommended
        </Badge>
        <p className="text-sm font-medium text-emerald-700">Max</p>
        <p className="mt-5 text-4xl font-medium tracking-tight tabular-nums">
          1,750{" "}
          <span className="text-lg font-normal text-muted-foreground">
            credits/mo
          </span>
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          For teams that generate and iterate throughout the week.
        </p>
        <Button
          size="lg"
          variant="secondary"
          nativeButton={false}
          render={
            <Link href="/mockups/livepeer-agent/organization?tab=billing" />
          }
          className="mt-auto h-16 w-full rounded-sm border border-emerald-500 bg-emerald-500 px-4 text-white hover:bg-emerald-500"
          style={{
            backgroundImage:
              "linear-gradient(160deg, color(display-p3 0.04 0.74 0.49) 0%, color(display-p3 0.04 0.74 0.49) 32%, color(display-p3 0.02 0.58 0.36) 100%)",
          }}
        >
          Subscribe to Max
          <ArrowRightIcon aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
