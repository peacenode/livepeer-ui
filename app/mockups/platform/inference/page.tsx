import type { Metadata } from "next"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Inference",
}

const pipelines = [
  {
    name: "text-to-image",
    description: "Generates high-quality images from text descriptions.",
  },
  {
    name: "image-to-image",
    description: "Style transfer, enhancement, and other image manipulations.",
  },
  {
    name: "image-to-video",
    description: "Creates animated high-quality videos from images.",
  },
  {
    name: "image-to-text",
    description: "Generates captions for input images, with optional prompt.",
  },
  {
    name: "upscale",
    description: "Transforms low-resolution images into high-quality ones.",
  },
  {
    name: "audio-to-text",
    description: "Speech recognition with timestamps.",
  },
  {
    name: "text-to-speech",
    description: "Natural sounding speech in the style of a given speaker.",
  },
  {
    name: "segment-anything-2",
    description: "Promptable visual segmentation for images and videos.",
  },
  {
    name: "llm",
    description: "OpenAI-compatible interface for text generation.",
  },
]

export default function MockupInferencePage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-medium">Inference</h1>
          <p className="text-sm text-muted-foreground">
            Pipelines available on the Livepeer AI network.
          </p>
        </div>
        <Button>New pipeline</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pipelines.map((pipeline) => (
          <Card key={pipeline.name} className="gap-2">
            <CardHeader>
              <CardTitle className="font-mono text-sm font-medium">
                {pipeline.name}
              </CardTitle>
              <CardDescription>{pipeline.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Pipeline catalog from the Livepeer AI network documentation.
      </p>
    </div>
  )
}
