import { ArrowDown, HeadingIcon, Settings2Icon, Text } from "lucide-react";
import { defineType, defineField } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: Settings2Icon,
  groups: [
    {
      name: "content",
      title: "Content",
      icon: Text,
    },
    {
      name: "seo",
      title: "SEO",
      icon: Settings2Icon,
    },
    {
      name: "header",
      title: "Header",
      icon: HeadingIcon
    },
    {
      name: "themes",
      title: "Themes",
    },
    {
      name: "footer",
      title: "Footer",
      icon: ArrowDown
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO Settings",
      type: "seo",
      description: "Default SEO metadata for all pages. Can be overridden on individual pages and posts.",
      group: "seo",
    }),
    defineField({
      name: "headerLinks",
      title: "Header Links",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "link",
          }
        }
      ],
      group: "header",
    }),
    defineField({
      name: "headerLogo",
      title: "Header Logo",
      type: "image",
      group: "header",
    }),
    defineField({
      name: "headerLogoAlt",
      title: "Header Logo Alt",
      type: "string",
      group: "header",
    }),
    defineField({
      name: "footerColumns",
      title: "Footer Columns",
      type: "array",
      of: [
        {
          type: "footerColBuilder",
        }
      ],
      group: "footer",
    }),
  ],
})