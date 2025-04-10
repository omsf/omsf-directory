import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const software = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./software" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    docs: z.string().url(),
    license: z.string(),
    link: z.string().url(),
    tags: z.array(z.string()),
  }),
});

export const collections = { software };
