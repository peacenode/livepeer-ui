import { defineArrayMember, defineField, defineType } from "sanity"

const requiredImage = defineField({
  name: "image",
  title: "Image",
  type: "image",
  validation: (rule) => rule.required(),
})

export const socialAssetSetType = defineType({
  name: "socialAssetSet",
  title: "Social asset set",
  type: "document",
  fields: [
    defineField({
      name: "wordmark",
      title: "Banner wordmark",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "avatars",
      title: "Avatars",
      type: "array",
      of: [
        defineArrayMember({
          name: "socialAvatarAsset",
          title: "Avatar",
          type: "object",
          fields: [
            defineField({ name: "id", title: "ID", type: "string" }),
            defineField({
              name: "platforms",
              title: "Platforms",
              type: "string",
            }),
            defineField({ name: "width", title: "Width", type: "number" }),
            defineField({ name: "height", title: "Height", type: "number" }),
            requiredImage,
          ],
          preview: {
            select: { title: "id", subtitle: "platforms", media: "image" },
          },
        }),
      ],
    }),
    defineField({
      name: "banners",
      title: "Banners",
      type: "array",
      of: [
        defineArrayMember({
          name: "socialBannerAsset",
          title: "Banner",
          type: "object",
          fields: [
            defineField({ name: "id", title: "ID", type: "string" }),
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
            }),
            defineField({ name: "width", title: "Width", type: "number" }),
            defineField({ name: "height", title: "Height", type: "number" }),
            requiredImage,
          ],
          preview: {
            select: { title: "platform", subtitle: "id", media: "image" },
          },
        }),
      ],
    }),
    defineField({
      name: "previews",
      title: "Social previews",
      type: "array",
      of: [
        defineArrayMember({
          name: "socialPreviewAsset",
          title: "Preview",
          type: "object",
          fields: [
            defineField({ name: "id", title: "ID", type: "string" }),
            defineField({ name: "width", title: "Width", type: "number" }),
            defineField({ name: "height", title: "Height", type: "number" }),
            requiredImage,
          ],
          preview: { select: { title: "id", media: "image" } },
        }),
      ],
    }),
  ],
})
