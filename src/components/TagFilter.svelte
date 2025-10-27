<script lang="ts">
  import { onMount } from "svelte";
  import { SvelteURLSearchParams } from "svelte/reactivity";
  import { type SoftwareSchema } from "../schemas";
  import Bubble from "./Bubble.svelte";
  import Card from "./Card.svelte";
  import FilterDialog from "./FilterDialog.svelte";

  interface Props {
    items: SoftwareSchema[];
    allTags: string[];
  }
  const { items, allTags }: Props = $props();
  const languageTags = [...new Set(items.flatMap((item) => item.languages))];
  const licenses = [...new Set(items.flatMap((item) => item.licenses))].filter(
    Boolean,
  );
  // We filter out the "empty" project.
  const projects = [...new Set(items.flatMap((item) => item.project))].filter(
    (project) => project,
  );
  const params = new SvelteURLSearchParams(window.location.search);

  let selectedTags = $state([] as string[]);
  let selectedLangs = $state([] as string[]);
  let selectedLicenses = $state([] as string[]);
  let selectedProjects = $state([] as string[]);

  let showFilters = $state(false);
  let showLangs = $state(false);
  let showLicenses = $state(false);
  let showProjects = $state(false);
  let omsfFilter = $state(false);

  // URL state management
  const getURLParams = () => {
    if (typeof window === "undefined") return;
    return {
      tags: params.get("tags")?.split(",").filter(Boolean) || [],
      langs: params.get("langs")?.split(",").filter(Boolean) || [],
      licenses: params.get("licenses")?.split(",").filter(Boolean) || [],
      projects: params.get("projects")?.split(",").filter(Boolean) || [],
      omsf: params.get("omsf") === "true",
    };
  };

  const updateURL = () => {
    if (typeof window === "undefined") return;

    if (selectedTags.length > 0) params.set("tags", selectedTags.join(","));
    if (selectedLangs.length > 0) params.set("langs", selectedLangs.join(","));
    if (selectedLicenses.length > 0)
      params.set("licenses", selectedLicenses.join(","));
    if (selectedProjects.length > 0)
      params.set("projects", selectedProjects.join(","));
    if (omsfFilter) params.set("omsf", "true");

    const newURL = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState({}, "", newURL);
  };

  // Initialize from URL params on mount
  onMount(() => {
    const urlParams = getURLParams();
    if (urlParams) {
      selectedTags = urlParams.tags;
      selectedLangs = urlParams.langs;
      selectedLicenses = urlParams.licenses;
      selectedProjects = urlParams.projects;
      omsfFilter = urlParams.omsf;
    }
  });

  // Update URL whenever filter state changes
  $effect(() => {
    updateURL();
  });

  const noClear = $derived(
    selectedTags.length === 0 &&
      selectedLangs.length === 0 &&
      selectedLicenses.length === 0 &&
      selectedProjects.length === 0 &&
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
        selectedLicenses.some((license) =>
          (tool.licenses || []).includes(license),
        ),
      );
    }

    if (selectedProjects.length > 0) {
      filteredItems = filteredItems.filter((tool) =>
        selectedProjects.some((project) => {
          return tool.project === project;
        }),
      );
    }

    return filteredItems;
  });

  const clearTags = () => {
    selectedTags = [];
    selectedLangs = [];
    selectedLicenses = [];
    selectedProjects = [];
    omsfFilter = false;
  };

  const toggleFilters = () => {
    showLangs = false;
    showLicenses = false;
    showProjects = false;
    showFilters = !showFilters;
  };

  const toggleLangs = () => {
    showFilters = false;
    showLicenses = false;
    showProjects = false;
    showLangs = !showLangs;
  };

  const toggleLicenses = () => {
    showFilters = false;
    showLangs = false;
    showProjects = false;
    showLicenses = !showLicenses;
  };

  const toggleProjects = () => {
    showFilters = false;
    showLangs = false;
    showLicenses = false;
    showProjects = !showProjects;
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
      <Bubble onclick={toggleFilters}
        >{filterString("Filters", selectedTags)}</Bubble
      >
      <Bubble onclick={toggleLangs}
        >{filterString("Language", selectedLangs)}</Bubble
      >
      <Bubble onclick={toggleLicenses}
        >{filterString("License", selectedLicenses)}</Bubble
      >
      <Bubble onclick={toggleProjects}
        >{filterString("Project", selectedProjects)}</Bubble
      >
      <Bubble onclick={toggleOmsfProjects} selectionFunction={omsfFilter}
        >OMSF Projects</Bubble
      >
      <Bubble onclick={clearTags} disabled={noClear}>Clear</Bubble>
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
    <FilterDialog
      bind:showFilters={showProjects}
      bind:selectedTags={selectedProjects}
      tags={projects}
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
