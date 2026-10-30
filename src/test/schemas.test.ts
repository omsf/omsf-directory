import { expect, test } from "vitest";
import { SoftwareSchemaObject } from "../schemas";

const tagsSchema = SoftwareSchemaObject.shape.tags;

test.each([
  "Cheminformatics",
  "Molecular dynamics",
  "SMILES2Name",
  "IUPAC",
  "3D Geometry",
  "Énergies",
])("tags accept an uppercase or numeric prefix: %s", (tag) => {
  expect(tagsSchema.safeParse([tag]).success).toBe(true);
});

test.each(["name", "nomenclature", "mol2iupac", "", " SMILES", "-SMILES"])(
  "tags reject a missing uppercase or numeric prefix: %s",
  (tag) => {
    const result = tagsSchema.safeParse(["SMILES", tag]);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual([1]);
      expect(result.error.issues[0].message).toBe(
        "Tags must start with an uppercase letter or digit",
      );
    }
  },
);

test("tags require at least one value", () => {
  expect(tagsSchema.safeParse([]).success).toBe(false);
});
