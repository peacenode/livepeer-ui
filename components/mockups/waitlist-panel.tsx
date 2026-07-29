"use client"

import { useState } from "react"

import { AgentWordmark, LivepeerGradientLockup } from "@/components/brand"
import type { WaitlistPageContent } from "@/components/mockups/contracts"
import { WaitlistSignInDialog } from "@/components/mockups/waitlist-sign-in-dialog"
import { WaitlistSignupForm } from "@/components/mockups/waitlist-signup-form"

export function WaitlistPanel({
  content,
}: {
  content: Pick<WaitlistPageContent, "panel" | "signupForm">
}) {
  const [sentEmail, setSentEmail] = useState<string>()

  function joinWaitlist(email: string) {
    setSentEmail(email)
  }

  return (
    <aside className="dark relative z-10 flex h-full min-h-0 w-full flex-col overflow-y-auto overscroll-contain bg-transparent px-6 py-6 text-foreground sm:px-8 sm:py-8">
      <div className="absolute top-6 right-6 left-6 z-20 flex items-center justify-between sm:top-8 sm:right-8 sm:left-8">
        <div className="flex text-white" aria-label="Livepeer">
          <LivepeerGradientLockup className="h-4 w-auto" aria-hidden="true" />
        </div>
        {!sentEmail && <WaitlistSignInDialog />}
      </div>

      {sentEmail ? (
        <div
          className="flex flex-1 flex-col items-center justify-center text-center"
          role="status"
          aria-live="polite"
        >
          <h1 className="font-display text-[clamp(2.5rem,4vw,3.5rem)] leading-[0.98] font-light tracking-[-0.045em] text-balance">
            <span className="block">Verify</span>
            <span className="block">your mail</span>
          </h1>
          <p className="mt-8 text-sm font-medium text-white">{sentEmail}</p>
          <p className="mt-1 max-w-xs text-xs leading-5 text-white/55">
            The link expires in 15 minutes. You can safely close this page after
            the email arrives.
          </p>
          <button
            type="button"
            className="mt-8 text-sm font-medium text-white underline underline-offset-4"
            onClick={() => setSentEmail(undefined)}
          >
            Use a different email
          </button>
        </div>
      ) : (
        <div className="relative flex-1">
          <div className="absolute inset-x-0 top-1/2 w-full max-w-2xl -translate-y-1/2 text-left">
            <p className="absolute bottom-full mb-3 text-xs font-medium tracking-wide text-foreground md:mb-5">
              Livepeer Agent Early Access
            </p>
            <h1
              className="grid w-full grid-cols-[minmax(0,1fr)_minmax(0,0.46fr)] items-end gap-2 text-white/90 md:gap-3"
              aria-label={content.panel.brandAriaLabel}
            >
              <LivepeerGradientLockup
                className="h-auto w-full"
                aria-hidden="true"
              />
              <AgentWordmark
                className="h-auto w-full self-end"
                aria-hidden="true"
              />
            </h1>
          </div>

          <div className="absolute inset-x-0 bottom-0 w-full md:top-[calc(75%+1.5rem)] md:bottom-auto md:max-w-sm md:-translate-y-1/2">
            <WaitlistSignupForm
              {...content.signupForm}
              onJoin={joinWaitlist}
            />
          </div>
        </div>
      )}
    </aside>
  )
}
