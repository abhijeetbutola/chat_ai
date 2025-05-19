import { ReactNode } from "react";

function ChatContainer({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full min-h-screen sm:px-4 md:px-8 lg:px-16">
      {children}
    </div>
  );
}

export default ChatContainer;
