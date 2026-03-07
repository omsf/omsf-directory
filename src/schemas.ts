import { z } from "zod/v4";
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

// Known non-SPDX license sentinels that opt the entire array out of strict
// SPDX validation. "Proprietary" covers closed-source software; "Non-AI"
// covers the BSD-3-Clause Non-AI variant used by e.g. ForceBalance, which
// adds an AI-training restriction not present in any SPDX identifier.
const NON_SPDX_SENTINELS = ["Proprietary", "Non-AI"] as const;

// Precompute a Set for O(1) SPDX ID lookups instead of O(n) Array.includes().
const SPDX_ID_SET = new Set(ALL_SPDX_IDS);

// If the licenses array contains any known non-SPDX sentinel, SPDX
// validation is skipped for the entire array — any strings are accepted.
// Otherwise every entry must be a valid SPDX short identifier or a
// LicenseRef- prefixed custom identifier per the SPDX spec.
const licensesArray = z
  .array(z.string())
  .min(1)
  .superRefine((licenses, ctx) => {
    if (NON_SPDX_SENTINELS.some((s) => licenses.includes(s))) return;
    for (const license of licenses) {
      if (!SPDX_ID_SET.has(license) && !license.startsWith("LicenseRef-")) {
        ctx.addIssue({
          code: "custom",
          message: `"${license}" is not a valid SPDX identifier or LicenseRef- prefixed string`,
        });
      }
    }
  });

export const SoftwareSchemaObject = z.object({
  name: z.string(),
  description: z.string(),
  docs: z.optional(z.url()),
  licenses: licensesArray,
  link: z.optional(z.url()),
  repository: z.url(),
  tags: z.array(z.string()).min(1),
  languages: z.array(z.string()).min(1),
  project: z.optional(omsfProjects),
});

export const jsonSchema = z.toJSONSchema(SoftwareSchemaObject);
export type SoftwareSchema = z.infer<typeof SoftwareSchemaObject>;
