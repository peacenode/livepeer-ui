import Link from "next/link"

import { LivepeerLockup } from "@/components/brand"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/docs/site-header"
import { components } from "@/lib/docs"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center">
        <section className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-8">
          <div className="mx-auto flex max-w-2xl flex-col items-start gap-4">
            <h1>
              <LivepeerLockup className="h-8 w-auto sm:h-10" aria-label="Livepeer UI" />
            </h1>
            <p className="text-base text-muted-foreground text-balance sm:text-lg">
              A shadcn component registry built on the vega style. Neutral
              palette, zero radius, Favorit. {components.length} components,
              installable with the shadcn CLI.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Button render={<Link href="/docs" />}>Get Started</Button>
              <Button
                variant="outline"
                render={<Link href="/docs/components/accordion" />}
              >
                Browse Components
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
