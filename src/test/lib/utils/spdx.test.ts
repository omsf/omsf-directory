import { expect, test } from "vitest";
import { ALL_SPDX_IDS, COMMON_LICENSES } from "../../../lib/spdx";
import { SoftwareSchemaObject } from "../../../schemas";

// Shape and content of the SPDX identifier list

test("ALL_SPDX_IDS is a non-empty array of strings", () => {
  expect(Array.isArray(ALL_SPDX_IDS)).toBe(true);
  expect(ALL_SPDX_IDS.length).toBeGreaterThan(0);
  expect(typeof ALL_SPDX_IDS[0]).toBe("string");
});

test("ALL_SPDX_IDS contains canonical well-known identifiers", () => {
  const required = [
    "MIT",
    "Apache-2.0",
    "BSD-3-Clause",
    "GPL-3.0-only",
    "0BSD",
  ];
  for (const id of required) {
    expect(ALL_SPDX_IDS).toContain(id);
  }
});

test("ALL_SPDX_IDS contains the LGPL variants used in the software catalogue", () => {
  expect(ALL_SPDX_IDS).toContain("LGPL-2.1-only");
  expect(ALL_SPDX_IDS).toContain("LGPL-2.1-or-later");
  expect(ALL_SPDX_IDS).toContain("LGPL-3.0-or-later");
});

// COMMON_LICENSES is a valid, self-consistent subset

test("every entry in COMMON_LICENSES is a valid SPDX identifier", () => {
  for (const id of COMMON_LICENSES) {
    expect(ALL_SPDX_IDS).toContain(id);
  }
});

test("COMMON_LICENSES contains no duplicates", () => {
  const unique = new Set(COMMON_LICENSES);
  expect(unique.size).toBe(COMMON_LICENSES.length);
});

// Zod schema validation via SoftwareSchemaObject

const baseEntry = {
  name: "TestSoftware",
  description: "A test package",
  repository: "https://github.com/test/test",
  tags: ["Test"],
  languages: ["Python"],
};

test("schema accepts a valid SPDX identifier in licenses", () => {
  const result = SoftwareSchemaObject.safeParse({
    ...baseEntry,
    licenses: ["MIT"],
  });
  expect(result.success).toBe(true);
});

test("schema accepts a LicenseRef- prefixed custom identifier", () => {
  const result = SoftwareSchemaObject.safeParse({
    ...baseEntry,
    licenses: ["LicenseRef-Proprietary"],
  });
  expect(result.success).toBe(true);
});

test("schema accepts multiple mixed valid licenses", () => {
  const result = SoftwareSchemaObject.safeParse({
    ...baseEntry,
    licenses: ["MIT", "LGPL-2.1-or-later", "LicenseRef-Proprietary"],
  });
  expect(result.success).toBe(true);
});

test("schema accepts 'Proprietary' and skips SPDX validation for the whole array", () => {
  const result = SoftwareSchemaObject.safeParse({
    ...baseEntry,
    licenses: ["Proprietary", "University of Illinois/NCSA Open Source"],
  });
  expect(result.success).toBe(true);
});

test("schema accepts 'Non-AI' and skips SPDX validation for the whole array", () => {
  const result = SoftwareSchemaObject.safeParse({
    ...baseEntry,
    licenses: ["BSD-3-Clause", "Non-AI"],
  });
  expect(result.success).toBe(true);
});

test("schema rejects an arbitrary non-SPDX string when 'Proprietary' is absent", () => {
  const result = SoftwareSchemaObject.safeParse({
    ...baseEntry,
    licenses: ["not-a-real-license"],
  });
  expect(result.success).toBe(false);
});

test("schema rejects a bare abbreviated license like 'LGPL'", () => {
  const result = SoftwareSchemaObject.safeParse({
    ...baseEntry,
    licenses: ["LGPL"],
  });
  expect(result.success).toBe(false);
});

test("schema rejects an empty licenses array", () => {
  const result = SoftwareSchemaObject.safeParse({
    ...baseEntry,
    licenses: [],
  });
  expect(result.success).toBe(false);
});

test("schema rejects a non-SPDX string even when mixed with valid entries", () => {
  const result = SoftwareSchemaObject.safeParse({
    ...baseEntry,
    licenses: ["MIT", "not-a-real-license"],
  });
  expect(result.success).toBe(false);
});
