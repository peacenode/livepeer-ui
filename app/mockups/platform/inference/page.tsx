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
      <div className="sticky top-0 z-10 -mx-6 flex items-center justify-between gap-4 bg-background px-6 after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-6 after:bg-gradient-to-b after:from-background after:to-transparent md:-mx-10 md:px-10">
        <h1 className="text-xl font-medium">Inference</h1>
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
