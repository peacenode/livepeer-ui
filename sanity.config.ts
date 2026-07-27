"use client"

import {
  CalendarIcon,
  CreditCardIcon,
  GalleryVerticalEndIcon,
} from "lucide-react"
import { defineConfig } from "sanity"
import { structureTool, type StructureResolver } from "sanity/structure"

import { StudioNavbar } from "@/components/sanity/studio-navbar"
import { dataset, projectId } from "@/sanity/env"
import { schemaTypes } from "@/sanity/schema-types"

const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Marketing planner")
        .icon(CalendarIcon)
        .child(
          S.documentTypeList("marketingWeek")
            .title("Weeks")
            .defaultOrdering([{ field: "startsAt", direction: "desc" }])
        ),
      S.divider(),
      S.documentTypeListItem("mockupRoundup")
        .title("Mockup roundups")
        .icon(GalleryVerticalEndIcon),
      S.documentTypeListItem("agentConsoleEditorialPage")
        .title("Agent Console editorial")
        .icon(CreditCardIcon),
    ])

export default defineConfig({
  name: "livepeer-ui",
  title: "Livepeer UI",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool({ structure })],
  studio: {
    components: {
      navbar: StudioNavbar,
    },
  },
  schema: {
    types: schemaTypes,
  },
})
