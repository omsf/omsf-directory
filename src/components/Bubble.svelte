<script lang="ts">
  let { onclick, selectionFunction, tag } = $props();
</script>

<button
  {onclick}
  class="font-omsf-subheading rounded-full px-3 py-1 text-sm transition-colors
                                {selectionFunction
    ? 'bg-omsf-base text-gray-800'
    : 'bg-omsf-gray hover:bg-omsf-base text-gray-800 hover:border-solid'}"
  >{tag}</button
>
