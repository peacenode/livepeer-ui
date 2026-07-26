import type { Metadata } from "next"
import Image from "next/image"
import {
  ArrowUpRightIcon,
  CableIcon,
  CheckIcon,
  CircleDollarSignIcon,
  CpuIcon,
  NetworkIcon,
  ServerCogIcon,
  ServerIcon,
  SparklesIcon,
} from "lucide-react"

import { LivepeerSymbol } from "@/components/brand"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatCompact, getNetworkStats } from "@/lib/livepeer"

export const metadata: Metadata = {
  title: "Provide GPU compute",
  description:
    "Choose a Livepeer GPU provider path, prepare your hardware, and bring a node online.",
}

const paths = [
  {
    title: "Join a pool",
    fit: "Fastest path",
    icon: CableIcon,
    gradientId: "pool-path-gradient",
    description:
      "Connect as a worker behind an existing Orchestrator. The operator handles registration, LPT, routing, and payouts; you provide GPU compute and receive off-chain earnings under the pool’s terms.",
    requirements: [
      "NVIDIA GPU and Linux",
      "Docker or go-livepeer",
      "Verified payout terms",
    ],
    note: "No LPT required",
    href: "https://docs.livepeer.org/v2/orchestrators/guides/deployment-details/new-join-a-pool",
    action: "Pool setup guide",
  },
  {
    title: "Run AI-first",
    fit: "Best with 24 GB+ VRAM",
    icon: SparklesIcon,
    gradientId: "ai-path-gradient",
    description:
      "Serve inference workloads where capability, price, latency, and uptime matter more than active-set stake.",
    requirements: ["CUDA 12+", "Docker", "NVIDIA Container Toolkit"],
    note: "Lower stake barrier",
    href: "https://docs.livepeer.org/v2/orchestrators/guides/ai-and-job-workloads/ai-inference-operations",
    action: "AI operations",
  },
  {
    title: "Run a solo node",
    fit: "Full operator path",
    icon: ServerCogIcon,
    gradientId: "solo-path-gradient",
    description:
      "Operate go-livepeer, publish your service address, manage the wallet, set prices, and monitor rewards.",
    requirements: ["Arbitrum ETH", "LPT for video", "Public service URI"],
    note: "Most responsibility",
    href: "https://docs.livepeer.org/v2/orchestrators/setup/guide",
    action: "Solo setup guide",
  },
]

const baseline = [
  {
    title: "Supported GPU",
    description:
      "NVIDIA is the supported hardware-accelerated path. Confirm the host can see the card with nvidia-smi.",
    icon: CpuIcon,
  },
  {
    title: "Production host",
    description:
      "Use Linux for production GPU workloads. AI also needs Docker, CUDA 12+, and NVIDIA Container Toolkit.",
    icon: ServerIcon,
  },
  {
    title: "Public network",
    description:
      "Use stable, low-latency internet. Solo nodes need a public domain or static IP and an open service port.",
    icon: NetworkIcon,
  },
  {
    title: "Operating budget",
    description:
      "Account for electricity, storage, bandwidth, and maintenance. Work and earnings are not guaranteed.",
    icon: CircleDollarSignIcon,
  },
]

