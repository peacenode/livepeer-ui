import { createReadStream } from "node:fs"
import path from "node:path"

import { getCliClient } from "sanity/cli"

const client = getCliClient({ apiVersion: "2026-08-03" })
const root = process.cwd()

const avatars = [
  ["400", "X, LinkedIn", 400, 400],
  ["500", "GitHub", 500, 500],
  [
    "512",
    "Discord, Telegram, Reddit, Paragraph, Medium, Mirror, TikTok, Linktree",
    512,
    512,
  ],
  ["800", "YouTube", 800, 800],
  ["1080", "Square social preview", 1080, 1080],
]
const banners = [
  ["x", "X", 1500, 500],
  ["linkedin", "LinkedIn", 4200, 700],
  ["reddit", "Reddit", 1080, 128],
  ["article", "Paragraph, Medium, Mirror, Linktree", 1200, 300],
  ["discord", "Discord", 960, 540],
  ["youtube", "YouTube", 2560, 1440],
]
const previews = [
  ["1200x630", 1200, 630],
  ["1280x640", 1280, 640],
  ["1080x1080", 1080, 1080],
]

async function upload(relativePath) {
  const existing = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    { filename: `social-${relativePath.replaceAll("/", "-")}` }
  )
  if (existing) return existing
  const asset = await client.assets.upload(
    "image",
    createReadStream(path.join(root, "public", relativePath)),
    { filename: `social-${relativePath.replaceAll("/", "-")}` }
  )
  return asset._id
}

const image = (assetId) => ({
  _type: "image",
  asset: { _type: "reference", _ref: assetId },
})

const avatarDocuments = []
for (const [id, platforms, width, height] of avatars) {
  const assetId = await upload(
    `social-assets/avatars/20260730-153511/${id}.png`
  )
  avatarDocuments.push({
    _key: id,
    id,
    platforms,
    width,
    height,
    image: image(assetId),
  })
}

const bannerDocuments = []
for (const [id, platform, width, height] of banners) {
  const assetId = await upload(
    `social-assets/banners/20260730-143207/${id}.png`
  )
  bannerDocuments.push({
    _key: id,
    id,
    platform,
    width,
    height,
    image: image(assetId),
  })
}

const previewDocuments = []
for (const [id, width, height] of previews) {
  const assetId = await upload(
    `social-assets/previews/20260730-150741/${id}.png`
  )
  previewDocuments.push({ _key: id, id, width, height, image: image(assetId) })
}

const wordmarkId = await upload(
  "social-assets/banners/20260730-135359/livepeer-wordmark.svg"
)

await client.createOrReplace({
  _id: "socialAssetSet-current",
  _type: "socialAssetSet",
  wordmark: image(wordmarkId),
  avatars: avatarDocuments,
  banners: bannerDocuments,
  previews: previewDocuments,
})

console.log(
  `Migrated ${avatars.length} avatars, ${banners.length} banners, ${previews.length} previews, and the banner wordmark.`
)
