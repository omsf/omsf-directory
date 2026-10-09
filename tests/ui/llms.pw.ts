import { readdir } from "node:fs/promises";
import { expect, test } from "@playwright/test";

const entrySkillUrl =
  "https://raw.githubusercontent.com/omsf/omsf-directory/main/.agents/skills/add-directory-entry/SKILL.md";

async function entryCount(directory: string): Promise<number> {
  const files = await readdir(directory);
  return files.filter((file) => /\.ya?ml$/.test(file)).length;
}

test("LLM index links to working exports and supporting routes", async ({
  request,
}) => {
  const response = await request.get("/llms.txt");
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("text/plain");
  const index = await response.text();
  expect(index).toMatch(/^# OMSF Directory\n\n> /);

  const links = [...index.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map(
    ([, link]) => link,
  );
  expect(index).toContain(`[Add directory entry skill](${entrySkillUrl})`);
  const paths = links
    .filter((link) => link !== entrySkillUrl)
    .map((link) => {
      const url = new URL(link);
      expect(url.origin).toBe("https://directory.omsf.io");
      return url.pathname;
    });
  expect(links).toHaveLength(paths.length + 1);
  expect(paths).toEqual([
    "/llms-full.txt",
    "/software/llms.txt",
    "/workflows/llms.txt",
    "/infrastructure/llms.txt",
    "/schema.json",
    "/new",
  ]);
  for (const path of paths) {
    const linked = await request.get(path);
    expect(linked.ok(), path).toBe(true);
    if (path.endsWith(".txt")) {
      expect(linked.headers()["content-type"]).toContain("text/plain");
      expect(await linked.text()).toMatch(/^# OMSF Directory/);
    }
  }
});

test("full export includes every category and all workflow collections", async ({
  request,
}) => {
  const fullResponse = await request.get("/llms-full.txt");
  expect(fullResponse.ok()).toBe(true);
  const full = await fullResponse.text();
  expect(full).toContain(`[Add directory entry skill](${entrySkillUrl})`);
  expect([...full.matchAll(/^## (.+)$/gm)].map((match) => match[1])).toEqual([
    "Software",
    "Workflows",
    "Infrastructure",
  ]);

  const workflowProjects = [
    ["openff", "Open Force Field"],
    ["openfe", "Open Free Energy"],
    ["openadmet", "OpenADMET"],
  ];
  let workflowCount = await entryCount("workflows");
  for (const [directory, project] of workflowProjects) {
    const count = await entryCount(`workflows/${directory}`);
    workflowCount += count;
    expect(
      full
        .split("## Workflows\n")[1]
        .split("## Infrastructure\n")[0]
        .split(`- **Project:** ${project}\n`).length - 1,
      project,
    ).toBeGreaterThanOrEqual(count);
  }

  const counts = {
    software: await entryCount("software"),
    workflows: workflowCount,
    infrastructure: await entryCount("infrastructure"),
  };
  for (const [category, count] of Object.entries(counts)) {
    const response = await request.get(`/${category}/llms.txt`);
    expect(response.ok()).toBe(true);
    const text = await response.text();
    const section = text.slice(text.indexOf("## "));
    expect(full).toContain(section);
    expect([...text.matchAll(/^### /gm)], category).toHaveLength(count);
    for (const field of ["Repository", "Licenses", "Tags", "Languages"]) {
      expect(
        [...text.matchAll(new RegExp(`^- \\*\\*${field}:\\*\\* `, "gm"))],
        `${category}: ${field}`,
      ).toHaveLength(count);
    }
  }
  expect([...full.matchAll(/^### /gm)]).toHaveLength(
    Object.values(counts).reduce((sum, count) => sum + count, 0),
  );
  expect(full).toContain("LicenseRef-NCSA");
  expect(full).toContain("LicenseRef-BSD-3-Clause-NonAI");
  expect(full).toContain("- **Docs:**");
  expect(full).toContain("- **Link:**");
});
