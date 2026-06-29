import { collectTags, loadWorkflows } from "$lib/server/content";

export async function load() {
  const items = await loadWorkflows();

  return {
    currentPage: "workflows",
    items,
    allTags: collectTags(items),
  };
}