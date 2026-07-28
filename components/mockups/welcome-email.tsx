import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import {
  LivepeerGradientLockup,
  LivepeerGradientSymbol,
  LivepeerWordmark,
} from "@/components/brand"
import { Button } from "@/components/ui/button"

export interface WelcomeEmailContent {
  heading: string
  paragraphs: string[]
  ctaLabel: string
  ctaHref: string
  signoff: string
  sender: string
}

export function WelcomeEmail({ content }: { content: WelcomeEmailContent }) {
  return (
    <article className="flex min-h-svh w-full max-w-[500px] flex-col bg-background">
      <header className="border-b px-7 py-6 sm:px-10">
        <div
          className="flex items-end gap-2.5 text-foreground"
          aria-label="Livepeer Agent"
        >
          <LivepeerGradientSymbol className="h-6 w-auto" aria-hidden="true" />
          <LivepeerWordmark className="h-5 w-auto" aria-hidden="true" />
          <span
            className="translate-y-[0.12em] font-agent text-lg leading-none font-medium tracking-tight"
            aria-hidden="true"
          >
            AGENT
          </span>
        </div>
      </header>

      <div className="flex-1 px-7 py-10 sm:px-10 sm:py-12">
        <h1 className="text-4xl leading-[0.98] font-light tracking-[-0.045em] text-balance sm:text-5xl">
          {content.heading}
        </h1>

        <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <Button
          size="lg"
          nativeButton={false}
          render={<Link href={content.ctaHref} />}
          className="mt-9 h-14 rounded-sm border border-emerald-500 bg-emerald-500 px-5 text-white hover:bg-emerald-500"
          style={{
            backgroundImage:
              "linear-gradient(160deg, color(display-p3 0.04 0.74 0.49) 0%, color(display-p3 0.04 0.74 0.49) 32%, color(display-p3 0.02 0.58 0.36) 100%)",
          }}
        >
          {content.ctaLabel}
          <ArrowRightIcon className="size-4" aria-hidden="true" />
        </Button>

        <div className="mt-10 text-sm leading-relaxed">
          <p>{content.signoff}</p>
          <p className="font-medium">{content.sender}</p>
        </div>
      </div>

      <footer className="border-t px-7 py-6 sm:px-10">
        <LivepeerGradientLockup
          className="h-4 w-auto text-foreground"
          aria-label="Livepeer"
        />
      </footer>
    </article>
  )
}
