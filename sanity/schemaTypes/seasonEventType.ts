import { Calendar } from "lucide-react";
import { defineType } from "sanity";

export const seasonEventType = defineType({
  name: "seasonEvent",
  title: "Season Event",
  type: "document",
  icon: Calendar,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "message",
      title: "Message",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "id",
      title: "ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "endDate",
      title: "End Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    },
  ],
})