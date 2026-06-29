import { jsonSchema } from "../../schemas";

export const prerender = true;

export function GET() {
  return new Response(JSON.stringify(jsonSchema), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
