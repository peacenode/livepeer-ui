import { createHash } from "node:crypto"
import { createReadStream, readFileSync } from "node:fs"
import path from "node:path"

import { getCliClient } from "sanity/cli"

const client = getCliClient({ apiVersion: "2026-08-03" })

const assetPaths = [
  "brands/20260725-0345/arbitrum.svg",
  "compatibility/20260724-2055/claude-code.png",
  "compatibility/20260725-000727/claude.svg",
  "compatibility/20260725-000727/hermes.svg",
  "compatibility/20260725-000727/openclaw.svg",
  "compatibility/20260725-000727/pi.svg",
  "compatibility/20260725-103200-openai/OAI_OpenAI-Blossom_White.svg",
  "container-thumbnails/20260724-002929/ai-runner.webp",
  "container-thumbnails/20260724-002929/comfystream.webp",
  "container-thumbnails/20260724-002929/comfyui-base.webp",
  "ecosystem/20260726-1500/daydream.svg",
  "generated/2026-07-24-004043/after-hours-wide.webp",
  "generated/2026-07-24-004043/black-tide-wide.webp",
  "generated/2026-07-24-004043/june-portrait.webp",
  "generated/2026-07-24-004043/mara-portrait.webp",
  "generated/2026-07-24-004043/salt-signal-wide.webp",
  "generated/20260725-101313-console-home-cards/orchestrator.png",
  "generated/20260726-2326-console-home-playbooks/playbooks.png",
  "generated/20260728-210500-render-result/black-tide.mp4",
  "generated/20260728-210500-render-result/eli-portrait.mp4",
  "playbooks/20260725-031450/runner-background.jpg",
  "playbooks/20260726-2311-campaign-video/augment.png",
  "playbooks/20260726-2311-campaign-video/edit.png",
  "playbooks/20260726-2311-campaign-video/generate.png",
]

const videoExtensions = new Set([".mp4", ".mov", ".webm"])

for (const assetPath of assetPaths) {
  const absolutePath = path.join(process.cwd(), "public", assetPath)
  const extension = path.extname(assetPath).toLowerCase()
  const assetType = videoExtensions.has(extension) ? "file" : "image"
  const digest = createHash("sha1")
    .update(readFileSync(absolutePath))
    .digest("hex")
    .slice(0, 12)
  const filename = `public-migration-${digest}-${path.basename(assetPath)}`
  const sanityType =
    assetType === "file" ? "sanity.fileAsset" : "sanity.imageAsset"
  const existing = await client.fetch(
    `*[_type == $sanityType && originalFilename == $filename][0]{_id, url}`,
    { sanityType, filename }
  )
  const asset =
    existing ??
    (await client.assets.upload(assetType, createReadStream(absolutePath), {
      filename,
      title: path.basename(assetPath, extension),
    }))

  console.log(`${assetPath}\t${asset.url}`)
}
