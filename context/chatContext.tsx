"use client";

import { createContext, useContext, useState, useCallback } from "react";

// Base message interface for API communication (without UI-specific properties)
export interface ApiMessage {
  role: "user" | "assistant";
  content: string;
}

// Extended message interface for UI state management
export interface Message extends ApiMessage {
  isStreaming?: boolean; // UI-only property for tracking streaming state
}

interface ChatContextType {
  messages: Message[];
  addMessage: (msg: Message) => void;
  updateLastMessage: (text: string) => void;
  setStreamingComplete: () => void;
  clearMessages: () => void;
  // Helper function to get messages without UI-specific properties
  getApiMessages: () => ApiMessage[];
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  };

  const updateLastMessage = useCallback((text: string) => {
    setMessages((prev) => {
      const updated = [...prev];
      const lastIndex = updated.length - 1;
      const last = updated[lastIndex];

      if (last && last.role === "assistant") {
        updated[lastIndex] = {
          ...last,
          content: text,
          isStreaming: true,
        };
      }

      return updated;
    });
  }, []);

  const setStreamingComplete = useCallback(() => {
    setMessages((prev) => {
      const updated = [...prev];
      const lastIndex = updated.length - 1;
      const last = updated[lastIndex];

      if (last && last.role === "assistant") {
        updated[lastIndex] = {
          ...last,
          isStreaming: false,
        };
      }

      return updated;
    });
  }, []);

  const clearMessages = () => {
    setMessages([]);
  };

  // Helper function to strip UI-specific properties before sending to API
  const getApiMessages = useCallback((): ApiMessage[] => {
    return messages.map(({ role, content }) => ({ role, content }));
  }, [messages]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        updateLastMessage,
        setStreamingComplete,
        clearMessages,
        getApiMessages,
      }}
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
