export type Workflow = {
  slug: string
  name: string
  description: string
  kind: "Image" | "Video" | "Audio" | "Language"
  runs: number
  createdAt: string
}

export const workflows: Workflow[] = [
  {
    slug: "text-to-image",
    name: "Text to image",
    description: "Generate an image from a text prompt.",
    kind: "Image",
    runs: 48210,
    createdAt: "Jul 8, 2026",
  },
  {
    slug: "image-to-image",
    name: "Image to image",
    description: "Transform an image while preserving its composition.",
    kind: "Image",
    runs: 31842,
    createdAt: "Jul 8, 2026",
  },
  {
    slug: "image-to-video",
    name: "Image to video",
    description: "Turn a still image into a generated video clip.",
    kind: "Video",
    runs: 18603,
    createdAt: "Jul 10, 2026",
  },
  {
    slug: "live-video-to-video",
    name: "Live video to video",
    description: "Apply a workflow continuously to a live video stream.",
    kind: "Video",
    runs: 12794,
    createdAt: "Jul 12, 2026",
  },
  {
    slug: "upscale",
    name: "Upscale",
    description: "Increase image resolution with a super-resolution model.",
    kind: "Image",
    runs: 9871,
    createdAt: "Jul 13, 2026",
  },
  {
    slug: "audio-to-text",
    name: "Audio to text",
    description: "Transcribe speech from an uploaded audio or video file.",
    kind: "Audio",
    runs: 7340,
    createdAt: "Jul 15, 2026",
  },
  {
    slug: "text-to-speech",
    name: "Text to speech",
    description: "Generate spoken audio from text.",
    kind: "Audio",
    runs: 6218,
    createdAt: "Jul 16, 2026",
  },
  {
    slug: "llm",
    name: "Language model",
    description: "Run an OpenAI-compatible language model completion.",
    kind: "Language",
    runs: 4105,
    createdAt: "Jul 18, 2026",
  },
  {
    slug: "segment-anything-2",
    name: "Segment anything",
    description: "Create object masks from points, boxes, or tracked video.",
    kind: "Video",
    runs: 2981,
    createdAt: "Jul 20, 2026",
  },
]
