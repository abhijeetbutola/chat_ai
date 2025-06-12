"use client";

import Image from "next/image";
import Button from "./Button";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useChat } from "@/context/chatContext";
import { fetchStreamedChat } from "@/lib/openai";

function ChatInput() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    addMessage,
    updateLastMessage,
    setStreamingComplete,
    getApiMessages,
  } = useChat();

  const handleSubmit = async (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (!input.trim() || isLoading) return;

    const userInput = input.trim();
    setInput("");
    setIsLoading(true);

    // Add user message
    addMessage({ role: "user", content: userInput });

    // Add empty assistant message for streaming
    addMessage({ role: "assistant", content: "", isStreaming: true });

    try {
      let fullMessage = "";

      // Get clean API messages and add the current user input
      const apiMessages = getApiMessages();
      const messagesForAPI = [
        ...apiMessages,
        { role: "user" as const, content: userInput },
      ];

      await fetchStreamedChat(
        messagesForAPI, // Use clean messages without isStreaming property
        (token) => {
          fullMessage += token;
          updateLastMessage(fullMessage);
        }
      );

      // Mark streaming as complete
      setStreamingComplete();
    } catch (error) {
      console.error("Error in chat:", error);
      // Update with error message
      updateLastMessage("Sorry, an error occurred. Please try again.");
      setStreamingComplete();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2 items-end pb-6 sm:px-4 md:px-8 lg:px-[196px]">
      <TextareaAutosize
        value={input}
        minRows={1}
        maxRows={8}
        placeholder="Ask me anything..."
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
        disabled={isLoading}
        className="w-full h- py-2.5 resize-none px-3 rounded-md border text-sm bg-secondary-foreground disabled:opacity-50"
      />
      <Button
        type="submit"
        className={`flex gap-1 justify-center items-center min-h-8 ${
          !input.trim() || isLoading ? "cursor-not-allowed" : ""
        } bg-primary text-primary-foreground text-sm font-medium px-3.5 py-2.5 rounded`}
        onClick={handleSubmit}
        disabled={!input.trim() || isLoading}
      >
        <div className="w-5 h-5 md:w-3.5 md:h-3.5 relative">
          <Image
            src={"./icons/submitArrow.svg"}
            alt="Submit button arrow"
            fill
            className="object-contain"
          />
        </div>
        <span className="hidden md:inline-block">
          {isLoading ? "..." : "Submit"}
        </span>
      </Button>
    </div>
  );
}

export default ChatInput;
