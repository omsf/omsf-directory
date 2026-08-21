# Agent instructions

## Directory entries

When adding or updating catalogue entries, follow
[`.agents/skills/add-directory-entry/SKILL.md`](.agents/skills/add-directory-entry/SKILL.md).

Validate changed entries:

```sh
git diff --check
```

Schema and collection checks run in repository CI and typically require Node.js. If `npm run build` is available locally, run it to validate entries against the Astro schemas.

Preserve unrelated worktree changes and keep catalogue changes focused.
