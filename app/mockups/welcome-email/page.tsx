import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import {
  LivepeerGradientLockup,
  LivepeerGradientSymbol,
  LivepeerWordmark,
} from "@/components/brand"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Welcome Email",
  description: "Private beta welcome email for Livepeer Agent.",
}

export default function WelcomeEmailPage() {
  return (
    <main className="flex min-h-svh justify-center bg-muted sm:px-6">
      <article className="flex min-h-svh w-full max-w-[500px] flex-col bg-background">
        <header className="border-b px-7 py-6 sm:px-10">
          <div
            className="flex items-end gap-2.5 text-foreground"
            aria-label="Livepeer Agent"
          >
            <LivepeerGradientSymbol className="h-6 w-auto" aria-hidden="true" />
            <LivepeerWordmark className="h-5 w-auto" aria-hidden="true" />
            <span
              className="translate-y-[0.12em] font-agent text-lg leading-none font-medium tracking-tight"
              aria-hidden="true"
            >
              AGENT
            </span>
          </div>
        </header>

        <div className="flex-1 px-7 py-10 sm:px-10 sm:py-12">
          <h1 className="text-4xl leading-[0.98] font-light tracking-[-0.045em] text-balance sm:text-5xl">
            Welcome to the private beta.
          </h1>

          <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>You&apos;re in.</p>
            <p>
              Livepeer Agent brings image and video generation directly into
              Claude, so you can create without leaving your session.
            </p>
            <p>
              Your account includes limited free credits to help you run your
              first generation.
            </p>
          </div>

          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="/mockups/agent-landing-page" />}
            className="mt-9 h-14 rounded-sm border border-emerald-500 bg-emerald-500 px-5 text-white hover:bg-emerald-500"
            style={{
              backgroundImage:
                "linear-gradient(160deg, color(display-p3 0.04 0.74 0.49) 0%, color(display-p3 0.04 0.74 0.49) 32%, color(display-p3 0.02 0.58 0.36) 100%)",
            }}
          >
            Add to Claude
            <ArrowRightIcon className="size-4" aria-hidden="true" />
          </Button>

          <div className="mt-10 text-sm leading-relaxed">
            <p>See you in Claude,</p>
            <p className="font-medium">The Livepeer team</p>
          </div>
        </div>

        <footer className="border-t px-7 py-6 sm:px-10">
          <LivepeerGradientLockup
            className="h-4 w-auto text-foreground"
            aria-label="Livepeer"
          />
        </footer>
      </article>
    </main>
  )
}
