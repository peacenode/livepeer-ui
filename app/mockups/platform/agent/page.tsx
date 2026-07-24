import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { CableIcon, PlusIcon, TerminalIcon } from "lucide-react"

import { PlatformPage } from "@/components/mockups/platform-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getInferenceContainer } from "@/lib/containers"

export const metadata: Metadata = {
  title: "Agent",
}

const agents = [
  {
    name: "Realtime video",
    description:
      "Run live video pipelines with realtime inference and ComfyUI workflows.",
    containers: ["comfystream", "comfyui-base"],
  },
  {
    name: "Media generation",
    description:
      "Generate and transform images, video, speech, and other media.",
    containers: ["ai-runner", "comfyui-base"],
  },
  {
    name: "Multimodal",
    description:
      "Combine batch model inference with realtime video processing.",
    containers: ["ai-runner", "comfystream"],
  },
]

export default function MockupAgentCatalogPage() {
  return (
    <PlatformPage
      title="Agent"
      action={
        <Button size="lg" className="px-5 font-medium">
          <PlusIcon />
          Create an agent
        </Button>
      }
    >
      <p className="max-w-2xl text-sm text-muted-foreground">
        Agents package inference containers behind CLI and MCP interfaces.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {agents.map((agent, agentIndex) => {
          const containers = agent.containers.flatMap((slug) => {
            const container = getInferenceContainer(slug)
            return container ? [container] : []
          })

          return (
            <Card key={agent.name} className="min-h-72">
              <CardHeader>
                <CardTitle className="text-xl">{agent.name}</CardTitle>
                <CardDescription>{agent.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-muted-foreground">Containers</p>
                  <div className="flex flex-col gap-1">
                    {containers.map((container, containerIndex) => (
                      <Link
                        key={container.slug}
                        href={`/mockups/platform/inference/${container.slug}`}
                        className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-foreground/[0.06]"
                      >
                        <div className="relative size-9 shrink-0 overflow-hidden rounded-lg bg-background">
                          <Image
                            src={container.image}
                            alt=""
                            fill
                            preload={
                              agentIndex === 0 && containerIndex === 0
                            }
                            className="object-cover"
                            sizes="36px"
                          />
                        </div>
                        <span className="min-w-0 truncate text-sm font-medium">
                          {container.slug}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="mt-auto flex flex-col gap-2">
                  <p className="text-xs text-muted-foreground">Interfaces</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      <TerminalIcon />
                      CLI
                    </Badge>
                    <Badge variant="secondary">
                      <CableIcon />
                      MCP
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </PlatformPage>
  )
}
