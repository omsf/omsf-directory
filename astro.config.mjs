// @ts-check

import svelte from '@astrojs/svelte'
import matomo from 'astro-matomo'

import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()]
	},

	integrations: [
		svelte(),
		matomo({
			enabled: import.meta.env.PROD, // Only load in production
			// TODO: Change
			host: 'https://analytics.example.lol/',
			setCookieDomain: 'directory.omsf.io',
			trackerUrl: 'js/', // defaults to matomo.php
			srcUrl: 'js/', // defaults to matomo.js
			siteId: 666,
			heartBeatTimer: 5,
			disableCookies: true,
			debug: false
		})
	]
})
