import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { LivepeerWordmark } from "@/components/brand"
import { AgentCompatibility } from "@/components/mockups/agent-compatibility"
import { LivepeerCubeStream } from "@/components/mockups/livepeer-cube-stream"
import { Button } from "@/components/ui/button"

export function NetworkHeroSection() {
  return (
    <section className="relative flex min-h-[40rem] w-full items-center overflow-hidden bg-background sm:min-h-[76svh]">
      <LivepeerCubeStream />
      <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-4 py-28 sm:px-6 sm:py-32 lg:px-10">
        <div className="flex max-w-3xl flex-col items-start">
          <h1 className="max-w-[70%] text-4xl leading-[0.98] font-light tracking-[-0.045em] text-balance sm:max-w-none sm:text-[clamp(2.5rem,4.5vw,4rem)]">
            The open inference network.{" "}
            <span className="text-foreground/45">
              Connect GPUs, power AI and media workloads on Livepeer.
            </span>
          </h1>
          <div className="mt-12 flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/mockups/livepeer-agent" />}
              className="h-16 rounded-sm bg-emerald-500 px-4 text-white"
            >
              Get Started
              <ArrowRightIcon />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/mockups/livepeer-agent" />}
              className="h-16 rounded-sm bg-transparent px-4"
            >
              Sign in with Discord
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function LivepeerAgentFeatureSection() {
  return (
    <section className="relative min-h-[38rem] overflow-hidden bg-muted sm:min-h-[56rem]">
      <Image
        src="/playbooks/20260725-031450/runner-background.jpg"
        alt=""
        fill
        className="object-cover object-center dark:opacity-20 dark:mix-blend-luminosity"
        sizes="100vw"
      />
      <div className="relative z-10 flex min-h-[38rem] flex-col items-start justify-center p-6 sm:min-h-[56rem] sm:p-10">
        <h2 className="flex items-end gap-3" aria-label="Livepeer Agent">
          <LivepeerWordmark className="h-8 w-auto sm:h-10" aria-hidden="true" />
          <span className="translate-y-[0.17em] font-runner text-3xl leading-none font-medium sm:text-4xl">
            AGENT
          </span>
        </h2>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-foreground/65">
          A video agent harness for multimodal media generation, from right
          within Claude. Running on Livepeer&apos;s open network.
        </p>
        <div className="mt-7 flex flex-wrap gap-2">
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="/mockups/livepeer-org/agent" />}
            className="h-16 rounded-sm px-4"
          >
            Install
            <ArrowRightIcon />
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href="/mockups/livepeer-org/library" />}
            className="h-16 rounded-sm bg-transparent px-4"
          >
            Browse Playbooks
          </Button>
        </div>
        <AgentCompatibility className="mt-7" responsiveAlignment />
      </div>
    </section>
  )
}

export function OrchestratorCtaSection() {
  return (
    <section className="relative flex min-h-[32rem] overflow-hidden bg-foreground text-background sm:min-h-[56rem]">
      <LivepeerCubeStream inverted className="-scale-x-100 opacity-80" />
      <div className="relative z-10 flex w-full flex-col justify-center p-6 sm:p-10">
        <div className="ml-auto max-w-3xl text-right">
          <h2 className="text-4xl font-normal tracking-tight text-balance sm:text-6xl">
            Become an Orchestrator
          </h2>
          <p className="mt-4 ml-auto max-w-xl text-base leading-relaxed text-background/65">
            Put a GPU on the Livepeer network and earn from inference workloads,
            service payouts, and protocol rewards.
          </p>
          <Button
            size="lg"
            variant="secondary"
            nativeButton={false}
            render={<Link href="/mockups/livepeer-org/earn" />}
            className="mt-6 h-16 rounded-sm px-4"
          >
            Get Started
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </section>
  )
}
