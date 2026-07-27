"use client"

import type { FormEvent } from "react"

import { LivepeerGradientSymbol, LivepeerWordmark } from "@/components/brand"
import { DiscordIcon, GoogleIcon } from "@/components/brand-social-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { AgentConsoleShell } from "@/components/mockups/contracts"

export function LivepeerAgentSignInCard({
  content,
  onContinue,
}: {
  content: AgentConsoleShell["auth"]
  onContinue?: () => void
}) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onContinue?.()
  }

  return (
    <section className="w-full max-w-md rounded-sm border bg-background p-6 text-center shadow-xl sm:p-8">
      <div
        className="flex items-end justify-center gap-2 text-foreground"
        aria-label="Livepeer Agent"
      >
        <LivepeerGradientSymbol className="h-5 w-auto" aria-hidden="true" />
        <LivepeerWordmark className="h-5 w-auto" aria-hidden="true" />
        <span
          className="translate-y-[0.17em] font-agent text-lg leading-none font-medium tracking-tight"
          aria-hidden="true"
        >
          AGENT
        </span>
      </div>
      <h2 className="mt-8 text-2xl font-medium tracking-tight text-balance">
        {content.title}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {content.description}
      </p>
      <div className="mt-7 grid gap-2 sm:grid-cols-2">
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="h-16 w-full rounded-sm px-4"
          onClick={onContinue}
        >
          <GoogleIcon className="size-5" />
          {content.googleLabel}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="h-16 w-full rounded-sm px-4"
          onClick={onContinue}
        >
          <DiscordIcon className="size-5" />
          {content.discordLabel}
        </Button>
      </div>
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">
          {content.emailDividerLabel}
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>
      <form onSubmit={submit}>
        <Input
          type="email"
          aria-label={content.emailInputLabel}
          placeholder={content.emailPlaceholder}
          className="h-12 rounded-sm"
        />
        <Button
          type="submit"
          size="lg"
          className="mt-4 h-16 w-full rounded-sm px-4"
        >
          {content.continueLabel}
        </Button>
      </form>
    </section>
  )
}
