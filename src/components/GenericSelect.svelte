<script lang="ts">
interface Props {
	value: string | undefined
	list: string[]
	name: string
	required?: boolean
	optionValue?: string
}
let {
	value = $bindable(),
	list,
	name,
	required = false,
	optionValue = 'Select an option'
}: Props = $props()
const lowerName = name.toLowerCase()
</script>

<div class="mb-6">
  <label class="block mb-2 font-omsf-subheading" for={lowerName}
    >{name}
    {#if required}*{/if}</label
  >
  <select
    name={lowerName}
    id={lowerName}
    bind:value
    class="font-omsf-subheading w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
  >
    <option value="">{{optionValue}}</option>
    {#each list as item}
      <option value={item}>{item}</option>
    {/each}
  </select>
</div>
