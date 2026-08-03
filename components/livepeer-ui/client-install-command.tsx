"use client"

import { useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

const installCommand = "npx skills add livepeer/agent-skills --global --agent codex claude-code"

export function ClientInstallCommand() {
  const [copied, setCopied] = useState(false)
  async function copyCommand() {
    await navigator.clipboard.writeText(installCommand)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }
  return (
    <div className="flex items-center gap-2 rounded-xl bg-muted p-2 pl-4">
      <code className="min-w-0 flex-1 overflow-x-auto text-xs whitespace-nowrap">{installCommand}</code>
      <Button type="button" variant="outline" size="icon-sm" aria-label={copied ? "Copied install command" : "Copy install command"} onClick={copyCommand}>
        {copied ? <CheckIcon /> : <CopyIcon />}
      </Button>
    </div>
  )
}
