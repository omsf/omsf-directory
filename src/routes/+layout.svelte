<script lang="ts">
  import "../styles/global.css";
  import "@fontsource-variable/source-code-pro";
  import "@fontsource/anonymous-pro";
  import "@fontsource/barlow";
  import Footer from "../components/Footer.svelte";
  import Header from "../components/Header.svelte";
  import Menu from "../components/Menu.svelte";

  interface Props {
    children: import("svelte").Snippet;
    data: {
      currentPage: string;
    };
  }

  let { children, data }: Props = $props();
</script>

<svelte:head>
  <meta charset="utf-8" />
  <link rel="icon" type="image/svg+xml" href="/favicon-32x32.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>OMSF Directory</title>
</svelte:head>

<div class="overflow-y-scroll min-h-screen flex flex-col">
  <main class="flex-1">
    <Header />
    <Menu currentPage={data.currentPage} />
    {@render children()}
  </main>
  <Footer />
</div>
