"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export function WaitlistReferralLink({
  inviteUrl,
  copyAriaLabel,
  copiedToast,
}: {
  inviteUrl: string
  copyAriaLabel: string
  copiedToast: string
}) {
  const [copied, setCopied] = useState(false)

  async function copyInvite() {
    await navigator.clipboard?.writeText(`https://${inviteUrl}`)
    setCopied(true)
    toast.success(copiedToast)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="flex items-center gap-2 rounded-md border border-emerald-400/30 bg-white/[0.04] p-1.5 pl-4">
      <p className="min-w-0 flex-1 truncate font-mono text-xs text-muted-foreground">
        {inviteUrl}
      </p>
      <Button
        type="button"
        size="icon-sm"
        variant="ghost"
        aria-label={copyAriaLabel}
        onClick={copyInvite}
        className="shrink-0 rounded-full"
      >
        {copied ? <Check /> : <Copy />}
      </Button>
    </div>
  )
}
