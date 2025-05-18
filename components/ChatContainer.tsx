import { ReactNode } from "react";

function ChatContainer({ children }: { children: ReactNode }) {
  return <div className="px-16">{children}</div>;
}

export default ChatContainer;
