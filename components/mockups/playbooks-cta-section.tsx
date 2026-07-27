import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function PlaybooksCtaSection({
  content,
}: {
  content: {
    heading: string
    description: string
    cta: { label: string; href: string }
  }
}) {
  return (
    <section className="relative overflow-hidden bg-muted sm:min-h-[56rem]">
      <Image
        src="/playbooks/20260725-031450/runner-background.jpg"
        alt=""
        fill
        className="hidden object-cover object-center sm:block dark:opacity-20 dark:mix-blend-luminosity"
        sizes="100vw"
      />
      <div className="relative z-10 flex flex-col items-center px-6 py-20 text-center sm:absolute sm:inset-0 sm:items-start sm:justify-center sm:p-10 sm:text-left">
        <h2 className="max-w-lg text-4xl leading-none font-light tracking-[-0.04em] text-balance sm:text-6xl">
          {content.heading}
        </h2>
        <p className="mt-5 max-w-md text-base leading-relaxed text-balance text-muted-foreground">
          {content.description}
        </p>
        <Button
          size="lg"
          variant="outline"
          nativeButton={false}
          render={<Link href={content.cta.href} />}
          className="mt-7 h-16 rounded-sm border-foreground/20 bg-background px-4 transition-opacity hover:bg-background hover:opacity-80"
        >
          {content.cta.label}
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
