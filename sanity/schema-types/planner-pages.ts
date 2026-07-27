import { ClapperboardIcon } from "lucide-react"
import { defineArrayMember, defineField, defineType } from "sanity"

const requiredString = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "string",
    validation: (rule) => rule.required(),
  })

const requiredText = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "text",
    rows: 3,
    validation: (rule) => rule.required(),
  })

export const plannerPageContentType = defineType({
  name: "plannerPageContent",
  title: "Planner mockup page",
  type: "document",
  icon: ClapperboardIcon,
  fields: [
    defineField({
      name: "page",
      title: "Page",
      type: "string",
      options: {
        list: [
          "home",
          "characters",
          "footage",
          "install",
          "projects",
          "protocol",
          "storyboards",
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    requiredString("metadataTitle", "Browser title"),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "primaryActionLabel",
      title: "Primary action label",
      type: "string",
    }),
    defineField({
      name: "emptyStateTitle",
      title: "Empty-state title",
      type: "string",
    }),
    defineField({
      name: "supportingText",
      title: "Supporting text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "protocol",
      title: "Protocol content",
      type: "object",
      hidden: ({ parent }) => parent?.page !== "protocol",
      fields: [
        requiredString("eyebrow", "Eyebrow"),
        requiredString("flowHeading", "Flow heading"),
        defineField({
          name: "layers",
          title: "Layers",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                requiredString("number", "Number"),
                requiredString("title", "Title"),
                requiredText("description", "Description"),
                requiredString("detail", "Detail"),
                requiredString("href", "Destination"),
                requiredString("icon", "Icon"),
              ],
              preview: { select: { title: "title", subtitle: "number" } },
            }),
          ],
          validation: (rule) => rule.required().min(1),
        }),
        requiredString("requestHeading", "Request flow heading"),
        defineField({
          name: "requestSteps",
          title: "Request steps",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                requiredString("title", "Title"),
                requiredText("description", "Description"),
              ],
              preview: { select: { title: "title" } },
            }),
          ],
          validation: (rule) => rule.required().min(1),
        }),
        requiredString("agentPropertyHeading", "Agent property heading"),
        requiredText("agentPropertyDescription", "Agent property description"),
        requiredString("paymentPropertyHeading", "Payment property heading"),
        requiredText(
          "paymentPropertyDescription",
          "Payment property description"
        ),
        requiredString("architectureLinkLabel", "Architecture link label"),
        requiredString("architectureLinkHref", "Architecture link destination"),
      ],
    }),
  ],
  preview: { select: { title: "heading", subtitle: "page" } },
})
