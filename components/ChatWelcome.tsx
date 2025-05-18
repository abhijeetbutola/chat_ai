import ChatInput from "./ChatInput";
import ChatOptionsCard from "./ChatOptionsCard";

function ChatWelcome() {
  return (
    <div className="flex flex-col h-full pt-20 pb-6 px-[180px]">
      <p className="text-3xl font-semibold">
        Hey, I’m Chat AI.
        <span className="text-muted-foreground font-medium">
          {" "}
          Your AI assistant and companion for any occasion.
        </span>
      </p>
      <div className="mt-20 h-full">
        <ChatOptionsCard />
      </div>
      <ChatInput />
    </div>
  );
}

export default ChatWelcome;
