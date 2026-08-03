import Image from "next/image"
import { ArrowUpRightIcon } from "lucide-react"

import { LivepeerSymbol } from "@/components/brand"
import type { LivepeerOrgPage } from "@/components/livepeer-ui/contracts"
import { Button } from "@/components/ui/button"

type TokenContent = NonNullable<LivepeerOrgPage["tokenContent"]>

const exchangeStyles: Record<
  string,
  {
    className: string
    logoClassName: string
    logoHeight: number
    logoSrc: string
    logoWidth: number
  }
> = {
  Binance: {
    className: "bg-gradient-to-r from-[#ffd95a] to-[#f0b90b] text-black",
    logoClassName: "h-auto w-36 brightness-0",
    logoHeight: 127,
    logoSrc: "/brand/exchanges/binance.svg",
    logoWidth: 632,
  },
  Coinbase: {
    className: "bg-gradient-to-r from-[#3478ff] to-[#0052ff] text-white",
    logoClassName: "h-auto w-36 brightness-0 invert",
    logoHeight: 197,
    logoSrc: "/brand/exchanges/coinbase.svg",
    logoWidth: 1102,
  },
  Kraken: {
    className: "bg-gradient-to-r from-[#8068ee] to-[#5741d9] text-white",
    logoClassName: "h-auto w-32 brightness-0 invert",
    logoHeight: 26,
    logoSrc: "/brand/exchanges/kraken.svg",
    logoWidth: 151,
  },
  Uniswap: {
    className: "bg-gradient-to-r from-[#ff75ba] to-[#ff007a] text-black",
    logoClassName: "h-auto w-36 brightness-0",
    logoHeight: 240,
    logoSrc: "/brand/exchanges/uniswap.svg",
    logoWidth: 961,
  },
  OKX: {
    className: "bg-gradient-to-r from-[#d3ff66] to-[#b6ff20] text-black",
    logoClassName: "h-auto w-20",
    logoHeight: 224,
    logoSrc: "/brand/exchanges/okx.svg",
    logoWidth: 748,
  },
}

export function TokenExchangeCard({
  content,
}: {
  content: TokenContent["exchanges"]
}) {
  return (
    <article className="grid aspect-square grid-rows-6 overflow-hidden">
      <div className="flex items-center justify-center bg-gradient-to-r from-emerald-400 to-emerald-500 px-6 text-center text-black sm:px-10">
        <h2 className="text-2xl font-light tracking-tight sm:text-3xl">
          Buy $LPT
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
              <Image
                src={style.logoSrc}
                alt={`${exchange.label} wordmark`}
                width={style.logoWidth}
                height={style.logoHeight}
                className={style.logoClassName}
              />
            ) : (
              <span className="text-xl font-medium sm:text-2xl">
                {exchange.label}
              </span>
            )}
            <ArrowUpRightIcon
              className="size-5 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
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
