import type { Metadata } from "next"

import { PlaybooksWorkspace } from "./playbooks-workspace"

export const metadata: Metadata = {
  title: "Livepeer.org",
}

export default function PlaybooksPage() {
  return <PlaybooksWorkspace />
}
