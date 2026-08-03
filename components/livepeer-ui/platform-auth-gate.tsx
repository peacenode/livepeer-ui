"use client"

import { type ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { LivepeerAgentSignInCard } from "@/components/livepeer-ui/livepeer-agent-sign-in-card"
import { cn } from "@/lib/utils"
import type { AgentConsoleShell } from "@/components/livepeer-ui/contracts"

function PlatformAuthGate({
  children,
  authenticatedStorageKey,
  contained = false,
  content,
  googleLabel,
  showDescription = true,
  showDiscord = true,
  successHref,
  title,
  waitlistHref,
  waitlistLabel,
}: {
  children: ReactNode
  authenticatedStorageKey?: string
  contained?: boolean
  content: AgentConsoleShell["auth"]
  googleLabel?: string
  showDescription?: boolean
  showDiscord?: boolean
  successHref?: string
  title?: string
  waitlistHref?: string
  waitlistLabel?: string
}) {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    if (
      authenticatedStorageKey &&
      window.sessionStorage.getItem(authenticatedStorageKey) === "true"
    ) {
      const frame = window.requestAnimationFrame(() => setAuthenticated(true))
      return () => window.cancelAnimationFrame(frame)
    }

    if (!contained && window.self !== window.top) {
      const frame = window.requestAnimationFrame(() => setAuthenticated(true))
      return () => window.cancelAnimationFrame(frame)
    }
  }, [authenticatedStorageKey, contained])

  function continueToProduct() {
    if (authenticatedStorageKey) {
      window.sessionStorage.setItem(authenticatedStorageKey, "true")
    }

    if (successHref) {
      router.push(successHref)
      return
    }

    setAuthenticated(true)
  }

  return (
    <>
      {children}
      {!authenticated && (
        <div
          className={cn(
            "inset-0 z-50 flex items-center justify-center overflow-y-auto bg-background/75 px-4 py-10 backdrop-blur-[2px] sm:px-6",
            contained ? "absolute" : "fixed"
          )}
        >
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 48% 42% at 100% 0%, color-mix(in oklab, var(--color-emerald-500) 60%, transparent) 0%, color-mix(in oklab, var(--color-emerald-500) 32%, transparent) 30%, color-mix(in oklab, var(--color-emerald-500) 13%, transparent) 62%, transparent 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 blur-xl"
            aria-hidden="true"
            style={{
              backgroundImage:
                "conic-gradient(from 0deg at 100% 0%, transparent 188deg, color-mix(in oklab, var(--color-emerald-400) 13%, transparent) 204deg, color-mix(in oklab, var(--color-emerald-400) 40%, transparent) 224deg, color-mix(in oklab, var(--color-emerald-500) 15%, transparent) 242deg, transparent 260deg)",
              maskImage:
                "radial-gradient(ellipse 105% 105% at 100% 0%, black 0%, black 42%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 105% 105% at 100% 0%, black 0%, black 42%, transparent 80%)",
            }}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={content.dialogLabel}
            className="relative z-10 w-full max-w-md"
          >
            <LivepeerAgentSignInCard
              content={content}
              googleLabel={googleLabel}
              onContinue={continueToProduct}
              showDescription={showDescription}
              showDiscord={showDiscord}
              title={title}
              waitlistHref={waitlistHref}
              waitlistLabel={waitlistLabel}
            />
          </div>
        </div>
      )}
    </>
  )
}

export { PlatformAuthGate }
