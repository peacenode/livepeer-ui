import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { AgentCompatibility } from "@/components/mockups/agent-compatibility"
import { Button } from "@/components/ui/button"

export function AgentAccessSection({
  content,
}: {
  content: {
    heading: string
    description: string
    cta: { label: string; href: string }
  }
}) {
  return (
    <section className="grid md:grid-cols-2">
      <div className="flex aspect-square items-center justify-center bg-foreground px-6 text-background sm:px-10">
        <AgentCompatibility inverted large />
      </div>
      <div className="flex aspect-square flex-col items-center justify-center bg-muted px-6 text-center sm:px-10">
        <h2 className="max-w-xl text-[clamp(1.5rem,3.2vw,2.25rem)] leading-tight font-light tracking-tight text-balance">
          {content.heading}
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-balance text-muted-foreground">
          {content.description}
        </p>
        <Button
          size="lg"
          variant="outline"
          nativeButton={false}
          render={<Link href={content.cta.href} />}
          className="mt-7 h-16 rounded-sm bg-background px-6"
        >
          {content.cta.label}
          <ArrowRightIcon className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </section>
  )
}
