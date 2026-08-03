import { LivepeerGradientSymbol } from "@/components/brand"
import type { LivepeerOrgPage } from "@/components/livepeer-ui/contracts"
import {
  TokenExchangeCard,
  TokenStakingCard,
} from "@/components/livepeer-ui/token-action-cards"
import {
  TokenConstructionDiagram,
  TokenNetworkDiagram,
} from "@/components/livepeer-ui/token-diagrams"
import { DisplayHeading } from "@/components/ui/display-heading"

type TokenContent = NonNullable<LivepeerOrgPage["tokenContent"]>

function TokenLabel() {
  return (
    <div className="flex items-center justify-center gap-2 text-foreground/50">
      <LivepeerGradientSymbol
        className="h-2.5 w-auto shrink-0 sm:h-3"
        aria-hidden="true"
      />
      <p className="text-xs font-normal text-foreground/60">$LPT</p>
    </div>
  )
}

export function LivepeerTokenPage({ content }: { content: TokenContent }) {
  return (
    <main>
      <section className="flex items-center px-4 pt-32 pb-12 sm:px-6 sm:pt-36 sm:pb-16 lg:px-10">
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center text-center">
          <div className="mb-6">
            <TokenLabel />
          </div>
          <DisplayHeading className="max-w-[22ch]">
            {content.hero.heading}
          </DisplayHeading>
          <p className="mt-5 max-w-prose text-sm leading-relaxed text-balance text-foreground/60">
            {content.hero.description}
          </p>
          <TokenConstructionDiagram className="mt-12 h-auto w-full max-w-xl sm:mt-16" />
        </div>
      </section>

      <section
        id="tokenomics"
        className="flex min-h-[32rem] items-center px-4 pt-12 pb-12 sm:min-h-[42rem] sm:px-6 sm:pt-16 sm:pb-16 lg:px-10"
      >
        <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center text-center">
          <TokenNetworkDiagram className="mb-10 h-auto w-full max-w-2xl sm:mb-14" />
          <DisplayHeading as="h2" className="max-w-[22ch]">
            {content.role.heading}
          </DisplayHeading>
          <p className="mt-5 max-w-prose text-sm leading-relaxed text-balance text-foreground/60">
            {content.role.introduction}
          </p>
          <div className="mt-12 py-12 sm:mt-16 sm:py-16">
            <TokenLabel />
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <TokenExchangeCard content={content.exchanges} />
        <TokenStakingCard content={content.delegate} />
      </section>
    </main>
  )
}
