import { Message } from "@/context/chatContext";

function ChatMessage({ message }: { message: Message }) {
  const { role, content } = message;
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} pb-6`}>
      <div
        className={`p-3 rounded-lg ${
          isUser
            ? "bg-secondary-foreground"
            : "bg-background border border-muted"
        }`}
      >
        {content}
      </div>
    </div>
  );
}

export default ChatMessage;
