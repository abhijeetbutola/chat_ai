export async function fetchStreamedChat(
  messages: any[],
  onToken: (token: string) => void
) {
  const res = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({ messages }),
  });

  const reader = res.body?.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";

  if (!reader) {
    throw new Error(
      "Response body is undefined or does not support streaming."
    );
  }

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n\n");

    // Leave last line in buffer if it's incomplete
    buffer = lines.pop() || "";

    for (const line of lines) {
      // const trimmed = line.trim();

      // if (trimmed.startsWith("data: ")) {
      // const data = trimmed.replace(/^data:\s*/, "");

      if (line.startsWith("data: ")) {
        const data = line.slice("data: ".length);

        if (data === "[DONE]") return;
        onToken(data); // ✅ Just delta — append it
      }
    }
  }
}
