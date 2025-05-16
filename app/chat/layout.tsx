import ChatPage from "./page";

export default function RootLayout({}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ChatPage />;
}
