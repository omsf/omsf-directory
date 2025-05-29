<script lang="ts">
import Bubble from './Bubble.svelte'

interface Props {
	value: string[]
	list: string[]
	name: string
	required?: boolean
	description?: string
}
let { value = $bindable(), list, name, required = false, description }: Props = $props()

const lowerName = name.toLowerCase()
let customLanguageInput = $state('')

function togglePredefinedLanguage(item: string) {
	if (value.includes(item)) {
		value = value.filter((v) => v !== item)
	} else {
		value = [...value, item]
	}
}

function addCustomLanguage() {
	const trimmed = customLanguageInput.trim()
	if (trimmed && !value.includes(trimmed) && !list.includes(trimmed)) {
		value = [...value, trimmed]
		customLanguageInput = ''
	}
}

function removeLanguage(lang: string) {
	value = value.filter((v) => v !== lang)
}

// Separate predefined and custom languages for display
let selectedPredefined = $derived(value.filter((v) => list.includes(v)))
let selectedCustom = $derived(value.filter((v) => !list.includes(v)))
</script>

<div class="mb-6">
  <label for={lowerName} class="block mb-2 font-omsf-subheading">
    {name}
    {#if required}*{/if}
  </label>

  <!-- Predefined Languages Section -->
  <div class="mb-4">
    <h4 class="text-sm font-medium text-gray-700 mb-2">
      Select from predefined languages:
    </h4>
    <div
      class="border border-gray-300 rounded-md p-3 space-y-2 max-h-40 overflow-y-auto"
    >
      {#each list as item}
        <label
          class="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
        >
          <input
            type="checkbox"
            checked={value.includes(item)}
            onchange={() => togglePredefinedLanguage(item)}
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <span class="text-sm font-omsf-subheading">{item}</span>
        </label>
      {/each}
    </div>
  </div>

  <!-- Custom Language Input Section -->
  <div class="mb-4">
    <h4 class="text-sm font-medium text-gray-700 mb-2">Add custom language:</h4>
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={customLanguageInput}
        placeholder="Enter custom language..."
        class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        onkeydown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addCustomLanguage();
          }
        }}
      />
      <Bubble onclick={addCustomLanguage} disabled={!customLanguageInput.trim()}
        >Add</Bubble
      >
    </div>
  </div>

  <!-- Selected Languages Display -->
  {#if value.length > 0}
    <div class="mt-2 flex flex-wrap gap-1">
      <!-- Predefined languages -->
      {#each selectedPredefined as selected}
        <span
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
        >
          {selected}
          <button
            type="button"
            onclick={() => removeLanguage(selected)}
            class="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-600 focus:outline-none"
          >
            ×
          </button>
        </span>
      {/each}

      <!-- Custom languages -->
      {#each selectedCustom as selected}
        <span
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
        >
          {selected}
          <button
            type="button"
            onclick={() => removeLanguage(selected)}
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
