<script lang="ts">
  interface Props {
    selectionFunction?: boolean;
    tag: string;
  }
  let { selectionFunction, tag, ...props }: Props = $props();
</script>

<button
  {...props}
  class="font-omsf-subheading rounded-full px-3 py-1 text-sm disabled:bg-omsf-gray transition-colors
                                {selectionFunction
    ? 'bg-omsf-base text-gray-800'
    : 'bg-omsf-gray hover:bg-omsf-base text-gray-800'}">{tag}</button
>
