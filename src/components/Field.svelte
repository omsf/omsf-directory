<script lang="ts">
  interface Props {
    value: any;
    name: string;
    type: string;
    placeholder: string;
    description: string;
    required: boolean | undefined;
  }
  let {
    value = $bindable(),
    name,
    type,
    placeholder,
    // TODO: figure out how to make this so TS doesn't complain
    required = undefined,
    description,
  }: Props = $props();
</script>

<div class="mb-6">
  <label for={name.toLowerCase()} class="block mb-2 font-medium">
    {name}
    {#if required}
      *
    {/if}
  </label>
  <input
    {type}
    id={name}
    bind:value
    {required}
    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-omsf-base focus:border-omsf-base"
    {placeholder}
  />
  <p class="mt-1 text-sm text-gray-500">{description}</p>
</div>
