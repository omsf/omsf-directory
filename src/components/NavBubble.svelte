<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";

  interface Props extends HTMLAnchorAttributes {
    select?: boolean;
    tag: string;
  }

  let { select = false, tag, class: className = "", ...props }: Props =
    $props();

  const linkClass = $derived(
    [
      "font-omsf-subheading rounded-full px-3 py-1 text-sm disabled:bg-omsf-gray transition-colors text-gray-800",
      select ? "bg-omsf-base" : "bg-omsf-gray hover:bg-omsf-base",
      className,
    ]
      .filter(Boolean)
      .join(" "),
  );
</script>

<a {...props} class={linkClass}>{tag}</a>