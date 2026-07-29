"use client"

import type { FormEvent } from "react"
import Link from "next/link"

import { LivepeerGradientSymbol, LivepeerWordmark } from "@/components/brand"
import { DiscordIcon, GoogleIcon } from "@/components/brand-social-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { AgentConsoleShell } from "@/components/mockups/contracts"

export function LivepeerAgentSignInCard({
  content,
  googleLabel,
  onContinue,
  showDescription = true,
  showDiscord = true,
  title,
  waitlistHref,
  waitlistLabel = "Sign up for the waitlist",
}: {
  content: AgentConsoleShell["auth"]
  googleLabel?: string
  onContinue?: () => void
  showDescription?: boolean
  showDiscord?: boolean
  title?: string
  waitlistHref?: string
  waitlistLabel?: string
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
      <h2 className="mt-8 text-xl font-normal tracking-tight text-balance">
        {title ?? content.title}
      </h2>
      {showDescription && (
        <p className="mt-2 text-sm text-muted-foreground">
          {content.description}
        </p>
      )}
      <div
        className={
          showDiscord ? "mt-7 grid gap-2 sm:grid-cols-2" : "mt-7 grid"
        }
      >
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="h-16 w-full rounded-sm px-4"
          onClick={onContinue}
        >
          <GoogleIcon className="size-5" />
          {googleLabel ?? content.googleLabel}
        </Button>
        {showDiscord && (
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
        )}
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
          className="mt-2 h-16 w-full rounded-sm px-4"
        >
          {content.continueLabel}
        </Button>
      </form>
      {waitlistHref && (
        <Button
          variant="link"
          className="mt-6 h-auto px-0 font-medium"
          render={<Link href={waitlistHref} />}
        >
          {waitlistLabel}
        </Button>
      )}
    </section>
  )
}
