import { mkdir } from "node:fs/promises"
import path from "node:path"

import sharp from "sharp"

const batch = process.argv[2]
const wordmarkPath = process.argv[3]

if (!batch || !wordmarkPath) {
  throw new Error(
    "Usage: node scripts/generate-social-banners.mjs <batch> <wordmark.svg>"
  )
}

const banners = [
  { id: "x", width: 1500, height: 500, xLayout: true },
  { id: "linkedin", width: 4200, height: 700 },
  { id: "reddit", width: 1080, height: 128 },
  { id: "article", width: 1200, height: 300 },
  { id: "discord", width: 960, height: 540 },
  { id: "youtube", width: 2560, height: 1440 },
]
const outputDirectory = path.join(
  process.cwd(),
  "public",
  "social-assets",
  "banners",
  batch
)

await mkdir(outputDirectory, { recursive: true })

await Promise.all(
  banners.map(async ({ id, width, height, xLayout = false }) => {
    const wordmarkWidth = Math.round(width * (xLayout ? 0.36 : 0.44))
    const wordmark = await sharp(wordmarkPath)
      .resize({ width: wordmarkWidth })
      .png()
      .toBuffer({ resolveWithObject: true })
    const left = Math.round(
      width - wordmark.info.width - (xLayout ? height * 0.1 : width * 0.07)
    )
    const top = Math.round(
      xLayout
        ? height - wordmark.info.height - height * 0.1
        : (height - wordmark.info.height) / 2
    )

    await sharp({
      create: {
        width,
        height,
        channels: 4,
        background: "#000000",
      },
    })
      .composite([{ input: wordmark.data, left, top }])
      .png({ compressionLevel: 9 })
      .toFile(path.join(outputDirectory, `${id}.png`))
  })
)

console.log(outputDirectory)
