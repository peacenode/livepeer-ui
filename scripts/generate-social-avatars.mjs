import { mkdir } from "node:fs/promises"
import path from "node:path"

import sharp from "sharp"

const batch = "20260729-131040"
const sizes = [400, 500, 512, 800]
const outputDirectory = path.join(
  process.cwd(),
  "public",
  "social-assets",
  "avatars",
  batch
)

const tiles = [
  [0, 0.944092],
  [28.4692, 19.0045],
  [56.8936, 37.0667],
  [28.4692, 55.0819],
  [0, 73.1212],
  [0, 37.0667],
]

await mkdir(outputDirectory, { recursive: true })

for (const size of sizes) {
  const scale = (size * 0.52) / 89
  const symbolX = size * 0.34225
  const symbolY = size * 0.24
  const tileSize = Math.round(15.4995 * scale)
  const rectangles = tiles
    .map(
      ([x, y]) =>
        `<rect x="${Math.round(symbolX + x * scale)}" y="${Math.round(
          symbolY + y * scale
        )}" width="${tileSize}" height="${tileSize}"/>`
    )
    .join("")

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <defs>
        <linearGradient id="green" x1="0" y1="0" x2=".342" y2="1">
          <stop offset="0" stop-color="#0abd7d"/>
          <stop offset=".32" stop-color="#0abd7d"/>
          <stop offset="1" stop-color="#05945c"/>
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" fill="#000"/>
      <g fill="url(#green)" shape-rendering="crispEdges">
        ${rectangles}
      </g>
    </svg>
  `

  await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9 })
    .withIccProfile("p3")
    .toFile(path.join(outputDirectory, `${size}.png`))
}
