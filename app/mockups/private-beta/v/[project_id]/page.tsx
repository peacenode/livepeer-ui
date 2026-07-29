import type { Metadata } from "next"

import {
  ProjectResultPage,
  type ProjectAsset,
} from "@/components/mockups/project-result-page"

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

const storyboardProjectAssets: ProjectAsset[] = [
  {
    id: "scene-0",
    type: "video",
    src: "https://v3b.fal.media/files/b/0aa42105/GnA1OQDnplQOOJ7D5fVqZ_8vV8IkpD.mp4",
    alt: "Arrival of the Chairman",
    width: 1920,
    height: 1080,
    title: "Arrival of the Chairman",
    prompt: "Arrival of the Chairman",
    capability: "import",
    source: "import",
    format: "mp4",
    durationSeconds: 6.12,
    frameRate: 25,
    videoCodec: "h264",
    audioCodec: "aac",
    sizeBytes: 2_588_338,
  },
  {
    id: "scene-1",
    type: "video",
    src: "https://v3b.fal.media/files/b/0aa42104/KvyB2Cs2sqasGRhPrpbBB_Pflw7wgQ.mp4",
    alt: "Board Meeting by the Tide",
    width: 1920,
    height: 1080,
    title: "Board Meeting by the Tide",
    prompt: "Board Meeting by the Tide",
    capability: "import",
    source: "import",
    format: "mp4",
    durationSeconds: 6.12,
    frameRate: 25,
    videoCodec: "h264",
    audioCodec: "aac",
    sizeBytes: 7_226_379,
  },
]

function projectDetails(projectId: string) {
  if (projectId === "proj_8429543f3409") {
    return {
      name: "The Sunburned Chairman — A Beachside Business Film",
      assets: storyboardProjectAssets,
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
  const { name: projectName } = projectDetails(projectId)

  return { title: projectName }
}

export default async function PrivateBetaProjectResultPage({
  params,
}: {
  params: Promise<{ project_id: string }>
}) {
  const { project_id: projectId } = await params
  const { name: projectName, assets: projectAssets } =
    projectDetails(projectId)

  return (
    <ProjectResultPage assets={projectAssets} projectName={projectName} />
  )
}
