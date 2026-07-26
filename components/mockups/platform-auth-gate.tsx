"use client"

import { type FormEvent, type ReactNode, useState } from "react"
import {
  CircleIcon,
  MailIcon,
  MessageCircleIcon,
} from "lucide-react"

import { LivepeerGradientSymbol, LivepeerWordmark } from "@/components/brand"
import { LivepeerCubeStream } from "@/components/mockups/livepeer-cube-stream"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
        aria-describedby="console-sign-in-description"
        className="relative z-10 w-full max-w-md rounded-xl border bg-background/95 p-6 shadow-xl backdrop-blur-sm sm:p-8"
      >
        <div
          className="flex items-end gap-2 text-foreground"
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
            Sign in to Livepeer Agent
          </h1>
          <p
            id="console-sign-in-description"
            className="mt-2 text-sm leading-relaxed text-muted-foreground"
          >
            Continue to Livepeer Agent.
          </p>
        </div>

        <div className="mt-7 grid gap-2 sm:grid-cols-2">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => setAuthenticated(true)}
          >
            <CircleIcon aria-hidden="true" />
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => setAuthenticated(true)}
          >
            <MessageCircleIcon aria-hidden="true" />
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
          <Label htmlFor="console-email">Email</Label>
          <Input
            id="console-email"
            type="email"
            placeholder="you@example.com"
            className="mt-2"
          />
          <Button type="submit" size="lg" className="mt-4 w-full">
            <MailIcon aria-hidden="true" />
            Continue with email
          </Button>
        </form>
      </section>
    </main>
  )
}

export { PlatformAuthGate }
