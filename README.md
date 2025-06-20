# omsf-directory
This site hosts a directory of software and workflows for molecular software projects and workflows.

## Adding a new project
You can directly add the YAML needed to either the `software` or `workflows` directory.
If you need help generating this YAML, take a look at our new project creator at [https://directory.omsf.io/new](https://directory.omsf.io/new)!
Create a PR with the file you create and an example site will be generated in CI for you to preview! Once merged, the site will auto-deploy with new changes.

## Software Used
This site is built using [Astro](https://astro.build) and [Svelte](https://svelte.dev).
This allows for us to build a dynamic site that functions like a static site.
Additionally, we are using [TailwindCSS](https://tailwindcss.com) to handle our styles. Additionally, we are using [Bun](https://bun.sh) to manage our packages and [Biome](https://biomejs.dev) to format and lint our code.

## Repo Breakdown

```
omsf-directory/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD workflows
├── public/                # Static assets (favicon, etc.)
├── software/              # YAML files defining software projects
│   └── *.yaml
├── src/                   # Source code for the Astro site
│   ├── assets/           # Images, icons, and other assets
│   ├── components/       # Svelte/Astro components
│   ├── layouts/          # Page layout templates
│   ├── lib/              # Utility functions and shared code
│   │   └── utils/        # Utility functions
│   ├── pages/            # Astro pages (routes)
│   ├── styles/           # CSS and styling files
│   ├── test/             # Test files
│   ├── content.config.ts # Content collection configuration
│   └── schemas.ts        # TypeScript schemas
├── workflows/             # YAML files defining workflow projects
│   └── *.yaml
├── astro.config.mjs       # Astro configuration
├── biome.json            # Biome linter/formatter configuration
├── bun.lock              # Bun lockfile
├── package.json          # Node.js project configuration
├── README.md             # This file
├── svelte.config.js      # Svelte configuration
└── tsconfig.json         # TypeScript configuration
```

### Key Directories

- **`software/`** - Contains YAML files that define each software project in the directory
- **`workflows/`** - Contains YAML files that define workflow projects
- **`src/`** - Main source code for the Astro website
- **`public/`** - Static assets served directly by the web server
- **`.github/workflows/`** - CI/CD pipeline definitions for automated builds and deployments
