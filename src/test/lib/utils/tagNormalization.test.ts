import { expect, test } from "vitest";
import {
  buildDisplayTags,
  dedupeCaseInsensitive,
  normalizeFormArrays,
} from "../../../lib/utils/tagNormalization";
import { type SoftwareSchema } from "../../../schemas";

const languageCanonicalMap = new Map<string, string>([
  ["python", "Python"],
  ["c++", "C++"],
]);

test("dedupeCaseInsensitive deduplicates with canonical language casing", () => {
  const out = dedupeCaseInsensitive(["Python", "python"], languageCanonicalMap);
  expect(out).toEqual(["Python"]);
});

test("dedupeCaseInsensitive preserves first casing for non-language values", () => {
  const out = dedupeCaseInsensitive(["ML", "ml", "ML"], languageCanonicalMap);
  expect(out).toEqual(["ML"]);
});

test("buildDisplayTags deduplicates case-insensitive tag/language overlap", () => {
  const out = buildDisplayTags(["Python"], ["python"], languageCanonicalMap);
  expect(out).toEqual(["Python"]);
});

test('buildDisplayTags excludes "Other" language entries', () => {
  const out = buildDisplayTags(["ML"], ["Other", "python"], languageCanonicalMap);
  expect(out).toEqual(["ML", "Python"]);
});

test("normalizeFormArrays keeps cross-field overlap and dedups within fields", () => {
  const formData: SoftwareSchema = {
    name: "OpenAwesome",
    description: "An awesome comp chem tool",
    licenses: ["MIT", "mit", "BSD-3"],
    tags: ["Python", "python", "ML", "ml"],
    docs: "https://docs.org",
    link: "https://project.org",
    languages: ["python", "Python"],
    project: "Open Free Energy",
    repository: "https://github.com/test/test",
  };

  const out = normalizeFormArrays(formData, languageCanonicalMap);

  expect(out.tags).toEqual(["Python", "ML"]);
  expect(out.languages).toEqual(["Python"]);
  expect(out.licenses).toEqual(["MIT", "BSD-3"]);
});
