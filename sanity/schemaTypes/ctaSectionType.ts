import { defineField, defineType } from "sanity";

export const ctaSectionType = defineType({
  name: "ctaSection",
  title: "CTA Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Main headline for the CTA section",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 2,
      description: "Supporting text below the title",
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "reference",
      to: [{ type: "link" }],
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "reference",
      to: [{ type: "link" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "CTA Section",
      };
    },
  },
});
