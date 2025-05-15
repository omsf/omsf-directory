<script lang="ts">
  import { type SoftwareSchema } from "../content.config.ts";
  import logo from "../assets/logo.svg";
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
      <div class="font-omsf-title mb-1 text-xl font-semibold">{name}</div>
      {#if project !== undefined}
        <img src={logo.src} class="justify-self-end w-10 h-8" alt="OMSF logo" />
      {/if}
    </div>
    <div class="font-regular font-omsf-subheading font-light mb-2 text-base">
      {license}
      {#if docs}• <a href={docs}>Docs</a>{/if} • <a href={link}>Website</a>
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
