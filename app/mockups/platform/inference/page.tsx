import type { Metadata } from "next"
import Link from "next/link"

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
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-medium">Inference</h1>
          <p className="text-sm text-muted-foreground">
            Containers available on the Livepeer AI network.
          </p>
        </div>
        <Button>Publish container</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {inferenceContainers.map((container, index) => {
          const hub = hubInfo[index]
          return (
            <Link
              key={container.slug}
              href={`/mockups/platform/inference/${container.slug}`}
              className="group"
            >
              <Card className="h-full gap-3 transition-shadow group-hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="font-mono text-sm font-medium">
                    {container.slug}
                  </CardTitle>
                  <CardDescription>{container.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto flex items-center justify-between gap-2 text-xs text-muted-foreground">
                  <span>{container.creator}</span>
                  {hub && (
                    <span className="font-mono">
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
    </div>
  )
}
