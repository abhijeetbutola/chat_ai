import OpenAI from "openai";
import { NextRequest } from "next/server";

// console.log(process.env.OPENAI_API_KEY);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use env variable
});

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const stream = await openai.responses.create({
    model: "gpt-4.1-nano", // or "gpt-4.1" or whichever you're using
    input: messages,
    stream: true,
  });

  const readable = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      try {
        for await (const event of stream) {
          if (event.type === "response.output_text.delta") {
            // console.log(JSON.stringify(event.delta));
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify(event.delta)}\n\n`)
            );
          }

          if (event.type === "response.completed") {
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
          }

          if (event.type === "error") {
            controller.enqueue(encoder.encode("data: ❗ Error occurred\n\n"));
            controller.close();
          }
        }
      } catch (err) {
        controller.enqueue(encoder.encode("data: ❗ Unexpected error\n\n"));
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
