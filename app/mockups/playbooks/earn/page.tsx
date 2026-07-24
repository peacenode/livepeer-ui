import type { Metadata } from "next"
import {
  ArrowUpRightIcon,
  CheckIcon,
  CircleDollarSignIcon,
  CpuIcon,
  NetworkIcon,
  ServerIcon,
  WalletIcon,
} from "lucide-react"

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
    description:
      "Connect your GPU to an existing operator. The pool handles the orchestrator, stake, and on-chain work.",
    requirements: ["NVIDIA GPU", "Linux host", "Reliable internet"],
    note: "No LPT required",
    href: "https://docs.livepeer.org/v2/orchestrators/quickstart/join-a-pool",
  },
  {
    title: "Run AI-first",
    fit: "Best with 24 GB+ VRAM",
    description:
      "Serve inference workloads where capability, price, latency, and uptime matter more than active-set stake.",
    requirements: ["CUDA 12+", "Docker", "NVIDIA Container Toolkit"],
    note: "Lower stake barrier",
    href: "https://docs.livepeer.org/v2/orchestrators/guides/ai-and-job-workloads/ai-inference-operations",
  },
  {
    title: "Run a solo node",
    fit: "Full operator path",
    description:
      "Operate go-livepeer, publish your service address, manage the wallet, set prices, and monitor rewards.",
    requirements: ["Arbitrum ETH", "LPT for video", "Public service URI"],
    note: "Most responsibility",
    href: "https://docs.livepeer.org/v2/orchestrators/setup/guide",
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

const launchSteps = [
  {
    title: "Choose the operating path",
    description:
      "Start with a pool if you want to contribute a GPU without managing LPT or protocol transactions. Choose AI-first or solo only if you want to operate the full stack.",
  },
  {
    title: "Validate the machine",
    description:
      "Check the GPU with nvidia-smi, confirm CUDA and Docker access, benchmark real capacity, and leave headroom for network and workload spikes.",
    href: "https://docs.livepeer.org/v2/orchestrators/guides/operator-considerations/requirements",
    linkLabel: "Check hardware requirements",
  },
  {
    title: "Install and configure go-livepeer",
    description:
      "Pin a release, select the GPU, set capacity and pricing, and use an Arbitrum One RPC. A solo node also needs a publicly reachable service address.",
    href: "https://docs.livepeer.org/v2/orchestrators/setup/install",
    linkLabel: "Open installation guide",
  },
  {
    title: "Fund and activate if required",
    description:
      "A solo on-chain node needs ETH on Arbitrum One for gas. Solo video operators also need enough self-stake plus delegated LPT to enter the active set.",
    href: "https://docs.livepeer.org/v2/orchestrators/setup/connect",
    linkLabel: "Connect to Arbitrum",
  },
  {
    title: "Verify before accepting work",
    description:
      "Test external reachability, GPU execution, pricing, and capacity. Then monitor uptime, job success, wallet balance, and reward calls.",
    href: "https://docs.livepeer.org/v2/orchestrators/setup/verify",
    linkLabel: "Run verification",
  },
]

const fundingLinks = [
  {
    title: "Get ETH onto Arbitrum One",
    description:
      "Use the official Arbitrum bridge to move ETH from Ethereum, or withdraw ETH directly to Arbitrum One from a supported exchange.",
    href: "https://bridge.arbitrum.io/",
    action: "Open Arbitrum bridge",
  },
  {
    title: "Check the LPT threshold",
    description:
      "For solo video, compare your total bonded stake with the lowest-ranked active orchestrator before acquiring or bonding LPT.",
    href: "https://explorer.livepeer.org/orchestrators",
    action: "View active orchestrators",
  },
  {
    title: "Keep the wallet healthy",
    description:
      "Gas pays for activation, reward calls, and ticket redemption. Use a dedicated wallet, back up its keystore, and maintain an ETH buffer.",
    href: "https://docs.livepeer.org/v2/orchestrators/guides/monitoring-and-tooling/explorer-operations",
    action: "Review wallet monitoring",
  },
]

export default async function EarnWithGpuPage() {
  const network = await getNetworkStats()
  const earnings = [
    {
      label: "Service payouts (USD)",
      value: network ? `$${formatCompact(network.payoutsUsd24h)}` : "—",
      period: "24h",
    },
    {
      label: "Protocol rewards (USD)",
      value: network ? `$${formatCompact(network.rewardsUsd24h)}` : "—",
      period: "24h",
    },
  ]

  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl leading-[0.98] font-medium tracking-tight text-balance sm:text-6xl">
            Put a GPU on the network.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Start with the operating model that fits your hardware, stake, and
            tolerance for infrastructure work. A pool is the shortest path. A
            solo node gives you control and the full operating burden.
          </p>
        </div>
      </section>

      <section id="choose-a-path" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-16 grid grid-cols-2 gap-4 sm:w-fit sm:grid-cols-[repeat(2,14rem)]">
            {earnings.map((earning) => (
              <Card key={earning.label} variant="metric">
                <CardHeader>
                  <CardDescription className="flex w-full items-baseline gap-1.5">
                    <span>{earning.label}</span>
                    <span className="shrink-0 tabular-nums">
                      {earning.period}
                    </span>
                  </CardDescription>
                  <CardTitle className="text-3xl leading-none font-medium tracking-tight tabular-nums">
                    {earning.value}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="max-w-2xl">
            <h2 className="text-2xl font-medium sm:text-3xl">
              Choose the right path
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Do not buy tokens or new hardware before deciding which role you
              actually want to run.
            </p>
          </div>
          <div className="mt-10 grid md:grid-cols-3">
            {paths.map((path) => (
              <article
                key={path.title}
                className="flex flex-col py-8 md:px-8 md:first:pl-0 md:last:pr-0"
              >
                <p className="text-xs font-medium text-muted-foreground">
                  {path.fit}
                </p>
                <h3 className="mt-3 text-xl font-medium">{path.title}</h3>
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
                <div className="mt-8 flex items-end justify-between gap-4 pt-5">
                  <span className="text-xs text-muted-foreground">
                    {path.note}
                  </span>
                  <a
                    href={path.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
                  >
                    Details
                    <ArrowUpRightIcon className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-10 md:grid-cols-[0.7fr_1.3fr]">
          <div>
            <h2 className="text-2xl font-medium">Baseline requirements</h2>
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
                  <h3 className="mt-6 font-medium">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-[0.7fr_1.3fr]">
          <div>
            <h2 className="text-2xl font-medium">From machine to live node</h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Treat activation as a checkpoint after the host is tested, not as
              the first proof that setup worked.
            </p>
          </div>
          <ol className="border-t">
            {launchSteps.map((step, index) => (
              <li
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
                  {step.href && (
                    <a
                      href={step.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium hover:underline"
                    >
                      {step.linkLabel}
                      <ArrowUpRightIcon className="size-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex items-center gap-3">
          <WalletIcon
            className="size-5 text-muted-foreground"
            aria-hidden="true"
          />
          <h2 className="text-2xl font-medium">Wallet and network funding</h2>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          This only applies when you operate an on-chain node. Pool workers
          normally do not manage the protocol wallet.
        </p>
        <div className="mt-10 grid border-t md:grid-cols-3">
          {fundingLinks.map((item) => (
            <div
              key={item.title}
              className="flex flex-col border-b py-8 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <h3 className="font-medium">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium hover:underline"
              >
                {item.action}
                <ArrowUpRightIcon className="size-4" aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          Use Arbitrum One, not Ethereum mainnet, for the operator wallet’s gas.
          Never paste a private key into a website. Confirm the network and
          destination address before bridging or withdrawing funds.
        </p>
      </section>

      <section className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="font-medium">Check the economics before launch.</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Compare current demand, pricing, stake, power cost, and expected
              uptime before committing hardware.
            </p>
          </div>
          <Button
            nativeButton={false}
            variant="outline"
            render={
              <a
                href="https://docs.livepeer.org/v2/orchestrators/guides/operator-considerations/operator-rationale"
                target="_blank"
                rel="noreferrer"
              />
            }
          >
            Review operator economics
            <ArrowUpRightIcon className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </section>
    </main>
  )
}
