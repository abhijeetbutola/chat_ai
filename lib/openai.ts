export async function fetchStreamedChat(
  messages: any[],
  onToken: (token: string) => void
) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

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

    // Keep processing complete SSE events
    let sseBoundaryIndex;
    while ((sseBoundaryIndex = buffer.indexOf("\n\n")) !== -1) {
      const rawEvent = buffer.slice(0, sseBoundaryIndex);
      buffer = buffer.slice(sseBoundaryIndex + 2);

      // Handle multi-line events (split by \n and process each data: line)
      const lines = rawEvent.split("\n");
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice("data: ".length);

          if (data === "[DONE]") return;

          // Debug: uncomment to see what tokens are received
          console.log("Token received:", JSON.stringify(data));

          onToken(data);
        }
      }
    }
  }
}
