import { collectTags, loadSoftware } from "$lib/server/content";

export async function load() {
  const items = await loadSoftware();

  return {
    currentPage: "software",
    items,
    allTags: collectTags(items),
  };
}