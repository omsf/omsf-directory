<script lang="ts">
import { onMount } from 'svelte'
import { slide } from 'svelte/transition'
import { filterToggle, isMobileWidth } from '../lib/utils/filterUtils'
import Bubble from './Bubble.svelte'

interface Props {
	showFilters: boolean
	tags: string[]
	selectedTags: string[]
}
let { showFilters = $bindable(), tags, selectedTags = $bindable() }: Props = $props()
let isMobile = $state(false)
const slideDuration = 150

// We do this for easier management _and_ testing
const checkScreenSize = () => {
	isMobile = isMobileWidth(window.innerWidth)
}

onMount(() => {
	checkScreenSize()
	window.addEventListener('resize', checkScreenSize)
	return () => {
		window.removeEventListener('resize', checkScreenSize)
	}
})
</script>

{#if showFilters}
  {#if isMobile}
    <div
      class="-mt-px rounded-b-md border-x border-b border-gray-200 bg-gray-50 p-3"
    >
      <div
        class="grid grid-cols-2 gap-2"
        transition:slide|global={{ duration: slideDuration }}
      >
        {#each tags as tag (tag)}
          <Bubble
            onclick={() => filterToggle(tag, selectedTags)}
            selectionFunction={selectedTags.includes(tag)}>{tag}</Bubble
          >
        {/each}
      </div>
    </div>
  {:else}
    <div
      class="my-4 md:mx-20 lg:mx-70 flex flex-wrap justify-center gap-2"
      transition:slide|global={{ duration: slideDuration }}
    >
      {#each tags as tag (tag)}
        <Bubble
          onclick={() => filterToggle(tag, selectedTags)}
          selectionFunction={selectedTags.includes(tag)}>{tag}</Bubble
        >
      {/each}
    </div>
  {/if}
{/if}
