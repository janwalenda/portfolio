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
    })
  }
})