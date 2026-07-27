import fs from "node:fs"
import path from "node:path"
import { createHash } from "node:crypto"
import { fileURLToPath } from "node:url"

import { getCliClient } from "sanity/cli"

const client = getCliClient({ apiVersion: "2026-07-26" })
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(scriptDirectory, "..")
const source = JSON.parse(
  fs.readFileSync(
    path.join(projectRoot, "content/agent-rollout-flow.json"),
    "utf8"
  )
)
const replaceExisting = process.argv.includes("--replace")

async function uploadImage(imagePath, alt) {
  const absolutePath = path.join(projectRoot, "public", imagePath)
  const digest = createHash("sha1")
    .update(fs.readFileSync(absolutePath))
    .digest("hex")
    .slice(0, 12)
  const filename = `agent-rollout-${digest}-${path.basename(imagePath)}`
  const existing = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    { filename }
  )

  const asset =
    existing ??
    (
      await client.assets.upload("image", fs.createReadStream(absolutePath), {
        filename,
        title: alt,
      })
    )._id

  return {
    _type: "image",
    alt,
    asset: { _type: "reference", _ref: asset },
  }
}

const phases = []

for (const phase of source.phases) {
  const screens = []

  for (const screen of phase.screens) {
    const { imagePath, imageAlt, ...fields } = screen
    screens.push({
      _type: "screen",
      ...fields,
      image: await uploadImage(imagePath, imageAlt),
    })
  }

  phases.push({
    _type: "phase",
    ...phase,
    screens,
  })
}

const document = {
  _id: source._id,
  _type: "agentRolloutFlow",
  title: source.title,
  subtitle: source.subtitle,
  phases,
}

if (replaceExisting) {
  await client.createOrReplace(document)
  console.log("Agent rollout flow was replaced from the local source.")
} else {
  await client.createIfNotExists(document)
  console.log(
    "Agent rollout flow is ready. Existing Sanity content was left unchanged."
  )
}
