import type { Metadata } from "next"

import {
  ProjectResultPage,
  type ProjectAsset,
} from "@/components/mockups/project-result-page"

type StoryboardScene = {
  index: number
  prompt?: string
  title?: string
  url: string
  capability: string
  kind: "image" | "video"
  source?: string
  format?: string
}

type StoryboardProject = {
  id: string
  title: string
  scenes: StoryboardScene[]
}

const storyboardProjectSnapshot: StoryboardProject = {
  id: "proj_8429543f3409",
  title: "The Sunburned Chairman — A Beachside Business Film",
  scenes: [
    {
      index: 0,
      prompt: "Arrival of the Chairman",
      title: "Arrival of the Chairman",
      url: "https://v3b.fal.media/files/b/0aa42105/GnA1OQDnplQOOJ7D5fVqZ_8vV8IkpD.mp4",
      capability: "import",
      kind: "video",
      source: "import",
      format: "mp4",
    },
    {
      index: 1,
      prompt: "Board Meeting by the Tide",
      title: "Board Meeting by the Tide",
      url: "https://v3b.fal.media/files/b/0aa42104/KvyB2Cs2sqasGRhPrpbBB_Pflw7wgQ.mp4",
      capability: "import",
      kind: "video",
      source: "import",
      format: "mp4",
    },
  ],
}

const assets: ProjectAsset[] = [
  {
    id: "asset-1",
    type: "image" as const,
    src: "/generated/2026-07-24-004043/salt-signal-wide.webp",
    alt: "Cinematic still of a figure by the sea",
    width: 1672,
    height: 941,
    capability: "flux-dev",
    format: "webp",
    source: "generated",
  },
  {
    id: "asset-2",
    type: "video" as const,
    src: "/generated/20260728-210500-render-result/eli-portrait.mp4",
    alt: "Portrait video result",
    width: 720,
    height: 1080,
    capability: "ltx-t2v",
    format: "mp4",
    source: "generated",
    durationSeconds: 3,
    frameRate: 30,
    videoCodec: "h264",
  },
  {
    id: "asset-3",
    type: "image" as const,
    src: "/generated/2026-07-24-004043/mara-portrait.webp",
    alt: "Portrait result",
    width: 1536,
    height: 1024,
    capability: "flux-dev",
    format: "webp",
    source: "generated",
  },
  {
    id: "asset-4",
    type: "image" as const,
    src: "/generated/2026-07-24-004043/after-hours-wide.webp",
    alt: "Nighttime cinematic still",
    width: 1672,
    height: 941,
    capability: "flux-kontext",
    format: "webp",
    source: "generated",
  },
  {
    id: "asset-5",
    type: "video" as const,
    src: "/generated/20260728-210500-render-result/black-tide.mp4",
    alt: "Wide cinematic video result",
    width: 1280,
    height: 720,
    capability: "ltx-t2v",
    format: "mp4",
    source: "generated",
    durationSeconds: 3,
    frameRate: 30,
    videoCodec: "h264",
  },
  {
    id: "asset-6",
    type: "image" as const,
    src: "/generated/2026-07-24-004043/june-portrait.webp",
    alt: "Character portrait result",
    width: 1536,
    height: 1024,
    capability: "flux-dev",
    format: "webp",
    source: "generated",
  },
  {
    id: "asset-7",
    type: "image" as const,
    src: "/generated/2026-07-24-004043/black-tide-wide.webp",
    alt: "Wide cinematic result",
    width: 1672,
    height: 941,
    capability: "flux-kontext",
    format: "webp",
    source: "generated",
  },
]

const storyboardMediaMetadata: Record<
  string,
  Pick<
    ProjectAsset,
    | "width"
    | "height"
    | "durationSeconds"
    | "frameRate"
    | "videoCodec"
    | "audioCodec"
    | "sizeBytes"
  >
> = {
  "https://v3b.fal.media/files/b/0aa42105/GnA1OQDnplQOOJ7D5fVqZ_8vV8IkpD.mp4":
    {
      width: 1920,
      height: 1080,
      durationSeconds: 6.12,
      frameRate: 25,
      videoCodec: "h264",
      audioCodec: "aac",
      sizeBytes: 2_588_338,
    },
  "https://v3b.fal.media/files/b/0aa42104/KvyB2Cs2sqasGRhPrpbBB_Pflw7wgQ.mp4":
    {
      width: 1920,
      height: 1080,
      durationSeconds: 6.12,
      frameRate: 25,
      videoCodec: "h264",
      audioCodec: "aac",
      sizeBytes: 7_226_379,
    },
}

function isStoryboardProject(value: unknown): value is StoryboardProject {
  if (!value || typeof value !== "object") return false

  const project = value as Partial<StoryboardProject>
  return (
    typeof project.id === "string" &&
    typeof project.title === "string" &&
    Array.isArray(project.scenes) &&
    project.scenes.every(
      (scene) =>
        typeof scene?.index === "number" &&
        typeof scene?.url === "string" &&
        typeof scene?.capability === "string" &&
        (scene?.kind === "image" || scene?.kind === "video")
    )
  )
}

async function getStoryboardProject(projectId: string) {
  if (!projectId.startsWith("proj_")) return null

  try {
    const response = await fetch(
      `https://storyboard.daydream.monster/api/v/${encodeURIComponent(projectId)}`,
      { next: { revalidate: 3600 } }
    )
    if (!response.ok) {
      return projectId === storyboardProjectSnapshot.id
        ? storyboardProjectSnapshot
        : null
    }

    const project: unknown = await response.json()
    return isStoryboardProject(project) ? project : null
  } catch {
    return projectId === storyboardProjectSnapshot.id
      ? storyboardProjectSnapshot
      : null
  }
}

function storyboardAssets(project: StoryboardProject): ProjectAsset[] {
  return [...project.scenes]
    .sort((a, b) => a.index - b.index)
    .map((scene) => {
      const mediaMetadata = storyboardMediaMetadata[scene.url] ?? {
        width: 1920,
        height: 1080,
      }

      return {
        id: `${project.id}:scene:${scene.index}`,
        type: scene.kind,
        src: scene.url,
        alt: scene.title ?? scene.prompt ?? `Scene ${scene.index + 1}`,
        title: scene.title,
        prompt: scene.prompt,
        capability: scene.capability,
        source: scene.source,
        format: scene.format,
        ...mediaMetadata,
      }
    })
}

async function projectDetails(projectId: string) {
  const storyboardProject = await getStoryboardProject(projectId)
  if (storyboardProject) {
    return {
      name: storyboardProject.title,
      assets: storyboardAssets(storyboardProject),
    }
  }

  return { name: "Cobalt Runner", assets }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ project_id: string }>
}): Promise<Metadata> {
  const { project_id: projectId } = await params
  const { name: projectName } = await projectDetails(projectId)

  return { title: projectName }
}

export default async function PrivateBetaProjectResultPage({
  params,
}: {
  params: Promise<{ project_id: string }>
}) {
  const { project_id: projectId } = await params
  const { name: projectName, assets: projectAssets } =
    await projectDetails(projectId)

  return (
    <ProjectResultPage
      assets={projectAssets}
      projectId={projectId}
      projectName={projectName}
    />
  )
}
