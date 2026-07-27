import type { Metadata } from "next"

import { PlaybooksWorkspace } from "./playbooks-workspace"
import { getLivepeerOrgPage } from "@/sanity/lib/livepeer-org-pages"

export const metadata: Metadata = {
  title: "Livepeer.org",
}

export default async function PlaybooksPage() {
  const page = await getLivepeerOrgPage("home")
  if (!page.homeContent)
    throw new Error(
      'Required "homeContent" is missing from "livepeerOrgPage-home".'
    )
  return <PlaybooksWorkspace content={page.homeContent} />
}
