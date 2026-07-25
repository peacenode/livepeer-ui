import type { Metadata } from "next"

import { PlaybooksWorkspace } from "./playbooks-workspace"

export const metadata: Metadata = {
  title: "Landing",
}

export default function PlaybooksPage() {
  return <PlaybooksWorkspace />
}
