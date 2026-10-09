import type { APIRoute, GetStaticPaths } from "astro";
import { categories, categoryMarkdown, markdownResponse } from "../../lib/llms";

export const getStaticPaths: GetStaticPaths = () =>
  categories.map((category) => ({
    params: { category: category.slug },
    props: { category },
  }));

export const GET: APIRoute = async ({ props }) =>
  markdownResponse(
    `# OMSF Directory — ${props.category.title}\n\n` +
      (await categoryMarkdown(props.category)),
  );
