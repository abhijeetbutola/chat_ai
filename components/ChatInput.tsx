"use client";

import Image from "next/image";
import Button from "./Button";
import { ReactEventHandler, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

function ChatInput() {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!input.trim()) return;
    console.log(input);
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
        className={`flex gap-1 justify-center items-center h-full ${
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
