import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRightIcon,
  CheckIcon,
  CircleDollarSignIcon,
  GaugeIcon,
  ServerIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Earn with GPU",
}

const benefits = [
  {
    title: "Service payouts",
    description:
      "Earn fees when the network routes paid video and AI work to your hardware.",
    icon: CircleDollarSignIcon,
  },
  {
    title: "Protocol rewards",
    description:
      "Participate in Livepeer’s delegated proof-of-stake network and receive protocol rewards.",
    icon: GaugeIcon,
  },
  {
    title: "Your infrastructure",
    description:
      "Choose the hardware, capacity, pricing, and workloads your operation supports.",
    icon: ServerIcon,
  },
]

const steps = [
  {
    title: "Prepare your GPU host",
    description:
      "Start with a Linux machine, a supported NVIDIA GPU, and reliable network access.",
  },
  {
    title: "Run an orchestrator",
    description:
      "Install Livepeer, configure your service URI and pricing, then connect to the network.",
  },
  {
    title: "Receive delegated stake",
    description:
      "Share your performance and availability so LPT holders can delegate to your operation.",
  },
  {
    title: "Complete network work",
    description:
      "Process supported jobs, earn service payouts, and keep your node healthy as demand grows.",
  },
]

const requirements = [
  "A supported NVIDIA GPU",
  "A public service URI",
  "Reliable bandwidth and uptime",
  "ETH for network transactions",
]

export default function EarnWithGpuPage() {
  return (
    <main>
      <section className="mx-auto flex min-h-[72svh] max-w-6xl items-center px-4 pt-24 pb-14 sm:px-6 sm:pt-28 sm:pb-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl leading-[0.98] font-medium tracking-tight text-balance sm:text-6xl">
            Put your GPUs to work.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Become a Livepeer orchestrator. Provide dependable GPU compute for
            video workflows and earn service payouts alongside protocol rewards.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              nativeButton={false}
              render={
                <a
                  href="https://docs.livepeer.org/v1/orchestrators/guides/get-started"
                  target="_blank"
                  rel="noreferrer"
                />
              }
            >
              Read the operator guide
              <span className="font-sans" aria-hidden="true">
                ↗
              </span>
            </Button>
            <Button
              nativeButton={false}
              variant="outline"
              render={
                <a
                  href="https://discord.gg/livepeer"
                  target="_blank"
                  rel="noreferrer"
                />
              }
            >
              Talk to operators
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y">
        <div className="mx-auto grid max-w-6xl px-4 sm:px-6 md:grid-cols-3">
          {benefits.map((benefit) => {
            const BenefitIcon = benefit.icon

            return (
              <div
                key={benefit.title}
                className="flex min-h-56 flex-col justify-between gap-8 border-b py-8 last:border-b-0 md:border-r md:border-b-0 md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <BenefitIcon
                  className="size-5 text-muted-foreground"
                  aria-hidden="true"
                />
                <div>
                  <h2 className="font-medium">{benefit.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-[0.75fr_1.25fr]">
        <div>
          <h2 className="text-2xl font-medium">How it works</h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Start with one capable machine, prove its reliability, and expand as
            the network sends more work.
          </p>
        </div>
        <div className="border-t">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="grid gap-4 border-b py-7 sm:grid-cols-[2rem_1fr]"
            >
              <span className="text-xs text-muted-foreground tabular-nums">
                0{index + 1}
              </span>
              <div>
                <h3 className="font-medium">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-2 md:items-end">
          <div>
            <h2 className="text-2xl font-medium">What you need</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {requirements.map((requirement) => (
                <div
                  key={requirement}
                  className="flex items-center gap-3 text-sm"
                >
                  <CheckIcon
                    className="size-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                  {requirement}
                </div>
              ))}
            </div>
          </div>
          <div className="md:justify-self-end">
            <Link
              href="/mockups/playbooks"
              className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
            >
              See what the network powers
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
