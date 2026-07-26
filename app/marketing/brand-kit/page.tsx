import type { Metadata } from "next"

import { ConstructionPage } from "@/components/marketing/construction-page"

export const metadata: Metadata = {
  title: "Brand Kit",
}

export default function BrandKitPage() {
  return <ConstructionPage title="Brand Kit" />
}
