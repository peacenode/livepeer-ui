import type { Metadata } from "next"

import MockupPage from "@/app/docs/mockups/[slug]/page"

export const metadata: Metadata = {
  title: "Livepeer.org",
  description:
    "Navigation, landing, Agent, playbook, ecosystem, and network sections used across Livepeer.org.",
}

export default function PublicBetaLivepeerOrgPage() {
  return <MockupPage params={Promise.resolve({ slug: "livepeer-org" })} />
}
