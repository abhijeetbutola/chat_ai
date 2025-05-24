import Sidebar from "@/components/Sidebar";
import ChatPage from "./page";
import { ChatProvider } from "@/context/chatContext";
import ChatInput from "@/components/ChatInput";

export default function RootLayout({}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ChatProvider>
      <div className="flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen">
          <ChatPage />
          <ChatInput />
        </div>
      </div>
    </ChatProvider>
  );
}
