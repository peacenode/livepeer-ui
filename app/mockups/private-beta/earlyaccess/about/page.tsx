import type { Metadata } from "next"

import {
  getPlaybookDocument,
  getSourcePlaybooks,
} from "@/app/mockups/playbooks/daydream-source"
import { AgentScrollerPage } from "@/components/livepeer-ui/agent-scroller-page"
import { getLivepeerOrgSite } from "@/sanity/lib/livepeer-org-pages"
import { getStockImageLibrary } from "@/sanity/lib/stock-images"

export const metadata: Metadata = {
  title: "Livepeer Agent — Private Beta",
  description:
    "Create, source, edit, and deliver media from the project already open in your agent.",
}

export default async function PrivateBetaEarlyAccessAboutPage() {
  const [site, playbooks, stockImages] = await Promise.all([
    getLivepeerOrgSite(),
    getSourcePlaybooks(),
    getStockImageLibrary(),
  ])
  const documents = await Promise.all(
    playbooks.map(({ slug }) => getPlaybookDocument(slug))
  )
  const capabilities = [
    ...new Set(documents.flatMap((document) => document?.caps ?? [])),
  ].sort((a, b) => a.localeCompare(b))

  const networkImages = stockImages
    .filter((image) => image.subgroup.group.name.toLowerCase() === "network")
    .map((image) => ({
      id: image._id,
      src: image.url,
      alt: image.name,
    }))

  if (!networkImages.length) {
    throw new Error('The stock-image library has no images in "Network".')
  }

  return (
    <AgentScrollerPage
      site={site}
      capabilities={capabilities}
      networkImages={networkImages}
    />
  )
}
