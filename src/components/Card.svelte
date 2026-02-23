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
  const SOFT_BREAK = "\u200b";
  const addTitleBreaks = (value: string): string =>
    value
      // Prefer technical boundaries first.
      .replace(/([._/-])/g, `$1${SOFT_BREAK}`)
      .replace(/([a-z0-9])([A-Z])/g, `$1${SOFT_BREAK}$2`)
      // Add safe break opportunities for long single-token titles.
      .replace(/([A-Za-z0-9]{12})(?=[A-Za-z0-9])/g, `$1${SOFT_BREAK}`);

  const languageCanonicalMap = new Map<string, string>(
    languageTags.map((language) => [language.toLowerCase(), language]),
  );
  // We create a state because we are abusing JS/TS when using this in the form.
  // We populate this with unparsable values by default by design in the form.
  let displayName = $derived(addTitleBreaks(name || ""));
  let allTags = $derived(
    buildDisplayTags(tags, languages, languageCanonicalMap),
  );
</script>

<div
  class="w-2xs overflow-hidden rounded-lg shadow-lg lg:h-full lg:w-sm border-2 border-omsf-gray min-h-120 max-h-120 flex flex-col"
>
  <div class="px-6 py-4 flex-1 min-h-0 overflow-hidden">
    <div
      class={`grid items-start ${project !== undefined ? "grid-cols-[1fr_auto] gap-x-2" : "grid-cols-1"}`}
    >
      <div
        class="font-omsf-title mb-1 lg:text-xl text-base font-semibold min-w-0 wrap-anywhere text-balance line-clamp-3 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden"
      >
        {displayName}
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
    <p class="font-omsf-descriptive text-base text-gray-700 line-clamp-6">
      {description}
    </p>
  </div>
  <div class="px-6 pt-2 pb-4 shrink-0 overflow-hidden">
    {#each allTags as tag (tag)}
      <span
        class="font-omsf-subheading bg-omsf-gray mr-2 mb-2 inline-block max-w-full rounded-full px-3 py-1 text-sm text-gray-700 break-words"
        >{tag}</span
      >
    {/each}
  </div>
</div>
