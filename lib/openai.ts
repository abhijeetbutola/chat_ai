export async function fetchStreamedChat(
  messages: any[],
  onToken: (token: string) => void
) {
  const res = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({ messages }),
  });

  if (!res.ok || !res.body) throw new Error("Failed to connect to stream");

  const reader = res.body.getReader();
  const decoder = new TextDecoder("utf-8");

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    onToken(chunk); // Use this to update UI with new text chunks
  }
}
