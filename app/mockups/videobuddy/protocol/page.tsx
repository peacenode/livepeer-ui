import type { Metadata } from "next"
import { ArrowRightIcon, BlocksIcon, CpuIcon, PlayIcon } from "lucide-react"
import { videoBuddyPageFixture } from "@/app/mockups/_data/videobuddy-pages"
import type { VideoBuddyProtocolIcon } from "@/components/livepeer-ui/contracts"

import {
  ProtocolFlowSection,
  ProtocolHeaderSection,
  ProtocolPropertiesSection,
  ProtocolRequestFlowSection,
} from "./protocol-sections"

export async function generateMetadata(): Promise<Metadata> {
  const content = await videoBuddyPageFixture("protocol")
  return { title: content.metadataTitle }
}

const icons = {
  play: PlayIcon,
  blocks: BlocksIcon,
  cpu: CpuIcon,
} satisfies Record<VideoBuddyProtocolIcon, typeof PlayIcon>

export default async function ProtocolPage() {
  const content = await videoBuddyPageFixture("protocol")
  if (!content.protocol || !content.heading || !content.description) {
    throw new Error("Incomplete VideoBuddy protocol fixture")
  }
  const protocol = content.protocol
  const layers = protocol.layers.map((layer) => ({
    ...layer,
    icon: icons[layer.icon],
  }))
  return (
    <main className="h-[calc(100dvh-4rem)] overflow-y-auto overscroll-none md:h-dvh">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <ProtocolHeaderSection
          eyebrow={protocol.eyebrow}
          heading={content.heading}
          description={content.description}
        />
        <div className="mt-12">
          <ProtocolFlowSection heading={protocol.flowHeading} layers={layers} />
        </div>
        <div className="mt-14">
          <ProtocolRequestFlowSection
            heading={protocol.requestHeading}
            steps={protocol.requestSteps}
          />
        </div>
        <div className="mt-14">
          <ProtocolPropertiesSection
            agentHeading={protocol.agentPropertyHeading}
            agentDescription={protocol.agentPropertyDescription}
            paymentHeading={protocol.paymentPropertyHeading}
            paymentDescription={protocol.paymentPropertyDescription}
          />
        </div>
        <div className="mt-14 border-t pt-6">
          <a
            href={protocol.architectureLinkHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
          >
            {protocol.architectureLinkLabel}
            <ArrowRightIcon className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </main>
  )
}
