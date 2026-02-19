<script lang="ts">
  import { buildDisplayTags } from "../lib/utils/tagNormalization";
  import { languageTags, type SoftwareSchema } from "../schemas";
  import Logo from "./Logo.svg.svelte";

  const {
    name = "",
    description = "",
    docs = "",
    licenses = [],
    tags = [],
    link = "",
    project = undefined,
    languages = [],
    repository = "",
  }: Partial<SoftwareSchema> = $props();
  const languageCanonicalMap = new Map<string, string>(
    languageTags.map((language) => [language.toLowerCase(), language]),
  );
  // We create a state because we are abusing JS/TS when using this in the form.
  // We populate this with unparsable values by default by design in the form.
  let allTags = $derived(
    buildDisplayTags(tags, languages, languageCanonicalMap),
  );
</script>

<div
  class="w-2xs overflow-hidden rounded-lg shadow-lg lg:h-full lg:w-sm border-2 border-omsf-gray min-h-120 max-h-120"
>
  <div class="px-6 py-4">
    <div
      class={`grid items-start ${project !== undefined ? "grid-cols-[1fr_auto] gap-x-2" : "grid-cols-1"}`}
    >
      <div
        class="font-omsf-title mb-1 lg:text-xl text-base font-semibold min-w-0 wrap-anywhere text-balance line-clamp-3 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden"
      >
        {name}
      </div>
      {#if project !== undefined}
        <Logo />
      {/if}
    </div>
    <div
      class="font-regular font-omsf-subheading font-light lg:text-base text-sm"
    >
      {#if repository}<a href={repository} class="underline">Repo</a>{/if}
      {#if repository && docs}
        •
      {/if}
      {#if docs}<a href={docs} class="underline">Docs</a>{/if}
      {#if (repository || docs) && link}
        •
      {/if}
      {#if link}<a href={link} class="underline">Website</a>{/if}
    </div>
    <div class="font-regular font-omsf-subheading font-extralight mb-2 text-sm">
      Licenses: {#each licenses as license, index (license)}
        {#if index > 0}
          •
        {/if}
        {license.concat([" "])}
      {/each}
    </div>
    <p class="font-omsf-descriptive text-base text-gray-700">
      {description}
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    {#each allTags as tag (tag)}
      <span
        class="font-omsf-subheading bg-omsf-gray mr-2 mb-2 inline-block rounded-full px-3 py-1 text-sm text-gray-700"
        >{tag}</span
      >
    {/each}
  </div>
</div>
