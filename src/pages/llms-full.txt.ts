import type { APIRoute } from "astro";
import {
  categories,
  categoryMarkdown,
  entrySkillUrl,
  markdownResponse,
} from "../lib/llms";

export const GET: APIRoute = async () => {
  const sections = await Promise.all(categories.map(categoryMarkdown));
  return markdownResponse(
    "# OMSF Directory\n\n" +
      "> A directory of software, workflows, and infrastructure for molecular science.\n\n" +
      `Agents adding or updating projects should follow the [Add directory entry skill](${entrySkillUrl}) in the repository.\n\n` +
      sections.join("\n"),
  );
};
