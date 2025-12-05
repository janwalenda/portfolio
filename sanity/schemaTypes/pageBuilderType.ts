import { defineType, defineArrayMember } from "sanity";

export const pageBuilderType = defineType({
  name: "pageBuilder",
  type: "array",
  of: [
    defineArrayMember({
      name: "hero",
      type: "hero"
    }),
    defineArrayMember({
      name: "splitImage",
      type: "splitImage"
    }),
    defineArrayMember({
      name: "card",
      type: "card"
    }),
    defineArrayMember({
      name: "features",
      type: "features"
    }),
    defineArrayMember({
      name: "faqs",
      type: "faqs"
    }),
    defineArrayMember({
      title: "Grid",
      name: "grid",
      type: "reference",
      to: { type: "grid" },
    }),
    defineArrayMember({
      title: "Text Block",
      name: "textBlocks",
      type: "textBlock"
    }),
  ],
});