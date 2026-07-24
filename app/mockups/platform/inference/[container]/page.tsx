import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getInferenceContainer, inferenceContainers } from "@/lib/containers"
import {
  formatCompact,
  getContainerHubInfo,
  getGithubRepoInfo,
} from "@/lib/livepeer"

export function generateStaticParams() {
  return inferenceContainers.map((container) => ({ container: container.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ container: string }>
}): Promise<Metadata> {
  const { container } = await params
  return { title: getInferenceContainer(container)?.slug ?? "Container" }
}

export default async function ContainerDetailPage({
  params,
}: {
  params: Promise<{ container: string }>
}) {
  const { container: slug } = await params
  const container = getInferenceContainer(slug)
  if (!container) notFound()

  const [hub, github] = await Promise.all([
    getContainerHubInfo(container.slug, container.tags),
    getGithubRepoInfo(container.github),
  ])

  const stats = [
    { label: "Pulls", value: hub ? formatCompact(hub.pullCount) : "—" },
    { label: "Stars", value: github ? formatCompact(github.stars) : "—" },
    {
      label: "Last push",
      value: hub?.updatedAt ? hub.updatedAt.slice(0, 10) : "—",
    },
  ]

  return (
    <div className="-mx-6 flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto overscroll-contain px-6 pb-8 md:-mx-10 md:px-10">
      <div className="flex flex-col gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="self-start"
          nativeButton={false}
          render={<Link href="/mockups/platform/inference" />}
        >
          <ArrowLeftIcon data-icon="inline-start" />
          Inference
        </Button>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h1 className="font-mono text-xl font-medium">
                {container.slug}
              </h1>
              {github?.license && (
                <Badge variant="outline">{github.license}</Badge>
              )}
            </div>
            <Button
              nativeButton={false}
              render={<Link href="/mockups/platform/inference" />}
            >
              Deploy
            </Button>
          </div>
          <p className="max-w-xl text-sm text-balance text-muted-foreground">
            {container.description}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          By {container.creator} ·{" "}
          <a
            href={`https://github.com/${container.github}`}
            target="_blank"
            rel="noreferrer"
            className="font-mono underline underline-offset-3 hover:text-foreground"
          >
            {container.github}
          </a>
          {github && github.contributors.length > 0 && (
            <> · contributors: {github.contributors.join(", ")}</>
          )}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} variant="metric">
            <CardHeader>
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-2xl font-medium tabular-nums">
                {stat.value}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      {hub && hub.images.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-medium">Images</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tag</TableHead>
                <TableHead className="text-right">Size</TableHead>
                <TableHead className="text-right">Pushed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hub.images.map((image) => (
                <TableRow key={image.tag}>
                  <TableCell className="font-mono text-xs">
                    livepeer/{container.slug}:{image.tag}
                  </TableCell>
                  <TableCell className="text-right text-xs tabular-nums">
                    {image.sizeGb.toFixed(1)} GB
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground tabular-nums">
                    {image.updatedAt.slice(0, 10)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {container.endpoints && (
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-medium">Endpoints</h2>
          <div className="flex flex-wrap gap-2">
            {container.endpoints.map((endpoint) => (
              <Badge key={endpoint} variant="secondary" className="font-mono">
                POST /{endpoint}
              </Badge>
            ))}
          </div>
        </div>
      )}
      <Card className="gap-4">
        <CardHeader>
          <CardTitle className="text-sm">Run locally</CardTitle>
          <CardDescription>
            Start the container and ping it to verify it&rsquo;s serving.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-md bg-muted px-4 py-3 font-mono text-xs leading-relaxed">
            {`${container.run}\n${container.ping}`}
          </pre>
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground">
        Live from Docker Hub and GitHub, cached for an hour.
      </p>
    </div>
  )
}
