import { createReadStream } from "node:fs"
import path from "node:path"

import { getCliClient } from "sanity/cli"

const client = getCliClient({ apiVersion: "2025-01-01" })
const assetDirFlag = process.argv.indexOf("--asset-dir")
const assetDir = assetDirFlag >= 0 ? process.argv[assetDirFlag + 1] : undefined

if (!assetDir) {
  throw new Error("Pass the extracted media directory with --asset-dir <path>.")
}

const media = [
  {
    documentId: "livepeerOrgPage-token",
    field: "tokenContent.hero.illustration",
    filename: "token-hero-diagram.png",
    alt: "Livepeer Token geometric construction diagram",
  },
  {
    documentId: "livepeerOrgPage-token",
    field: "tokenContent.role.illustration",
    filename: "token-tokenomics-diagram.png",
    alt: "Diagram of applications, gateway nodes, orchestrators, and delegators in the Livepeer network",
  },
  {
    documentId: "livepeerOrgPage-foundation",
    field: "foundationContent.hero.illustration",
    filename: "foundation-hero-graphic.png",
    alt: "Abstract striped lens representing the Livepeer Foundation",
  },
  {
    documentId: "livepeerOrgPage-foundation",
    field: "foundationContent.about.illustration",
    filename: "foundation-about-graphic.png",
    alt: "Dotted grid illustration",
  },
  {
    documentId: "livepeerOrgPage-foundation",
    field: "foundationContent.project.illustration",
    filename: "foundation-project-graphic.png",
    alt: "Connected-node network illustration",
  },
]

for (const item of media) {
  const filePath = path.join(assetDir, item.filename)
  const asset = await client.assets.upload("image", createReadStream(filePath), {
    filename: item.filename,
    contentType: "image/png",
  })

  await client
    .patch(item.documentId)
    .set({
      [item.field]: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
        alt: item.alt,
      },
    })
    .commit()

  console.log(`${item.documentId}: ${item.field} -> ${asset.url}`)
}
