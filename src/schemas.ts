import { z } from "zod/v4";

export const ALL_OMSF_PROJECTS = [
  "Open Force Field",
  "Open Free Energy", 
  "Open Fold",
];
const omsfProjects = z.enum(ALL_OMSF_PROJECTS);

export const ALL_LICENSES = ["0BSD", "AGPL", "GPL-3", "MIT"];
const licenses = z.enum(ALL_LICENSES);

export const languageTags = ["Python", "C++", "Fortran", "Rust", "Julia", "R"];
const languages = z.enum(languageTags);

export const SoftwareSchemaObject = z.object({
  name: z.string(),
  description: z.string(),
  docs: z.optional(z.url()),
  license: licenses,
  link: z.url(),
  tags: z.array(z.string()),
  languages: z.array(z.string()),
  project: z.optional(omsfProjects),
});

export type SoftwareSchema = z.infer<typeof SoftwareSchemaObject>;
