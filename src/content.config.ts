import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { SoftwareSchemaObject } from './schemas'

const software = defineCollection({
	loader: glob({ pattern: '*.{yaml,yml}', base: './software' }),
	schema: SoftwareSchemaObject
})

const openffWorkflows = defineCollection({
	loader: glob({ pattern: '*.{yaml,yml}', base: './workflows/openff' }),
	schema: SoftwareSchemaObject
})

const workflows = defineCollection({
	loader: glob({ pattern: '*.{yaml,yml}', base: './workflows' }),
	schema: SoftwareSchemaObject
})

// export type SoftwareSchema = z.infer<typeof SoftwareSchemaObject>;

export const collections = { software, workflows, openffWorkflows }
