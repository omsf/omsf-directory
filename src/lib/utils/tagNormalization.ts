import { type SoftwareSchema } from "../../schemas";

function toKey(value: string): string {
  return value.toLowerCase();
}

export function dedupeCaseInsensitive(
  values: string[],
  canonicalMap?: Map<string, string>,
): string[] {
  const seen = new Set<string>();
  const deduped: string[] = [];

  for (const value of values) {
    const key = toKey(value);
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    deduped.push(canonicalMap?.get(key) ?? value);
  }

  return deduped;
}

export function buildDisplayTags(
  tags: string[] | undefined,
  languages: string[] | undefined,
  languageCanonicalMap: Map<string, string>,
): string[] {
  const merged = [
    ...(tags ?? []),
    ...(languages ?? []).filter((language) => language.toLowerCase() !== "other"),
  ];

  return dedupeCaseInsensitive(merged, languageCanonicalMap);
}

export function normalizeFormArrays(
  input: SoftwareSchema,
  languageCanonicalMap: Map<string, string>,
): SoftwareSchema {
  return {
    ...input,
    tags: dedupeCaseInsensitive(input.tags, languageCanonicalMap),
    languages: dedupeCaseInsensitive(input.languages, languageCanonicalMap),
    licenses: dedupeCaseInsensitive(input.licenses),
  };
}
