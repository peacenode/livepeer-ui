export type InferenceContainer = {
  slug: string
  creator: string
  image: string
  github: string
  description: string
  tags: string[]
  run: string
  ping: string
  endpoints?: string[]
}

export const inferenceContainers: InferenceContainer[] = [
  {
    slug: "livepeer-agent",
    creator: "Livepeer",
    image: "/container-thumbnails/20260724-002929/ai-runner.webp",
    github: "livepeer/ai-runner",
    description:
      "Batch AI pipeline runtime. Loads diffusion, speech, and language models onto the GPU and serves inference over REST.",
    tags: [
      "latest",
      "audio-to-text",
      "text-to-speech",
      "segment-anything-2",
      "llm",
    ],
    run: "docker run --gpus all -e PIPELINE=text-to-image -p 8000:8000 livepeer/ai-runner:latest",
    ping: "curl http://localhost:8000/health",
    endpoints: [
      "text-to-image",
      "image-to-image",
      "image-to-video",
      "image-to-text",
      "upscale",
      "audio-to-text",
      "text-to-speech",
      "segment-anything-2",
      "llm",
    ],
  },
  {
    slug: "comfystream",
    creator: "Livepeer",
    image: "/container-thumbnails/20260724-002929/comfystream.webp",
    github: "livepeer/comfystream",
    description:
      "Realtime video AI runtime. Runs ComfyUI workflows frame-by-frame over WebRTC for live video-to-video pipelines.",
    tags: ["latest"],
    run: "docker run --gpus all -p 8889:8889 livepeer/comfystream:latest",
    ping: "curl http://localhost:8889/",
  },
  {
    slug: "comfyui-base",
    creator: "Livepeer",
    image: "/container-thumbnails/20260724-002929/comfyui-base.webp",
    github: "livepeer/ai-runner",
    description:
      "Base image comfystream builds on — packages ComfyUI, the node-graph diffusion engine by comfyanonymous, built from the ai-runner repo.",
    tags: ["latest"],
    run: "docker run --gpus all -p 8188:8188 livepeer/comfyui-base:latest",
    ping: "curl http://localhost:8188/system_stats",
  },
]

export function getInferenceContainer(slug: string) {
  return inferenceContainers.find((container) => container.slug === slug)
}
