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
      <header className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight">Stock Images</h1>
        <p className="mt-2 text-balance text-muted-foreground">
          Browse the full library by group and subgroup.
        </p>
      </header>
      <div className="mt-8">
        <StockImageLibrary images={images} />
      </div>
    </article>
  )
}
