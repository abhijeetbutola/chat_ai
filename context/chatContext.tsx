"use client";

import { createContext, useContext, useState } from "react";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatContextType {
  messages: Message[];
  addMessage: (msg: Message) => void;
  updateLastMessage: (text: string) => void;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  };

  const updateLastMessage = (text: string) => {
    setMessages((prev) => {
      const updated = [...prev];
      updated[updated.length - 1].content += text;

      return updated;
    });
  };

  const clearMessages = () => setMessages([]);

  return (
    <ChatContext.Provider
      value={{ messages, addMessage, updateLastMessage, clearMessages }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");

  return ctx;
};
