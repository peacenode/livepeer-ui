"use client"

import { type ReactNode, useEffect, useState } from "react"

import { LivepeerAgentSignInCard } from "@/components/mockups/livepeer-agent-sign-in-card"

function PlatformAuthGate({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    if (window.self !== window.top) {
      setAuthenticated(true)
    }
  }, [])

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
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Sign in to Livepeer Agent"
            className="relative z-10 w-full max-w-md"
          >
            <LivepeerAgentSignInCard
              onContinue={() => setAuthenticated(true)}
            />
          </div>
        </div>
      )}
    </>
  )
}

export { PlatformAuthGate }
