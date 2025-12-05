import { defineField, defineType } from "sanity";

export const footerColBuilderType = defineType({
  name: "footerColBuilder",
  title: "Footer Col Builder",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [{ type: "reference", to: { type: "link" } }]
    }),
  ],
})