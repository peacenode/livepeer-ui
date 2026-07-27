import type { Metadata } from "next"
import { videoBuddyPageFixture } from "@/components/demos/fixtures/videobuddy-pages"

import { InstallCommand } from "./install-command"

export async function generateMetadata(): Promise<Metadata> {
  const content = await videoBuddyPageFixture("install")
  return { title: content.metadataTitle }
}

export default async function InstallPage() {
  const content = await videoBuddyPageFixture("install")
  return (
    <main className="h-[calc(100dvh-4rem)] overflow-y-auto overscroll-none md:h-dvh">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="max-w-2xl">
          <h1 className="text-2xl font-medium text-balance">
            {content.heading}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {content.description}
          </p>
        </header>
        <section className="mt-8">
          <InstallCommand />
          <p className="mt-3 text-xs text-muted-foreground">
            {content.supportingText}
          </p>
        </section>
      </div>
    </main>
  )
}
