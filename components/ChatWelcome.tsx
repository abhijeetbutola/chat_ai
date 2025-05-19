import ChatOptionsCard from "./ChatOptionsCard";

function ChatWelcome() {
  return (
    <div className="flex flex-col h-full pb-6">
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
    </div>
  );
}

export default ChatWelcome;
