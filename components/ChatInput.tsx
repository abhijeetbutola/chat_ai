"use client";

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
        className="w-full py-3 resize-none px-3 rounded-md border text-sm bg-secondary-foreground"
      ></textarea>
      <Button className="bg-primary text-primary-foreground px-3.5 py-2.5 rounded">
        Submit
      </Button>
    </div>
  );
}

export default ChatInput;
