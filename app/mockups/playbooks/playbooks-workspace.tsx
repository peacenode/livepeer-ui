"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon, CheckIcon, CopyIcon, CpuIcon } from "lucide-react"

import { LivepeerSymbol3D } from "@/components/mockups/livepeer-symbol-3d"

import { InstallRunnerFooter } from "./install-runner-footer"

export function PlaybooksWorkspace() {
  const [copied, setCopied] = useState(false)

  return (
    <main>
      <section className="relative flex min-h-svh w-full items-center overflow-hidden bg-muted">
        <LivepeerSymbol3D
          showOnMobile
          className="rounded-none opacity-75 [&>canvas]:scale-125"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-muted via-muted/90 to-muted/35"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-4 py-28 sm:px-6 sm:py-32 lg:px-10">
          <div className="flex max-w-6xl flex-col items-start">
            <h1 className="text-[clamp(2.75rem,5.8vw,5.75rem)] leading-[0.94] font-normal tracking-[-0.05em] text-balance">
              Open infrastructure to run AI on your terms.
              <span className="mt-3 block text-foreground/45">
                Run inference, automate repeatable workflows, and put GPUs to
                work—from your first prompt to production.
              </span>
            </h1>
            <div className="mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
              <div className="inline-flex min-w-0 items-center gap-4 rounded-xl bg-foreground px-4 py-2.5 text-left text-background">
                <code className="min-w-0 overflow-x-auto font-mono text-xs whitespace-nowrap text-background/80">
                  npm install -g @livepeer/runner
                </code>
                <button
                  type="button"
                  onClick={async () => {
                    await navigator.clipboard.writeText(
                      "npm install -g @livepeer/runner"
                    )
                    setCopied(true)
                  }}
                  className="flex size-8 shrink-0 items-center justify-center rounded-full text-background/70 transition-colors hover:bg-background/10 hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background"
                  aria-label={
                    copied ? "Install command copied" : "Copy install command"
                  }
                >
                  {copied ? (
                    <CheckIcon className="size-4" aria-hidden="true" />
                  ) : (
                    <CopyIcon className="size-4" aria-hidden="true" />
                  )}
                </button>
              </div>
              <Link
                href="/mockups/playbooks/library"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-foreground/15 bg-background/70 px-5 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                Browse Playbooks
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <InstallRunnerFooter className="mt-0" />

      <Link
        href="/mockups/playbooks/library"
        aria-label="Browse Playbooks"
        className="group relative block min-h-[32rem] overflow-hidden bg-muted sm:min-h-[40rem]"
      >
        <Image
          src="/playbooks/20260724-1905/playbook-mockup.jpg"
          alt=""
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.01]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-transparent"
          aria-hidden="true"
        />
        <div className="relative z-10 flex items-center justify-between gap-6 p-6 sm:p-10">
          <h2 className="text-4xl font-normal tracking-tight sm:text-5xl">
            Playbooks
          </h2>
          <span className="flex size-11 items-center justify-center rounded-full bg-black text-white transition-transform group-hover:translate-x-1">
            <ArrowRightIcon className="size-5" aria-hidden="true" />
          </span>
        </div>
      </Link>

      <Link
        href="/mockups/playbooks/earn"
        aria-label="Earn with GPU"
        className="group flex min-h-[32rem] bg-foreground text-background sm:min-h-[40rem]"
      >
        <div className="flex w-full flex-col justify-between p-6 sm:p-10">
          <div className="flex items-center justify-between gap-6">
            <CpuIcon className="size-8" strokeWidth={1.25} aria-hidden="true" />
            <span className="flex size-11 items-center justify-center rounded-full bg-background text-foreground transition-transform group-hover:translate-x-1">
              <ArrowRightIcon className="size-5" aria-hidden="true" />
            </span>
          </div>
          <div className="max-w-3xl">
            <h2 className="text-4xl font-normal tracking-tight sm:text-6xl">
              Earn with GPU
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-background/65">
              Put a GPU on the Livepeer network and earn from inference
              workloads, service payouts, and protocol rewards.
            </p>
          </div>
        </div>
      </Link>
    </main>
  )
}
