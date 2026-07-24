import type { Metadata } from "next"
import { PlusIcon } from "lucide-react"

import { ContainerPostCard } from "@/components/mockups/container-post-card"
import { PlatformPage } from "@/components/mockups/platform-page"
import { Button } from "@/components/ui/button"
import { inferenceContainers } from "@/lib/containers"
import { getContainerHubInfo } from "@/lib/livepeer"

export const metadata: Metadata = {
  title: "Inference",
}

export default async function MockupInferencePage() {
  const hubInfo = await Promise.all(
    inferenceContainers.map((container) =>
      getContainerHubInfo(container.slug, [])
    )
  )

  return (
    <PlatformPage
      title="Inference"
      action={
        <Button size="lg" className="px-5 font-medium">
          <PlusIcon />
          Create a container
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {inferenceContainers.map((container, index) => {
          const hub = hubInfo[index]
          return (
            <ContainerPostCard
              key={container.slug}
              creator={container.creator}
              description={container.description}
              image={container.image}
              preload={index === 0}
              pullCount={hub?.pullCount}
              slug={container.slug}
            />
          )
        })}
      </div>
    </PlatformPage>
  )
}
