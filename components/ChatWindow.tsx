import { Message } from "@/context/chatContext";
import ChatMessage from "./ChatMessage";

function ChatWindow({ messages }: { messages: Message[] }) {
  return (
    <div className="flex-1 overflow-y-auto bg-background">
      {messages.map((msg, index) => (
        <ChatMessage key={index} message={msg} />
      ))}
    </div>
  );
}

export default ChatWindow;
