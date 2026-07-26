import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { AgentCompatibility } from "@/components/mockups/agent-compatibility"
import { LivepeerCubeStream } from "@/components/mockups/livepeer-cube-stream"
import { LivepeerWordmark } from "@/components/brand"
import { Button } from "@/components/ui/button"

export function PlaybooksWorkspace() {
  return (
    <main>
      <section className="relative flex min-h-[40rem] w-full items-center overflow-hidden bg-white sm:min-h-[76svh]">
        <LivepeerCubeStream />
        <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-4 py-28 sm:px-6 sm:py-32 lg:px-10">
          <div className="flex max-w-3xl flex-col items-start">
            <h1 className="text-[clamp(2.5rem,4.5vw,4rem)] leading-[0.98] font-light tracking-[-0.045em] text-balance">
              The open inference network.{" "}
              <span className="text-foreground/45">
                Connect GPUs, power AI and media workloads on Livepeer.
              </span>
            </h1>
            <div className="mt-9 flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                nativeButton={false}
                render={<Link href="/mockups/livepeer-org/earn" />}
                className="h-16 rounded-sm border border-emerald-500 bg-emerald-500 px-4 text-white hover:bg-emerald-500"
                style={{
                  backgroundImage:
                    "linear-gradient(160deg, color(display-p3 0.04 0.74 0.49) 0%, color(display-p3 0.04 0.74 0.49) 32%, color(display-p3 0.02 0.58 0.36) 100%)",
                }}
              >
                Get Started
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href="/mockups/platform" />}
                className="h-16 rounded-sm border-foreground/20 bg-transparent px-4 transition-none hover:border-emerald-600 hover:bg-transparent"
              >
                Sign up with GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f3f3f3] sm:min-h-[56rem]">
        <Image
          src="/playbooks/20260725-031450/runner-background.jpg"
          alt=""
          fill
          className="hidden object-cover object-center sm:block"
          sizes="100vw"
        />
        <div className="relative z-10 flex flex-col items-center gap-5 px-6 py-12 text-center sm:absolute sm:inset-0 sm:items-start sm:justify-center sm:p-10 sm:text-left">
          <div className="mb-5 flex items-center gap-2 text-xs text-foreground/55">
            <Image
              src="/runner/20260724-2105/olive-branch-left.svg"
              alt=""
              width={10}
              height={20}
              className="h-5 w-2.5 object-contain opacity-50"
            />
            <span>Summer ’26</span>
            <Image
              src="/runner/20260724-2105/olive-branch-right.svg"
              alt=""
              width={10}
              height={20}
              className="h-5 w-2.5 object-contain opacity-50"
            />
          </div>
          <h2
            className="flex items-end gap-3 text-foreground sm:gap-4"
            aria-label="Livepeer Agent"
          >
            <LivepeerWordmark
              className="h-8 w-auto sm:h-10"
              aria-hidden="true"
            />
            <span
              className="translate-y-[0.17em] font-runner text-3xl leading-none font-medium tracking-tight sm:text-4xl"
              aria-hidden="true"
            >
              AGENT
            </span>
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-balance text-foreground/65">
            A video agent harness for multimodal media generation, from right
            within Claude. Running on Livepeer&apos;s open network.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
            <Button
              size="lg"
              variant="secondary"
              nativeButton={false}
              render={<Link href="/mockups/livepeer-org/agent" />}
              className="h-16 rounded-sm border-foreground/10 bg-muted px-4 text-foreground transition-[filter] hover:bg-muted hover:brightness-[0.97]"
              style={{
                backgroundImage:
                  "linear-gradient(160deg, color-mix(in oklab, var(--muted) 82%, white) 0%, var(--muted) 36%, color-mix(in oklab, var(--muted) 88%, black) 100%)",
              }}
            >
              Install
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/mockups/livepeer-org/library" />}
              className="h-16 rounded-sm border-foreground/20 bg-transparent px-4 text-muted-foreground transition-colors hover:bg-transparent hover:text-foreground"
            >
              Browse Playbooks
            </Button>
          </div>
          <AgentCompatibility className="mt-5" responsiveAlignment />
        </div>
        <div className="relative aspect-4/3 w-full sm:hidden">
          <Image
            src="/playbooks/20260725-031450/runner-background.jpg"
            alt=""
            fill
            className="object-cover object-[65%_center]"
            sizes="100vw"
          />
        </div>
      </section>

      <section className="relative flex min-h-[32rem] overflow-hidden bg-foreground text-background sm:min-h-[56rem]">
        <LivepeerCubeStream inverted className="-scale-x-100 opacity-80" />
        <div className="relative z-10 flex w-full flex-col justify-center p-6 sm:p-10">
          <div className="ml-auto max-w-3xl text-right">
            <h2 className="text-4xl font-normal tracking-tight text-balance sm:text-6xl">
              Become an Orchestrator
            </h2>
            <p className="mt-4 ml-auto max-w-xl text-base leading-relaxed text-balance text-background/65">
              Put a GPU on the Livepeer network and earn from inference
              workloads, service payouts, and protocol rewards.
            </p>
            <div className="mt-6 flex justify-end">
              <Button
                size="lg"
                variant="secondary"
                nativeButton={false}
                render={<Link href="/mockups/livepeer-org/earn" />}
                className="h-16 rounded-sm border-background/10 px-4"
              >
                Get Started
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
