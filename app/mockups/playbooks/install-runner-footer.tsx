"use client"

import { useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const command = "npm install -g @livepeer/runner"

export function InstallRunnerFooter({
  title = "Runner",
  description = "Install the plugin once, paste your copied playbook into the agent of your choice, and approve each production step.",
  className,
}: {
  title?: string
  description?: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  async function copyCommand() {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 3000)
  }

  return (
    <section
      className={cn(
        "relative isolate mt-20 border-t bg-cover bg-center text-white",
        className
      )}
      style={{
        backgroundImage: "url('/runner/20260724-1825/train-motion-blur.png')",
      }}
    >
      <div className="absolute inset-0 -z-10 bg-black/55" aria-hidden="true" />
      <div className="mx-auto flex min-h-96 max-w-6xl items-end px-4 py-12 sm:px-6 sm:py-16">
        <div className="w-full max-w-xl">
          <h2 className="[font-family:'Serpentine_Runner',sans-serif] text-4xl font-medium tracking-[-0.06em] text-balance uppercase sm:text-5xl">
            {title}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
            {description}
          </p>
          <div className="mt-7 flex w-full max-w-md items-center justify-between gap-4 rounded-2xl bg-white/95 px-5 py-4 text-black backdrop-blur-sm">
            <code className="flex min-w-0 items-center gap-2 overflow-x-auto font-mono text-xs whitespace-nowrap">
              <span className="text-black/40" aria-hidden="true">
                $
              </span>
              <span className="text-black/80">{command}</span>
            </code>
            <button
              type="button"
              onClick={copyCommand}
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-black/80"
              aria-label={copied ? "Install command copied" : "Copy command"}
            >
              {copied ? (
                <CheckIcon className="size-4" aria-hidden="true" />
              ) : (
                <CopyIcon className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
