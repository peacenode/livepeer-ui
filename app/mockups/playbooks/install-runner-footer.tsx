"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

const command = "npm install -g @livepeer/runner"

export function InstallRunnerFooter({
  title = "Run this playbook with Runner.",
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
    <footer className="mt-20 border-t bg-muted">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <h2 className="text-2xl font-medium text-balance">{title}</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
          <div className="mt-6 inline-flex max-w-full items-center gap-4 rounded-2xl bg-foreground px-4 py-3 text-background">
            <code className="min-w-0 overflow-x-auto font-mono text-xs whitespace-nowrap text-background/80">
              {command}
            </code>
            <button
              type="button"
              onClick={copyCommand}
              className="flex size-8 shrink-0 items-center justify-center rounded-full text-background/70 transition-colors hover:bg-background/10 hover:text-background"
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
          render={<Link href="/mockups/playbooks/install" />}
        >
          Installation guide
        </Button>
      </div>
    </footer>
  )
}
