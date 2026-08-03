import { defineQuery } from "next-sanity"

import { sanityClient } from "@/sanity/lib/client"

export interface StockImageLibraryItem {
  _id: string
  name: string
  url: string
  createdAt: string
  tags: string[]
  subgroup: {
    _id: string
    name: string
    order: number
    group: {
      _id: string
      name: string
      order: number
    }
  }
}

const stockImagesQuery = defineQuery(`
  *[_type == "stockImage" && defined(image.asset) && defined(group->parent)] {
    _id,
    name,
    "url": image.asset->url,
    "createdAt": _createdAt,
    "tags": coalesce(tags, []),
    "subgroup": group->{
      _id,
      name,
      "order": coalesce(order, 0),
      "group": parent->{
        _id,
        name,
        "order": coalesce(order, 0)
      }
    }
  }
`)

export async function getStockImageLibrary() {
  return sanityClient.fetch<StockImageLibraryItem[]>(
    stockImagesQuery,
    {},
    { next: { revalidate: 60, tags: ["stock-images"] } }
  )
}
