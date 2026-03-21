# AGENTS.md - Development Guidelines

## Build/Lint/Test Commands

```bash
# Development server
bun run dev

# Build production site
bun run build

# Preview production build
bun run preview

# Lint all files (ignores .astro/ directory)
bun run lint

# Run all tests
bun run test

# Run specific test file
bun run test -- src/test/lib/utils/filterUtils.test.ts

# Format code with Prettier
bun run prettier:format

# Check Prettier formatting
bun run prettier:check:ci
```

## Code Style Guidelines

### Imports

- Use absolute imports when possible
- Group imports: 3rd party → internal → local
- Sort alphabetically within groups
- Use TypeScript path aliases for internal modules

### Formatting

- Use Prettier with Astro/Svelte plugins
- 2 spaces for indentation
- 80 character line limit
- Use single quotes unless string contains quotes
- No trailing whitespace

### TypeScript

- Strict mode enabled (`tsconfig.json:strict`)
- Use `const`/`let` instead of `var`
- Prefer interfaces over type aliases for object shapes
- Use `unknown` instead of `any`
- Enable strict null checks

### Naming Conventions

- PascalCase for components (e.g., `MyComponent.astro`)
- camelCase for variables/functions
- kebab-case for file names
- Use descriptive names (avoid abbreviations)

### Error Handling

- Use try/catch for async operations
- Handle errors at the appropriate level
- Log meaningful error messages
- Don't suppress errors silently

### Svelte/Astro

- Use Svelte 5 runes syntax
- Component props should be typed
- Use Astro islands for interactive components
- Follow Astro component structure
