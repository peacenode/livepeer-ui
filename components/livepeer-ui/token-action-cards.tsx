import Image from "next/image"
import { ArrowUpRightIcon } from "lucide-react"

import { LivepeerGradientSymbol, LivepeerSymbol } from "@/components/brand"
import type { LivepeerOrgPage } from "@/components/livepeer-ui/contracts"
import { Button } from "@/components/ui/button"

type TokenContent = NonNullable<LivepeerOrgPage["tokenContent"]>

const exchangeStyles: Record<
  string,
  {
    className: string
    logoClassName: string
    logoSrc: string
  }
> = {
  Binance: {
    className: "bg-[#ffd000] text-black",
    logoClassName: "size-7 brightness-0",
    logoSrc: "/brand/exchanges/binance.svg",
  },
  Coinbase: {
    className: "bg-[#0052ff] text-white",
    logoClassName: "size-7 brightness-0 invert",
    logoSrc: "/brand/exchanges/coinbase.svg",
  },
  Kraken: {
    className: "bg-[#5741d9] text-white",
    logoClassName: "size-7 brightness-0 invert",
    logoSrc: "/brand/exchanges/kraken.svg",
  },
  Uniswap: {
    className: "bg-[#ff007a] text-white",
    logoClassName: "size-8 brightness-0 invert",
    logoSrc: "/brand/exchanges/uniswap.svg",
  },
  OKX: {
    className: "bg-[#b6ff20] text-black",
    logoClassName: "size-8",
    logoSrc: "/brand/exchanges/okx.svg",
  },
}

export function TokenExchangeCard({
  content,
}: {
  content: TokenContent["exchanges"]
}) {
  return (
    <article className="grid aspect-square grid-rows-6 overflow-hidden">
      <div className="flex items-center justify-center bg-black px-6 text-center text-white sm:px-10">
        <h2 className="flex items-center gap-2">
          <span className="flex items-center gap-2 text-white/60">
            <LivepeerGradientSymbol
              className="h-2.5 w-auto shrink-0 sm:h-3"
              aria-hidden="true"
            />
            <span className="text-xs font-normal">$LPT</span>
          </span>
          <span className="text-sm font-normal tracking-tight sm:text-base">
            Available on
          </span>
        </h2>
      </div>
      {content.links.map((exchange) => {
        const style = exchangeStyles[exchange.label]

        return (
          <a
            key={exchange.href}
            href={exchange.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Buy LPT on ${exchange.label}`}
            className={`group flex items-center justify-between px-6 transition-[filter] hover:brightness-95 sm:px-10 ${style?.className ?? "bg-muted text-foreground"}`}
          >
            {style ? (
              <>
                <Image
                  src={style.logoSrc}
                  alt=""
                  width={32}
                  height={32}
                  className={style.logoClassName}
                />
                <span className="inline-flex items-center gap-1.5 text-xl font-normal tracking-tight sm:text-2xl">
                  <span>{exchange.label}</span>
                  <ArrowUpRightIcon
                    className="size-[1em]"
                    aria-hidden="true"
                  />
                </span>
              </>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xl font-normal tracking-tight sm:text-2xl">
                <span>{exchange.label}</span>
                <ArrowUpRightIcon
                  className="size-[1em]"
                  aria-hidden="true"
                />
              </span>
            )}
          </a>
        )
      })}
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
