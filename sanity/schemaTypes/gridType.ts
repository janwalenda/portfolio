import { defineField, defineType } from "sanity";

export const gridType = defineType({
  name: "grid",
  type: "object",
  title: "Grid",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
    }),
    defineField({
      title: "Components",
      name: "components",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "card",
            },
          ],
        },
      ],
    }),
  ],
});
