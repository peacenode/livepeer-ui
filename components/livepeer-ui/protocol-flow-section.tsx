import Link from "next/link"
import {
  ArrowRightIcon,
  BlocksIcon,
  CpuIcon,
  PlayIcon,
  type LucideIcon,
} from "lucide-react"

export type ProtocolLayer = {
  number: string
  title: string
  description: string
  detail: string
  href: string
  icon: LucideIcon
}
export const protocolLayers: ProtocolLayer[] = [
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
    href: "/mockups/livepeer-agent/inference/livepeer-agent",
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
export function ProtocolLayerCard({
  number,
  title,
  description,
  detail,
  href,
  icon: Icon,
}: ProtocolLayer) {
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
export function ProtocolFlowSection({
  heading,
  layers = protocolLayers,
}: {
  heading: string
  layers?: ProtocolLayer[]
}) {
  return (
    <section>
      <h2 className="text-lg font-medium">{heading}</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        {layers.map((layer, index) => (
          <div key={layer.title} className="contents">
            <ProtocolLayerCard {...layer} />
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
  )
}
