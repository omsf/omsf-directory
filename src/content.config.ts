import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const omsfProjects = z.enum([
  "Open Force Field",
  "Open Free Energy",
  "Open Fold",
]);

const SoftwareSchema = z.object({
  name: z.string(),
  description: z.string(),
  docs: z.string().url(),
  license: z.string(),
  link: z.string().url(),
  tags: z.array(z.string()),
  project: z.optional(omsfProjects),
});

const software = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./software" }),
  schema: SoftwareSchema,
});

export type SoftwareSchema = z.infer<typeof SoftwareSchema>;

export const collections = { software };
