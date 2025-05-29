<script lang="ts">
  interface Props {
    value: string[];
    list: string[];
    name: string;
    required?: boolean;
    description?: string;
  }
  let { value = $bindable(), list, name, required = false, description }: Props = $props();
  const lowerName = name.toLowerCase();
  
  function toggleSelection(item: string) {
    if (value.includes(item)) {
      value = value.filter(v => v !== item);
    } else {
      value = [...value, item];
    }
  }
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
  </div>
  
  {#if value.length > 0}
    <div class="mt-2 flex flex-wrap gap-1">
      {#each value as selected}
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
    </div>
  {/if}
</div>