"use client"

import {
  CalendarIcon,
  CreditCardIcon,
  GalleryVerticalEndIcon,
} from "lucide-react"
import { defineConfig } from "sanity"
import { structureTool, type StructureResolver } from "sanity/structure"

import { StudioLayout } from "@/components/sanity/studio-layout"
import { dataset, projectId } from "@/sanity/env"
import { schemaTypes } from "@/sanity/schema-types"

const singletonSchemaTypes = new Set([
  "mockupRoundup",
  "agentConsoleEditorialPage",
])

const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .id("planner")
        .title("Planner")
        .icon(CalendarIcon)
        .child(
          S.documentTypeList("marketingWeek")
            .title("Weeks")
            .defaultOrdering([{ field: "startsAt", direction: "desc" }])
        ),
      S.listItem()
        .id("agent-waitlist")
        .title("Agent Waitlist")
        .icon(GalleryVerticalEndIcon)
        .child(
          S.list()
            .title("Agent Waitlist")
            .items([
              S.listItem()
                .title("Roundup")
                .child(
                  S.document()
                    .schemaType("mockupRoundup")
                    .documentId("mockupRoundup-agent-waitlist")
                ),
            ])
        ),
      S.listItem()
        .id("agent-console")
        .title("Agent Console")
        .icon(CreditCardIcon)
        .child(
          S.list()
            .title("Agent Console")
            .items([
              S.listItem()
                .title("Roundup")
                .child(
                  S.document()
                    .schemaType("mockupRoundup")
                    .documentId("mockupRoundup-agent-console")
                ),
              S.listItem()
                .title("Pages")
                .child(
                  S.list()
                    .title("Pages")
                    .items([
                      S.listItem()
                        .title("Usage")
                        .child(
                          S.document()
                            .schemaType("agentConsoleEditorialPage")
                            .documentId("agentConsoleEditorialPage-usage")
                        ),
                      S.listItem()
                        .title("Billing")
                        .child(
                          S.document()
                            .schemaType("agentConsoleEditorialPage")
                            .documentId("agentConsoleEditorialPage-billing")
                        ),
                    ])
                ),
            ])
        ),
      S.listItem()
        .id("livepeer-org")
        .title("Livepeer.org")
        .icon(GalleryVerticalEndIcon)
        .child(
          S.list()
            .title("Livepeer.org")
            .items([
              S.listItem()
                .title("Roundup")
                .child(
                  S.document()
                    .schemaType("mockupRoundup")
                    .documentId("mockupRoundup-livepeer-org")
                ),
            ])
        ),
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
      layout: StudioLayout,
    },
  },
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(
        (template) => !singletonSchemaTypes.has(template.schemaType)
      ),
  },
  document: {
    actions: (actions, context) =>
      singletonSchemaTypes.has(context.schemaType)
        ? actions.filter((action) => action.action !== "duplicate")
        : actions,
  },
})
