import { Message } from "@/context/chatContext";
import ChatMessage from "./ChatMessage";

function ChatWindow({ messages }: { messages: Message[] }) {
  return (
    <div className="w-full bg-background">
      {messages.map((msg, index) => (
        <ChatMessage key={index} message={msg} />
      ))}
    </div>
  );
}

export default ChatWindow;
