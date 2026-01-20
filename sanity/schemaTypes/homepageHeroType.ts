import { defineField, defineType } from "sanity";

export const homepageHeroType = defineType({
  name: "homepageHero",
  title: "Homepage Hero",
  type: "object",
  fields: [
    defineField({
      name: "badgeEnabled",
      title: "Show Availability Badge",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "badgeText",
      title: "Badge Text",
      type: "string",
      initialValue: "Available for new projects",
      hidden: ({ parent }) => !parent?.badgeEnabled,
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Main headline (e.g., 'Freelance Frontend Developer')",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 3,
      description: "Supporting text below the title",
    }),
    defineField({
      name: "image",
      title: "Profile Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "reference",
      to: [{ type: "link" }],
      description: "Main call-to-action button (e.g., 'Hire Me')",
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "reference",
      to: [{ type: "link" }],
      description: "Secondary button (e.g., 'View Projects')",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Homepage Hero",
        media,
      };
    },
  },
});
