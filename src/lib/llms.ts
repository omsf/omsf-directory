import { getCollection } from "astro:content";
import type { SoftwareSchema } from "../schemas";

export const entrySkillUrl =
  "https://raw.githubusercontent.com/omsf/omsf-directory/main/.agents/skills/add-directory-entry/SKILL.md";

export const categories = [
  {
    slug: "software",
    title: "Software",
    description: "Molecular science software, libraries, and tools.",
  },
  {
    slug: "workflows",
    title: "Workflows",
    description:
      "Tutorials, examples, and workflows, including Open Force Field, Open Free Energy, and OpenADMET.",
  },
  {
    slug: "infrastructure",
    title: "Infrastructure",
    description:
      "Cloud infrastructure, development environments, CI/CD, and ecosystem tooling.",
  },
] as const;

type Category = (typeof categories)[number];

export async function categoryMarkdown(category: Category): Promise<string> {
  let items: SoftwareSchema[];
  if (category.slug === "workflows") {
    const [general, openff, openfe, openadmet] = await Promise.all([
      getCollection("workflows"),
      getCollection("openffWorkflows"),
      getCollection("openfeWorkflows"),
      getCollection("openadmetWorkflows"),
    ]);
    items = [
      ...general.map((item) => item.data),
      ...openff.map((item) => ({ ...item.data, project: "Open Force Field" })),
      ...openfe.map((item) => ({ ...item.data, project: "Open Free Energy" })),
      ...openadmet.map((item) => ({ ...item.data, project: "OpenADMET" })),
    ];
  } else {
    items = (await getCollection(category.slug)).map((item) => item.data);
  }

  items.sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
  );

  return (
    `## ${category.title}\n\n${category.description}\n\n` +
    items
      .map((item) => {
        const lines = [
          `### ${item.name}`,
          "",
          item.description.trim(),
          "",
          `- **Repository:** <${item.repository}>`,
        ];
        if (item.docs) lines.push(`- **Docs:** <${item.docs}>`);
        if (item.link) lines.push(`- **Link:** <${item.link}>`);
        lines.push(
          `- **Licenses:** ${item.licenses.join(", ")}`,
          `- **Tags:** ${item.tags.join(", ")}`,
          `- **Languages:** ${item.languages.join(", ")}`,
        );
        if (item.project) lines.push(`- **Project:** ${item.project}`);
        return lines.join("\n");
      })
      .join("\n\n") +
    "\n"
  );
}

export function markdownResponse(markdown: string): Response {
  return new Response(markdown, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
