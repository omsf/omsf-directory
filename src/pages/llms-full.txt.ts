import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

export const GET: APIRoute = async ({ params, request }) => {
	const software = await getCollection('software')
	let markdownContent = '# OMSF Software Collection\n\n'

	for (const item of software) {
		markdownContent += `## ${item.data.name}\n\n`
		markdownContent += `${item.data.description}\n\n`
		markdownContent += `- **Docs:** [${item.data.docs}](${item.data.docs})\n`
		markdownContent += `- **License:** ${item.data.license}\n`
		markdownContent += `- **Link:** [${item.data.link}](${item.data.link})\n`
		markdownContent += `- **Tags:** ${item.data.tags.join(', ')}\n`
		markdownContent += `- **Languages:** ${item.data.languages.join(', ')}\n`

		if (item.data.project) {
			markdownContent += `- **Project:** ${item.data.project}\n`
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
