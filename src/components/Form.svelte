<script lang="ts">
  import {
    ALL_LICENSES,
    ALL_OMSF_PROJECTS,
    languageTags,
    SoftwareSchemaObject,
    type SoftwareSchema,
  } from "../schemas";
  import Card from "./Card.svelte";
  import Field from "./Field.svelte";
  import GenericSelect from "./GenericSelect.svelte";
  import MultiSelect from "./MultiSelect.svelte";
  let formData = $state({
    name: "",
    description: "",
    license: "",
    link: "",
    tags: [],
    docs: "",
    languages: [],
  } as SoftwareSchema);
  // Form validation using $derived
  let isFormValid = $derived(SoftwareSchemaObject.safeParse(formData).success);
  let yamlContent = $state(""); // Declare yamlContent variable
  let cardContent = $state({});
  let tags = $state("");

  $effect(() => {
    formData.tags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");
  });

  $effect(() => {
    // Only generate YAML if the form is valid
    let output = "";
    if (isFormValid) {
      output += `name: ${formData.name === null ? "" : formData.name}\n`;
      output += `description: ${formData.description === null ? "" : formData.description}\n`;
      output += `link: ${formData.link === null ? "" : formData.link}\n`;
      if (formData.docs) {
        output += `docs: ${formData.docs}\n`;
      }
      output += `license: ${formData.license}\n`;
      if (formData.tags.length > 0) {
        output += `tags:\n${formData.tags.map(tag => `  - ${tag}`).join('\n')}\n`;
      }
      if (formData.languages.length > 0) {
        output += `languages:\n${formData.languages.map(lang => `  - ${lang}`).join('\n')}\n`;
      }
      if (formData.project) {
        output += `project: ${formData.project}\n`;
      }
    }
    yamlContent = output;
    cardContent = { ...formData };
    // cardContent = formData;
  });

  function copyYamlToClipboard() {
    navigator.clipboard.writeText(yamlContent);
  }
</script>

<div class="container mx-auto px-2 sm:px-4">
  <div class="mb-6">
    <h2 class="text-2xl font-semibold mb-2 font-omsf-title">Add New Entry</h2>
    <p class="text-gray-600 font-omsf-descriptive">
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
      <GenericSelect
        bind:value={formData.license}
        name="License"
        required={true}
        list={ALL_LICENSES}
      ></GenericSelect>
      <Field
        bind:value={tags}
        type="text"
        name="Tags"
        placeholder="tag1,tag2,tag3"
        description="A comma-seperated lists of tags"
      ></Field>
      <MultiSelect
        bind:value={formData.languages}
        name="Languages"
        list={languageTags}
        description="Select programming languages used in this project"
      ></MultiSelect>
      <GenericSelect
        bind:value={formData.project}
        name="Project"
        list={ALL_OMSF_PROJECTS}
      ></GenericSelect>
    </div>

    <!-- YAML preview section (right column on medium+ screens) -->
    <div class="grid grid-cols-1 place-items-center">
      <Card {...cardContent}></Card>
    </div>
  </div>
</div>
