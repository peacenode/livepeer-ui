import type { Metadata } from "next"

import { PlaybooksWorkspace } from "./playbooks-workspace"

export const metadata: Metadata = {
  title: "Discover",
}

export default function PlaybooksPage() {
  return <PlaybooksWorkspace />
}
