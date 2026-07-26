import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { AgentCompatibility } from "@/components/mockups/agent-compatibility"
import { LivepeerAgentHero } from "@/components/mockups/livepeer-agent-hero"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { getPlaybookDocument, getSourcePlaybooks } from "../daydream-source"

export const metadata: Metadata = {
  title: "Livepeer Agent",
  description:
    "Install Livepeer Agent to use inference playbooks from your coding agent.",
}

export default async function PlaybooksInstallPage() {
  const playbooks = await getSourcePlaybooks()
  const documents = await Promise.all(
    playbooks.map(({ slug }) => getPlaybookDocument(slug))
  )
  const capabilities = [
    ...new Set(documents.flatMap((document) => document?.caps ?? [])),
  ].sort((a, b) => a.localeCompare(b))

  return (
    <main>
      <LivepeerAgentHero />

      <section className="grid md:grid-cols-2">
        <div className="flex aspect-square items-center justify-center bg-foreground px-6 text-background sm:px-10">
          <AgentCompatibility inverted large />
        </div>
        <div className="flex aspect-square flex-col items-center justify-center bg-muted px-6 text-center sm:px-10">
          <h2 className="max-w-xl text-[clamp(1.5rem,3.2vw,2.25rem)] leading-tight font-light tracking-tight text-balance">
            Install Livepeer Agent in your app today
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-balance text-muted-foreground">
            Create an API key to add Livepeer Agent’s image and video workflows
            to your own product.
          </p>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href="/mockups/livepeer-agent/api" />}
            className="mt-7 h-16 rounded-sm bg-background px-6"
          >
            Create an API key
            <ArrowRightIcon className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </section>

      <section className="bg-background px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center text-center">
          <h2 className="max-w-3xl text-4xl leading-[0.98] font-light tracking-[-0.045em] text-balance sm:text-5xl">
            Livepeer Agent brings image, video, audio, 3D, editing, rendering,
            and production tools across the Livepeer network into one
            interface.
          </h2>
          <div className="mt-10 flex max-w-5xl flex-wrap justify-center gap-2">
            {capabilities.map((capability) => (
              <Badge
                key={capability}
                variant="secondary"
                className="rounded-sm px-3 py-2 font-normal"
              >
                {capability}
              </Badge>
            ))}
          </div>
          <Button
            size="lg"
            variant="secondary"
            nativeButton={false}
            render={<Link href="/mockups/livepeer-org/library" />}
            className="mt-10 h-16 rounded-sm px-6"
          >
            See more
            <span className="font-sans" aria-hidden="true">
              →
            </span>
          </Button>
        </div>
      </section>

      <section className="relative overflow-hidden bg-muted sm:min-h-[56rem]">
        <Image
          src="/playbooks/20260725-031450/runner-background.jpg"
          alt=""
          fill
          className="hidden object-cover object-center dark:opacity-20 dark:mix-blend-luminosity sm:block"
          sizes="100vw"
        />
        <div className="relative z-10 flex flex-col items-center px-6 py-20 text-center sm:absolute sm:inset-0 sm:items-start sm:justify-center sm:p-10 sm:text-left">
          <h2 className="max-w-lg text-4xl leading-none font-light tracking-[-0.04em] text-balance sm:text-6xl">
            Playbooks, ready to run.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-balance text-muted-foreground">
            Start from a complete recipe for image, video, or audio generation.
            Copy it into Livepeer Agent, customize the inputs, and create from
            your agent.
          </p>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href="/mockups/livepeer-org/library" />}
            className="mt-7 h-16 rounded-sm border-foreground/20 bg-background px-4 transition-opacity hover:bg-background hover:opacity-80"
          >
            Browse Playbooks
            <ArrowRightIcon className="size-4" aria-hidden="true" />
          </Button>
        </div>
        <div className="relative aspect-4/3 w-full sm:hidden">
          <Image
            src="/playbooks/20260725-031450/runner-background.jpg"
            alt=""
            fill
            className="object-cover object-[65%_center] dark:opacity-20 dark:mix-blend-luminosity"
            sizes="100vw"
          />
        </div>
      </section>
    </main>
  )
}
