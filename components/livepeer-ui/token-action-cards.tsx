import { ArrowUpRightIcon } from "lucide-react"

import { LivepeerSymbol } from "@/components/brand"
import type { LivepeerOrgPage } from "@/components/livepeer-ui/contracts"
import { Button } from "@/components/ui/button"

type TokenContent = NonNullable<LivepeerOrgPage["tokenContent"]>

export function TokenExchangeCard({
  content,
}: {
  content: TokenContent["exchanges"]
}) {
  return (
    <article className="aspect-square bg-foreground text-background">
      <div className="flex size-full flex-col items-center justify-center px-6 text-center sm:px-10">
        <LivepeerSymbol className="size-10 text-emerald-500 sm:size-16" />
        <p className="mt-4 text-xs text-background/50 sm:mt-8">
          {content.eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-light tracking-tight sm:text-4xl">
          Buy $LPT
        </h2>
        <ul className="mt-6 grid w-full max-w-md grid-cols-2 border-t border-background/15 sm:mt-8">
          {content.links.map((exchange) => (
            <li
              key={exchange.href}
              className="border-r border-b border-background/15 last:col-span-2 last:border-r-0 even:border-r-0"
            >
              <a
                href={exchange.href}
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-12 items-center justify-between px-3 text-left text-sm transition-colors hover:bg-background/10 sm:min-h-14 sm:px-4"
              >
                {exchange.label}
                <ArrowUpRightIcon
                  className="size-3.5 text-background/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export function TokenStakingCard({
  content,
}: {
  content: TokenContent["delegate"]
}) {
  return (
    <article className="aspect-square bg-muted">
      <div className="flex size-full flex-col items-center justify-center px-6 text-center sm:px-10">
        <LivepeerSymbol className="size-10 text-emerald-500 sm:size-16" />
        <p className="mt-4 text-xs text-muted-foreground sm:mt-8">
          {content.eyebrow}
        </p>
        <h2 className="mt-2 max-w-lg text-3xl font-light tracking-tight text-balance sm:text-4xl">
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
