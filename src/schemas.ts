// import { z } from "zod/v4";
import { z } from "astro/zod";
import { ALL_SPDX_IDS, COMMON_LICENSES } from "./lib/spdx";

export const ALL_OMSF_PROJECTS = [
  "Open Force Field",
  "OpenADMET",
  "Open Free Energy",
  "OpenFold",
  "WESTPA",
];
const omsfProjects = z.enum(ALL_OMSF_PROJECTS);

// Re-export the curated license list so form components can import it from this module
export { COMMON_LICENSES };

export const languageTags = ["Python", "C++", "Fortran", "Rust", "Julia", "R"];

// Precompute a Set for O(1) SPDX ID lookups instead of O(n) Array.includes().
const SPDX_ID_SET = new Set(ALL_SPDX_IDS);

// Every entry must be a valid SPDX short identifier or a LicenseRef-
// prefixed custom identifier per the SPDX spec.
const licensesArray = z
  .array(z.string())
  .min(1)
  .superRefine((licenses, ctx) => {
    for (const license of licenses) {
      if (!SPDX_ID_SET.has(license) && !license.startsWith("LicenseRef-")) {
        ctx.addIssue({
          code: "custom",
          message: `"${license}" is not a valid SPDX identifier or LicenseRef- prefixed string`,
        });
      }
    }
  });

const strictUrl = z
  .string()
  .refine((url) => /^https?:\/\//.test(url), {
    message: "URL must start with http:// or https://",
  })
  .pipe(z.url());

export const SoftwareSchemaObject = z.object({
  name: z.string(),
  description: z.string(),
  docs: z.optional(strictUrl),
  licenses: licensesArray,
  link: z.optional(strictUrl),
  repository: strictUrl,
  tags: z.array(z.string()).min(1),
  languages: z.array(z.string()).min(1),
  project: z.optional(omsfProjects),
});

export const jsonSchema = z.toJSONSchema(SoftwareSchemaObject);
export type SoftwareSchema = z.infer<typeof SoftwareSchemaObject>;
