import { mkdir } from "node:fs/promises"
import path from "node:path"

import sharp from "sharp"

const batch = process.argv[2]
const wordmarkPath = process.argv[3]

if (!batch || !wordmarkPath) {
  throw new Error(
    "Usage: node scripts/generate-social-previews.mjs <batch> <wordmark.svg>"
  )
}

const previews = [
  { width: 1200, height: 630 },
  { width: 1280, height: 640 },
]
const outputDirectory = path.join(
  process.cwd(),
  "public",
  "social-assets",
  "previews",
  batch
)

await mkdir(outputDirectory, { recursive: true })

await Promise.all(
  previews.map(async ({ width, height }) => {
    const wordmark = await sharp(wordmarkPath)
      .resize({ width: Math.round(width * 0.82) })
      .png()
      .toBuffer({ resolveWithObject: true })

    await sharp({
      create: {
        width,
        height,
        channels: 4,
        background: "#000000",
      },
    })
      .composite([
        {
          input: wordmark.data,
          left: Math.round((width - wordmark.info.width) / 2),
          top: Math.round((height - wordmark.info.height) / 2),
        },
      ])
      .png({ compressionLevel: 9 })
      .toFile(path.join(outputDirectory, `${width}x${height}.png`))
  })
)

console.log(outputDirectory)
