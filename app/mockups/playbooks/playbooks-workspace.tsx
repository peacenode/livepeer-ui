import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon, CpuIcon } from "lucide-react"

import { LivepeerSymbol3D } from "@/components/mockups/livepeer-symbol-3d"
import { Button } from "@/components/ui/button"

import { InstallRunnerFooter } from "./install-runner-footer"

export function PlaybooksWorkspace() {
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
          <div className="flex max-w-4xl flex-col items-start">
            <h1 className="text-[clamp(2.5rem,4.5vw,4rem)] leading-[0.98] font-normal tracking-[-0.045em] text-balance">
              Turn idle compute into paid compute.{" "}
              <span className="text-foreground/45">
                Connect your GPUs to AI rendering jobs on Livepeer.
              </span>
            </h1>
            <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href="/mockups/playbooks/earn" />}
              >
                Get Started
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href="/mockups/platform" />}
                className="bg-background/70 backdrop-blur-sm"
              >
                Sign up with Google
              </Button>
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
