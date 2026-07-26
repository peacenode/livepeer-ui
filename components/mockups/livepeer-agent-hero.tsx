import Link from "next/link"

import { CopyButton } from "@/components/docs/copy-button"
import { LivepeerWordmark } from "@/components/brand"
import { LivepeerAgentDeltaStream } from "@/components/mockups/livepeer-agent-delta-stream"

export function LivepeerAgentHero({
  serverUrl = "https://storyboard.daydream.monster/api/mcp",
}: {
  serverUrl?: string
}) {
  return (
    <section className="relative flex min-h-[38rem] items-center overflow-hidden bg-background px-4 py-20 sm:px-6">
      <LivepeerAgentDeltaStream className="-translate-y-8" />
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-7 text-center">
        <div
          className="flex items-end gap-3 text-foreground sm:gap-4"
          aria-label="Livepeer Agent"
        >
          <LivepeerWordmark className="h-8 w-auto sm:h-10" aria-hidden="true" />
          <span
            className="translate-y-[0.17em] font-agent text-3xl leading-none font-medium tracking-tight sm:text-4xl"
            aria-hidden="true"
          >
            AGENT
          </span>
        </div>
        <h1 className="max-w-3xl text-4xl leading-[0.98] font-light tracking-[-0.045em] text-balance sm:text-6xl">
          Create and edit images and video with your agent.
        </h1>
        <div className="flex max-w-full flex-col items-center">
          <p className="mb-7 text-sm text-muted-foreground">
            In your agent&apos;s MCP / connector settings, add this server:
          </p>
          <div className="inline-flex max-w-full items-center gap-4 rounded-sm bg-secondary px-5 py-4 text-left text-secondary-foreground">
            <code className="min-w-0 break-all font-mono text-xs leading-relaxed sm:text-sm">
              {serverUrl}
            </code>
            <CopyButton value={serverUrl} className="size-8 shrink-0" />
          </div>
        </div>
        <nav className="flex items-center gap-5 text-sm" aria-label="Account">
          <Link href="/mockups/livepeer-agent" className="underline underline-offset-4">
            Sign in
          </Link>
          <Link href="/mockups/livepeer-agent" className="underline underline-offset-4">
            Create account
          </Link>
        </nav>
      </div>
    </section>
  )
}
