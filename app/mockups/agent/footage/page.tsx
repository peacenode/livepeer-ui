import type { Metadata } from "next"

import { FootageWorkspace } from "./footage-workspace"

export const metadata: Metadata = {
  title: "Clips - Livepeer",
}

export default function FootagePage() {
  return <FootageWorkspace />
}
