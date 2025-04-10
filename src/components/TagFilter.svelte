<script lang="ts">
    import Card from './Card.svelte'
    interface Item {
      name: string;
      description: string;
      docs: string;
      tags: string[];
      license: string;
    }

    interface Props {
      items: Item[];
      allTags: string[];
    }
    let {items, allTags}: Props = $props();

    let selectedTags = $state(new Array<string>());


    const filteredSoftware = $derived(
      selectedTags.length == 0
      ? items
      : items.filter(tool =>
        selectedTags.every(tag => (tool.tags || []).includes(tag)))
    )

    const selectedTagsDisplay = $derived(
      Array.from(selectedTags).length > 0
      ? Array.from(selectedTags).join(', ')
      : 'None'
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
</script>

<div class="tag-filter-and-grid">
    <div class="tag-filter">
        <div class="flex justify-center my-4 flex-wrap gap-2">
            {#each allTags as tag}
                <button onclick={() => toggleTag(tag)} class="px-3 py-1 rounded-full font-omsf-subheading text-sm transition-colors
                                        {selectedTags.includes(tag)
                                            ? 'bg-omsf-base text-gray-800'
                                            : 'bg-omsf-gray text-gray-800 border border-transparent hover:bg-omsf-base hover:border-solid hover:border hover:border-omsf-tertiary-green'}">{tag}</button>
            {/each}
        </div>
        <!-- <div class="flex justify-center mb-4">
            <p class="text-sm text-gray-600">
                Selected Tags: {selectedTagsDisplay}
            </p>
        </div> -->
    </div>

    <div class="software-grid flex flex-wrap p-12 justify-center">
        {#each filteredSoftware as tool (tool.name)}
            <div class="tool-card pl-4 pb-4">
                <Card
                    name={tool.name}
                    description={tool.description}
                    docs={tool.docs}
                    tags={tool.tags}
                    license={tool.license}
                />
            </div>
        {/each}
    </div>
</div>
