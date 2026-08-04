import { cn } from "@/lib/utils"

export type TokenNetworkDiagramContent = {
  applications: { title: string; description: string }
  gateways: { title: string; description: string }
  orchestrators: { title: string; description: string }
  delegators: { title: string; description: string }
  flows: {
    requests: string
    jobsAndPayments: string
    videoResponse: string
    stake: string
    fees: string
  }
}

export const defaultTokenNetworkDiagramContent: TokenNetworkDiagramContent = {
  applications: {
    title: "Applications",
    description: "Request video compute jobs",
  },
  gateways: {
    title: "Gateway Nodes",
    description: "Route jobs to orchestrators",
  },
  orchestrators: {
    title: "Orchestrator Nodes",
    description: "GPU clusters process work",
  },
  delegators: {
    title: "Delegators",
    description: "Stake LPT and earn fees",
  },
  flows: {
    requests: "REQUESTS",
    jobsAndPayments: "JOBS + PAYMENTS",
    videoResponse: "VIDEO RESPONSE",
    stake: "STAKE",
    fees: "FEES",
  },
}

export function TokenConstructionDiagram({
  className,
}: {
  className?: string
}) {
  const grid = [50, 133, 216, 300, 383, 466, 550]
  const blocks = [
    [210, 170],
    [300, 255],
    [210, 340],
    [390, 340],
    [300, 425],
  ]

  return (
    <svg
      viewBox="0 0 600 600"
      role="img"
      aria-labelledby="token-construction-title"
      className={cn("text-foreground", className)}
    >
      <title id="token-construction-title">
        Geometric construction of the Livepeer Token symbol
      </title>
      <g fill="none" stroke="currentColor">
        <g opacity="0.12" strokeDasharray="2 4" strokeWidth="0.75">
          {grid.map((position) => (
            <g key={position}>
              <line x1={position} y1="0" x2={position} y2="600" />
              <line x1="0" y1={position} x2="600" y2={position} />
            </g>
          ))}
        </g>
        <g opacity="0.25" strokeDasharray="8 3 2 3" strokeWidth="0.75">
          <line x1="0" y1="300" x2="600" y2="300" />
          <line x1="300" y1="0" x2="300" y2="600" />
        </g>
        <circle
          cx="300"
          cy="300"
          r="224"
          opacity="0.45"
          strokeDasharray="3 6"
        />
        <rect
          x="180"
          y="140"
          width="240"
          height="320"
          opacity="0.35"
          strokeDasharray="5 7"
        />
        <rect x="210" y="170" width="180" height="255" opacity="0.7" />
        <line x1="210" y1="170" x2="390" y2="425" opacity="0.5" />
        <line x1="390" y1="170" x2="210" y2="425" opacity="0.5" />
        <g opacity="0.34">
          <line x1="190" y1="170" x2="410" y2="170" />
          <line x1="190" y1="255" x2="410" y2="255" />
          <line x1="190" y1="340" x2="410" y2="340" />
          <line x1="190" y1="425" x2="410" y2="425" />
          <line x1="210" y1="145" x2="210" y2="450" />
          <line x1="300" y1="145" x2="300" y2="450" />
          <line x1="390" y1="145" x2="390" y2="450" />
        </g>
      </g>
      <g fill="currentColor">
        {blocks.map(([x, y]) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width="45"
            height="45"
            opacity="0.4"
          />
        ))}
        <circle cx="300" cy="300" r="2.5" opacity="0.8" />
      </g>
      <g
        fill="currentColor"
        className="font-mono text-[8px] tracking-[0.16em]"
        opacity="0.6"
      >
        <text x="300" y="120" textAnchor="middle">
          X · 5/6X · X · 5/6X · X
        </text>
        <text x="278" y="290" textAnchor="end">
          OPT
        </text>
        <text x="310" y="290">
          GEO
        </text>
        <text x="300" y="485" textAnchor="middle">
          Δ OPT + 6.00u
        </text>
        <text x="300" y="550" textAnchor="middle" className="text-[10px]">
          LIVEPEER · LPT
        </text>
      </g>
      <g stroke="currentColor" opacity="0.25">
        <line x1="80" y1="546" x2="218" y2="546" />
        <line x1="382" y1="546" x2="520" y2="546" />
      </g>
    </svg>
  )
}

