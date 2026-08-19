---
name: add-directory-entry
description: Add software, workflows, infrastructure, or repository-based projects to the OMSF Directory. Use when asked to research a project or repository, create its catalogue YAML, or validate a proposed directory entry.
---

# Add an OMSF Directory entry

Create accurate, minimal catalogue entries from a project description or repository URL.

## 1. Inspect the current catalogue

Before editing:

1. Read `src/schemas.ts` and `src/content.config.ts`. Treat them as the source of truth for fields, allowed project names, and configured collections.
2. Inspect two or three nearby YAML entries for current naming, formatting, tag capitalization, and placement conventions.
3. Search all catalogue YAML for the proposed name and repository URL. Update an existing entry rather than creating a duplicate.
4. Check `git status` and preserve unrelated worktree changes.

Do not change application code, schemas, or collection configuration merely to make an entry fit unless the user explicitly asks for a new collection.

## 2. Classify and place the entry

Classify a project by its primary purpose, not its implementation language or the wording of the request:

- **Software** — Put scientific applications, reusable libraries, modeling or analysis packages, and domain-facing developer tools in `software/<slug>.yaml`.
- **Workflows** — Put executable procedures, tutorials, notebooks, pipelines, and scientific protocols in `workflows/`. Use a project subdirectory only when that subdirectory is loaded as a collection in `src/content.config.ts`; otherwise use `workflows/<slug>.yaml`.
- **Infrastructure** — Put cloud resource management, infrastructure as code, deployment automation, CI/CD systems, hosted development environments, operational tooling, benchmarking infrastructure, and software-supply-chain tooling in `infrastructure/<slug>.yaml`. Infrastructure-oriented software belongs here even when it is a Python library, CLI, dashboard, or other application.

For a repository URL without a stated type, inspect its README, documentation, and contents before classifying it. Existing catalogue examples establish the boundaries: scientific packages belong under `software/`; tutorials and computational procedures belong under `workflows/`; cloud benchmarking, orchestration, development-instance management, reusable Terraform/OpenTofu modules, CI runners, and SBOM analysis belong under `infrastructure/`.

Confirm that the selected folder is loaded in `src/content.config.ts`. If the appropriate collection is absent, report that configuration gap instead of placing the project in the wrong folder or changing collection configuration without permission. Do not invent a standalone `repositories/` collection; repository-based entries belong to the configured collection describing what they provide.

Use a lowercase filename ending in `.yaml`, with words separated by hyphens or underscores. When adding several projects, create one file per entry. Ask a focused clarification question if the available evidence cannot distinguish the entry type.

## 3. Research authoritative metadata

Prefer first-party sources in this order:

1. Repository metadata and files such as `README`, `LICENSE`, `CITATION.cff`, `pyproject.toml`, and `package.json`.
2. The project's official documentation and website.
3. Package registries or organization pages maintained by the project.

For GitHub repositories, use `gh repo view` when available or inspect the repository and API through other available web tools. Confirm rather than infer required facts. Resolve conflicting license metadata from the repository's license files and report unresolved ambiguity instead of guessing.

## 4. Write schema-valid YAML

Populate every field currently required by `SoftwareSchemaObject`. At the time of writing, entries use:

- `name`: the project's official display name.
- `description`: one concise factual sentence describing what it does; quote it when needed for valid YAML.
- `repository`: the canonical HTTPS repository URL.
- `licenses`: one or more valid SPDX identifiers. Use `LicenseRef-<name>` only for a real non-SPDX license.
- `languages`: the substantive implementation languages, not incidental markup or configuration formats.
- `tags`: one or more concise domain or capability tags. Reuse established catalogue wording and capitalization where suitable.
- `docs`: optional canonical documentation URL.
- `link`: optional official project homepage.
- `project`: optional OMSF project affiliation, using an exact value allowed by `src/schemas.ts`. Include it only when affiliation is explicit.

Keep the entry factual and compact. Do not add unsupported fields, placeholders, tracking parameters, generated prose, comments, or duplicate URLs solely to fill optional fields.

## 5. Verify the change

Review the new file and inspect the focused diff:

```sh
git diff --check
```

Schema and collection validation runs in repository CI and typically requires Node.js, so it may not be available on local machines. If `npm run build` is available locally, run it to check the entry against the Astro schemas.

Also inspect the focused diff. If network access is available, verify each new URL resolves; do not weaken link checking to accommodate a bad URL.

If a command fails because of the new entry, fix it and rerun it. If failure is unrelated or the environment lacks Python or network access, report the exact limitation.

## 6. Report the result

State:

- each file created or updated and how it was classified;
- the authoritative sources used for non-obvious metadata;
- verification commands and outcomes;
- any remaining uncertainty or follow-up needed.
