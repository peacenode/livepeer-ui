import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon, CpuIcon } from "lucide-react"

import { LivepeerCubeStream } from "@/components/mockups/livepeer-cube-stream"
import { Button } from "@/components/ui/button"

export function PlaybooksWorkspace() {
  return (
    <main>
      <section className="relative flex min-h-[40rem] w-full items-center overflow-hidden bg-muted sm:min-h-[76svh]">
        <LivepeerCubeStream className="opacity-80" />
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
                variant="secondary"
                nativeButton={false}
                render={<Link href="/mockups/playbooks/earn" />}
                className="h-12 rounded-sm border-foreground/10 px-5"
              >
                Get Started
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                nativeButton={false}
                render={<Link href="/mockups/platform" />}
                className="h-12 rounded-sm border-foreground/10 px-5"
              >
                Sign up with Google
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-[44rem] overflow-hidden bg-muted sm:min-h-[56rem]">
        <Image
          src="/playbooks/20260724-232451/ultramock.jpg"
          alt=""
          fill
          className="object-cover object-[58%_center] sm:object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-white via-white/65 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute inset-0 z-10 flex flex-col items-start justify-center gap-4 p-6 sm:p-10">
          <h2 className="font-runner text-4xl font-medium tracking-tight sm:text-5xl">
            RUNNER
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-foreground/65">
            Your agent companion, ready to create images, video, and audio with
            the latest workflows purpose built into your agent.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Button
              size="lg"
              variant="secondary"
              nativeButton={false}
              render={<Link href="/mockups/playbooks/install" />}
              className="h-12 rounded-sm border-foreground/10 px-5"
            >
              Get Runner
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/mockups/playbooks/library" />}
              className="h-12 rounded-sm bg-background/60 px-5"
            >
              Browse Playbooks
            </Button>
          </div>
        </div>
      </section>

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
