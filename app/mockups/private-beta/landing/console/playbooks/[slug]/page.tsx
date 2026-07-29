import type { Metadata } from "next"

import { getPlaybookDocument } from "@/app/mockups/playbooks/daydream-source"
import { SourcePlaybookView } from "@/app/mockups/playbooks/library/[slug]/page"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const playbook = await getPlaybookDocument(slug)
  return { title: playbook?.title ?? "Playbook" }
}

export default async function PrivateBetaConsolePlaybookPage({
  params,
}: PageProps) {
  const { slug } = await params

  return (
    <SourcePlaybookView
      catalogHref="/mockups/private-beta/landing/console/playbooks"
      embedded
      slug={slug}
    />
  )
}
