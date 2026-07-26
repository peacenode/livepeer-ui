import type { Metadata } from "next"

import { ConstructionPage } from "@/components/marketing/construction-page"

export const metadata: Metadata = {
  title: "Press Kit",
}

export default function PressKitPage() {
  return <ConstructionPage title="Press Kit" />
}
