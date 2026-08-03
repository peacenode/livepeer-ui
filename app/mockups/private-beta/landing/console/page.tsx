import type { Metadata } from "next"
import Image from "next/image"
import { ArrowUpRightIcon } from "lucide-react"

import { LivepeerAgentOnboardingSection } from "@/components/livepeer-ui/livepeer-agent-onboarding-section"
import { PlatformPage } from "@/components/livepeer-ui/platform-page"
import { CardTitle } from "@/components/ui/card"
import {
  getAgentConsolePage,
  type HomePageContent,
} from "@/sanity/lib/agent-console-pages"

export const metadata: Metadata = {
  title: "Home",
}

export default async function PrivateBetaConsoleHomePage() {
  const editorial = await getAgentConsolePage<HomePageContent>("home")

  if (!editorial?.home) {
    throw new Error(
      'Required Sanity document "agentConsolePage-home" is missing or incomplete.'
    )
  }

  return (
    <PlatformPage
      title={editorial.heading}
      description={editorial.description}
      variant="plain"
    >
      <div className="flex flex-col gap-6">
        <LivepeerAgentOnboardingSection
          title={editorial.home.onboardingTitle}
          steps={editorial.home.onboardingSteps}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {editorial.home.featureLinks.map((feature) => (
            <a
              key={feature._key ?? feature.href}
              href={
                feature._key === "playbooks"
                  ? "/mockups/private-beta/landing/console/playbooks"
                  : feature.href
              }
              className="group focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-muted">
                <Image
                  src={feature.imageSrc}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                />
              </div>
              <div className="mt-4 flex max-w-sm flex-col gap-1.5">
                <CardTitle className="inline-flex items-center gap-1.5 text-xl font-normal">
                  {feature.title}
                  <ArrowUpRightIcon
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </PlatformPage>
  )
}
