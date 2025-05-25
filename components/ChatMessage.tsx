// ChatMessage.tsx
import { Message } from "@/context/chatContext";

function ChatMessage({ message }: { message: Message }) {
  const { role, content } = message;
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} pb-6`}>
      <div
        className={`whitespace-pre-wrap p-4 rounded-lg max-w-prose break-words ${
          isUser
            ? "bg-secondary-foreground text-foreground"
            : "bg-background border border-muted"
        }`}
      >
        {content}
      </div>
    </div>
  );
}

export default ChatMessage;
