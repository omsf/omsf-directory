import { getCollection } from 'astro:content'
import type { APIRoute } from 'astro'
import { type SoftwareSchema } from '../schemas'

export const GET: APIRoute = async () => {
	const software = await getCollection('software')
	let markdownContent = '# OMSF Software Collection\n\n'

	for (const item of software) {
		const data = item.data as SoftwareSchema
		markdownContent += `## ${data.name}\n\n`
		markdownContent += `${data.description}\n\n`
		markdownContent += `- **Licenses:** ${data.licenses.join(', ')}\n`
		markdownContent += `- **Repository: ** ${data.repository}\n`
		if (data.link) {
			markdownContent += `- **Link:** [${data.link}](${data.link})\n`
		}
		if (data.docs) {
			markdownContent += `- **Docs:** [${data.docs}](${data.docs})\n`
		}
		markdownContent += `- **Tags:** ${data.tags.join(', ')}\n`
		markdownContent += `- **Languages:** ${data.languages.join(', ')}\n`

		if (data.project) {
			markdownContent += `- **Project:** ${data.project}\n`
		}

		markdownContent += '\n---\n\n'
	}

	return new Response(markdownContent, {
		status: 200,
		headers: {
			'Content-Type': 'text/markdown'
		}
	})
}
