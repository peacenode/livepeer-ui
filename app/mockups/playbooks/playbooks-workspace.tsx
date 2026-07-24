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
          className="rounded-none [&>canvas]:scale-125"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-muted/45"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto flex w-full justify-center px-4 sm:px-6">
          <div className="flex w-full max-w-xl flex-col items-center text-center">
            <h1 className="text-4xl leading-[0.98] font-normal tracking-tight text-balance sm:text-6xl">
              The open network for inference &amp; compute.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
              Install Runner and get started in your agent of choice.
            </p>
            <div className="mt-8 inline-flex max-w-full items-center gap-4 rounded-2xl bg-foreground px-4 py-3 text-left text-background">
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
                className="flex size-8 shrink-0 items-center justify-center rounded-full text-background/70 transition-colors hover:bg-background/10 hover:text-background"
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
