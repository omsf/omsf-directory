<script lang="ts">
	interface Props {
		name: string;
		description: string;
		docs: string;
		license: string;
		tags: string[];
		link: string;
	}
	const { name, description, docs, license, tags, link }: Props = $props();
</script>

<div class="w-2xs overflow-hidden rounded shadow-lg lg:h-full lg:w-sm">
	<div class="px-6 py-4">
		<div class="font-omsf-title mb-2 text-xl font-semibold">{name}</div>
		<div class="font-regular font-omsf-subheading mb-2 text-base">
			{license} • <a href={docs}>Docs</a> • <a href={link}>Website</a>
		</div>
		<p class="font-omsf-descriptive text-base text-gray-700">
			{description}
		</p>
	</div>
	<div class="px-6 pt-4 pb-2">
		{#each tags as tag}
			<span
				class="font-omsf-subheading bg-omsf-gray mr-2 mb-2 inline-block rounded-full px-3 py-1 text-sm text-gray-700"
				>{tag}</span
			>
		{/each}
	</div>
</div>
