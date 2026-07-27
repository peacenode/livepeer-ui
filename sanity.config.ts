"use client"

import { CalendarIcon } from "lucide-react"
import { defineConfig } from "sanity"
import { structureTool, type StructureResolver } from "sanity/structure"

import { dataset, projectId } from "@/sanity/env"
import { schemaTypes } from "@/sanity/schema-types"

const structure: StructureResolver = (S) =>
  S.list()
    .title("Marketing Planner")
    .items([
      S.listItem()
        .title("Weeks")
        .icon(CalendarIcon)
        .child(
          S.documentTypeList("marketingWeek")
            .title("Weeks")
            .defaultOrdering([{ field: "startsAt", direction: "desc" }])
        ),
    ])

export default defineConfig({
  name: "livepeer-ui",
  title: "Livepeer UI",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
  },
})
