<script lang="ts">
  interface Props {
    name: string,
    description: string,
    docs: string,
    license: string,
    tags: string[]
    link: string,
  }
  let {name, description, docs, license, tags, link}: Props = $props();
</script>

<div class="lg:w-sm w-2xs lg:h-full rounded overflow-hidden shadow-lg">
    <div class="px-6 py-4">
        <div class="font-semibold font-omsf-title text-xl mb-2">{name}</div>
        <div class="font-regular font-omsf-subheading text-base mb-2">{license} • <a href={docs} >Docs</a> • <a href={link}>Website</a></div>
        <p class="text-gray-700 text-base font-omsf-descriptive">
            {description}
        </p>
    </div>
    <div class="px-6 pt-4 pb-2">
        {#each tags as tag}
            <span class="inline-block font-omsf-subheading bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 mb-2">{tag}</span>
        {/each}
    </div>
</div>
