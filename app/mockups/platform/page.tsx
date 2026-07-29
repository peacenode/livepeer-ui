import type { Metadata } from "next"
import Image from "next/image"
import { ArrowUpRightIcon } from "lucide-react"

import { PlatformPage } from "@/components/mockups/platform-page"
import { LivepeerAgentOnboardingSection } from "@/components/mockups/livepeer-agent-onboarding-section"
import { CardTitle } from "@/components/ui/card"
import { getForumTopicUrl, getLatestResearchTopics } from "@/lib/forum"
import {
  getAgentConsolePage,
  type HomePageContent,
} from "@/sanity/lib/agent-console-pages"

export const metadata: Metadata = {
  title: "Home",
}

const forumDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
})

export default async function MockupHomePage() {
  const [editorial, forumTopics] = await Promise.all([
    getAgentConsolePage<HomePageContent>("home"),
    getLatestResearchTopics(),
  ])
  if (!editorial?.home) {
    throw new Error(
      "Required Sanity document agentConsolePage-home is missing or incomplete."
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
                  ? "/mockups/livepeer-agent/playbooks"
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
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-normal">
          <a
            href={editorial.home.researchHref}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5"
          >
            {editorial.home.researchTitle}
            <ArrowUpRightIcon
              className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </h2>
        <div className="border-y">
          {forumTopics.map((topic) => (
            <a
              key={topic.id}
              href={getForumTopicUrl(topic)}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-6 border-b py-5 transition-colors last:border-b-0 hover:text-emerald-500"
            >
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 font-sans font-medium text-foreground">
                  {topic.title}
                </h3>
              </div>
              <time
                dateTime={topic.lastPostedAt}
                className="hidden shrink-0 text-sm text-muted-foreground tabular-nums sm:block"
              >
                {forumDateFormatter.format(new Date(topic.lastPostedAt))}
              </time>
              <ArrowUpRightIcon
                className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          ))}
          {forumTopics.length === 0 && (
            <a
              href={editorial.home.researchHref}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-6 py-5"
            >
              <span className="font-medium">
                {editorial.home.researchEmptyLabel}
              </span>
              <ArrowUpRightIcon
                className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          )}
        </div>
      </div>
    </PlatformPage>
  )
}
