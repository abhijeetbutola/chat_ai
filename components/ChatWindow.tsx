import { Message } from "@/context/chatContext";
import ChatMessage from "./ChatMessage";
import { useEffect, useRef } from "react";

function ChatWindow({ messages }: { messages: Message[] }) {
  const endRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the chat window when messages change
  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="w-full bg-background">
      {messages.map((msg, index) => (
        <ChatMessage key={index} message={msg} />
      ))}
      <div ref={endRef} className="end-message"></div>
    </div>
  );
}

export default ChatWindow;
