<script lang="ts">
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import Card from "./Card.svelte";
  import Bubble from "./Bubble.svelte";
  import { type SoftwareSchema } from "../content.config.ts";

  interface Props {
    items: SoftwareSchema[];
    allTags: string[];
  }
  const { items, allTags }: Props = $props();
  const slideDuration = 150;

  let selectedTags = $state(new Array<string>());
  let isMobile = $state(false);
  let showFilters = $state(false);
  let omsfFilter = $state(false);

  const noClear = $derived(selectedTags.length === 0 && !omsfFilter);

  // const filteredSoftware = $derived(
  //   selectedTags.length === 0
  //     ? items
  //     : items.filter((tool) =>
  //         selectedTags.every((tag) => (tool.tags || []).includes(tag)),
  //       ),
  // );
  const filteredSoftware = $derived(
    selectedTags.length === 0
      ? omsfFilter
        ? items.filter((tool) => tool.project !== undefined)
        : items
      : items.filter((tool) =>
          selectedTags.every((tag) => (tool.tags || []).includes(tag)),
        ),
  );

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      const index = selectedTags.indexOf(tag);
      selectedTags.splice(index, 1);
    } else {
      selectedTags.push(tag);
    }
  };

  const clearTags = () => {
    selectedTags = [];
    omsfFilter = false;
  };

  const toggleFilters = () => {
    showFilters = !showFilters;
  };

  const toggleOmsfProjects = () => {
    omsfFilter = !omsfFilter;
  };

  const checkScreenSize = () => {
    isMobile = window.innerWidth < 768;
  };

  const filtersString = () => {
    let out: string = selectedTags.length.toString();
    return "Filters (" + out + ")";
  };

  onMount(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  });
</script>

<div class="tag-filter-and-grid">
  <div>
    <div class="my-4 justify-center flex gap-2">
      <Bubble tag={filtersString()} onclick={toggleFilters}></Bubble>
      <Bubble
        tag="OMSF Projects"
        onclick={toggleOmsfProjects}
        selectionFunction={omsfFilter}
      ></Bubble>
      <Bubble tag="Clear" onclick={clearTags} disabled={noClear}></Bubble>
    </div>
    {#if showFilters}
      {#if isMobile}
        <div
          class="-mt-px rounded-b-md border-x border-b border-gray-200 bg-gray-50 p-3"
        >
          <div
            class="grid grid-cols-2 gap-2"
            transition:slide|global={{ duration: slideDuration }}
          >
            {#each allTags as tag}
              <Bubble
                onclick={() => toggleTag(tag)}
                selectionFunction={selectedTags.includes(tag)}
                {tag}
              ></Bubble>
            {/each}
          </div>
        </div>
      {:else}
        <div
          class="my-4 md:mx-20 lg:mx-70 flex flex-wrap justify-center gap-2"
          transition:slide|global={{ duration: slideDuration }}
        >
          {#each allTags as tag}
            <Bubble
              onclick={() => toggleTag(tag)}
              selectionFunction={selectedTags.includes(tag)}
              {tag}
            ></Bubble>
          {/each}
        </div>
      {/if}
    {/if}
  </div>

  <div class="software-grid flex flex-wrap justify-center p-12">
    {#each filteredSoftware as tool (tool.name)}
      <div class="tool-card pb-4 pl-4">
        <Card {...tool} />
      </div>
    {/each}
  </div>
</div>
