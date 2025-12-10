import { Icon } from "@iconify/react";
import { LinkIcon, TagIcon } from "lucide-react";
import { defineType, defineField } from "sanity";

export const linkType = defineType({
  name: "link",
  title: "Link",
  type: "document",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "URL to a page inside of the site",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "url",
      title: "URL",
      description: "URL to somewhere outside of the site",
      type: "url",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "icon",
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug",
      icon: "icon",
    },
    prepare(select) {
      const { title, slug, icon } = select;
      return {
        title: title,
        subtitle: slug?.current,
        media: icon ? <Icon icon={icon.name} /> : TagIcon,
      }
    }
  }
})