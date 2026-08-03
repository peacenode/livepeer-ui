import { ArrowUpRightIcon } from "lucide-react"

import { LivepeerSymbol } from "@/components/brand"
import type { EditorialLink } from "@/components/livepeer-ui/contracts"
import { Button } from "@/components/ui/button"

export type LivepeerStakingCardContent = {
  heading: string
  description: string
  cta: EditorialLink
}

export function LivepeerStakingCard({
  content,
}: {
  content: LivepeerStakingCardContent
}) {
  return (
    <article className="aspect-square bg-muted">
      <div className="flex size-full flex-col items-center justify-center px-6 text-center sm:px-10">
        <LivepeerSymbol className="size-10 text-emerald-500 sm:size-16" />
        <h2 className="mt-4 text-3xl font-light tracking-tight sm:mt-8 sm:text-4xl">
          {content.heading}
        </h2>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-balance text-muted-foreground sm:mt-3">
          {content.description}
        </p>
        <Button
          nativeButton={false}
          variant="outline"
          size="lg"
          className="mt-5 h-14 rounded-sm bg-background px-6 sm:mt-7 sm:h-16"
          render={
            <a href={content.cta.href} target="_blank" rel="noreferrer" />
          }
        >
          {content.cta.label}
          <ArrowUpRightIcon className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </article>
  )
}
