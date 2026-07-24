import type { Metadata } from "next"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatCompact, getAiRunnerInfo } from "@/lib/livepeer"

export const metadata: Metadata = {
  title: "AI Runner",
}

const pipelines = [
  {
    name: "text-to-image",
    description: "Generates high-quality images from text descriptions.",
    image: "latest",
  },
  {
    name: "image-to-image",
    description: "Style transfer, enhancement, and other image manipulations.",
    image: "latest",
  },
  {
    name: "image-to-video",
    description: "Creates animated high-quality videos from images.",
    image: "latest",
  },
  {
    name: "image-to-text",
    description: "Generates captions for input images, with optional prompt.",
    image: "latest",
  },
  {
    name: "upscale",
    description: "Transforms low-resolution images into high-quality ones.",
    image: "latest",
  },
  {
    name: "audio-to-text",
    description: "Speech recognition with timestamps.",
    image: "audio-to-text",
  },
  {
    name: "text-to-speech",
    description: "Natural sounding speech in the style of a given speaker.",
    image: "text-to-speech",
  },
  {
    name: "segment-anything-2",
    description: "Promptable visual segmentation for images and videos.",
    image: "segment-anything-2",
  },
  {
    name: "llm",
    description: "OpenAI-compatible interface for text generation.",
    image: "llm",
  },
]

export default async function MockupAiRunnerPage() {
  const runner = await getAiRunnerInfo()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-medium">AI Runner</h1>
          <p className="text-sm text-muted-foreground">
            The container runtime behind every pipeline on the network.
          </p>
        </div>
        <Button>New pipeline</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pipelines.map((pipeline) => {
          const image = runner?.images[pipeline.image]
          return (
            <Card key={pipeline.name} className="gap-3">
              <CardHeader>
                <CardTitle className="font-mono text-sm font-medium">
                  {pipeline.name}
                </CardTitle>
                <CardDescription>{pipeline.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex flex-col gap-1.5 text-xs text-muted-foreground">
                <div className="flex justify-between gap-2">
                  <span>Endpoint</span>
                  <span className="truncate font-mono">
                    POST /{pipeline.name}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span>Container</span>
                  <span className="truncate font-mono">
                    ai-runner:{pipeline.image}
                  </span>
                </div>
                {image && (
                  <div className="flex justify-between gap-2">
                    <span>Image</span>
                    <span className="font-mono">
                      {image.sizeGb.toFixed(1)} GB ·{" "}
                      {image.updatedAt.slice(0, 10)}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
      <Card className="gap-4">
        <CardHeader>
          <CardTitle className="text-sm">Runtime</CardTitle>
          <Badge variant="outline" className="ml-auto">
            MIT license
          </Badge>
          <CardDescription>
            Every pipeline runs in the open-source{" "}
            <a
              href="https://github.com/livepeer/ai-runner"
              target="_blank"
              rel="noreferrer"
              className="font-mono underline underline-offset-3 hover:text-foreground"
            >
              livepeer/ai-runner
            </a>{" "}
            container, maintained by Livepeer
            {runner &&
              ` and pulled ${formatCompact(runner.pullCount)} times from Docker Hub`}
            . It loads models onto the GPU and serves inference over REST.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-md bg-muted px-4 py-3 font-mono text-xs leading-relaxed">
            {`docker run --gpus all -e PIPELINE=text-to-image -p 8000:8000 livepeer/ai-runner:latest
curl http://localhost:8000/health`}
          </pre>
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground">
        Pipeline catalog from the Livepeer AI network documentation; container
        details live from Docker Hub, cached for an hour.
      </p>
    </div>
  )
}
