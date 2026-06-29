import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default {
  kit: {
    adapter: adapter({ pages: "dist", assets: "dist" }),
    files: {
      assets: "public",
    },
    alias: {
      "content-collections": "./.content-collections/generated",
    },
  },
  preprocess: vitePreprocess(),
};
