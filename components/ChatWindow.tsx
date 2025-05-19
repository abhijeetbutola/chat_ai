import ChatMessage from "./ChatMessage";

function ChatWindow({
  messages,
}: {
  messages: { id: number; sender: string; text: string }[];
}) {
  return (
    <div className="flex-1 overflow-y-auto bg-background">
      {messages.map((msg) => (
        <ChatMessage key={msg.id} {...msg} />
      ))}
    </div>
  );
}

export default ChatWindow;
