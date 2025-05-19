"use client";

import Image from "next/image";
import Button from "./Button";

function ChatInput() {
  return (
    <div className="flex gap-2 items-center">
      <textarea
        rows={1}
        placeholder="Ask me anything..."
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            // Send message
          }
        }}
        className="w-full py-2.5 resize-none px-3 rounded-md border text-sm bg-secondary-foreground"
      ></textarea>
      <Button className="flex gap-1 justify-center items-center bg-primary text-primary-foreground text-sm font-medium px-3.5 py-2.5 rounded">
        <Image
          src={"./icons/submitArrow.svg"}
          alt="Submit button arrow"
          width={14}
          height={14}
        />
        <span>Submit</span>
      </Button>
    </div>
  );
}

export default ChatInput;
