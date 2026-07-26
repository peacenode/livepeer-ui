"use client"

import { type FormEvent, type ReactNode, useState } from "react"

import { LivepeerGradientSymbol, LivepeerWordmark } from "@/components/brand"
import {
  DiscordIcon,
  GoogleIcon,
} from "@/components/brand-social-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function PlatformAuthGate({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false)

  function enterConsole(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault()
    setAuthenticated(true)
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
            aria-labelledby="console-sign-in-title"
            className="relative z-10 w-full max-w-md rounded-sm border bg-background p-6 text-center shadow-xl sm:p-8"
          >
            <div
              className="flex items-end justify-center gap-2 text-foreground"
              aria-label="Livepeer Agent"
            >
              <LivepeerGradientSymbol
                className="h-5 w-auto"
                aria-hidden="true"
              />
              <LivepeerWordmark className="h-5 w-auto" aria-hidden="true" />
              <span
                className="translate-y-[0.17em] font-runner text-lg leading-none font-medium tracking-tight"
                aria-hidden="true"
              >
                AGENT
              </span>
            </div>

            <div className="mt-8">
              <h1
                id="console-sign-in-title"
                className="text-2xl font-medium tracking-tight text-balance"
              >
                Sign in to continue
              </h1>
            </div>

            <div className="mt-7 grid gap-2 sm:grid-cols-2">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-16 w-full rounded-sm px-4"
                onClick={() => setAuthenticated(true)}
              >
                <GoogleIcon className="size-5" />
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-16 w-full rounded-sm px-4"
                onClick={() => setAuthenticated(true)}
              >
                <DiscordIcon className="size-5" />
                Discord
              </Button>
            </div>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">
                Or continue with email
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={enterConsole}>
              <Input
                id="console-email"
                type="email"
                aria-label="Email"
                placeholder="you@example.com"
                className="h-12 rounded-sm"
              />
              <Button
                type="submit"
                size="lg"
                className="mt-4 h-16 w-full rounded-sm px-4"
              >
                Continue with email
              </Button>
            </form>
          </section>
        </div>
      )}
    </>
  )
}

export { PlatformAuthGate }
