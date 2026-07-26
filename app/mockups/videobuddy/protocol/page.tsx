import type { Metadata } from "next"
import { ArrowRightIcon } from "lucide-react"

import {
  ProtocolFlowSection,
  ProtocolHeaderSection,
  ProtocolPropertiesSection,
  ProtocolRequestFlowSection,
} from "./protocol-sections"

export const metadata: Metadata = {
  title: "Livepeer Agent, workflows, and compute",
}

export default function ProtocolPage() {
  return (
    <main className="h-[calc(100dvh-4rem)] overflow-y-auto overscroll-none md:h-dvh">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <ProtocolHeaderSection />
        <div className="mt-12">
          <ProtocolFlowSection />
        </div>
        <div className="mt-14">
          <ProtocolRequestFlowSection />
        </div>
        <div className="mt-14">
          <ProtocolPropertiesSection />
        </div>
        <div className="mt-14 border-t pt-6">
          <a
            href="https://docs.livepeer.org/v2/about/protocol/architecture"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
          >
            Read the protocol architecture
            <ArrowRightIcon className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </main>
  )
}
