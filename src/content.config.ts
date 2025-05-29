import { defineCollection } from 'astro:content'
import { SoftwareSchemaObject } from './schemas'

import { glob } from 'astro/loaders'

const software = defineCollection({
	loader: glob({ pattern: '*.yaml', base: './software' }),
	schema: SoftwareSchemaObject
})

const workflows = defineCollection({
	loader: glob({ pattern: '*.yaml', base: './workflows' }),
	schema: SoftwareSchemaObject
})

// export type SoftwareSchema = z.infer<typeof SoftwareSchemaObject>;

export const collections = { software, workflows }
