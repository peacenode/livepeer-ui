"use client"

import { type ReactNode, useState } from "react"
import { CopyIcon } from "lucide-react"
import { toast } from "sonner"

import { LivepeerGradientSymbol, LivepeerWordmark } from "@/components/brand"
import { Button } from "@/components/ui/button"

function PlatformAuthGate({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false)

  async function copyDesignGuide() {
    const response = await fetch("/design.md")
    const markdown = await response.text()
    await navigator.clipboard.writeText(markdown)
    toast.success("design.md copied")
  }

  return (
    <>
      {children}
      {!authenticated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-background/75 px-4 py-10 backdrop-blur-[2px] sm:px-6">
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
            role="dialog"
            aria-modal="true"
            aria-labelledby="console-gate-title"
            className="relative z-10 flex w-full max-w-lg flex-col items-center text-center"
          >
            <div
              className="flex items-center justify-center gap-3 text-foreground"
              aria-label="Livepeer"
            >
              <LivepeerGradientSymbol
                className="h-12 w-auto sm:h-14"
                aria-hidden="true"
              />
              <LivepeerWordmark
                className="h-8 w-auto sm:h-9"
                aria-hidden="true"
              />
            </div>

            <h1 id="console-gate-title" className="sr-only">
              Continue to Livepeer
            </h1>

            <div className="mt-10 grid w-full max-w-md gap-3 sm:grid-cols-2">
              <Button
                type="button"
                size="lg"
                className="h-16 w-full rounded-sm border border-emerald-500 bg-emerald-500 px-5 text-white hover:bg-emerald-500"
                style={{
                  backgroundImage:
                    "linear-gradient(160deg, color(display-p3 0.04 0.74 0.49) 0%, color(display-p3 0.04 0.74 0.49) 32%, color(display-p3 0.02 0.58 0.36) 100%)",
                }}
                onClick={() => setAuthenticated(true)}
              >
                Continue
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-16 w-full rounded-sm px-5"
                onClick={copyDesignGuide}
              >
                design.md
                <CopyIcon data-icon="inline-end" aria-hidden="true" />
              </Button>
            </div>
          </section>
        </div>
      )}
    </>
  )
}

export { PlatformAuthGate }
