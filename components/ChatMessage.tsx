function ChatMessage({
  id,
  sender,
  text,
}: {
  id: number;
  sender: string;
  text: string;
}) {
  const isUser = sender === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} pb-6`}>
      <div
        className={`p-3 rounded-lg ${
          isUser
            ? "bg-secondary-foreground"
            : "bg-background border border-muted"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

export default ChatMessage;
