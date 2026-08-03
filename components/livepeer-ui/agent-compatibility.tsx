import Image from "next/image"

import { cn } from "@/lib/utils"
import { sanityStaticAssets } from "@/sanity/lib/static-assets"

const agents = [
  {
    name: "Claude",
    src: sanityStaticAssets.agentCompatibility.claude,
  },
  {
    name: "Claude Code",
    src: sanityStaticAssets.agentCompatibility.claudeCode,
  },
  {
    name: "Codex",
    src: sanityStaticAssets.agentCompatibility.codex,
    monochrome: true,
    opticalScale: true,
  },
  {
    name: "Hermes",
    src: sanityStaticAssets.agentCompatibility.hermes,
    monochrome: true,
  },
  {
    name: "OpenClaw",
    src: sanityStaticAssets.agentCompatibility.openClaw,
  },
  {
    name: "Pi",
    src: sanityStaticAssets.agentCompatibility.pi,
    monochrome: true,
  },
]

function AgentCompatibility({
  className,
  inverted = false,
  large = false,
  responsiveAlignment = false,
}: {
  className?: string
  inverted?: boolean
  large?: boolean
  responsiveAlignment?: boolean
}) {
  return (
    <div
      className={cn(
        "text-center",
        responsiveAlignment && "sm:text-left",
        className
      )}
    >
      <p
        className={cn(
          "text-sm",
          inverted ? "text-background/45" : "text-foreground/45"
        )}
      >
        Compatible with
      </p>
      <ul
        className={cn(
          large
            ? "mt-8 grid grid-cols-3 place-items-center gap-8"
            : "mt-4 flex flex-wrap items-center justify-center gap-6",
          responsiveAlignment && "sm:justify-start"
        )}
      >
        {agents.map((agent) => (
          <li key={agent.name}>
            <Image
              src={agent.src}
              alt={agent.name}
              width={large ? 64 : 32}
              height={large ? 64 : 32}
              className={cn(
                "size-8 object-contain",
                large && "size-16",
                agent.opticalScale && "scale-[1.75]",
                !inverted && agent.monochrome && "brightness-0"
              )}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export { AgentCompatibility }
