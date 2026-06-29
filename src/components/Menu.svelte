<script lang="ts">
  import NavBubble from "./NavBubble.svelte";

  interface Props {
    currentPage: string;
  }

  let { currentPage }: Props = $props();
</script>

<div class="my-4 justify-center flex gap-2">
  <NavBubble tag="Software" select={currentPage === "software"} href="/" />
  <NavBubble
    tag="Workflows"
    select={currentPage === "workflows"}
    href="/workflows"
  />
  <NavBubble
    tag="Add your project!"
    select={currentPage === "new"}
    href="/new"
  />
</div>
