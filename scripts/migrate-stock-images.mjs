import { execFileSync } from "node:child_process"
import { createHash } from "node:crypto"
import { readFile } from "node:fs/promises"
import path from "node:path"

import { getCliClient } from "sanity/cli"

const client = getCliClient({ apiVersion: "2026-08-03" })
const catalogFlag = process.argv.indexOf("--catalog")
const catalogPath = catalogFlag >= 0 ? process.argv[catalogFlag + 1] : undefined

if (!catalogPath) throw new Error("Pass --catalog /path/to/catalog-export.json")

const rows = JSON.parse(await readFile(catalogPath, "utf8"))
const databasePath = path.join(path.dirname(catalogPath), "catalog.sqlite")
const reviewedRows = JSON.parse(execFileSync("sqlite3", [
  "-json",
  databasePath,
  `SELECT image_id, reviewed_form, reviewed_gallery_section
   FROM reviewed_gallery_assignments`,
], { encoding: "utf8" }) || "[]")
const reviewed = new Map(reviewedRows.map((row) => [row.image_id, row]))

const rootId = "stockImageGroup-root"
const groupDocuments = new Map()

function stableId(prefix, value) {
  return `${prefix}-${createHash("sha1").update(value).digest("hex").slice(0, 20)}`
}

function addGroup(name, parentId, key, order = 0) {
  const id = key === "root" ? rootId : stableId("stockImageGroup", key)
  groupDocuments.set(id, {
    _id: id,
    _type: "stockImageGroup",
    name,
    order,
    systemKey: key,
    ...(parentId ? { parent: { _type: "reference", _ref: parentId } } : {}),
  })
  return id
}

addGroup("Stock Images", undefined, "root")
const tabOrder = ["Network", "Agent", "Community", "Proposals", "Engineering"]
for (const [index, tab] of tabOrder.entries()) addGroup(tab, rootId, `tab/${tab}`, index + 1)
const formMap = {
  "Protocol Orbs": "Organic / Orbital",
  "Protocol Tubes": "Tubes / Channels",
  "Secure Vaults": "Reflective Architecture",
  "Protocol Hardware": "Mechanical / Hardware",
  "Network Hardware": "Mechanical / Hardware",
  "Governance Hardware": "Mechanical / Hardware",
  "Bokeh Balls": "Bokeh / Light Fields",
  "Ecosystem Atmospheres": "Atmospheres / Fields",
  Runner: "Figures / Motion",
  Network: "Cables / Networks",
  "Governance Diagrams": "Diagrams / Systems",
  Greenfields: "Landscapes",
  Office: "Interiors / Workspaces",
  Agent: "Figures / Agents",
  "Other / Review": "Abstract / Other",
}
const shortFormMap = {
  "Organic / Orbital": "Orbital",
  "Tubes / Channels": "Tubes",
  "Reflective Architecture": "Architecture",
  "Mechanical / Hardware": "Hardware",
  "Bokeh / Light Fields": "Bokeh",
  "Atmospheres / Fields": "Atmospheres",
  "Figures / Motion": "Motion",
  "Cables / Networks": "Cables",
  "Diagrams / Systems": "Diagrams",
  "Figures / Agents": "Agents",
  "Interiors / Workspaces": "Interiors",
  Landscapes: "Landscapes",
  "Abstract / Other": "Other",
}
const shortToneMap = {
  "White / Light Neutral": "Light",
  "Light / Neutral": "Light",
  "Light / Muted": "Muted",
  "Muted Neutral": "Neutral",
}

function gallerySection(row, form, reviewedSection) {
  if (reviewedSection) return reviewedSection
  if (form === "Organic / Orbital") {
    if (["White / Light Neutral", "Muted Neutral", "Blue", "Cyan"].includes(row.color_family)) return "Light / Muted"
    if (row.color_family === "Green") return row.brightness >= 0.35 ? "Light Green" : "Dark Green"
  }
  if (row.color_family === "White / Light Neutral") return "Light / Neutral"
  return row.color_family || "Unsorted"
}

const assets = await client.fetch(`*[_type == "sanity.imageAsset" && originalFilename match "livepeer-catalog-*"]{_id,originalFilename}`)
const assetByFilename = new Map(assets.map((asset) => [asset.originalFilename, asset._id]))
const itemDocuments = []
const missingAssets = []

for (const row of rows) {
  const section = row.reviewed_category || row.site_section || "Unassigned / Review"
  const tab = section === "Governance"
    ? "Proposals"
    : ["Ecosystem", "Community", "Unassigned / Review", "News"].includes(section)
      ? "Community"
      : section === "Protocol"
        ? "Network"
        : section
  const tabId = addGroup(tab, rootId, `tab/${tab}`, tabOrder.indexOf(tab) + 1)
  const review = reviewed.get(row.id)
  const form = review?.reviewed_form || formMap[row.content_band] || row.content_band || "Abstract / Other"
  const tone = gallerySection(row, form, review?.reviewed_gallery_section)
  const shortForm = shortFormMap[form] || form.split(/[ /·]+/)[0] || "Other"
  const shortTone = shortToneMap[tone] || tone
  const filter = `${shortForm} · ${shortTone}`
  const filterId = addGroup(filter, tabId, `tab/${tab}/filter/${filter}`)
  const filename = `livepeer-catalog-${row.sha256}.png`
  const assetId = assetByFilename.get(filename)
  if (!assetId) {
    missingAssets.push(filename)
    continue
  }
  itemDocuments.push({
    _id: `stockImage-${row.sha256}`,
    _type: "stockImage",
    name: row.prompt_prefix.replaceAll("_", " "),
    sourceHash: row.sha256,
    sourceFilename: row.filename,
    tags: [section, form, tone],
    image: { _type: "image", asset: { _type: "reference", _ref: assetId } },
    group: { _type: "reference", _ref: filterId },
  })
}

const documents = [...groupDocuments.values(), ...itemDocuments]
for (let index = 0; index < documents.length; index += 100) {
  let transaction = client.transaction()
  for (const document of documents.slice(index, index + 100)) transaction = transaction.createOrReplace(document)
  await transaction.commit()
  console.log(`Synced ${Math.min(index + 100, documents.length)}/${documents.length}`)
}

const retainedGroupIds = [...groupDocuments.keys()]
const obsoleteGroupIds = await client.fetch(
  `*[_type == "stockImageGroup" && !(_id in $retainedGroupIds)]._id`,
  { retainedGroupIds }
)
for (let index = 0; index < obsoleteGroupIds.length; index += 100) {
  let transaction = client.transaction()
  for (const id of obsoleteGroupIds.slice(index, index + 100)) transaction = transaction.delete(id)
  await transaction.commit()
}

console.log(JSON.stringify({ groups: groupDocuments.size, images: itemDocuments.length, removedOldGroups: obsoleteGroupIds.length, missingAssets: missingAssets.length }, null, 2))
if (missingAssets.length) console.warn(missingAssets.join("\n"))
