import contentCollections from "@content-collections/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    contentCollections({ isEnabled: (config) => config.mode !== "test" }),
    sveltekit(),
  ],
});
