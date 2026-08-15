<script lang="ts">
  import { ALL_SPDX_IDS } from "../lib/spdx";
  import { normalizeFormArrays } from "../lib/utils/tagNormalization";
  import { renderYaml, validateForm } from "../lib/utils/yamlRender.svelte";
  import {
    COMMON_LICENSES,
    languageTags,
    type SoftwareSchema,
  } from "../schemas";
  import Bubble from "./Bubble.svelte";
  import Card from "./Card.svelte";
  import Field from "./Field.svelte";
  import MultiSelector from "./MultiSelector.svelte";

  type EntryType = "software" | "workflows";

  const GITHUB_NEW_FILE_URL = "https://github.com/omsf/omsf-directory/new/main";

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
  let validation = $derived(validateForm(formData));
  let isFormValid = $derived(validation.isValid);
  let yamlContent = $state(""); // Declare yamlContent variable
  let cardContent = $state({});
  let tags = $state("");
  let entryType = $state<EntryType>("software");
  let targetPath = $derived(
    `${entryType}/${slugify(formData.name) || "new-entry"}.yaml`,
  );
  const LICENSE_REF_PREFIX = "LicenseRef-";
  const spdxCanonicalMap = new Map<string, string>(
    ALL_SPDX_IDS.map((license) => [license.toLowerCase(), license]),
  );
  const languageCanonicalMap = new Map<string, string>(
    languageTags.map((language) => [language.toLowerCase(), language]),
  );

  function normalizeLicenseInput(input: string): string {
    const value = input.trim();
    if (!value) {
      return "";
    }

    if (value.startsWith(LICENSE_REF_PREFIX)) {
      const customName = value.slice(LICENSE_REF_PREFIX.length).trim();
      return customName ? `${LICENSE_REF_PREFIX}${customName}` : "";
    }

    const canonicalSpdx = spdxCanonicalMap.get(value.toLowerCase());
    if (canonicalSpdx) {
      return canonicalSpdx;
    }

    return `${LICENSE_REF_PREFIX}${value}`;
  }

  function slugify(value: string): string {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  $effect(() => {
    formData.tags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");
  });

  $effect(() => {
    // Only generate YAML if the form is valid
    let output = "";
    const normalizedFormData = normalizeFormArrays(
      formData,
      languageCanonicalMap,
    );
    if (isFormValid) {
      output = renderYaml(normalizedFormData);
    }
    yamlContent = output;
    cardContent = { ...normalizedFormData };
  });

  function copyYamlToClipboard() {
    navigator.clipboard.writeText(yamlContent);
  }

  function openGitHubNewFile() {
    const params = new URLSearchParams({
      filename: targetPath,
      value: yamlContent,
      message: `Add ${formData.name} to OMSF directory`,
    });
    window.open(
      `${GITHUB_NEW_FILE_URL}?${params.toString()}`,
      "_blank",
      "noopener,noreferrer",
    );
  }
</script>

<div class="container mx-auto px-2 sm:px-4">
  <div class="mb-6">
    <h2 class="text-2xl font-semibold mb-2 font-omsf-title">Add New Entry</h2>
    <p class="text-gray-600 font-omsf-descriptive md:max-w-1/2">
      This form previews how your entry will look in the directory. Once the
      form is complete, open GitHub to create a prefilled YAML file and submit a
      pull request. If GitHub cannot prefill the file for you, use "Copy YAML"
      as a fallback.
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Form section (left column on medium+ screens) -->
    <div>
      <label class="block mb-6 font-omsf-descriptive">
        <span class="block mb-1 font-omsf-subheading">Entry Type</span>
        <select
          bind:value={entryType}
          class="w-full rounded-md border border-omsf-gray bg-white px-3 py-2"
        >
          <option value="software">Software</option>
          <option value="workflows">Workflow</option>
        </select>
      </label>
      <Field
        bind:value={formData.name}
        type="text"
        name="Name"
        required
        placeholder="Software Name"
        description="Enter the name of the software"
        error={validation.fieldErrors.name?.[0]}
      ></Field>
      <Field
        bind:value={formData.description}
        type="text"
        name="Description"
        required
        placeholder="Short Description"
        description="A simple description"
        error={validation.fieldErrors.description?.[0]}
      ></Field>
      <Field
        bind:value={formData.repository}
        type="url"
        name="Repository URL"
        required
        placeholder="https://..."
        description="The project's main repository"
        error={validation.fieldErrors.repository?.[0]}
      ></Field>
      <Field
        bind:value={formData.link}
        type="url"
        name="Project URL"
        required={false}
        placeholder="https://..."
        description="The project's main url"
        error={validation.fieldErrors.link?.[0]}
      ></Field>
      <Field
        bind:value={formData.docs}
        type="url"
        name="Project Docs"
        required={false}
        placeholder="https://..."
        description="The project's main documentation"
        error={validation.fieldErrors.docs?.[0]}
      ></Field>
      <MultiSelector
        bind:value={formData.licenses}
        name="Licenses"
        list={Array.from(COMMON_LICENSES)}
        description="Enter SPDX IDs; non-SPDX values are converted to LicenseRef-"
        required={true}
        placeholder="Enter SPDX or custom license"
        addButtonText="Add"
        predefinedSectionTitle="Select from predefined licenses:"
        customSectionTitle="Add custom license:"
        allowCustom={true}
        normalizeCustomItem={normalizeLicenseInput}
        error={validation.fieldErrors.licenses?.[0]}
      ></MultiSelector>
      <p class="-mt-4 mb-6 text-sm text-gray-500 font-omsf-descriptive">
        <span class="block"
          >Example: <code>Proprietary</code> becomes
          <code>LicenseRef-Proprietary</code></span
        >
        <span class="block"
          >LicenseRef format details:
          <a
            href="https://spdx.github.io/spdx-spec/v2.3/SPDX-license-expressions/"
            class="underline"
            target="_blank"
            rel="noopener noreferrer">SPDX license expressions spec</a
          ></span
        >
      </p>
      <Field
        bind:value={tags}
        type="text"
        name="Tags *"
        required={false}
        placeholder="tag1,tag2,tag3"
        description="A comma-separated list of tags"
        error={validation.fieldErrors.tags?.[0]}
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
        error={validation.fieldErrors.languages?.[0]}
      ></MultiSelector>
    </div>

    <!-- YAML preview section (right column on medium+ screens) -->
    <div class="grid grid-cols-1 justify-items-center">
      <div>
        <div class="mb-4">
          <Card {...cardContent}></Card>
        </div>
        <p class="mb-3 text-sm text-gray-600 font-omsf-descriptive">
          Target file: <code>{targetPath}</code>
        </p>
        <div class="flex flex-wrap gap-2">
          <Bubble onclick={() => openGitHubNewFile()} disabled={!isFormValid}
            >Open GitHub PR</Bubble
          >
          <Bubble onclick={() => copyYamlToClipboard()} disabled={!isFormValid}
            >Copy YAML</Bubble
          >
        </div>
      </div>
    </div>
  </div>
</div>
