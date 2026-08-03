import type { Metadata } from "next"

import { StockImageLibrary } from "@/components/marketing/stock-image-library"
import { getStockImageLibrary } from "@/sanity/lib/stock-images"

export const metadata: Metadata = {
  title: "Stock Images",
  description: "Browse the Livepeer stock-image library by group and subgroup.",
}

export default async function StockImagesPage() {
  const images = await getStockImageLibrary()

  return (
    <article className="w-full max-w-6xl pb-20">
      <StockImageLibrary images={images} />
    </article>
  )
}
