import type { APIRoute } from "astro";
import { jsonSchema } from "../schemas";

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(jsonSchema), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
