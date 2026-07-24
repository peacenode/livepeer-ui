"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  CpuIcon,
  MessageCircleIcon,
  TerminalIcon,
} from "lucide-react"

import { LivepeerSymbol3D } from "@/components/mockups/livepeer-symbol-3d"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { InstallRunnerFooter } from "./install-runner-footer"

const paths = [
  {
    title: "Build with Runner",
    description: "Install Runner and use Livepeer from Codex or Cowork.",
    href: "/mockups/playbooks/install",
    icon: TerminalIcon,
    external: false,
  },
  {
    title: "Provide GPU compute",
    description: "Run an orchestrator and earn fees for completed work.",
    href: "https://docs.livepeer.org/v1/orchestrators/guides/get-started",
    icon: CpuIcon,
    external: true,
  },
  {
    title: "Join the community",
    description: "Meet builders, operators, and contributors in Discord.",
    href: "https://discord.gg/livepeer",
    icon: MessageCircleIcon,
    external: true,
  },
]

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

      <section className="bg-muted">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-medium">Choose how to participate</h2>
          <div className="mt-7 grid gap-3 md:grid-cols-3">
            {paths.map((path) => {
              const PathIcon = path.icon
              const content = (
                <Card className="h-full min-h-52 transition-colors group-hover:bg-accent">
                  <CardHeader className="flex h-full flex-col justify-between">
                    <PathIcon
                      className="size-5 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <CardTitle>{path.title}</CardTitle>
                        {path.external ? (
                          <ArrowUpRightIcon className="size-4 text-muted-foreground" />
                        ) : (
                          <ArrowRightIcon className="size-4 text-muted-foreground" />
                        )}
                      </div>
                      <CardDescription className="mt-2 leading-relaxed">
                        {path.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              )

              return path.external ? (
                <a
                  key={path.title}
                  href={path.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-4xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {content}
                </a>
              ) : (
                <Link
                  key={path.title}
                  href={path.href}
                  className="group rounded-4xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {content}
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
