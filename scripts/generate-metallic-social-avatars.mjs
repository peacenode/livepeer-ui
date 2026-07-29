import { mkdir } from "node:fs/promises"
import path from "node:path"

import sharp from "sharp"

const batch = process.argv[2]

if (!batch) {
  throw new Error("Pass a timestamped batch name, for example 20260729-145016")
}

const sizes = [400, 500, 512, 800]
const outputDirectory = path.join(
  process.cwd(),
  "public",
  "social-assets",
  "avatars",
  batch
)

const symbolPaths = [
  "M0 16.4436V0.944092H15.4995V16.4436H0Z",
  "M28.4692 34.504V19.0045H43.9687V34.504H28.4692Z",
  "M56.8936 52.5661V37.0667H72.393V52.5661H56.8936Z",
  "M28.4692 70.5814V55.0819H43.9687V70.5814H28.4692Z",
  "M0 88.6207V73.1212H15.4995V88.6207H0Z",
  "M0 52.5661V37.0667H15.4995V52.5661H0Z",
]

function avatarSvg(size) {
  const scale = size / 400
  const symbolScale = 2.31 * scale
  const translateX = 137 * scale
  const translateY = 98 * scale

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <defs>
        <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#b8ffe5"/>
          <stop offset=".1" stop-color="#12e49b"/>
          <stop offset=".55" stop-color="#00c077"/>
          <stop offset="1" stop-color="#007e4e"/>
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" fill="#000000"/>
      <g
        transform="translate(${translateX} ${translateY}) scale(${symbolScale})"
        fill="url(#metal)"
        stroke="#d8fff1"
        stroke-width="1"
        stroke-linejoin="miter"
        paint-order="stroke fill"
      >
        ${symbolPaths.map((pathData) => `<path d="${pathData}"/>`).join("")}
      </g>
    </svg>
  `
}

await mkdir(outputDirectory, { recursive: true })

await Promise.all(
  sizes.map((size) =>
    sharp(Buffer.from(avatarSvg(size)))
      .png({ compressionLevel: 9 })
      .toFile(path.join(outputDirectory, `${size}.png`))
  )
)

console.log(outputDirectory)
