import { ContainerPostCard } from "@/components/mockups/container-post-card"

export default function ContainerCardDemo() {
  return (
    <div className="w-full max-w-sm">
      <ContainerPostCard
        creator="Livepeer"
        description="A production-ready container for running AI pipelines."
        image="/container-thumbnails/20260724-002929/ai-runner.webp"
        pullCount={12840}
        slug="ai-runner"
      />
    </div>
  )
}
