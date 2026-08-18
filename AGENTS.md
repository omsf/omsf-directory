# Agent instructions

## Directory entries

When adding or updating catalogue entries, follow
[`.agents/skills/add-directory-entry/SKILL.md`](.agents/skills/add-directory-entry/SKILL.md).

Validate changed entries without requiring Node.js or npm:

```sh
python3 .agents/skills/add-directory-entry/validate_entry.py <entry-path>
git diff --check
```

Preserve unrelated worktree changes and keep catalogue changes focused.
