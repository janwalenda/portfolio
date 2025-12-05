import { defineField, defineType } from "sanity";

export const cardType = defineType({
  title: "Cards",
  name: "card",
  type: "document",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
    }),
    defineField({
      title: "Description",
      name: "description",
      type: "text",
    }),
    defineField({
      title: "Image",
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "action",
      type: "array",
      of: [{ type: "reference", to: { type: "link" } }],
    })
  ],
});