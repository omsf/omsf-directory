// Read the SPDX identifier list directly from the package's JSON file so we
// don't need a module declaration — the package ships only JSON, no .js entry
import rawIds from "spdx-license-ids/index.json";

// Cast to a readonly array so TypeScript can derive a precise string-literal
// union type rather than widening to plain string[]
export const ALL_SPDX_IDS = rawIds as readonly string[];

// Union of every valid SPDX short identifier (e.g. "MIT", "Apache-2.0")
export type SpdxLicenseId = (typeof ALL_SPDX_IDS)[number];

// Curated subset of SPDX IDs most relevant to open-source scientific / comp-chem
// software, used to populate the predefined options in the submission form
export const COMMON_LICENSES = [
  "0BSD",
  "Apache-2.0",
  "AGPL-3.0-only",
  "AGPL-3.0-or-later",
  "BSD-2-Clause",
  "BSD-3-Clause",
  "CC-BY-4.0",
  "CC0-1.0",
  "GPL-2.0-only",
  "GPL-2.0-or-later",
  "GPL-3.0-only",
  "GPL-3.0-or-later",
  "LGPL-2.1-only",
  "LGPL-2.1-or-later",
  "LGPL-3.0-only",
  "LGPL-3.0-or-later",
  "MIT",
  "MPL-2.0",
] as const satisfies readonly SpdxLicenseId[];
