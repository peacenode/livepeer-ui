import Link from "next/link"
import Image from "next/image"
import { ArrowDownIcon, ArrowRightIcon, ExternalLinkIcon } from "lucide-react"

import type { LivepeerOrgPage } from "@/components/livepeer-ui/contracts"
import { Button } from "@/components/ui/button"

type TokenContent = NonNullable<LivepeerOrgPage["tokenContent"]>

export function LivepeerTokenPage({ content }: { content: TokenContent }) {
  return (
    <main>
      <section className="flex min-h-[44rem] items-end border-b px-4 pt-28 pb-10 sm:min-h-[78svh] sm:px-6 sm:pb-16 lg:px-10">
        <div className="mx-auto grid w-full max-w-screen-2xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,34rem)] lg:items-end">
          <div>
            <p className="text-sm text-foreground/55">{content.hero.eyebrow}</p>
            <p className="mt-2 font-mono text-xs tracking-wide text-foreground/45 uppercase">
              {content.hero.metadata}
            </p>
            <h1 className="mt-8 max-w-4xl text-[clamp(3rem,8vw,7.5rem)] leading-[0.9] font-light tracking-[-0.055em] text-balance">
              {content.hero.heading}
            </h1>
          </div>
          <div className="lg:pb-2">
            {content.hero.illustrationUrl && (
              <div className="relative aspect-square overflow-hidden rounded-sm bg-[#121212]">
                <Image
                  src={content.hero.illustrationUrl}
                  alt={content.hero.illustrationAlt ?? ""}
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 34rem, 100vw"
                  priority
                />
              </div>
            )}
            <p className="mt-8 max-w-xl text-base leading-relaxed text-foreground/65 sm:text-lg">
              {content.hero.description}
            </p>
            <div className="mt-8 flex flex-col gap-2 sm:flex-row">
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href={content.hero.primaryCta.href} />}
                className="h-14 rounded-sm px-5"
              >
                {content.hero.primaryCta.label}
                <ArrowRightIcon />
              </Button>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href={content.hero.secondaryCta.href} />}
                className="h-14 rounded-sm bg-transparent px-5"
              >
                {content.hero.secondaryCta.label}
                <ArrowDownIcon />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="tokenomics"
        className="border-b px-4 py-20 sm:px-6 sm:py-28 lg:px-10"
      >
        <div className="mx-auto grid max-w-screen-2xl gap-12 lg:grid-cols-[minmax(15rem,0.7fr)_minmax(0,1.3fr)]">
          <p className="text-sm text-foreground/55">{content.role.eyebrow}</p>
          <div>
            <h2 className="max-w-3xl text-4xl font-light tracking-[-0.035em] text-balance sm:text-6xl">
              {content.role.heading}
            </h2>
            <p className="mt-10 max-w-3xl text-xl leading-relaxed sm:text-2xl">
              {content.role.introduction}
            </p>
            {content.role.illustrationUrl && (
              <div className="relative mt-12 aspect-[25/18] overflow-hidden rounded-sm bg-[#121212]">
                <Image
                  src={content.role.illustrationUrl}
                  alt={content.role.illustrationAlt ?? ""}
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 65vw, 100vw"
                />
              </div>
            )}
            <div className="mt-12 grid gap-8 text-base leading-relaxed text-foreground/65 sm:grid-cols-2">
              {content.role.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="exchanges"
        className="border-b bg-muted/40 px-4 py-20 sm:px-6 sm:py-28 lg:px-10"
      >
        <div className="mx-auto max-w-screen-2xl">
          <p className="text-sm text-foreground/55">
            {content.exchanges.eyebrow}
          </p>
          <h2 className="mt-6 text-4xl font-light tracking-[-0.035em] sm:text-6xl">
            {content.exchanges.heading}
          </h2>
          <div className="mt-12 grid border-t sm:grid-cols-2 lg:grid-cols-5">
            {content.exchanges.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex min-h-28 items-center justify-between border-b px-4 text-lg transition-colors hover:bg-background sm:border-r"
              >
                {link.label}
                <ExternalLinkIcon className="size-4 text-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foreground px-4 py-20 text-background sm:px-6 sm:py-28 lg:px-10">
        <div className="mx-auto grid max-w-screen-2xl gap-12 lg:grid-cols-[minmax(15rem,0.7fr)_minmax(0,1.3fr)]">
          <p className="text-sm text-background/55">
            {content.delegate.eyebrow}
          </p>
          <div>
            <h2 className="max-w-4xl text-4xl font-light tracking-[-0.035em] text-balance sm:text-6xl">
              {content.delegate.heading}
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-background/65">
              {content.delegate.description}
            </p>
            <Button
              size="lg"
              variant="secondary"
              nativeButton={false}
              render={<Link href={content.delegate.cta.href} />}
              className="mt-8 h-14 rounded-sm px-5"
            >
              {content.delegate.cta.label}
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
