import type { Metadata } from "next"

import { LivepeerGradientSymbol, LivepeerWordmark } from "@/components/brand"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  isPlannerAccessConfigured,
  safePlannerDestination,
} from "@/lib/planner-auth"

import { unlockPlanner } from "./actions"

export const metadata: Metadata = {
  title: "Planner access",
  robots: { index: false, follow: false },
}

export default async function PlannerAccessPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>
}) {
  const params = await searchParams
  const destination = safePlannerDestination(params.next ?? null)
  const configured = isPlannerAccessConfigured()
  const invalid = params.error === "invalid"

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-background/75 px-4 py-10 backdrop-blur-[2px] sm:px-6">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 48% 42% at 100% 0%, color-mix(in oklab, var(--color-emerald-500) 60%, white) 0%, color-mix(in oklab, var(--color-emerald-500) 32%, white) 30%, color-mix(in oklab, var(--color-emerald-500) 13%, transparent) 62%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 blur-xl"
        aria-hidden="true"
        style={{
          backgroundImage:
            "conic-gradient(from 0deg at 100% 0%, transparent 188deg, color-mix(in oklab, var(--color-emerald-400) 13%, transparent) 204deg, color-mix(in oklab, var(--color-emerald-400) 40%, white) 224deg, color-mix(in oklab, var(--color-emerald-500) 15%, transparent) 242deg, transparent 260deg)",
          maskImage:
            "radial-gradient(ellipse 105% 105% at 100% 0%, black 0%, black 42%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 105% 105% at 100% 0%, black 0%, black 42%, transparent 80%)",
        }}
      />
      <section
        aria-labelledby="planner-access-heading"
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-md rounded-sm border bg-background p-6 text-center shadow-xl sm:p-8"
      >
        <div
          className="flex items-end justify-center gap-2 text-foreground"
          aria-label="Livepeer"
        >
          <LivepeerGradientSymbol className="h-5 w-auto" aria-hidden="true" />
          <LivepeerWordmark className="h-5 w-auto" aria-hidden="true" />
        </div>
        <div className="mt-8">
          <h1
            id="planner-access-heading"
            className="text-3xl font-light tracking-tight text-balance"
          >
            Marketing Planner
          </h1>
        </div>

        {configured ? (
          <form action={unlockPlanner} className="mt-8 text-left">
            <input type="hidden" name="next" value={destination} />
            <div className="space-y-2">
              <Label htmlFor="planner-password">Password</Label>
              <Input
                id="planner-password"
                name="password"
                type="password"
                autoComplete="current-password"
                autoFocus
                required
                className="h-12 rounded-sm"
                aria-invalid={invalid}
                aria-describedby={
                  invalid ? "planner-password-error" : undefined
                }
              />
              {invalid ? (
                <p
                  id="planner-password-error"
                  className="text-sm text-destructive"
                >
                  That password is not correct.
                </p>
              ) : null}
            </div>
            <Button
              type="submit"
              size="lg"
              className="mt-4 h-16 w-full rounded-sm px-4"
            >
              Continue <span aria-hidden="true">→</span>
            </Button>
          </form>
        ) : (
          <p className="mt-6 rounded-xl bg-muted p-3 text-sm text-muted-foreground">
            Planner access has not been configured.
          </p>
        )}
      </section>
    </main>
  )
}
