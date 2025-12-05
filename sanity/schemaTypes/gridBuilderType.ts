import { defineType, defineArrayMember } from "sanity";

export const gridBuilderType = defineType({
  name: "gridBuilder",
  type: "array",
  of: [
    defineArrayMember({
      type: "splitImage"
    }),
    defineArrayMember({
      title: "Card",
      name: "cards",
      type: "reference",
      to: { type: "card" },
    }),
  ],
});