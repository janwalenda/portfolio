import { defineField, defineType } from "sanity";

export const gridType = defineType({
  name: "grid",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "components",
      type: "gridBuilder",
    })
  ],
});
