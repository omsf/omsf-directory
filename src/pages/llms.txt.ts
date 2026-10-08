import type { APIRoute } from "astro";
import { categories, entrySkillUrl, markdownResponse } from "../lib/llms";

export const GET: APIRoute = ({ site, url }) => {
  const absoluteUrl = (path: string) => new URL(path, site ?? url).href;
  return markdownResponse(
    "# OMSF Directory\n\n" +
      "> A directory of software, workflows, and infrastructure for molecular science.\n\n" +
      "Use the category exports for focused queries or the full export for the entire catalogue. " +
      "Exports contain descriptions, repositories, documentation and website links when available, licenses, tags, languages, and project affiliations.\n\n" +
      "## Catalogue\n\n" +
      `- [Full catalogue](${absoluteUrl("/llms-full.txt")}): All categories and entries in one Markdown document.\n` +
      categories
        .map(
          (category) =>
            `- [${category.title}](${absoluteUrl(`/${category.slug}/llms.txt`)}): ${category.description}`,
        )
        .join("\n") +
      "\n\n## Optional\n\n" +
      `- [Add directory entry skill](${entrySkillUrl}): Repository agent instructions for researching, classifying, and adding or updating projects.\n` +
      `- [Entry schema](${absoluteUrl("/schema.json")}): JSON Schema for catalogue YAML entries.\n` +
      `- [Add an entry](${absoluteUrl("/new")}): Form for creating a catalogue entry.\n`,
  );
};
