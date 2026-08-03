import { InfoIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const calloutType = defineType({
  name: "callout",
  title: "Callout",
  type: "object",
  icon: InfoIcon,
  fields: [
    defineField({
      name: "tone",
      title: "Tone",
      type: "string",
      options: {
        list: [
          { title: "Info", value: "info" },
          { title: "Tip", value: "tip" },
          { title: "Warning", value: "warning" },
        ],
        layout: "radio",
      },
      initialValue: "info",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Optional short heading for the callout",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      body: "body",
      tone: "tone",
    },
    prepare({ title, body, tone }) {
      return {
        title: title || body || "Callout",
        subtitle: tone ? `Callout · ${tone}` : "Callout",
      };
    },
  },
});
