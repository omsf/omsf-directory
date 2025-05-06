<script lang="ts">
  import { type SoftwareSchema } from "../content.config.ts";
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
  class="w-2xs overflow-hidden rounded-lg shadow-lg lg:h-full lg:w-sm border-4 min-h-110 max-h-110 {project
    ? 'border-omsf-base'
    : 'border-transparent'}"
>
  <div class="px-6 py-4">
    <div class="grid grid-cols-2">
      <div class="font-omsf-title mb-1 text-xl font-semibold">{name}</div>
    </div>
    <div class="font-regular font-omsf-subheading font-light mb-2 text-base">
      {license} • <a href={docs}>Docs</a> • <a href={link}>Website</a>
    </div>
    <p class="font-omsf-descriptive text-base text-gray-700">
      {description}
    </p>
  </div>
  {#if project !== undefined}
    <div class="px-6">
      <span
        class="font-omsf-subheading bg-omsf-gray mr-2 mb-2 inline-block rounded-full px-3 py-1 text-sm text-gray-700 border-4 border-omsf-base"
        >{project}</span
      >
    </div>
  {/if}
  <div class="px-6 pt-4 pb-2">
    {#each tags as tag}
      <span
        class="font-omsf-subheading bg-omsf-gray mr-2 mb-2 inline-block rounded-full px-3 py-1 text-sm text-gray-700"
        >{tag}</span
      >
    {/each}
  </div>
</div>
