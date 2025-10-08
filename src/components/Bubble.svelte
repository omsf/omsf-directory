<script lang="ts">
import type { HTMLButtonAttributes } from 'svelte/elements'

interface Props extends HTMLButtonAttributes {
	selectionFunction?: boolean
	children: any // eslint-disable-line @typescript-eslint/no-explicit-any
}
let { selectionFunction, children, ...props }: Props = $props()

// Computed class string
const buttonClass = $derived.by(() => {
	const baseClasses =
		'font-omsf-subheading rounded-full px-3 py-1 text-sm disabled:bg-omsf-gray transition-colors text-gray-800'

	// Handle disabled state
	if (props.disabled) {
		return `${baseClasses} bg-omsf-gray opacity-50 cursor-not-allowed`
	}

	const conditionalClasses = selectionFunction ? 'bg-omsf-base' : 'bg-omsf-gray hover:bg-omsf-base'
	return `${baseClasses} ${conditionalClasses}`
})
</script>

<button {...props} class={buttonClass}>{@render children?.()}</button>
