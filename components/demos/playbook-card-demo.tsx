import { PlaybookCard } from "@/components/mockups/playbook-card"
import { sanityStaticAssets } from "@/sanity/lib/static-assets"

const playbook = {
  slug: "train-your-brand-aesthetic",
  title: "Krea 2 Open-Source: Train Your Brand Aesthetic",
  summary: "Train a reusable visual identity and create a campaign.",
  tags: ["Image", "Brand"],
  image: sanityStaticAssets.playbooks.runnerBackground,
  deliverables: ["Brand image set"],
  stats: [],
}

export default function PlaybookCardDemo() {
  return (
    <div className="w-full max-w-sm">
      <PlaybookCard playbook={playbook} />
    </div>
  )
}
