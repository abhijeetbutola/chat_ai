import Sidebar from "@/components/Sidebar";
import ChatPage from "./page";
import { ChatProvider } from "@/context/chatContext";

export default function RootLayout({}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ChatProvider>
      <div className="flex w-full h-full">
        <Sidebar />
        <ChatPage />
      </div>
    </ChatProvider>
  );
}
