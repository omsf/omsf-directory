<script lang="ts">
  import { type SoftwareSchema } from "../content.config.ts";
  import Logo from "./logo.svg.svelte";
  const {
    name,
    description,
    docs,
    license,
    tags,
    link,
    project,
  }: SoftwareSchema = $props();
</script>

<div
  class="w-2xs overflow-hidden rounded-lg shadow-lg lg:h-full lg:w-sm border-2 border-omsf-gray min-h-110 max-h-110"
>
  <div class="px-6 py-4">
    <div class="grid grid-cols-2">
      <div class="font-omsf-title mb-1 text-xl font-semibold lg:min-w-70">
        {name}
      </div>
      {#if project !== undefined}
        <Logo />
      {/if}
    </div>
    <div class="font-regular font-omsf-subheading font-light text-base">
      {#if docs}<a href={docs} class="underline">Docs</a> •
      {/if}
      <a href={link} class="underline">Website</a>
    </div>
    <div class="font-regular font-omsf-subheading font-extralight mb-2 text-sm">
      License: {license}
    </div>
    <p class="font-omsf-descriptive text-base text-gray-700">
      {description}
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    {#each tags as tag}
      <span
        class="font-omsf-subheading bg-omsf-gray mr-2 mb-2 inline-block rounded-full px-3 py-1 text-sm text-gray-700"
        >{tag}</span
      >
    {/each}
  </div>
</div>
