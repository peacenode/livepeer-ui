import { defineField, defineType } from "sanity"

export const stockImageGroupType = defineType({
  name: "stockImageGroup",
  title: "Stock image group",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "parent",
      title: "Parent group",
      type: "reference",
      to: [{ type: "stockImageGroup" }],
      options: { disableNew: true },
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "systemKey",
      title: "System key",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
  ],
  preview: { select: { title: "name", subtitle: "parent.name" } },
})

export const stockImageType = defineType({
  name: "stockImage",
  title: "Stock image",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "group",
      title: "Group",
      type: "reference",
      to: [{ type: "stockImageGroup" }],
      options: { disableNew: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sourceHash",
      title: "Source hash",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "sourceFilename",
      title: "Source filename",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({ name: "notes", title: "Notes", type: "text", rows: 3 }),
  ],
  preview: {
    select: { title: "name", media: "image", subtitle: "group.name" },
  },
})
