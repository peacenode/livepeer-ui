"use client"

import Link from "next/link"
import { CopyIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export function RegistryHomeActions() {
  async function copyDesignGuide() {
    const response = await fetch("/design.md")
    const markdown = await response.text()
    await navigator.clipboard.writeText(markdown)
    toast.success("design.md copied")
  }

  return (
    <div className="flex w-full flex-wrap justify-center gap-3">
      <Button
        nativeButton={false}
        render={<Link href="/docs" />}
        size="lg"
        className="h-16 rounded-sm border border-emerald-500 bg-emerald-500 px-6 text-sm text-white hover:bg-emerald-500"
        style={{
          backgroundImage:
            "linear-gradient(160deg, color(display-p3 0.04 0.74 0.49) 0%, color(display-p3 0.04 0.74 0.49) 32%, color(display-p3 0.02 0.58 0.36) 100%)",
        }}
      >
        Continue
      </Button>
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="h-16 rounded-sm px-6 text-sm"
        onClick={copyDesignGuide}
      >
        design.md
        <CopyIcon data-icon="inline-end" aria-hidden="true" />
      </Button>
    </div>
  )
}
