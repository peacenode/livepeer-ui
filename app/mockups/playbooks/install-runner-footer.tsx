"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

const command = "npm install -g @livepeer/runner"

export function InstallRunnerFooter({
  title = "Runner",
  description = "Install the plugin once, paste your copied playbook into the agent of your choice, and approve each production step.",
}: {
  title?: string
  description?: string
}) {
  const [copied, setCopied] = useState(false)

  async function copyCommand() {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 3000)
  }

  return (
    <footer
      className="relative isolate mt-20 border-t bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/runner/20260724-1825/train-motion-blur.png')",
      }}
    >
      <div className="absolute inset-0 -z-10 bg-black/55" aria-hidden="true" />
      <div className="mx-auto grid min-h-96 max-w-6xl gap-8 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <h2 className="[font-family:'Serpentine_Runner',sans-serif] text-4xl font-medium tracking-[-0.06em] text-balance uppercase sm:text-5xl">
            {title}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
            {description}
          </p>
          <div className="mt-6 inline-flex max-w-full items-center gap-4 rounded-2xl bg-white px-4 py-3 text-black">
            <code className="min-w-0 overflow-x-auto font-mono text-xs whitespace-nowrap text-black/80">
              {command}
            </code>
            <button
              type="button"
              onClick={copyCommand}
              className="flex size-8 shrink-0 items-center justify-center rounded-full text-black/70 transition-colors hover:bg-black/10 hover:text-black"
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
        <Button
          nativeButton={false}
          variant="outline"
          className="bg-white text-black hover:bg-white/90 hover:text-black"
          render={<Link href="/mockups/playbooks/install" />}
        >
          Installation guide
        </Button>
      </div>
    </footer>
  )
}
