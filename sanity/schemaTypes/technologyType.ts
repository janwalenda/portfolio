import { defineField, defineType } from "sanity";

export const technologyType = defineType({
  name: "technology",
  title: "Technology",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "icon",
      description: "Icon for this technology (e.g., 'logos:react')",
    }),
    defineField({
      name: "level",
      title: "Skill Level",
      type: "string",
      options: {
        list: [
          { value: "Beginner", title: "Beginner" },
          { value: "Intermediate", title: "Intermediate" },
          { value: "Advanced", title: "Advanced" },
          { value: "Expert", title: "Expert" },
        ],
        layout: "radio",
      },
      initialValue: "Intermediate",
    }),
    defineField({
      name: "experience",
      title: "Experience",
      type: "string",
      description: "e.g., '4+ Years'",
    }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      of: [{ type: "string" }],
      description: "List of projects using this technology",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "level",
    },
  },
});
