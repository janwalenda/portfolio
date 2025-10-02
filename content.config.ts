import { defineCollection, defineContentConfig, z } from "@nuxt/content";

// Definiere das Schema für die gemeinsamen Felder, die in jeder Sprache vorkommen
const ProjectSchema = z.object({
  name: z.string(),
  url: z.string().url(), // Validiert, dass es eine gültige URL ist
  github: z.string().url(), // Validiert, dass es eine gültige URL ist
  description: z.string(),
});

const HeaderSchema = z.object({
  title: z.string(),
  nav: z.array(
    z.object({
      url: z.string().url(),
      label: z.string().optional(),
      icon: z.string().optional(),
    })
  ),
});

const ExperienceSchema = z.object({
  technology: z.string(),
  skillLevel: z.number().min(0).max(100),
  company: z.string(),
  role: z.string(),
});

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      source: "projects/**.json",
      type: "data",
      schema: z.object({
        de: ProjectSchema,
        en: ProjectSchema,
        ja: ProjectSchema,
      }),
    }),
    header: defineCollection({
      source: "header.json",
      type: "data",
      schema: z.object({
        de: HeaderSchema,
        en: HeaderSchema,
      }),
    }),
    experiences: defineCollection({
      source: "experiences.json",
      type: "data",
      schema: z.object({
        experiences: z.array(ExperienceSchema),
      }),
    }),
    pages: defineCollection({
      source: "**/pages/*.md",
      type: "page",
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
      }),
    }),
    blog: defineCollection({
      source: "**/blog/*.md",
      type: "page",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        author: z.string(),
        tags: z.array(z.string()).optional(),
        thumbnailUrl: z.string().url(),
        thumbnailAlt: z.string().url(),
      }),
    }),
  },
});
