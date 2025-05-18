import Sidebar from "@/components/Sidebar";
import ChatPage from "./page";

export default function RootLayout({}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />
      <ChatPage />
    </div>
  );
}
