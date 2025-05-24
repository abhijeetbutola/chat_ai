"use client";

import ChatWelcome from "./ChatWelcome";
import ChatWindow from "./ChatWindow";
import { useChat } from "@/context/chatContext";

function MessageSection() {
  // const [messages, setMessages] = useState([
  //   { id: 1, sender: "user", text: "Hi there!" },
  //   { id: 2, sender: "bot", text: "Hello! How can I help you today?" },
  //   { id: 3, sender: "user", text: "Tell me a joke." },
  //   {
  //     id: 4,
  //     sender: "bot",
  //     text: "Why did the programmer quit his job? Because he didn’t get arrays!",
  //   },
  // ]);

  const { messages } = useChat();

  return (
    <div className="h-full flex-1 w-full pt-20 pb-6 lg:px-[180px]">
      {messages.length > 0 ? (
        <ChatWindow messages={messages} />
      ) : (
        <ChatWelcome />
      )}
    </div>
  );
}

export default MessageSection;
