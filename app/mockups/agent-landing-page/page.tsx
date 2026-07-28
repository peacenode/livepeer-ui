import type { Metadata } from "next"

import { LivepeerWordmark } from "@/components/brand"
import {
  livepeerOrgAgentFixture,
  livepeerOrgSiteFixture,
} from "@/components/demos/fixtures/livepeer-org"
import { AgentCapabilitiesSection } from "@/components/mockups/agent-capabilities-section"
import { LivepeerAgentDeltaStream } from "@/components/mockups/livepeer-agent-delta-stream"
import { LivepeerOrgFooter } from "@/components/mockups/livepeer-org-footer"
import { LivepeerOrgHeader } from "@/components/mockups/livepeer-org-header"
import { PlaybooksCtaSection } from "@/components/mockups/playbooks-cta-section"

import {
  getPlaybookDocument,
  getSourcePlaybooks,
} from "../playbooks/daydream-source"

export const metadata: Metadata = {
  title: "Agent Landing Page",
  description:
    "Early-access marketing page for Livepeer Agent without public installation instructions.",
}

export default async function AgentLandingPage() {
  const playbooks = await getSourcePlaybooks()
  const documents = await Promise.all(
    playbooks.map(({ slug }) => getPlaybookDocument(slug))
  )
  const capabilities = [
    ...new Set(documents.flatMap((document) => document?.caps ?? [])),
  ].sort((a, b) => a.localeCompare(b))

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="absolute inset-x-0 top-0 z-20">
        <LivepeerOrgHeader site={livepeerOrgSiteFixture} />
      </div>

      <main className="flex-1">
        <section className="relative flex min-h-[78svh] w-full items-center overflow-hidden bg-background px-4 pt-28 pb-16 sm:px-6 sm:pt-64 sm:pb-24">
          <LivepeerAgentDeltaStream className="-translate-y-10 sm:-translate-y-8" />
          <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-7 text-center">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">
              Livepeer Agent Early Access
            </p>
            <div
              className="flex items-end gap-3 text-foreground sm:gap-4"
              aria-label="Livepeer Agent"
            >
              <LivepeerWordmark
                className="h-8 w-auto sm:h-10"
                aria-hidden="true"
              />
              <span
                className="translate-y-[0.17em] font-agent text-3xl leading-none font-medium tracking-tight sm:text-4xl"
                aria-hidden="true"
              >
                AGENT
              </span>
            </div>
            <h1 className="max-w-3xl text-4xl leading-[0.98] font-light tracking-[-0.045em] text-balance sm:text-6xl">
              {livepeerOrgAgentFixture.hero.heading}
            </h1>
          </div>
        </section>

        <AgentCapabilitiesSection
          capabilities={capabilities}
          content={livepeerOrgAgentFixture.capabilities}
        />
        <PlaybooksCtaSection content={livepeerOrgAgentFixture.playbooks} />
      </main>

      <LivepeerOrgFooter site={livepeerOrgSiteFixture} />
    </div>
  )
}
