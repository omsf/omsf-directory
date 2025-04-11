<script lang="ts">
    import { onMount } from 'svelte';
    import { slide } from "svelte/transition";
    import Card from './Card.svelte'
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
    let {items, allTags}: Props = $props();

    let selectedTags = $state(new Array<string>());
    let isMobile = $state(false);
    let showFilters = $state(false);


    const filteredSoftware = $derived(
      selectedTags.length == 0
      ? items
      : items.filter(tool =>
        selectedTags.every(tag => (tool.tags || []).includes(tag)))
    )

    const toggleTag = (tag: string) => {
      console.log(tag);
      if (selectedTags.includes(tag)) {
        const index = selectedTags.indexOf(tag);
        selectedTags.splice(index, 1);
      } else {
        selectedTags.push(tag)
      }
    }

    const toggleFilters = () => {
      showFilters = !showFilters;
    }

    const checkScreenSize = () => {
      isMobile = window.innerWidth < 768;
    }

    onMount(() => {
      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);
      return () => {
        window.removeEventListener('resize', checkScreenSize);
      }
    })
</script>

<div class="tag-filter-and-grid">
    {#if isMobile}
        <div class="w-full">
            <button
                class="w-full flex justify-between items-center px-4 py-3 bg-gray-100 border border-gray-200 {showFilters ? 'rounded-t-md' : 'rounded-md'}"
            onclick={toggleFilters}
            >
            <span class="font-omsf-subheading">Filters ({selectedTags.length})</span>
            <svg
                class="w-4 h-4 transition-transform duration-300 {showFilters ? 'rotate-180' : ''}"
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
            <div class="bg-gray-50 rounded-b-md p-3 border-x border-b border-gray-200 -mt-px" transition:slide={{duration: 300}}>
                <div class="grid grid-cols-2 gap-2">
                    {#each allTags as tag}
                        <button onclick={() => toggleTag(tag)} class="px-3 py-2 rounded-full font-omsf-subheading text-sm transition-colors
                                                {selectedTags.includes(tag)
                                                    ? 'bg-omsf-base text-gray-800'
                                                    : 'bg-omsf-gray text-gray-800 hover:bg-omsf-base hover:border-solid'}">{tag}</button>
                    {/each}
                </div>
            </div>


        {/if}
    {:else}
        <div class="mx-8">
            <div class="flex justify-center my-4 flex-wrap gap-2">
                {#each allTags as tag}
                    <button onclick={() => toggleTag(tag)} class="px-3 py-1 rounded-full font-omsf-subheading text-sm transition-colors
                                            {selectedTags.includes(tag)
                                                ? 'bg-omsf-base text-gray-800'
                                                : 'bg-omsf-gray text-gray-800 hover:bg-omsf-base hover:border-solid'}">{tag}</button>
                {/each}
            </div>
        </div>

    {/if}

    <div class="software-grid flex flex-wrap p-12 justify-center">
        {#each filteredSoftware as tool (tool.name)}
            <div class="tool-card pl-4 pb-4">
                <Card {...tool}/>
            </div>

        {/each}
    </div>
</div>
