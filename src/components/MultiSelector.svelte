<script lang="ts">
import Bubble from './Bubble.svelte'

interface Props {
	value: string[]
	list: string[]
	name: string
	required?: boolean
	description?: string
	placeholder?: string
	addButtonText?: string
	predefinedSectionTitle?: string
	customSectionTitle?: string
	allowCustom?: boolean
	maxHeight?: string
}

let {
	value = $bindable(),
	list,
	name,
	required = false,
	description,
	placeholder = 'Enter custom item...',
	addButtonText = 'Add',
	predefinedSectionTitle = `Select from predefined ${name.toLowerCase()}:`,
	customSectionTitle = `Add custom ${name.toLowerCase().slice(0, -1)}:`,
	allowCustom = true,
	maxHeight = '10rem'
}: Props = $props()

const lowerName = name.toLowerCase()
let customInput = $state('')

function togglePredefinedItem(item: string) {
	if (value.includes(item)) {
		value = value.filter((v) => v !== item)
	} else {
		value = [...value, item]
	}
}

function addCustomItem() {
	const trimmed = customInput.trim()
	if (trimmed && !value.includes(trimmed) && !list.includes(trimmed)) {
		value = [...value, trimmed]
		customInput = ''
	}
}

function removeItem(item: string) {
	value = value.filter((v) => v !== item)
}

// Separate predefined and custom items for display
let selectedPredefined = $derived(value.filter((v) => list.includes(v)))
let selectedCustom = $derived(value.filter((v) => !list.includes(v)))
</script>

<div class="mb-6">
  <label for={lowerName} class="block mb-2 font-omsf-subheading">
    {name}
    {#if required}*{/if}
  </label>

  <!-- Predefined Items Section -->
  <div class="mb-4">
    <h4 class="text-sm font-medium text-gray-700 mb-2">
      {predefinedSectionTitle}
    </h4>
    <div
      class="border border-gray-300 rounded-md p-3 space-y-2 overflow-y-auto"
      style="max-height: {maxHeight}"
    >
      {#each list as item}
        <label
          class="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
        >
          <input
            type="checkbox"
            checked={value.includes(item)}
            onchange={() => togglePredefinedItem(item)}
            class="h-4 w-4 text-omsf-base focus:ring-omsf-base border-gray-300 rounded"
          />
          <span class="text-sm font-omsf-subheading">{item}</span>
        </label>
      {/each}
    </div>
  </div>

  <!-- Custom Item Input Section -->
  {#if allowCustom}
    <div class="mb-4">
      <h4 class="text-sm font-medium text-gray-700 mb-2">{customSectionTitle}</h4>
      <div class="flex gap-2">
        <input
          type="text"
          bind:value={customInput}
          {placeholder}
          class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-omsf-base focus:border-omsf-base"
          onkeydown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addCustomItem();
            }
          }}
        />
        <Bubble onclick={addCustomItem} disabled={!customInput.trim()}
          >{addButtonText}</Bubble
        >
      </div>
    </div>
  {/if}

  <!-- Selected Items Display -->
  {#if value.length > 0}
    <div class="mt-2 flex flex-wrap gap-1">
      <!-- All selected items use the same green color scheme -->
      {#each value as selected}
        <span
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
        >
          {selected}
          <button
            type="button"
            onclick={() => removeItem(selected)}
            class="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-400 hover:bg-green-200 hover:text-green-600 focus:outline-none"
          >
            ×
          </button>
        </span>
      {/each}
    </div>
  {/if}

  {#if description}
    <p class="mt-1 text-sm text-gray-500 font-omsf-descriptive">
      {description}
    </p>
  {/if}
</div>
