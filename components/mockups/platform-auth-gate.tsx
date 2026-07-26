"use client"

import { type FormEvent, type ReactNode, useState } from "react"

import { LivepeerGradientSymbol, LivepeerWordmark } from "@/components/brand"
import {
  DiscordIcon,
  GoogleIcon,
} from "@/components/brand-social-icons"
import { LivepeerCubeStream } from "@/components/mockups/livepeer-cube-stream"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function PlatformAuthGate({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false)

  function enterConsole(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault()
    setAuthenticated(true)
  }

  if (authenticated) return children

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-background px-4 py-10 sm:px-6">
      <LivepeerCubeStream />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="console-sign-in-title"
        className="relative z-10 w-full max-w-md rounded-sm border bg-background/95 p-6 text-center shadow-xl backdrop-blur-sm sm:p-8"
      >
        <div
          className="flex items-end justify-center gap-2 text-foreground"
          aria-label="Livepeer Agent"
        >
          <LivepeerGradientSymbol className="h-5 w-auto" aria-hidden="true" />
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
    </main>
  )
}

export { PlatformAuthGate }
