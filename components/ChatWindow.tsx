import ChatMessage from "./ChatMessage";

function ChatWindow({
  messages,
}: {
  messages: { id: number; sender: string; text: string }[];
}) {
  return (
    <div className="h-full overflow-y-auto bg-background">
      {messages.map((msg) => (
        <ChatMessage key={msg.id} {...msg} />
      ))}
    </div>
  );
}

export default ChatWindow;
