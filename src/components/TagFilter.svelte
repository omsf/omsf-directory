<script lang="ts">
  import Card from "./Card.svelte";
  import Bubble from "./Bubble.svelte";
  import { type SoftwareSchema } from "../schemas";
  import FilterDialog from "./FilterDialog.svelte";

  interface Props {
    items: SoftwareSchema[];
    allTags: string[];
  }
  const { items, allTags }: Props = $props();
  const languageTags = [...new Set(items.flatMap((item) => item.languages))];
  const licenses = [...new Set(items.flatMap((item) => item.license))].filter(
    Boolean,
  );

  let selectedTags = $state(new Array<string>());
  let selectedLangs = $state(new Array<string>());
  let selectedLicenses = $state(new Array<string>());

  let showFilters = $state(false);
  let showLangs = $state(false);
  let showLicenses = $state(false);
  let omsfFilter = $state(false);

  const noClear = $derived(
    selectedTags.length === 0 &&
      selectedLangs.length === 0 &&
      selectedLicenses.length === 0 &&
      !omsfFilter,
  );

  const filteredSoftware = $derived.by(() => {
    let filteredItems = items;

    if (omsfFilter) {
      filteredItems = filteredItems.filter(
        (tool) => tool.project !== undefined,
      );
    }

    if (selectedTags.length > 0) {
      filteredItems = filteredItems.filter((tool) =>
        selectedTags.every((tag) => (tool.tags || []).includes(tag)),
      );
    }

    if (selectedLangs.length > 0) {
      filteredItems = filteredItems.filter((tool) =>
        selectedLangs.every((lang) => (tool.languages || []).includes(lang)),
      );
    }

    if (selectedLicenses.length > 0) {
      filteredItems = filteredItems.filter((tool) =>
        selectedLicenses.some((license) => tool.license === license),
      );
    }

    return filteredItems;
  });

  const clearTags = () => {
    selectedTags = [];
    selectedLangs = [];
    selectedLicenses = [];
    omsfFilter = false;
  };

  const toggleFilters = () => {
    showLangs = false;
    showLicenses = false;
    showFilters = !showFilters;
  };

  const toggleLangs = () => {
    showFilters = false;
    showLicenses = false;
    showLangs = !showLangs;
  };

  const toggleLicenses = () => {
    showFilters = false;
    showLangs = false;
    showLicenses = !showLicenses;
  };

  const toggleOmsfProjects = () => {
    omsfFilter = !omsfFilter;
  };

  function filterString(base: string, selection: string[]): string {
    let out: string = selection.length.toString();
    return `${base} (${out})`;
  }
</script>

<div class="container mx-auto px-2 sm:px-4">
  <div>
    <div class="my-4 flex flex-wrap justify-center gap-1.5 sm:gap-2 px-2">
      <Bubble
        tag={filterString("Filter", selectedTags)}
        onclick={toggleFilters}
      />
      <Bubble
        tag={filterString("Language", selectedLangs)}
        onclick={toggleLangs}
      />
      <Bubble
        tag={filterString("License", selectedLicenses)}
        onclick={toggleLicenses}
      />
      <Bubble
        tag="OMSF Projects"
        onclick={toggleOmsfProjects}
        selectionFunction={omsfFilter}
      ></Bubble>
      <Bubble tag="Clear" onclick={clearTags} disabled={noClear}></Bubble>
    </div>
    <FilterDialog bind:showFilters bind:selectedTags tags={allTags} />
    <FilterDialog
      bind:showFilters={showLangs}
      bind:selectedTags={selectedLangs}
      tags={languageTags}
    />
    <FilterDialog
      bind:showFilters={showLicenses}
      bind:selectedTags={selectedLicenses}
      tags={licenses}
    />
  </div>

  <div class="flex flex-wrap justify-center xs:p-12">
    {#each filteredSoftware as tool (tool.name)}
      <div class="pb-4 pl-4">
        <Card {...tool} />
      </div>
    {/each}
  </div>
</div>
