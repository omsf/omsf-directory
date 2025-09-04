// @ts-check

import svelte from '@astrojs/svelte'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import matomo from 'astro-matomo'

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()]
	},

	integrations: [
		svelte(),
		matomo({
			enabled: import.meta.env.PROD, // Only load in production
			host: 'https://omsf.matomo.cloud/',
			setCookieDomain: 'directory.omsf.io',
			siteId: 4,
			heartBeatTimer: 5,
			debug: false
		})
	]
})
