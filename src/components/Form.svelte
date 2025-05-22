<script lang="ts">
  import { SoftwareSchemaObject } from "../schemas";
  import Card from "./Card.svelte";
  import Field from "./Field.svelte";
  import LicenseSelect from "./LicenseSelect.svelte";
  let formData = $state({
    name: null,
    description: null,
    license: "",
    link: null,
    tags: [],
    docs: undefined,
  });
  // Form validation using $derived
  let isFormValid = $derived(SoftwareSchemaObject.safeParse(formData).success);
  let yamlContent = $state(""); // Declare yamlContent variable
  let cardContent = $state({});

  $effect(() => {
    // Only generate YAML if the form is valid
    let output = "";
    if (isFormValid) {
      output += `name: ${formData.name === null ? "" : formData.name}\n`;
      output += `description: ${formData.description === null ? "" : formData.description}\n`;
      output += `link: ${formData.link === null ? "" : formData.link}\n`;
    }
    yamlContent = output;
    cardContent = formData;
  });

  function copyYamlToClipboard() {
    navigator.clipboard.writeText(yamlContent);
  }
</script>

<div class="max-w-5xl mx-auto mb-8">
  <div class="mb-6">
    <h2 class="text-2xl font-bold mb-2">Add New Entry</h2>
    <p class="text-gray-600">
      This simple example demonstrates auto-generating YAML
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Form section (left column on medium+ screens) -->
    <div>
      <Field
        bind:value={formData.name}
        type="text"
        name="Name"
        required
        placeholder="Software Name"
        description="Enter the name of the software"
      ></Field>
      <Field
        bind:value={formData.description}
        type="text"
        name="Description"
        required
        placeholder="Short Description"
        description="A simple description"
      ></Field>
      <Field
        bind:value={formData.link}
        type="url"
        name="Project URL"
        required
        placeholder="https://..."
        description="The project's main url"
      ></Field>
      <Field
        bind:value={formData.docs}
        type="url"
        name="Project Docs"
        placeholder="https://..."
        description="The project's main documentation"
      ></Field>
      <LicenseSelect bind:value={formData.license}></LicenseSelect>
    </div>

    <!-- YAML preview section (right column on medium+ screens) -->
    <div>
      <Card {...cardContent}></Card>
    </div>
  </div>
</div>