export default async function EarnWithGpuPage() {
  const network = await getNetworkStats()
  const earnings = [
    {
      label: "Service payouts",
      value: network ? `$${formatCompact(network.payoutsUsd24h)}` : "—",
      period: "24h",
    },
    {
      label: "Protocol rewards",
      value: network ? `$${formatCompact(network.rewardsUsd24h)}` : "—",
      period: "24h",
    },
  ]

  return (
    <main>
      <section className="mx-auto max-w-screen-2xl px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24 lg:px-10">
        <div className="max-w-3xl">
          <h1 className="text-[clamp(2.5rem,4.5vw,4rem)] leading-[0.98] font-light tracking-[-0.045em] text-balance">
            Put a GPU on the network.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Start with the operating model that fits your hardware, stake, and
            tolerance for infrastructure work. A pool is the shortest path. A
            solo node gives you control and the full operating burden.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-4 sm:w-fit sm:grid-cols-[repeat(2,14rem)]">
          {earnings.map((earning) => (
            <Card key={earning.label} variant="metric" className="rounded-sm">
              <CardHeader>
                <CardDescription className="flex w-full items-baseline gap-1.5">
                  <span>{earning.label}</span>
                  <span className="shrink-0 tabular-nums">
                    {earning.period}
                  </span>
                </CardDescription>
                <CardTitle className="font-sans text-3xl leading-none font-medium tracking-tight tabular-nums">
                  {earning.value}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
        <Button
          nativeButton={false}
          size="lg"
          className="mt-16 h-16 rounded-sm px-6 sm:mt-24"
          render={
            <a
              href="https://docs.livepeer.org/v2/orchestrators/setup/guide"
              target="_blank"
              rel="noreferrer"
            />
          }
        >
          Orchestrator docs
          <ArrowUpRightIcon className="size-4" aria-hidden="true" />
        </Button>
      </section>

      <section id="choose-a-path" className="scroll-mt-20 bg-muted">
        <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
              Choose the right path
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Do not buy tokens or new hardware before deciding which role you
              actually want to run.
            </p>
          </div>
          <div className="mt-10 grid md:grid-cols-3">
            {paths.map((path, index) => {
              const Icon = path.icon

              return (
                <article
                  key={path.title}
                  className={[
                    "flex flex-col py-8 md:px-8 md:first:pl-0 md:last:pr-0",
                    index === 0 ? "md:mt-48" : index === 1 ? "md:mt-24" : "",
                  ].join(" ")}
                >
                  <Icon
                    className="mb-5 size-6 stroke-[1.5]"
                    stroke={`url(#${path.gradientId})`}
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        className="path-icon-gradient"
                        id={path.gradientId}
                        x1="0"
                        y1="0"
                        x2="24"
                        y2="24"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stopColor="#059669" />
                        <stop offset="1" stopColor="#d1fae5" />
                      </linearGradient>
                    </defs>
                  </Icon>
                  <p className="border-t border-emerald-500 pt-3 text-xs font-medium text-muted-foreground">
                    {path.fit}
                  </p>
                  <h3 className="mt-3 text-xl font-light">{path.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {path.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {path.requirements.map((requirement) => (
                      <li
                        key={requirement}
                        className="flex items-center gap-3 text-sm"
                      >
                        <CheckIcon
                          className="size-4 text-muted-foreground"
                          aria-hidden="true"
                        />
                        {requirement}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-col items-start gap-3">
                    <span className="text-xs text-muted-foreground">
                      {path.note}
                    </span>
                    <a
                      href={path.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
                    >
                      {path.action}
                      <ArrowUpRightIcon className="size-4" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
        <div className="grid gap-10 md:grid-cols-[0.7fr_1.3fr]">
          <div>
            <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
              Baseline requirements
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              These are the practical requirements that apply before protocol
              configuration.
            </p>
          </div>
          <div className="grid border-t sm:grid-cols-2">
            {baseline.map((item, index) => {
              const Icon = item.icon

              return (
                <div
                  key={item.title}
                  className={[
                    "border-b py-7 sm:px-7",
                    index % 2 === 0 ? "sm:border-r sm:pl-0" : "sm:pr-0",
                  ].join(" ")}
                >
                  <Icon
                    className="size-5 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <h3 className="mt-6 text-lg font-light">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <article className="aspect-square bg-black text-white">
          <div className="relative flex size-full flex-col items-center justify-center px-6 text-center sm:px-10">
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/brands/20260725-0345/arbitrum.svg"
                alt="Arbitrum"
                width={64}
                height={64}
                className="size-10 sm:size-16"
              />
              <h2 className="mt-4 text-3xl font-light tracking-tight sm:mt-8 sm:text-4xl">
                Arbitrum One
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/60 sm:mt-3">
                Solo on-chain nodes need ETH on Arbitrum One for activation,
                reward calls, ticket redemption, and ongoing gas.
              </p>
              <Button
                nativeButton={false}
                variant="ghost"
                size="lg"
                className="mt-5 h-14 rounded-sm bg-white/10 px-6 text-white hover:bg-white/15 hover:text-white sm:mt-7 sm:h-16"
                render={
                  <a
                    href="https://bridge.arbitrum.io/"
                    target="_blank"
                    rel="noreferrer"
                  />
                }
              >
                Official Arbitrum Bridge
                <ArrowUpRightIcon className="size-4" aria-hidden="true" />
              </Button>
            </div>
            <p className="absolute right-6 bottom-4 left-6 text-[0.625rem] leading-4 font-normal text-balance text-white/40 sm:right-10 sm:bottom-7 sm:left-10 sm:text-[0.6875rem] sm:leading-relaxed">
              Use Arbitrum One, not Ethereum mainnet, for the operator wallet’s
              gas. Confirm the network and destination address before bridging
              or withdrawing funds, keep an ETH buffer for ongoing transactions,
              and never paste a private key into a website.
            </p>
          </div>
        </article>

        <article className="aspect-square bg-muted">
          <div className="flex size-full flex-col items-center justify-center px-6 text-center sm:px-10">
            <LivepeerSymbol className="size-10 text-emerald-500 sm:size-16" />
            <h2 className="mt-4 text-3xl font-light tracking-tight sm:mt-8 sm:text-4xl">
              $LPT stake
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-balance text-muted-foreground sm:mt-3">
              Solo video operators need enough self-stake and delegated LPT to
              enter the active orchestrator set. Pool workers do not manage
              stake.
            </p>
            <Button
              nativeButton={false}
              variant="outline"
              size="lg"
              className="mt-5 h-14 rounded-sm bg-background px-6 sm:mt-7 sm:h-16"
              render={
                <a
                  href="https://explorer.livepeer.org/orchestrators"
                  target="_blank"
                  rel="noreferrer"
                />
              }
            >
              View active orchestrators
              <ArrowUpRightIcon className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </article>
      </section>
    </main>
  )
}
