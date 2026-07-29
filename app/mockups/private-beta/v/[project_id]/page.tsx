import type { Metadata } from "next"

import { ProjectResultPage } from "@/components/mockups/project-result-page"

const assets = [
  {
    id: "asset-1",
    type: "image" as const,
    src: "/generated/2026-07-24-004043/salt-signal-wide.webp",
    alt: "Cinematic still of a figure by the sea",
    width: 1672,
    height: 941,
    capability: "flux-dev",
  },
  {
    id: "asset-2",
    type: "video" as const,
    src: "/generated/20260728-210500-render-result/eli-portrait.mp4",
    alt: "Portrait video result",
    width: 720,
    height: 1080,
    capability: "ltx-t2v",
  },
  {
    id: "asset-3",
    type: "image" as const,
    src: "/generated/2026-07-24-004043/mara-portrait.webp",
    alt: "Portrait result",
    width: 1536,
    height: 1024,
    capability: "flux-dev",
  },
  {
    id: "asset-4",
    type: "image" as const,
    src: "/generated/2026-07-24-004043/after-hours-wide.webp",
    alt: "Nighttime cinematic still",
    width: 1672,
    height: 941,
    capability: "flux-kontext",
  },
  {
    id: "asset-5",
    type: "video" as const,
    src: "/generated/20260728-210500-render-result/black-tide.mp4",
    alt: "Wide cinematic video result",
    width: 1280,
    height: 720,
    capability: "ltx-t2v",
  },
  {
    id: "asset-6",
    type: "image" as const,
    src: "/generated/2026-07-24-004043/june-portrait.webp",
    alt: "Character portrait result",
    width: 1536,
    height: 1024,
    capability: "flux-dev",
  },
  {
    id: "asset-7",
    type: "image" as const,
    src: "/generated/2026-07-24-004043/black-tide-wide.webp",
    alt: "Wide cinematic result",
    width: 1672,
    height: 941,
    capability: "flux-kontext",
  },
]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ project_id: string }>
}): Promise<Metadata> {
  const { project_id: projectId } = await params
  const projectName =
    projectId === "cobalt-runner" ? "Cobalt Runner" : "Project result"

  return { title: projectName }
}

export default async function PrivateBetaProjectResultPage({
  params,
}: {
  params: Promise<{ project_id: string }>
}) {
  const { project_id: projectId } = await params
  const projectName =
    projectId === "cobalt-runner" ? "Cobalt Runner" : "Project result"

  return <ProjectResultPage assets={assets} projectName={projectName} />
}
