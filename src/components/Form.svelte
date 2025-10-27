<script lang="ts">
  import { isValid, renderYaml } from "../lib/utils/yamlRender.svelte";
  import { ALL_LICENSES, languageTags, type SoftwareSchema } from "../schemas";
  import Bubble from "./Bubble.svelte";
  import Card from "./Card.svelte";
  import Field from "./Field.svelte";
  import MultiSelector from "./MultiSelector.svelte";

  let formData = $state({
    name: "",
    description: "",
    licenses: [],
    link: undefined,
    tags: [],
    docs: undefined,
    languages: [],
    project: undefined,
    repository: "",
  } as SoftwareSchema);
  // Form validation using $derived
  let isFormValid = $derived(isValid(formData));
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
      console.log("Valid");
      output = renderYaml(formData);
    }
    yamlContent = output;
    cardContent = { ...formData };
  });

  function copyYamlToClipboard() {
    navigator.clipboard.writeText(yamlContent);
  }
</script>

<div class="container mx-auto px-2 sm:px-4">
  <div class="mb-6">
    <h2 class="text-2xl font-semibold mb-2 font-omsf-title">Add New Entry</h2>
    <p class="text-gray-600 font-omsf-descriptive md:max-w-1/2">
      This form helps to show how your project will look when we addeded to the
      directory. Once completeletd, click "Copy YAML" and open a PR <a
        href="http://github.com/omsf/omsf-directory"
        class="underline"
        target="_blank"
        rel="noopener noreferrer">here</a
      >. Create a YAML file with your copied contents in either the software or
      workflows folder. We will review your submission as soon as we can!
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
        bind:value={formData.repository}
        type="url"
        name="Repository URL"
        required
        placeholder="https://..."
        description="The project's main repository"
      ></Field>
      <Field
        bind:value={formData.link}
        type="url"
        name="Project URL"
        required={false}
        placeholder="https://..."
        description="The project's main url"
      ></Field>
      <Field
        bind:value={formData.docs}
        type="url"
        name="Project Docs"
        required={false}
        placeholder="https://..."
        description="The project's main documentation"
      ></Field>
      <MultiSelector
        bind:value={formData.licenses}
        name="Licenses"
        list={ALL_LICENSES}
        description="Select from predefined licenses or add your own"
        required={true}
        placeholder="Enter custom license..."
        addButtonText="Add"
        predefinedSectionTitle="Select from predefined licenses:"
        customSectionTitle="Add custom license:"
        allowCustom={true}
      ></MultiSelector>
      <Field
        bind:value={tags}
        type="text"
        name="Tags *"
        required={false}
        placeholder="tag1,tag2,tag3"
        description="A comma-seperated lists of tags"
      ></Field>
      <MultiSelector
        bind:value={formData.languages}
        name="Languages"
        list={languageTags}
        description="Select from predefined programming languages or add custom languages for your project."
        required={true}
        placeholder="Enter custom language..."
        addButtonText="Add"
        predefinedSectionTitle="Select from predefined languages:"
        customSectionTitle="Add custom language:"
        allowCustom={true}
      ></MultiSelector>
    </div>

    <!-- YAML preview section (right column on medium+ screens) -->
    <div class="grid grid-cols-1 justify-items-center">
      <div>
        <div class="mb-4">
          <Card {...cardContent}></Card>
        </div>
        <Bubble onclick={() => copyYamlToClipboard()} disabled={!isFormValid}
          >Copy YAML</Bubble
        >
      </div>
    </div>
  </div>
</div>
