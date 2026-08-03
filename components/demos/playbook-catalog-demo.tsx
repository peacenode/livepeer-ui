"use client"

import { SourceCatalog } from "@/app/mockups/playbooks/source-catalog"
import { sanityStaticAssets } from "@/sanity/lib/static-assets"

const playbooks = [
  {
    slug: "train-your-brand-aesthetic",
    title: "Krea 2 Open-Source: Train Your Brand Aesthetic",
    summary: "Train a reusable visual identity and create a campaign.",
    tags: ["Image", "Brand"],
    image: sanityStaticAssets.playbooks.runnerBackground,
    deliverables: ["Brand image set"],
    stats: [],
  },
  {
    slug: "talking-character-any-language",
    title: "Talking Character in Any Language",
    summary: "Create a multilingual character performance.",
    tags: ["Video", "Audio"],
    image: null,
    deliverables: ["Character video"],
    stats: [],
  },
]

export default function PlaybookCatalogDemo() {
  return (
    <div className="w-full p-4 sm:p-6">
      <SourceCatalog playbooks={playbooks} />
    </div>
  )
}
