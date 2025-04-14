<script lang="ts">
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import Card from "./Card.svelte";
  interface Item {
    name: string;
    description: string;
    docs: string;
    tags: string[];
    license: string;
    link: string;
  }

  interface Props {
    items: Item[];
    allTags: string[];
  }
  const { items, allTags }: Props = $props();

  const selectedTags = $state(new Array<string>());
  let isMobile = $state(false);
  let showFilters = $state(false);

  const filteredSoftware = $derived(
    selectedTags.length === 0
      ? items
      : items.filter((tool) =>
          selectedTags.every((tag) => (tool.tags || []).includes(tag)),
        ),
  );

  const toggleTag = (tag: string) => {
    console.log(tag);
    if (selectedTags.includes(tag)) {
      const index = selectedTags.indexOf(tag);
      selectedTags.splice(index, 1);
    } else {
      selectedTags.push(tag);
    }
  };

  const toggleFilters = () => {
    showFilters = !showFilters;
  };

  const checkScreenSize = () => {
    isMobile = window.innerWidth < 768;
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
  <div class="w-50">
    <button
      class="flex w-full items-center justify-between border border-gray-200 bg-gray-100 px-4 py-3 {showFilters
        ? 'rounded-t-md'
        : 'rounded-md'}"
      onclick={toggleFilters}
    >
      <span class="font-omsf-subheading">Filters ({selectedTags.length})</span>
      <svg
        class="h-4 w-4 transition-transform duration-300 {showFilters
          ? 'rotate-180'
          : ''}"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
  </div>
  {#if showFilters}
    <div
      class="-mt-px rounded-b-md border-x border-b border-gray-200 bg-gray-50 p-3"
      transition:slide={{ duration: 300 }}
    >
      <div class="grid grid-cols-2 gap-2">
        {#each allTags as tag}
          <button
            onclick={() => toggleTag(tag)}
            class="font-omsf-subheading rounded-full px-3 py-2 text-sm transition-colors
                                                {selectedTags.includes(tag)
              ? 'bg-omsf-base text-gray-800'
              : 'bg-omsf-gray hover:bg-omsf-base text-gray-800 hover:border-solid'}"
            >{tag}</button
          >
        {/each}
      </div>
    </div>
  {/if}
  <div class="mx-8">
    <div class="my-4 flex flex-wrap justify-center gap-2">
      {#each allTags as tag}
        <button
          onclick={() => toggleTag(tag)}
          class="font-omsf-subheading rounded-full px-3 py-1 text-sm transition-colors
                                            {selectedTags.includes(tag)
            ? 'bg-omsf-base text-gray-800'
            : 'bg-omsf-gray hover:bg-omsf-base text-gray-800 hover:border-solid'}"
          >{tag}</button
        >
      {/each}
    </div>
  </div>

  <div class="software-grid flex flex-wrap justify-center p-12">
    {#each filteredSoftware as tool (tool.name)}
      <div class="tool-card pb-4 pl-4">
        <Card {...tool} />
      </div>
    {/each}
  </div>
</div>
