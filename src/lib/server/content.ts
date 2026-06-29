import {
  allOpenadmetWorkflows,
  allOpenfeWorkflows,
  allOpenffWorkflows,
  allSoftware,
  allWorkflows,
} from "content-collections";
import type { SoftwareSchema } from "../../schemas";

function compareByName(a: SoftwareSchema, b: SoftwareSchema): number {
  return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
}

export function loadSoftware(): SoftwareSchema[] {
  return [...allSoftware].sort(compareByName);
}

export function loadWorkflows(): SoftwareSchema[] {
  return [
    ...allWorkflows,
    ...allOpenffWorkflows,
    ...allOpenfeWorkflows,
    ...allOpenadmetWorkflows,
  ].sort(compareByName);
}

export function collectTags(items: SoftwareSchema[]): string[] {
  return [...new Set(items.flatMap((item) => item.tags || []))].sort();
}
