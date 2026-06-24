import { streamGilberto } from "@/app/actions/gilberto";
import { type UIMessage } from "ai";

export async function POST(req: Request) {
    try {
        const { messages, context } = await req.json();

        // Extrae pathname de referer por seguridad o de body si es seguro
        const referer = req.headers.get("referer");
        let pathname = "/";
        if (referer) {
            try {
                pathname = new URL(referer).pathname;
            } catch (e) {
                // Ignore
            }
        }

        const safeContext = {
            ...context,
            pathname: pathname || context?.pathname,
        };

        return streamGilberto(Array.isArray(messages) ? messages : [], safeContext);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Error inesperado en Gilberto.";
        console.error("[gilberto]", message);
        return new Response(JSON.stringify({ error: message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
