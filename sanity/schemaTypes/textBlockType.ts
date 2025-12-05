import { defineField, defineType } from "sanity";

export const textBlockType = defineType({
    name: "textBlock",
    type: "object",
    fields: [
        defineField({
            name: "title",
            type: "string",
        }),
        defineField({
            name: "text",
            type: "blockContent",
        }),
    ],
});