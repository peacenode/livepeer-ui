import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function AgentCapabilitiesSection({
  capabilities,
}: {
  capabilities: string[]
}) {
  return (
    <section className="bg-background px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center text-center">
        <h2 className="max-w-3xl text-4xl leading-[0.98] font-light tracking-[-0.045em] text-balance sm:text-5xl">
          Livepeer Agent brings image, video, audio, 3D, editing, rendering, and
          production tools across the Livepeer network into one interface.
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
  )
}
