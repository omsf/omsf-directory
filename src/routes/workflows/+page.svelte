<script lang="ts">
  import TagFilter from "../../components/TagFilter.svelte";
  import type { SoftwareSchema } from "../../schemas";

  interface Props {
    data: {
      items: SoftwareSchema[];
      allTags: string[];
    };
  }

  let { data }: Props = $props();
</script>

<TagFilter items={data.items} allTags={data.allTags} />