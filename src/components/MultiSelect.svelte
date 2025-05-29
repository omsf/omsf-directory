<script lang="ts">
  interface Props {
    value: string[];
    list: string[];
    name: string;
    required?: boolean;
    description?: string;
    allowOther?: boolean;
  }
  let { value = $bindable(), list, name, required = false, description, allowOther = false }: Props = $props();
  const lowerName = name.toLowerCase();
  let otherValue = $state("");
  let showOtherInput = $derived(allowOther && value.includes("Other"));
  
  function toggleSelection(item: string) {
    if (value.includes(item)) {
      value = value.filter(v => v !== item);
      // If deselecting "Other", also remove any custom languages
      if (item === "Other") {
        value = value.filter(v => list.includes(v));
        otherValue = "";
      }
    } else {
      value = [...value, item];
    }
  }
  
  function addOtherLanguage() {
    if (otherValue.trim() && !value.includes(otherValue.trim())) {
      value = [...value, otherValue.trim()];
      otherValue = "";
    }
  }
  
  function removeCustomLanguage(lang: string) {
    value = value.filter(v => v !== lang);
  }
  
  // Get predefined and custom languages for display
  let predefinedLanguages = $derived(value.filter(v => list.includes(v) || v === "Other"));
  let customLanguages = $derived(value.filter(v => !list.includes(v) && v !== "Other"));
</script>

<div class="mb-6">
  <label for={lowerName} class="block text-sm font-medium text-gray-700 mb-2">
    {name}
    {#if required}<span class="text-red-500">*</span>{/if}
  </label>
  
  {#if description}
    <p class="text-sm text-gray-500 mb-2">{description}</p>
  {/if}
  
  <div class="border border-gray-300 rounded-md p-3 space-y-2 max-h-40 overflow-y-auto">
    {#each list as item}
      <label class="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
        <input
          type="checkbox"
          checked={value.includes(item)}
          onchange={() => toggleSelection(item)}
          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <span class="text-sm font-omsf-subheading">{item}</span>
      </label>
    {/each}
    
    {#if allowOther}
      <label class="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
        <input
          type="checkbox"
          checked={value.includes("Other")}
          onchange={() => toggleSelection("Other")}
          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <span class="text-sm font-omsf-subheading">Other</span>
      </label>
    {/if}
  </div>
  
  {#if showOtherInput}
    <div class="mt-2 flex gap-2">
      <input
        type="text"
        bind:value={otherValue}
        placeholder="Enter custom language..."
        class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        onkeydown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            addOtherLanguage();
          }
        }}
      />
      <button
        type="button"
        onclick={addOtherLanguage}
        class="px-3 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Add
      </button>
    </div>
  {/if}
  
  {#if value.length > 0}
    <div class="mt-2 flex flex-wrap gap-1">
      <!-- Predefined languages and "Other" option -->
      {#each predefinedLanguages as selected}
        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
          {selected}
          <button
            type="button"
            onclick={() => toggleSelection(selected)}
            class="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-600 focus:outline-none"
          >
            ×
          </button>
        </span>
      {/each}
      
      <!-- Custom languages -->
      {#each customLanguages as selected}
        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {selected}
          <button
            type="button"
            onclick={() => removeCustomLanguage(selected)}
            class="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-400 hover:bg-green-200 hover:text-green-600 focus:outline-none"
          >
            ×
          </button>
        </span>
      {/each}
    </div>
  {/if}
</div>