<script lang="ts">
import MultiSelector from './MultiSelector.svelte'

interface Props {
	value: string[]
	list: string[]
	name?: string
	required?: boolean
	description?: string
}

let {
	value = $bindable(),
	list,
	name = 'Languages',
	required = false,
	description
}: Props = $props()
</script>

<MultiSelector
	bind:value
	{list}
	{name}
	{required}
	{description}
	placeholder="Enter custom language..."
	addButtonText="Add"
	predefinedSectionTitle="Select from predefined languages:"
	customSectionTitle="Add custom language:"
	allowCustom={true}
/>
