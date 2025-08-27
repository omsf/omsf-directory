import { z } from 'zod/v4'

export const ALL_OMSF_PROJECTS = ['Open Force Field', 'Open Free Energy', 'OpenFold']
const omsfProjects = z.enum(ALL_OMSF_PROJECTS)

export const ALL_LICENSES = ['0BSD', 'AGPL', 'GPL-3', 'MIT', 'LGPL']

export const languageTags = ['Python', 'C++', 'Fortran', 'Rust', 'Julia', 'R']

export const SoftwareSchemaObject = z.object({
	name: z.string(),
	description: z.string(),
	docs: z.optional(z.url()),
	licenses: z.array(z.string()).min(1),
	link: z.optional(z.url()),
	repository: z.url(),
	tags: z.array(z.string()).min(1),
	languages: z.array(z.string()).min(1),
	project: z.optional(omsfProjects)
})

export const jsonSchema = z.toJSONSchema(SoftwareSchemaObject)
export type SoftwareSchema = z.infer<typeof SoftwareSchemaObject>
export function compareFunc(a: SoftwareSchema, b: SoftwareSchema): number {
	const aName = a.name.toLowerCase()
	const bName = b.name.toLowerCase()
	if (aName < bName) {
		return -1
	}
	if (aName > bName) {
		return 1
	}
	return 0
}

export function getAllTags(filteredWorkflows: SoftwareSchema[]): string[] {
	return [...new Set(filteredWorkflows.flatMap((workflow) => workflow.tags || []))].sort()
}
