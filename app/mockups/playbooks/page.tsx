import type { Metadata } from "next"

import { PlaybooksWorkspace } from "./playbooks-workspace"

export const metadata: Metadata = {
  title: "Playbooks",
}

export default function PlaybooksPage() {
  return <PlaybooksWorkspace />
}
