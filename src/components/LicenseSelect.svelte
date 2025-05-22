<script lang="ts">
  import { ALL_LICENSES } from "../schemas";
  let { value = $bindable() } = $props();
</script>

<div class="mb-6">
  <label for="license">License *</label>
  <select
    name="license"
    id="license"
    bind:value
    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
  >
    <option value="">Please choose an option</option>
    {#each ALL_LICENSES as license}
      <option value={license}>{license}</option>
    {/each}
  </select>
</div>
