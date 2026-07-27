import "server-only"

import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId } from "@/sanity/env"

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: "published",
  stega: {
    studioUrl: "/studio",
  },
})
