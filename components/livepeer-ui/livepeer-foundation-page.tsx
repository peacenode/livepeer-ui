import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { LivepeerGradientSymbol } from "@/components/brand"
import type { LivepeerOrgPage } from "@/components/livepeer-ui/contracts"
import { FoundationVennAnimation } from "@/components/livepeer-ui/foundation-venn-animation"
import { Button } from "@/components/ui/button"
import { DisplayHeading } from "@/components/ui/display-heading"

type FoundationContent = NonNullable<LivepeerOrgPage["foundationContent"]>

export function LivepeerFoundationPage({
  content,
}: {
  content: FoundationContent
}) {
  return (
    <main>
      <section className="flex items-center px-4 pt-32 pb-12 sm:px-6 sm:pt-36 sm:pb-16 lg:px-10">
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center text-center">
          <div className="mb-6 flex items-center justify-center gap-2 text-foreground/50">
            <LivepeerGradientSymbol
              className="h-2.5 w-auto shrink-0 sm:h-3"
              aria-hidden="true"
            />
            <p className="text-xs font-normal text-foreground/60">
              The Livepeer Foundation
            </p>
          </div>
          <DisplayHeading className="max-w-[22ch]">
            Advancing the world’s open networks
          </DisplayHeading>
          <p className="mt-5 max-w-prose text-sm leading-relaxed text-balance text-foreground/60">
            The Livepeer Foundation is an independent non-profit accountable to
            network participants, advancing Livepeer&apos;s long-term health
            through strategy, core development, and ecosystem growth.
          </p>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href={content.about.establishedLink.href} />}
            className="mt-8 h-12 rounded-sm bg-transparent px-4"
          >
            Read more
            <ArrowRightIcon aria-hidden="true" />
          </Button>
        </div>
      </section>

      <section className="flex min-h-[32rem] items-center px-4 pt-12 pb-12 sm:min-h-[42rem] sm:px-6 sm:pt-16 sm:pb-16 lg:px-10">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center text-center">
          <div className="mb-12 w-full max-w-xl sm:mb-16">
            <FoundationVennAnimation />
          </div>
          <DisplayHeading as="h2" className="max-w-[22ch]">
            Strategy, coordination, &amp; support.
          </DisplayHeading>
          <p className="mt-5 max-w-prose text-sm leading-relaxed text-balance text-foreground/60">
            The Livepeer Foundation sets the network’s strategic direction,
            aligns stakeholders around shared priorities, coordinates
            development across independent teams, and supports builders with
            funding, connections, and tools.
          </p>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href={content.responsibilities.cta.href} />}
            className="mt-10 h-14 rounded-sm bg-transparent px-5 sm:mt-12"
          >
            {content.responsibilities.cta.label}
            <ArrowRightIcon aria-hidden="true" />
          </Button>
          <div className="mt-12 flex items-center justify-center gap-2 py-12 text-foreground/50 sm:mt-16 sm:gap-3 sm:py-16">
            <LivepeerGradientSymbol
              className="h-2.5 w-auto shrink-0 sm:h-3"
              aria-hidden="true"
            />
            <p className="text-xs font-normal text-foreground/60">
              The Livepeer Foundation
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
