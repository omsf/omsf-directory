# omsf-directory

This site hosts a directory of software and workflows for molecular software projects and workflows.

## Adding a new project

You can directly add the YAML needed to either the `software` or `workflows` directory.
If you need help generating this YAML, take a look at our new project creator at [https://directory.omsf.io/new](https://directory.omsf.io/new)!
Create a PR with the file you create and an example site will be generated in CI for you to preview! Once merged, the site will auto-deploy with new changes.

## Software Used

This site is built using [SvelteKit](https://svelte.dev/docs/kit) and [Content Collections](https://www.content-collections.dev/) to generate a static directory from YAML content.
Additionally, we are using [TailwindCSS](https://tailwindcss.com) to handle our styles, NPM to manage packages,
[ESLint](https://eslint.org/) for linting, and [prettier](https://prettier.io/) for formatting.

## Repo Breakdown

```
omsf-directory/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD workflows
├── public/                # Static assets (favicon, etc.)
├── software/              # YAML files defining software projects
│   └── *.yaml
├── src/                   # Source code for the SvelteKit site
│   ├── assets/           # Images, icons, and other assets
│   ├── components/       # Svelte components
│   ├── lib/              # Utility functions and shared code
│   │   ├── server/       # Server-only content helpers
│   │   └── utils/        # Utility functions
│   ├── routes/           # SvelteKit pages and endpoints
│   ├── styles/           # CSS and styling files
│   ├── test/             # Test files
│   └── schemas.ts        # TypeScript schemas
├── workflows/             # YAML files defining workflow projects
│   └── *.yaml
├── content-collections.ts # Content Collections configuration
├── eslint.config.js       # ESLint config
├── package.json          # Node.js project configuration
├── README.md             # This file
├── svelte.config.js      # SvelteKit/Svelte configuration
├── vite.config.ts        # Vite configuration
└── tsconfig.json         # TypeScript configuration
```

### Key Directories

- **`software/`** - Contains YAML files that define each software project in the directory
- **`workflows/`** - Contains YAML files that define workflow projects
- **`src/`** - Main source code for the SvelteKit website
- **`public/`** - Static assets served directly by the web server
- **`.github/workflows/`** - CI/CD pipeline definitions for automated builds and deployments

## Acknowledgements

This work was supported by the US National Science Foundation under [Grant No. 2303740](https://nsf.elsevierpure.com/en/projects/posphase-ii-building-open-source-ecosystems-in-molecular-sciences).
<br>
<br>
<img width="100" alt="NSF_Official_logo_High_Res_1200ppi.jpeg" src="https://nsf.widen.net/content/txvhzmsofh/jpeg/NSF_Official_logo_High_Res_1200ppi.jpeg?w=640&keep=c&crop=yes&quality=80&x.portal_shortcode_generated=dnmqqhzz&x.collection_sharename=wc3fwkos&x.app=portals">
