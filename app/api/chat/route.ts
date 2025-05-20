import { OpenAI } from "openai";
import { NextRequest } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use env variable
});

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const stream = await openai.responses.create({
    model: "gpt-4.1", // or "gpt-4.1" or whichever you're using
    input: messages,
    stream: true,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          // Only care about text delta updates
          if (event.type === "response.output_text.delta") {
            controller.enqueue(encoder.encode(event.delta));
          }

          // Handle stream complete
          if (event.type === "response.completed") {
            controller.close();
          }

          // Optionally handle errors or special cases
          if (event.type === "error") {
            console.error("Streaming error:", event);
            controller.enqueue(encoder.encode("❗ An error occurred."));
            controller.close();
          }
        }
      } catch (err) {
        controller.enqueue(encoder.encode("❗ Unexpected error"));
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache",
    },
  });
}
