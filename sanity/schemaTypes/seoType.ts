import { SearchIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  icon: SearchIcon,
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Title for search engines and social media. Optimal length: 50-60 characters.",
      validation: (Rule) =>
        Rule.max(60).warning("Titles longer than 60 characters may be truncated in search results"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Description for search engines and social media. Optimal length: 150-160 characters.",
      validation: (Rule) =>
        Rule.max(160).warning("Descriptions longer than 160 characters may be truncated in search results"),
    }),
    defineField({
      name: "metaKeywords",
      title: "Meta Keywords",
      type: "array",
      of: [{ type: "string" }],
      description: "Keywords for SEO (optional, less important for modern SEO)",
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description: "Image for social media sharing. Recommended size: 1200x630px",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Important for accessibility and SEO",
        },
      ],
    }),
    defineField({
      name: "ogTitle",
      title: "Open Graph Title",
      type: "string",
      description: "Title for social media (Facebook, LinkedIn). If empty, metaTitle will be used.",
      validation: (Rule) =>
        Rule.max(60).warning("Titles longer than 60 characters may be truncated"),
    }),
    defineField({
      name: "ogDescription",
      title: "Open Graph Description",
      type: "text",
      rows: 3,
      description: "Description for social media. If empty, metaDescription will be used.",
      validation: (Rule) =>
        Rule.max(160).warning("Descriptions longer than 160 characters may be truncated"),
    }),
    defineField({
      name: "twitterCard",
      title: "Twitter Card Type",
      type: "string",
      description: "Type of Twitter card to display",
      options: {
        list: [
          { title: "Summary", value: "summary" },
          { title: "Summary Large Image", value: "summary_large_image" },
          { title: "App", value: "app" },
          { title: "Player", value: "player" },
        ],
        layout: "radio",
      },
      initialValue: "summary_large_image",
    }),
    defineField({
      name: "twitterTitle",
      title: "Twitter Title",
      type: "string",
      description: "Title for Twitter. If empty, ogTitle or metaTitle will be used.",
      validation: (Rule) =>
        Rule.max(60).warning("Titles longer than 60 characters may be truncated"),
    }),
    defineField({
      name: "twitterDescription",
      title: "Twitter Description",
      type: "text",
      rows: 3,
      description: "Description for Twitter. If empty, ogDescription or metaDescription will be used.",
      validation: (Rule) =>
        Rule.max(160).warning("Descriptions longer than 160 characters may be truncated"),
    }),
    defineField({
      name: "twitterImage",
      title: "Twitter Image",
      type: "image",
      description: "Specific image for Twitter. If empty, ogImage will be used. Recommended size: 1200x675px",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description: "The canonical URL for this page (optional). Use to prevent duplicate content issues.",
    }),
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      description: "Prevent search engines from indexing this page",
      initialValue: false,
    }),
    defineField({
      name: "noFollow",
      title: "No Follow",
      type: "boolean",
      description: "Prevent search engines from following links on this page",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "metaTitle",
      subtitle: "metaDescription",
      media: "ogImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "No meta title set",
        subtitle: subtitle || "No meta description set",
        media: media || SearchIcon,
      };
    },
  },
});
