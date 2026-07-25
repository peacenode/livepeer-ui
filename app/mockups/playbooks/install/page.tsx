import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { CopyButton } from "@/components/docs/copy-button"
import { AgentCompatibility } from "@/components/mockups/agent-compatibility"
import { RunnerDeltaStream } from "@/components/mockups/runner-delta-stream"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { getPlaybookDocument, getSourcePlaybooks } from "../daydream-source"

export const metadata: Metadata = {
  title: "Runner",
  description:
    "Install Runner to use Livepeer inference playbooks from your coding agent.",
}

const installCommand = "npm install -g @livepeer/runner"

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
      <section className="relative flex items-center overflow-hidden bg-white px-4 pt-28 pb-16 sm:px-6 sm:pt-64 sm:pb-16">
        <RunnerDeltaStream />
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-7 text-center">
          <p className="font-runner text-5xl font-medium tracking-tight sm:text-6xl">
            RUNNER
          </p>
          <h1 className="max-w-3xl text-4xl leading-[0.98] font-light tracking-[-0.045em] text-balance sm:text-6xl">
            Create and edit images and video with your agent.
          </h1>

          <div className="inline-flex max-w-full items-center gap-4 rounded-sm bg-foreground px-5 py-4 text-left text-background shadow-sm">
            <code className="min-w-0 overflow-x-auto font-mono text-xs whitespace-nowrap sm:text-sm">
              <span className="mr-2 text-background/40" aria-hidden="true">
                $
              </span>
              {installCommand}
            </code>
            <CopyButton
              value={installCommand}
              className="size-8 shrink-0 rounded-none bg-transparent text-background/40 transition-colors hover:bg-transparent hover:text-background"
            />
          </div>
          <nav className="flex items-center gap-5 text-sm" aria-label="Account">
            <Link
              href="/mockups/platform"
              className="text-foreground underline underline-offset-4 transition-opacity hover:opacity-60"
            >
              Sign in
            </Link>
            <Link
              href="/mockups/platform"
              className="text-foreground underline underline-offset-4 transition-opacity hover:opacity-60"
            >
              Create account
            </Link>
          </nav>
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <div className="flex aspect-square items-center justify-center bg-foreground px-6 text-background sm:px-10">
          <AgentCompatibility inverted large />
        </div>
        <div className="flex aspect-square flex-col items-center justify-center bg-muted px-6 text-center sm:px-10">
          <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] leading-tight font-light tracking-tight">
            <span className="block whitespace-nowrap">Build your own app</span>
            <span className="block whitespace-nowrap">
              with Livepeer&apos;s Runner
            </span>
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-balance text-muted-foreground">
            Create an API key to add Runner’s image and video workflows to your
            own product.
          </p>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href="/mockups/platform/api" />}
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
            Runner gives your agent one interface for image, video, audio, 3D,
            editing, rendering, and production tools across the Livepeer
            network.
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
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f3f3f3] sm:min-h-[56rem]">
        <Image
          src="/playbooks/20260725-031450/runner-background.jpg"
          alt=""
          fill
          className="hidden object-cover object-center sm:block"
          sizes="100vw"
        />
        <div className="relative z-10 flex flex-col items-center px-6 py-20 text-center sm:absolute sm:inset-0 sm:items-start sm:justify-center sm:p-10 sm:text-left">
          <h2 className="max-w-lg text-4xl leading-none font-light tracking-[-0.04em] text-balance sm:text-6xl">
            Playbooks, ready to run.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-balance text-muted-foreground">
            Start from a complete recipe for image, video, or audio generation.
            Copy it into Runner, customize the inputs, and create from your
            agent.
          </p>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href="/mockups/playbooks/library" />}
            className="mt-7 h-16 rounded-sm border-foreground/20 bg-white px-4 transition-opacity hover:bg-white hover:opacity-80"
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
            className="object-cover object-[65%_center]"
            sizes="100vw"
          />
        </div>
      </section>
    </main>
  )
}
