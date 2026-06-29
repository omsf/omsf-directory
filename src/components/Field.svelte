<script lang="ts">
  interface Props {
    value: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    name: string;
    type: string;
    placeholder: string;
    description: string;
    required: boolean | undefined;
    error?: string;
  }
  let {
    value = $bindable(),
    name,
    type,
    placeholder,
    // TODO: figure out how to make this so TS doesn't complain
    required = undefined,
    description,
    error,
  }: Props = $props();

  let inputId = $derived(name.toLowerCase().replaceAll(" ", "-"));
  let errorId = $derived(`${inputId}-error`);
  let showError = $derived(Boolean(error && String(value ?? "").trim()));
</script>

<div class="mb-6">
  <label for={inputId} class="block mb-2 font-omsf-subheading">
    {name}
    {#if required}
      *
    {/if}
  </label>
  <input
    {type}
    id={inputId}
    bind:value
    {required}
    aria-invalid={showError}
    aria-describedby={showError ? errorId : undefined}
    class={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${
      showError
        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
        : "border-gray-300 focus:ring-omsf-base focus:border-omsf-base"
    }`}
    {placeholder}
  />
  {#if showError}
    <p id={errorId} class="mt-1 text-sm text-red-600 font-omsf-descriptive">
      {error}
    </p>
  {/if}
  <p class="mt-1 text-sm text-gray-500 font-omsf-descriptive">{description}</p>
</div>
