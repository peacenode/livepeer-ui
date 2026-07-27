import { PlaybookCard } from "@/components/mockups/playbook-card"

const playbook = {
  slug: "train-your-brand-aesthetic",
  title: "Krea 2 Open-Source: Train Your Brand Aesthetic",
  summary: "Train a reusable visual identity and create a campaign.",
  tags: ["Image", "Brand"],
  image: "/playbooks/20260725-031450/runner-background.jpg",
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