function DiagramNode({
  x,
  y,
  node,
}: {
  x: number
  y: number
  node: TokenNetworkDiagramContent["applications"]
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="280"
        height="112"
        rx="6"
        fill="var(--background)"
        stroke="currentColor"
        strokeOpacity="0.16"
        strokeWidth="1.5"
      />
      <text
        x={x + 140}
        y={y + 47}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="currentColor"
        className="text-sm font-semibold"
      >
        {node.title}
      </text>
      <text
        x={x + 140}
        y={y + 68}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="currentColor"
        opacity="0.55"
        className="text-[13px]"
      >
        {node.description}
      </text>
    </g>
  )
}

function AnimatedPacket({
  path,
  duration,
  begin,
}: {
  path: string
  duration: string
  begin: string
}) {
  return (
    <g
      aria-hidden="true"
      className="fill-emerald-700 motion-reduce:hidden dark:fill-emerald-500"
    >
      <circle r="7" opacity="0.12">
        <animateMotion
          path={path}
          dur={duration}
          begin={begin}
          repeatCount="indefinite"
        />
      </circle>
      <circle r="2.75">
        <animateMotion
          path={path}
          dur={duration}
          begin={begin}
          repeatCount="indefinite"
        />
      </circle>
    </g>
  )
}

function FlowLabel({
  x,
  y,
  rotate,
  children,
}: {
  x: number
  y: number
  rotate: number
  children: string
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="middle"
      transform={`rotate(${rotate} ${x} ${y})`}
      className="fill-emerald-700 text-[13px] font-medium tracking-wide dark:fill-emerald-500"
    >
      {children}
    </text>
  )
}

function PathFlowLabel({
  pathId,
  dy,
  children,
}: {
  pathId: string
  dy: number
  children: string
}) {
  return (
    <text
      dy={dy}
      className="fill-emerald-700 text-[13px] font-medium tracking-wide dark:fill-emerald-500"
    >
      <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
        {children}
      </textPath>
    </text>
  )
}

export function TokenNetworkDiagram({
  content = defaultTokenNetworkDiagramContent,
  className,
}: {
  content?: TokenNetworkDiagramContent
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 800 576"
      role="img"
      aria-labelledby="token-network-title token-network-description"
      className={cn("text-foreground", className)}
    >
      <title id="token-network-title">
        How Livepeer Token coordinates the network
      </title>
      <desc id="token-network-description">
        Applications send requests through gateway nodes to orchestrators.
        Delegators stake Livepeer Token with orchestrators and receive fees.
      </desc>
      <defs>
        <path id="video-response-label-path" d="M310 464 510 132" />
      </defs>
      <g
        className="stroke-emerald-700 dark:stroke-emerald-500"
        fill="none"
        strokeWidth="1.5"
      >
        <path d="M170 132V444" />
        <path id="jobs-payments-path" d="M290 444 490 112" />
        <path id="video-response-path" d="M510 132 310 464" />
        <path id="stake-path" d="M630 444V132" strokeDasharray="8 7" />
        <path id="fees-path" d="M700 132V444" />
      </g>
      <g aria-hidden="true">
        <AnimatedPacket path="M170 132V444" duration="2.8s" begin="0s" />
        <AnimatedPacket path="M290 444 490 112" duration="3.2s" begin="-1.4s" />
        <AnimatedPacket path="M510 132 310 464" duration="3.2s" begin="0s" />
        <AnimatedPacket path="M630 444V132" duration="3s" begin="-0.8s" />
        <AnimatedPacket path="M700 132V444" duration="3s" begin="-2s" />
      </g>
      <FlowLabel x={145} y={288} rotate={-90}>
        {content.flows.requests}
      </FlowLabel>
      <PathFlowLabel pathId="jobs-payments-path" dy={-10}>
        {content.flows.jobsAndPayments}
      </PathFlowLabel>
      <PathFlowLabel pathId="video-response-label-path" dy={14}>
        {content.flows.videoResponse}
      </PathFlowLabel>
      <PathFlowLabel pathId="stake-path" dy={-18}>
        {content.flows.stake}
      </PathFlowLabel>
      <PathFlowLabel pathId="fees-path" dy={-18}>
        {content.flows.fees}
      </PathFlowLabel>
      <DiagramNode x={30} y={20} node={content.applications} />
      <DiagramNode x={30} y={444} node={content.gateways} />
      <DiagramNode x={490} y={20} node={content.orchestrators} />
      <DiagramNode x={490} y={444} node={content.delegators} />
    </svg>
  )
}
