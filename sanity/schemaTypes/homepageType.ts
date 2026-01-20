import { HomeIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const homepageType = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon: HomeIcon,
  groups: [
    {
      name: "hero",
      title: "Hero Section",
    },
    {
      name: "services",
      title: "Services",
    },
    {
      name: "techStack",
      title: "Tech Stack",
    },
    {
      name: "selectedWork",
      title: "Selected Work",
    },
    {
      name: "cta",
      title: "Call to Action",
    },
    {
      name: "pageBuilder",
      title: "Page Builder",
    },
  ],
  fields: [
    // Hero Section
    defineField({
      name: "heroSection",
      title: "Hero Section",
      type: "homepageHero",
      group: "hero",
    }),

    // Services Section
    defineField({
      name: "servicesTitle",
      title: "Services Section Title",
      type: "string",
      initialValue: "What I Offer",
      group: "services",
    }),
    defineField({
      name: "servicesSubtitle",
      title: "Services Section Subtitle",
      type: "text",
      rows: 2,
      group: "services",
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [{ type: "service" }],
      group: "services",
    }),

    // Tech Stack Section
    defineField({
      name: "techStackTitle",
      title: "Tech Stack Section Title",
      type: "string",
      initialValue: "Technologies I Master",
      group: "techStack",
    }),
    defineField({
      name: "techStackSubtitle",
      title: "Tech Stack Section Subtitle",
      type: "text",
      rows: 2,
      group: "techStack",
    }),
    defineField({
      name: "techStack",
      title: "Technologies",
      type: "array",
      of: [{ type: "technology" }],
      group: "techStack",
    }),

    // Selected Work Section
    defineField({
      name: "selectedWorkTitle",
      title: "Selected Work Section Title",
      type: "string",
      initialValue: "Selected Work",
      group: "selectedWork",
    }),
    defineField({
      name: "selectedWorkSubtitle",
      title: "Selected Work Section Subtitle",
      type: "text",
      rows: 2,
      group: "selectedWork",
    }),
    defineField({
      name: "selectedWorkCount",
      title: "Number of Posts to Show",
      type: "number",
      initialValue: 6,
      validation: (Rule) => Rule.min(1).max(12),
      group: "selectedWork",
    }),

    // CTA Section
    defineField({
      name: "ctaSection",
      title: "CTA Section",
      type: "ctaSection",
      group: "cta",
    }),

    // Page Builder (reuses existing components)
    defineField({
      name: "pageBuilder",
      title: "Additional Sections",
      description: "Add additional sections using the page builder components",
      type: "pageBuilder",
      group: "pageBuilder",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Homepage",
      };
    },
  },
});
