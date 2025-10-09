import { expect, test } from "vitest";
import { isValid, renderYaml } from "../../../lib/utils/yamlRender.svelte";
import type { SoftwareSchema } from "../../../schemas";

test("empty form", () => {
  const formData: SoftwareSchema = {
    name: "",
    description: "",
    licenses: [],
    tags: [],
    docs: undefined,
    languages: [],
    project: undefined,
    link: undefined,
    repository: "",
  };
  const out = renderYaml(formData);
  const expected = "name: \ndescription: \nrepository: \nlanguages:\n\n";
  expect(out).toEqual(expected);
});

test("minimum defined form", () => {
  const formData: SoftwareSchema = {
    name: "OpenAwesome",
    description: "An awesome comp chem tool",
    licenses: [],
    tags: [],
    docs: undefined,
    link: undefined,
    languages: ["Python", "C++"],
    project: undefined,
    repository: "https://github.com/test/test",
  };
  const out = renderYaml(formData);
  const expected = `name: OpenAwesome
description: "An awesome comp chem tool"
repository: https://github.com/test/test
languages:\n  - Python\n  - C++\n`;
  expect(out).toEqual(expected);
});

test("complete form", () => {
  const formData: SoftwareSchema = {
    name: "OpenAwesome",
    description: "An awesome comp chem tool",
    licenses: ["MIT", "BSD-3"],
    tags: ["1", "2", "3"],
    docs: "https://docs.org",
    link: "https://project.org",
    languages: ["Python", "C++"],
    project: "Open Free Energy",
    repository: "https://github.com/test/test",
  };
  const out = renderYaml(formData);
  const expected = `name: OpenAwesome
description: "An awesome comp chem tool"
repository: https://github.com/test/test
languages:\n  - Python\n  - C++
link: https://project.org
docs: https://docs.org
licenses:\n  - MIT\n  - BSD-3
tags:\n  - 1\n  - 2\n  - 3\n`;
  expect(out).toEqual(expected);
});

test("empty invalid form", () => {
  const formData: SoftwareSchema = {
    name: "OpenAwesome",
    description: "An awesome comp chem tool",
    licenses: [],
    tags: [],
    docs: undefined,
    link: undefined,
    languages: ["Python", "C++"],
    project: undefined,
    repository: "https://github.com/test/test",
  };
  const out = isValid(formData);
  expect(out).toBe(false);
});

test("valid complete form", () => {
  const formData: SoftwareSchema = {
    name: "OpenAwesome",
    description: "An awesome comp chem tool",
    licenses: ["MIT", "BSD-3"],
    tags: ["1", "2", "3"],
    docs: "https://docs.org",
    link: "https://project.org",
    languages: ["Python", "C++"],
    project: undefined,
    repository: "https://github.com/test/test",
  };
  const out = isValid(formData);
  expect(out).toBe(true);
});

test("partially valid form", () => {
  const formData: SoftwareSchema = {
    name: "OpenAwesome",
    description: "An awesome comp chem tool",
    licenses: ["MIT"],
    tags: ["1", "2"],
    docs: undefined,
    link: undefined,
    languages: ["Python"],
    project: undefined,
    repository: "https://github.com/test/test",
  };
  const out = isValid(formData);
  expect(out).toBe(true);
});
