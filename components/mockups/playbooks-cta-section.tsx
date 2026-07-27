import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function PlaybooksCtaSection() {
  return (
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
  )
}
