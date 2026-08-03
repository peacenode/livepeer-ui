import { readFile } from "node:fs/promises"

import sharp from "sharp"
import { getCliClient } from "sanity/cli"

const client = getCliClient({ apiVersion: "2025-01-01" })
const prefixFlag = process.argv.indexOf("--asset-prefix")
const assetPrefix = prefixFlag >= 0 ? process.argv[prefixFlag + 1] : undefined

if (!assetPrefix) {
  throw new Error("Pass the downloaded asset prefix with --asset-prefix <path>.")
}

const apps = [
  {
    _key: "daydream",
    name: "Daydream",
    domain: "daydream.live",
    href: "https://daydream.live",
    description:
      "Open-source, local-first platform for running real-time interactive generative AI video pipelines.",
    source: "daydream.svg",
    tags: ["AI Video", "Generative", "API"],
  },
  {
    _key: "frameworks",
    name: "Frameworks",
    domain: "frameworks.network",
    href: "https://frameworks.network",
    description:
      "Open streaming stack for live video — full media pipeline from ingest to delivery, self-hosted or cloud.",
    source: "frameworks.svg",
    tags: ["Streaming", "Self-hosted", "API"],
  },
  {
    _key: "streamplace",
    name: "Streamplace",
    domain: "stream.place",
    href: "https://stream.place",
    description:
      "The video layer for decentralized social networks. Open-source, self-hostable, and built on the AT Protocol.",
    source: "stream-place.png",
    tags: ["Streaming", "Decentralized", "API"],
  },
  {
    _key: "blueclaw",
    name: "Blue Claw",
    domain: "blueclaw.network",
    href: "https://blueclaw.network",
    description:
      "OpenAI-compatible inference for autonomous agents — flat-rate pricing, no rate limits, no token caps.",
    source: "blueclaw.webp",
    tags: ["Agents", "API"],
  },
  {
    _key: "livepeer-studio",
    name: "Livepeer Studio",
    domain: "livepeer.studio",
    href: "https://livepeer.studio",
    description:
      "Real-time interactive streaming platform — live video, VOD, and transcoding APIs powered by the Livepeer network.",
    source: "livepeer-studio.png",
    tags: ["Streaming", "API"],
  },
  {
    _key: "flipsuite",
    name: "Flipsuite",
    domain: "flipsuite.xyz",
    href: "https://flipsuite.xyz",
    description:
      "Community rewards engine — quests, multi-chain gating, tipping, storefronts, and AI-powered Flippy, with LLM inference routed through Livepeer.",
    source: "flipsuite.png",
    tags: ["Community", "Agents", "API"],
  },
  {
    _key: "embody",
    name: "Embody",
    domain: "embody.zone",
    href: "https://embody.zone",
    description:
      "Open-source network for embodied AI avatars — real-time tutoring, telepresence, and on-demand branded content.",
    source: "embody.svg",
    tags: ["AI Video", "Agents"],
  },
  {
    _key: "thelotradio",
    name: "The Lot Radio",
    domain: "thelotradio.com",
    href: "https://thelotradio.com",
    description:
      "Independent 24/7 online radio broadcasting live DJ sets from a shipping container in Brooklyn.",
    source: "thelotradio.svg",
    tags: ["Streaming", "Music"],
  },
  {
    _key: "tribesocial",
    name: "Tribe Social",
    domain: "tribesocial.io",
    href: "https://tribesocial.io",
    description:
      "Custom branded community apps with courses, live calls, and payments — owned by you, not rented.",
    source: "tribesocial.webp",
    tags: ["Streaming", "Community"],
  },
  {
    _key: "higher",
    name: "Higher",
    domain: "higher.zip",
    href: "https://higher.zip",
    description:
      "An onchain creative collective with a manifesto, missions, a shared treasury, and a Farcaster-native experience.",
    source: "higher-zip.svg",
    tags: ["Streaming", "Community", "Decentralized"],
  },
  {
    _key: "nytv",
    name: "NYTV",
    domain: "nytv.live",
    href: "https://nytv.live",
    description:
      "Independent 24/7 live television station streaming culture and programming from New York.",
    source: "nytv-live.jpg",
    tags: ["Streaming", "Community"],
  },
  {
    _key: "ufo",
    name: "UFO",
    domain: "ufo.fm",
    href: "https://ufo.fm",
    description:
      "A home for independent culture — radio, editorial, and weekly mixes from contributors around the world.",
    source: "ufo-fm.svg",
    tags: ["Streaming", "Music", "Community"],
  },
  {
    _key: "spritz",
    name: "Spritz",
    domain: "app.spritz.chat",
    href: "https://app.spritz.chat",
    description:
      "Censorship-resistant Web3 chat with HD video calls, livestreaming, and AI agents. Sign in with passkeys or wallets.",
    source: "spritz.svg",
    tags: ["Streaming", "Community", "Decentralized"],
  },
]

const importedApps = []

for (const app of apps) {
  const source = await readFile(`${assetPrefix}-${app.source}`)
  const png = await sharp(source, { density: 192, limitInputPixels: false })
    .resize(512, 512, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer()
  const asset = await client.assets.upload("image", png, {
    filename: `${app._key}.png`,
    contentType: "image/png",
  })

  importedApps.push({
    _key: app._key,
    _type: "livepeerOrgEcosystemApp",
    name: app.name,
    domain: app.domain,
    href: app.href,
    description: app.description,
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt: `${app.name} logo`,
    },
    tags: app.tags,
  })

  console.log(`${app.name}: ${asset.url}`)
}

await client
  .patch("livepeerOrgPage-ecosystem")
  .set({ "ecosystemContent.apps": importedApps })
  .commit()

console.log(`Imported ${importedApps.length} ecosystem apps.`)
