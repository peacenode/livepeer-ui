import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRightIcon,
  BlocksIcon,
  CpuIcon,
  PlayIcon,
  WalletCardsIcon,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Livepeer Agent, workflows, and compute",
}

const layers = [
  {
    number: "01",
    title: "Livepeer Agent",
    description:
      "Livepeer Agent is the interface between people, agents, applications, and Livepeer. It accepts a task, authenticates the caller, and starts the right workflow.",
    detail: "CLI · MCP with OAuth · API",
    href: "/mockups/livepeer-org/agent",
    icon: PlayIcon,
  },
  {
    number: "02",
    title: "Inference",
    description:
      "Inference containers define the models, inputs, and runtime needed to produce a result on the network.",
    detail: "Select · run · measure usage",
    href: "/mockups/livepeer-agent/inference/ai-runner",
    icon: BlocksIcon,
  },
  {
    number: "03",
    title: "Compute",
    description:
      "Orchestrators provide the GPUs that execute workflows. The network matches each run with available compute and returns the result to Livepeer Agent.",
    detail: "Orchestrators · GPUs · rewards",
    href: "/mockups/livepeer-agent/compute",
    icon: CpuIcon,
  },
]

const requestSteps = [
  {
    title: "Intent",
    description:
      "A person, agent, or application asks Livepeer Agent to create or transform media.",
  },
  {
    title: "Workflow",
    description:
      "Livepeer Agent selects the saved workflow and validates its inputs.",
  },
  {
    title: "Execution",
    description:
      "An orchestrator runs the workflow on its GPU and returns the output.",
  },
  {
    title: "Result",
    description:
      "Livepeer Agent returns the output to the CLI, connected agent, or application.",
  },
]

export default function ProtocolPage() {
  return (
    <main className="h-[calc(100dvh-4rem)] overflow-y-auto overscroll-none md:h-dvh">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="max-w-3xl">
          <p className="text-sm text-muted-foreground">Livepeer</p>
          <h1 className="mt-2 text-3xl font-medium text-balance">
            Livepeer Agent connects applications and agents to media workflows. Compute
            runs them.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Workflows define what happens. Livepeer Agent makes them available through
            the CLI, MCP, and API. The Livepeer network supplies the compute
            that executes every run.
          </p>
        </header>

        <section className="mt-12">
          <h2 className="text-lg font-medium">Three layers, one request</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
            {layers.map((layer, index) => (
              <div key={layer.title} className="contents">
                <ProtocolLayer {...layer} />
                {index < layers.length - 1 && (
                  <ArrowRightIcon
                    className="hidden size-4 text-muted-foreground md:block"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-lg font-medium">
            How a Livepeer Agent request moves
          </h2>
          <div className="mt-4 border-y">
            {requestSteps.map((step, index) => (
              <div
                key={step.title}
                className="grid gap-2 border-b py-5 last:border-b-0 sm:grid-cols-[48px_140px_1fr] sm:items-baseline"
              >
                <span className="text-xs text-muted-foreground tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-sm font-medium">{step.title}</h3>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-10 md:grid-cols-2">
          <div>
            <PlayIcon className="size-5" aria-hidden="true" />
            <h2 className="mt-3 text-lg font-medium">
              Any agent can use Livepeer Agent
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Connect the Livepeer Agent MCP and authorize it with OAuth. The agent gets
              access to this project&rsquo;s workflows without handling a
              long-lived API credential.
            </p>
          </div>
          <div>
            <WalletCardsIcon className="size-5" aria-hidden="true" />
            <h2 className="mt-3 text-lg font-medium">
              Payment follows execution
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The project pays when a workflow runs. The orchestrator that
              supplies the GPU earns service fees, while protocol rewards
              support active network compute.
            </p>
          </div>
        </section>

        <div className="mt-14 border-t pt-6">
          <a
            href="https://docs.livepeer.org/v2/about/protocol/architecture"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
          >
            Read the protocol architecture
            <ArrowRightIcon className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </main>
  )
}

function ProtocolLayer({
  number,
  title,
  description,
  detail,
  href,
  icon: Icon,
}: (typeof layers)[number]) {
  return (
    <Link
      href={href}
      className="group flex min-h-64 flex-col rounded-3xl bg-muted p-5 transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <div className="flex items-center justify-between gap-4">
        <Icon className="size-5" aria-hidden="true" />
        <span className="text-xs text-muted-foreground tabular-nums">
          {number}
        </span>
      </div>
      <div className="mt-auto">
        <h3 className="text-base font-medium">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <p className="mt-4 text-xs text-muted-foreground">{detail}</p>
      </div>
    </Link>
  )
}
