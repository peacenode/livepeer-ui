import Image from "next/image"
import { ArrowUpRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"

export type EcosystemApp = {
  name: string
  domain: string
  href: string
  description: string
  image: string
  tags: string[]
}

export function EcosystemCard({ app }: { app: EcosystemApp }) {
  return (
    <a
      href={app.href}
      target="_blank"
      rel="noreferrer"
      className="group flex min-h-72 flex-col rounded-sm p-6 transition-colors hover:bg-muted/50"
    >
      <Image
        src={app.image}
        alt=""
        width={56}
        height={56}
        className="size-14 rounded-sm object-cover"
      />
      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-medium">{app.name}</h2>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            {app.domain}
          </p>
        </div>
        <ArrowUpRightIcon
          className="size-4 text-muted-foreground transition-colors group-hover:text-foreground"
          aria-hidden="true"
        />
      </div>
      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
        {app.description}
      </p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
        {app.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="rounded-sm font-mono text-[0.6875rem] font-normal uppercase"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </a>
  )
}
