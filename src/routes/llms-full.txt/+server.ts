import { loadSoftware } from "$lib/server/content";

export const prerender = true;

export async function GET() {
  const software = await loadSoftware();
  let markdownContent = "# OMSF Software Collection\n\n";

  for (const item of software) {
    const displayLicenses = [
      ...new Set(
        item.licenses.map((license: string) =>
          license.startsWith("LicenseRef-") ? "Custom" : license,
        ),
      ),
    ];

    markdownContent += `## ${item.name}\n\n`;
    markdownContent += `${item.description}\n\n`;
    if (item.docs) {
      markdownContent += `- **Docs:** [${item.docs}](${item.docs})\n`;
    }
    markdownContent += `- **Licenses:** ${displayLicenses.join(", ")}\n`;
    if (item.link) {
      markdownContent += `- **Link:** [${item.link}](${item.link})\n`;
    }
    markdownContent += `- **Tags:** ${item.tags.join(", ")}\n`;
    markdownContent += `- **Languages:** ${item.languages.join(", ")}\n`;

    if (item.project) {
      markdownContent += `- **Project:** ${item.project}\n`;
    }

    markdownContent += "\n---\n\n";
  }

  return new Response(markdownContent, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown",
    },
  });
}
