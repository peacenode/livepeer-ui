import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { LivepeerWordmark } from "@/components/brand"
import { AgentCompatibility } from "@/components/livepeer-ui/agent-compatibility"
import type { LivepeerOrgPage } from "@/components/livepeer-ui/contracts"
import { LivepeerCubeStream } from "@/components/livepeer-ui/livepeer-cube-stream"
import { Button } from "@/components/ui/button"
import { sanityStaticAssets } from "@/sanity/lib/static-assets"

type HomeContent = NonNullable<LivepeerOrgPage["homeContent"]>

export function NetworkHeroSection({
  content,
}: {
  content: HomeContent["hero"]
}) {
  return (
    <section className="relative isolate flex min-h-[40rem] w-full items-center overflow-hidden bg-background sm:min-h-[76svh]">
      <LivepeerCubeStream className="z-0" />
      <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-4 py-28 sm:px-6 sm:py-32 lg:px-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h1 className="text-display-sm text-pretty sm:text-display-fluid">
            {content.heading}{" "}
            <span className="text-foreground/45">{content.accent}</span>
          </h1>
          <div className="mt-12 flex w-full flex-col justify-center gap-2 sm:w-auto sm:flex-row">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href={content.primaryCta.href} />}
              className="h-16 rounded-sm px-4"
            >
              {content.primaryCta.label}
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href={content.secondaryCta.href} />}
              className="h-16 rounded-sm bg-transparent px-4"
            >
              {content.secondaryCta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function LivepeerAgentFeatureSection({
  content,
}: {
  content: HomeContent["agentFeature"]
}) {
  return (
    <section className="relative overflow-hidden bg-muted sm:min-h-[56rem]">
      <Image
        src={sanityStaticAssets.playbooks.runnerBackground}
        alt=""
        fill
        className="hidden object-cover object-center dark:opacity-20 dark:mix-blend-luminosity sm:block"
        sizes="100vw"
      />
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-12 text-center sm:min-h-[56rem] sm:items-start sm:p-10 sm:text-left">
        <h2
          className="flex w-full min-w-0 flex-nowrap items-end justify-center gap-2 sm:w-auto sm:justify-start sm:gap-3"
          aria-label="Livepeer Agent"
        >
          <LivepeerWordmark
            className="h-5 w-auto shrink-0 min-[320px]:h-6 sm:h-10"
            aria-hidden="true"
          />
          <span className="shrink-0 translate-y-[0.17em] font-agent text-2xl leading-none font-medium min-[320px]:text-3xl sm:text-4xl">
            AGENT
          </span>
        </h2>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-foreground/65">
          {content.description}
        </p>
        <div className="mt-7 flex flex-wrap gap-2">
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href={content.installCta.href} />}
            className="h-16 rounded-sm px-4"
          >
            {content.installCta.label}
            <ArrowRightIcon />
          </Button>
        </div>
        <AgentCompatibility className="mt-7" responsiveAlignment />
      </div>
      <div className="relative aspect-[4/3] w-full sm:hidden">
        <Image
          src={sanityStaticAssets.playbooks.runnerBackground}
          alt=""
          fill
          className="object-cover object-center dark:opacity-35 dark:mix-blend-luminosity"
          sizes="100vw"
        />
      </div>
    </section>
  )
}

export function OrchestratorCtaSection({
  content,
}: {
  content: HomeContent["providerCta"]
}) {
  return (
    <section className="relative flex min-h-[32rem] overflow-hidden bg-foreground text-background sm:min-h-[56rem]">
      <LivepeerCubeStream inverted className="-scale-x-100 opacity-80" />
      <div className="relative z-10 flex w-full flex-col justify-center p-6 sm:p-10">
        <div className="ml-auto max-w-3xl text-right">
          <h2 className="text-4xl font-normal tracking-tight text-balance sm:text-6xl">
            {content.heading}
          </h2>
          <p className="mt-4 ml-auto max-w-xl text-base leading-relaxed text-background/65">
            {content.description}
          </p>
          <Button
            size="lg"
            variant="secondary"
            nativeButton={false}
            render={<Link href={content.cta.href} />}
            className="mt-6 h-16 rounded-sm px-4"
          >
            {content.cta.label}
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </section>
  )
}
