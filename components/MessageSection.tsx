"use client";

import { useState } from "react";
import ChatInput from "./ChatInput";
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
    <div className="flex flex-col h-screen pt-20 pb-6 lg:px-[180px]">
      {messages.length > 0 ? (
        <ChatWindow messages={messages} />
      ) : (
        <ChatWelcome />
      )}
      <ChatInput />
    </div>
  );
}

export default MessageSection;
