"use client";

import Image from "next/image";
import Button from "./Button";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useChat } from "@/context/chatContext";
import { fetchStreamedChat } from "@/lib/openai";

function ChatInput() {
  const [input, setInput] = useState("");
  const { messages, addMessage, updateLastMessage } = useChat();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!input.trim()) return;

    addMessage({ role: "user", content: input });
    addMessage({ role: "assistant", content: "" });

    await fetchStreamedChat(
      [...messages, { role: "user", content: input }],
      (token) => {
        updateLastMessage(token);
      }
    );

    setInput("");
  };
  return (
    <div className="flex gap-2 items-end">
      <TextareaAutosize
        value={input}
        minRows={1}
        maxRows={8}
        placeholder="Ask me anything..."
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            // Send message
          }
        }}
        className="w-full py-2.5 resize-none px-3 rounded-md border text-sm bg-secondary-foreground"
      />
      <Button
        type="submit"
        className={`flex gap-1 justify-center items-center ${
          !input.trim() ? "cursor-not-allowed" : ""
        } bg-primary text-primary-foreground text-sm font-medium px-3.5 py-2.5 rounded`}
        onClick={handleSubmit}
        disabled={!input.trim()}
      >
        <div className="w-5 h-5 md:w-3.5 md:h-3.5 relative">
          <Image
            src={"./icons/submitArrow.svg"}
            alt="Submit button arrow"
            fill
            className="object-contain"
          />
        </div>
        <span className="hidden md:inline-block">Submit</span>
      </Button>
    </div>
  );
}

export default ChatInput;
