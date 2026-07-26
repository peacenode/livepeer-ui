import Link from "next/link"
import { CheckIcon, ChevronRightIcon, CircleDashedIcon } from "lucide-react"

import { LivepeerCubeStream } from "@/components/mockups/livepeer-cube-stream"
import { Card, CardTitle } from "@/components/ui/card"

const steps = [
  {
    label: "Install Runner",
    href: "/mockups/livepeer-org/agent",
    complete: false,
  },
  {
    label: "Add credits",
    href: "/mockups/platform/billing",
    complete: false,
  },
  {
    label: "Test a playbook",
    href: "/mockups/livepeer-org",
    complete: false,
  },
]

export function RunnerOnboardingCard() {
  return (
    <Card className="relative min-h-64 rounded-sm py-0">
      <LivepeerCubeStream variant="card" className="opacity-80" />
      <div className="relative z-10 flex min-h-64">
        <div
          data-particle-exclusion
          className="flex w-full flex-col justify-center px-4 py-4 sm:px-6 sm:py-6 md:w-1/2"
        >
          <CardTitle className="text-xl font-normal">
            Try Livepeer&apos;s Runner
          </CardTitle>
          <ol className="mt-6 flex w-full flex-col">
            {steps.map((step, index) => (
              <li key={step.label}>
                <Link
                  href={step.href}
                  className="group/step flex min-h-14 items-center gap-3 rounded-sm px-2 py-2 transition-colors hover:bg-foreground/[0.06]"
                >
                  {step.complete ? (
                    <CheckIcon className="size-4 shrink-0" aria-hidden="true" />
                  ) : (
                    <CircleDashedIcon
                      className="size-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                  )}
                  <span className="min-w-0 flex-1 font-medium">
                    {index + 1}. {step.label}
                  </span>
                  <ChevronRightIcon
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-hover/step:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Card>
  )
}
