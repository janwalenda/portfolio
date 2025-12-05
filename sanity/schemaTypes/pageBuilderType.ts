import { defineType, defineArrayMember } from "sanity";

export const pageBuilderType = defineType({
  title: "Page Builder",
  name: "pageBuilder",
  type: "array",
  description: "Build your page with different components",
  of: [
    defineArrayMember({
      title: "Hero",
      name: "hero",
      type: "hero"
    }),
    defineArrayMember({
      title: "Split Image",
      name: "splitImage",
      type: "splitImage"
    }),
    defineArrayMember({
      title: "Features",
      name: "features",
      type: "features"
    }),
    defineArrayMember({
      title: "FAQs",
      name: "faqs",
      type: "faqs"
    }),
    defineArrayMember({
      title: "Grid",
      name: "grid",
      type: "grid",
    }),
    defineArrayMember({
      title: "Text Block",
      name: "textBlocks",
      type: "textBlock"
    }),
  ],
});