import { defineField, defineType } from "sanity";

export const heroType = defineType({
  name: "hero",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "variant",
      type: "string",
      options: {
        list: [
          { value: "primary", title: "Primary" },
          { value: "secondary", title: "Secondary" },
          { value: "neutral", title: "Neutral" },
          { value: "accent", title: "Accent" },
          { value: "info", title: "Info" },
          { value: "success", title: "Success" },
          { value: "warning", title: "Warning" },
          { value: "error", title: "Error" },
          { value: "base", title: "Base" },
        ],
      },
    }),
    defineField({
      name: "text",
      type: "blockContent",
    }),
    defineField({
      name: "image",
      type: "image",
    }),
  ],
});