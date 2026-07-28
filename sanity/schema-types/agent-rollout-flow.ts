import { PanelsTopLeftIcon } from "lucide-react"
import { defineArrayMember, defineField, defineType } from "sanity"

const requiredString = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "string",
    validation: (rule) => rule.required(),
  })

const rolloutItem = (name: string, title: string) =>
  defineArrayMember({
    name,
    title,
    type: "object",
    fields: [
      requiredString("title", "Title"),
      defineField({
        name: "image",
        title: "16:9 image",
        type: "image",
        options: { hotspot: true },
        validation: (rule) => rule.required(),
        fields: [requiredString("alt", "Alternative text")],
      }),
      defineField({
        name: "mockupHref",
        title: "External mockup URL",
        description: "Leave empty when there is no separate mockup to open.",
        type: "url",
        validation: (rule) =>
          rule.uri({
            allowRelative: true,
            scheme: ["http", "https"],
          }),
      }),
      defineField({
        name: "checklist",
        title: "Checkmark list",
        type: "array",
        of: [defineArrayMember({ type: "string" })],
        validation: (rule) => rule.required().min(1),
      }),
    ],
    preview: {
      select: {
        title: "title",
        media: "image",
      },
    },
  })

export const agentRolloutFlowType = defineType({
  name: "agentRolloutFlow",
  title: "Agent rollout flow",
  type: "document",
  icon: PanelsTopLeftIcon,
  fields: [
    requiredString("title", "Page title"),
    requiredString("subtitle", "Page subtitle"),
    defineField({
      name: "phases",
      title: "Phases",
      type: "array",
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          name: "phase",
          title: "Phase",
          type: "object",
          groups: [
            { name: "bio", title: "Bio", default: true },
            { name: "marketing", title: "Marketing pages" },
            { name: "userFlow", title: "User flow" },
          ],
          fields: [
            defineField({
              ...requiredString("name", "Title"),
              group: "bio",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              group: "bio",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "primaryCta",
              title: "Primary CTA",
              description: "Leave empty when the phase has no primary CTA.",
              type: "string",
              group: "bio",
            }),
            defineField({
              name: "doNotWarning",
              title: "Do not warning",
              description: "Leave empty when this phase has no warning.",
              type: "string",
              group: "bio",
            }),
            defineField({
              name: "marketingPages",
              title: "Marketing pages",
              description: "Drag to set the display order.",
              type: "array",
              group: "marketing",
              of: [rolloutItem("marketingPage", "Marketing page")],
            }),
            defineField({
              name: "userFlow",
              title: "User flow",
              description:
                "Order matters. Drag steps into the sequence the user follows.",
              type: "array",
              group: "userFlow",
              validation: (rule) => rule.required().min(1),
              of: [rolloutItem("userFlowStep", "User flow step")],
            }),
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "primaryCta",
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
  },
})
