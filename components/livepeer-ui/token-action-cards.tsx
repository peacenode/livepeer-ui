import Image from "next/image"
import { ArrowUpRightIcon } from "lucide-react"

import { LivepeerGradientSymbol } from "@/components/brand"
import type { LivepeerOrgPage } from "@/components/livepeer-ui/contracts"

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
      <div className="flex items-center justify-center bg-foreground px-6 text-center text-background sm:px-10">
        <h2 className="flex items-center gap-1.5">
          <span className="text-xs font-normal tracking-tight text-background/60">
            Get
          </span>
          <span className="flex items-center gap-1 text-background">
            <LivepeerGradientSymbol
              className="h-2.5 w-auto shrink-0 sm:h-3"
              aria-hidden="true"
            />
            <span className="text-xs font-normal">$LPT</span>
          </span>
          <span className="text-xs font-normal tracking-tight text-background/60">
            at…
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
                  <ArrowUpRightIcon className="size-[1em]" aria-hidden="true" />
                </span>
              </>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xl font-normal tracking-tight sm:text-2xl">
                <span>{exchange.label}</span>
                <ArrowUpRightIcon className="size-[1em]" aria-hidden="true" />
              </span>
            )}
          </a>
        )
      })}
    </article>
  )
}
