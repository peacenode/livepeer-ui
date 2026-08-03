import { ArrowUpRightIcon } from "lucide-react"

import { LivepeerSymbol } from "@/components/brand"
import type { LivepeerOrgPage } from "@/components/livepeer-ui/contracts"
import { Button } from "@/components/ui/button"

type TokenContent = NonNullable<LivepeerOrgPage["tokenContent"]>

const exchangeStyles: Record<string, string> = {
  Binance: "bg-[#f0b90b] text-[#181a20]",
  Coinbase: "bg-[#0052ff] text-white",
  Kraken: "bg-[#5741d9] text-white",
  Uniswap: "bg-[#ff007a] text-white",
  OKX: "bg-black text-white",
}

export function TokenExchangeCard({
  content,
}: {
  content: TokenContent["exchanges"]
}) {
  return (
    <article className="grid aspect-square grid-rows-6 overflow-hidden">
      <div className="flex items-center justify-between bg-emerald-500 px-6 text-black sm:px-10">
        <div>
          <p className="text-xs text-black/60">{content.eyebrow}</p>
          <h2 className="mt-1 text-2xl font-light tracking-tight sm:text-3xl">
            Buy $LPT
          </h2>
        </div>
        <LivepeerSymbol className="size-8 sm:size-10" />
      </div>
      {content.links.map((exchange) => (
        <a
          key={exchange.href}
          href={exchange.href}
          target="_blank"
          rel="noreferrer"
          className={`group flex items-center justify-between px-6 text-xl font-medium tracking-tight transition-[filter] hover:brightness-95 sm:px-10 sm:text-2xl ${exchangeStyles[exchange.label] ?? "bg-muted text-foreground"}`}
        >
          {exchange.label}
          <ArrowUpRightIcon
            className="size-5 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>
      ))}
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
