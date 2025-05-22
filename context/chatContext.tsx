"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";

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

  // Queue and typing control
  const tokenQueue = useRef<string[]>([]);
  const typingInterval = useRef<NodeJS.Timeout | null>(null);

  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  };

  const updateLastMessage = useCallback((text: string) => {
    // Add all characters to the queue
    tokenQueue.current.push(...text.split(""));

    // If an interval is already running, let it handle the rest
    if (typingInterval.current) return;

    typingInterval.current = setInterval(() => {
      const nextChar = tokenQueue.current.shift();

      if (!nextChar) {
        clearInterval(typingInterval.current!);
        typingInterval.current = null;
        return;
      }

      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        updated[updated.length - 1] = {
          ...last,
          content: last.content + nextChar,
        };
        return updated;
      });
    }, 10);
  }, []);

  const clearMessages = () => {
    setMessages([]);
    tokenQueue.current = [];
    if (typingInterval.current) {
      clearInterval(typingInterval.current);
      typingInterval.current = null;
    }
  };

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
