import type { Metadata } from "next"
import Link from "next/link"
import { PlusIcon } from "lucide-react"

import { PlatformPage } from "@/components/mockups/platform-page"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { inferenceContainers } from "@/lib/containers"
import { formatCompact, getContainerHubInfo } from "@/lib/livepeer"

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
            <Link
              key={container.slug}
              href={`/mockups/platform/inference/${container.slug}`}
              className="group"
            >
              <Card className="h-full gap-3">
                <CardHeader>
                  <CardTitle className="font-mono text-sm font-medium">
                    {container.slug}
                  </CardTitle>
                  <CardDescription>{container.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto flex items-center justify-between gap-2 text-xs text-muted-foreground">
                  <span>{container.creator}</span>
                  {hub && (
                    <span className="tabular-nums">
                      {formatCompact(hub.pullCount)} pulls
                    </span>
                  )}
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
      <p className="text-xs text-muted-foreground">
        Container metadata live from Docker Hub, cached for an hour.
      </p>
    </PlatformPage>
  )
}
