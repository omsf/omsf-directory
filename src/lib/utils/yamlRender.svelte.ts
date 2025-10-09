import { type SoftwareSchema, SoftwareSchemaObject } from "../../schemas";

export function renderYaml(formData: SoftwareSchema): string {
  let output = "";

  output += `name: ${formData.name === null ? "" : formData.name}\n`;
  output += `description: ${formData.description ? `"${formData.description}"` : ""}\n`;
  output += `repository: ${formData.repository === null ? "" : formData.repository}\n`;
  output += `languages:\n${formData.languages.map((lang) => `  - ${lang}`).join("\n")}\n`;
  if (formData.link) {
    output += `link: ${formData.link}\n`;
  }
  if (formData.docs) {
    output += `docs: ${formData.docs}\n`;
  }
  if (formData.licenses.length > 0) {
    output += `licenses:\n${formData.licenses.map((license) => `  - ${license}`).join("\n")}\n`;
  }
  if (formData.tags.length > 0) {
    output += `tags:\n${formData.tags.map((tag) => `  - ${tag}`).join("\n")}\n`;
  }

  return output;
}

export function isValid(formData: SoftwareSchema): boolean {
  return (
    SoftwareSchemaObject.safeParse(formData).success &&
    formData.languages.length > 0
  );
}
