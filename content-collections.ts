import { defineCollection, defineConfig } from "@content-collections/core";
import { SoftwareSchemaObject } from "./src/schemas";

const software = defineCollection({
  name: "software",
  directory: "software",
  include: "*.{yaml,yml}",
  parser: "yaml",
  schema: SoftwareSchemaObject,
  transform: (data) => data,
});

const workflows = defineCollection({
  name: "workflows",
  directory: "workflows",
  include: "*.{yaml,yml}",
  parser: "yaml",
  schema: SoftwareSchemaObject,
  transform: (data) => data,
});

const openffWorkflows = defineCollection({
  name: "openffWorkflows",
  directory: "workflows/openff",
  include: "*.{yaml,yml}",
  parser: "yaml",
  schema: SoftwareSchemaObject,
  transform: (data) => ({
    ...data,
    project: "Open Force Field" as const,
  }),
});

const openfeWorkflows = defineCollection({
  name: "openfeWorkflows",
  directory: "workflows/openfe",
  include: "*.{yaml,yml}",
  parser: "yaml",
  schema: SoftwareSchemaObject,
  transform: (data) => ({
    ...data,
    project: "Open Free Energy" as const,
  }),
});

const openadmetWorkflows = defineCollection({
  name: "openadmetWorkflows",
  directory: "workflows/openadmet",
  include: "*.{yaml,yml}",
  parser: "yaml",
  schema: SoftwareSchemaObject,
  transform: (data) => ({
    ...data,
    project: "OpenADMET" as const,
  }),
});

export default defineConfig({
  content: [
    software,
    workflows,
    openffWorkflows,
    openfeWorkflows,
    openadmetWorkflows,
  ],
});
