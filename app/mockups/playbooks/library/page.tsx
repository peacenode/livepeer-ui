import type { Metadata } from "next"

import { PlaybooksCatalog } from "../playbooks-workspace"

export const metadata: Metadata = {
  title: "Playbooks",
}

export default function PlaybooksLibraryPage() {
  return (
    <main>
      <PlaybooksCatalog standalone />
    </main>
  )
}
