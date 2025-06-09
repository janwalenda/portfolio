import { defineCollection, defineContentConfig, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      source: '**/projects/**.json',
      type: 'data',
      // Define custom schema for docs collection
      schema: z.object({
          name: z.string(),
          description: z.string(),
          url: z.string().url(),
          github: z.string().url()
      }),
    }),
    header: defineCollection({
      source: '**/header.json',
      type: 'data',
      schema: z.object({
        title: z.string(),
        nav: z.array(z.object({
          url: z.string().url(),
          label: z.string().optional(),
          icon: z.string().optional(),
        })),
      }),
    }),
    pages: defineCollection({
      source: '**/pages/*.md',
      type: 'page',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
      }),
    }),
    blog: defineCollection({
      source: '**/blog/*.md',
      type: 'page',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.date().optional(),
        author: z.string(),
        tags: z.array(z.string()).optional(),
      }),
    })
  }
})